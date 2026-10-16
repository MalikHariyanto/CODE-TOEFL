import {score,TEST_SECONDS} from './engine.js';
export function newSession(mode,qs,now=Date.now()) {
 const section=qs[0].section;
 const duration=mode==='final'?TEST_SECONDS[section]:mode==='section'?TEST_SECONDS[section]:mode==='diagnostic'?30*60:mode==='short'?15*60:0;
 return {id:crypto.randomUUID(),mode,questionIds:qs.map(q=>q.id),answers:{},visited:[qs[0].id],questionTimes:{},index:0,startedAt:now,sectionStartedAt:now,lastQuestionAt:now,deadline:duration?now+duration*1000:0,elapsed:0,played:[],completedSections:[],invalidAudio:false};
}
export function finalizeSession(state,session,questions,now=Date.now()){
 if(state.sessions.some(s=>s.id===session.id))return state;
 recordQuestionTime(session,session.mode==='practice'?now:Math.min(now,session.deadline));
 const qs=session.questionIds.map(id=>questions.get(id));
 const attempts=qs.filter(q=>!session.visited||session.visited.includes(q.id)).map(q=>{const a=session.answers[q.id];return {id:session.id+':'+q.id,questionId:q.id,choice:a?.choice??null,at:now,elapsed:session.questionTimes?.[q.id]??a?.elapsed??0,mode:session.mode,first:!state.attempts.some(x=>x.questionId===q.id),assisted:session.mode==='practice',confidence:a?.confidence??'guess',sessionId:session.id,valid:!session.invalidAudio};});
 const done={...session,completedAt:now,elapsed:Math.max(0,Math.round(((session.mode==='practice'?now:Math.min(now,session.deadline))-session.startedAt)/1000)),result:score(qs,session.answers)};
 return {...state,attempts:[...state.attempts,...attempts],sessions:[...state.sessions,done],activeSession:null};
}
// Deadlines are absolute. If a tab sleeps across several sections, all elapsed
// sections are locked; no extra time is created by returning to the tab.
export function advanceExpiredSections(session,questions,now=Date.now()){
 if(session.mode==='practice'||session.deadline>now)return {session,finished:false,changed:false};
 const s=structuredClone(session);let changed=false;
 while(s.deadline<=now){
  if(s.mode!=='final')return {session:s,finished:true,changed:true};
  recordQuestionTime(s,s.deadline);
  const current=questions.get(s.questionIds[s.index]).section;
  if(!s.completedSections.includes(current))s.completedSections.push(current);
  const next=s.questionIds.findIndex(id=>!s.completedSections.includes(questions.get(id).section));
  if(next<0)return {session:s,finished:true,changed:true};
  s.index=next;s.visited??=[];if(!s.visited.includes(s.questionIds[next]))s.visited.push(s.questionIds[next]);s.sectionStartedAt=s.deadline;s.lastQuestionAt=s.sectionStartedAt;
  s.deadline+=TEST_SECONDS[questions.get(s.questionIds[next]).section]*1000;changed=true;
 }
 return {session:s,finished:false,changed};
}

export function recordQuestionTime(session,now=Date.now()){
 const id=session.questionIds[session.index];session.questionTimes??={};
 session.questionTimes[id]=(session.questionTimes[id]||0)+Math.max(0,Math.round((now-session.lastQuestionAt)/1000));
 if(session.answers[id])session.answers[id].elapsed=session.questionTimes[id];
 session.lastQuestionAt=now;
}
