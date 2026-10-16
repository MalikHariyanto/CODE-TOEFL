export const SCHEMA_VERSION = 2;
export const SECTIONS = {listening:'Listening', structure:'Structure', reading:'Reading'};
export const TEST_SECONDS = {listening:35*60,structure:25*60,reading:55*60};
export function score(questions, answers) {
  let correct=0,wrong=0,blank=0;
  for (const q of questions) { const a=answers[q.id]?.choice; if(!Number.isInteger(a)||a<0||a>3) blank++; else if(a===q.answer) correct++; else wrong++; }
  return {correct,wrong,blank,total:questions.length,accuracy:questions.length?correct/questions.length:0};
}
export function remaining(deadline,now=Date.now()) {return Math.max(0,Math.ceil((deadline-now)/1000));}
export function reviewSchedule(card,correct,now=Date.now()) {
  const stage=correct?Math.min((card.stage??-1)+1,3):0;
  return {...card,stage,due:now+(correct?[1,3,7,14][stage]:1)*86400000,reviews:(card.reviews||0)+1,lastReviewed:now};
}
export function normalizeWord(word) {return word.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g,'').replace(/[’]/g,"'");}
export function groupQuestions(questions) {
  const map=new Map(); for(const q of questions) {const key=q.stimulus||q.id; if(!map.has(key))map.set(key,[]);map.get(key).push(q);} return [...map.values()];
}
export function recommendations(attempts,questions,limit=4) {
 const index=new Map(questions.map(q=>[q.id,q])); const groups={};
 for(const a of attempts.filter(a=>a.mode!=='practice'&&a.valid!==false).slice(-300)) {const q=index.get(a.questionId);if(!q)continue;const x=groups[q.skill]??={skill:q.skill,n:0,wrong:0,section:q.section}; x.n++; if(a.choice!==q.answer)x.wrong++;}
 return Object.values(groups).filter(x=>x.wrong>0).sort((a,b)=>(b.wrong/b.n)-(a.wrong/a.n)||b.n-a.n).slice(0,limit).map(x=>({...x,tentative:x.n<5}));
}
export function freshState(){return {schemaVersion:SCHEMA_VERSION,attempts:[],sessions:[],vocabulary:[],bookmarks:[],notes:[],completedLessons:[],preferences:{theme:'light'},activeSession:null};}
function fail(message){throw new Error('Cadangan tidak valid: '+message);}
export function validateBackup(input,knownQuestionIds,knownLessonIds) {
 if(!input||typeof input!=='object'||Array.isArray(input))fail('objek JSON diperlukan.');
 if(Object.hasOwn(input,'format')&&input.format!=='ruang-toefl-backup')fail('format berkas tidak dikenal.');
 const raw=input.data??input;
 if(![1,2].includes(raw.schemaVersion))fail('versi skema tidak didukung.');
 if(JSON.stringify(raw).length>10_000_000)fail('ukuran melampaui 10 MB.');
 const state={...freshState(),...raw,schemaVersion:SCHEMA_VERSION};
 const arr=['attempts','sessions','vocabulary','bookmarks','notes','completedLessons'];
 for(const k of arr)if(!Array.isArray(state[k])||state[k].length>50000)fail('daftar '+k+' tidak sah.');
 const finite=x=>typeof x==='number'&&Number.isFinite(x)&&x>=0;
 const string=(x,max=5000)=>typeof x==='string'&&x.length<=max;
 const known=id=>string(id,100)&&(!knownQuestionIds||knownQuestionIds.has(id));
 for(const a of state.attempts)if((a.valid!==undefined&&typeof a.valid!=='boolean')||!known(a.questionId)||!string(a.id,180)||!(a.choice===null||[0,1,2,3].includes(a.choice))||!finite(a.at)||!finite(a.elapsed)||!['practice','diagnostic','short','section','final'].includes(a.mode)||typeof a.first!=='boolean'||typeof a.assisted!=='boolean'||!['sure','guess'].includes(a.confidence))fail('percobaan tidak sah.');
 for(const v of state.vocabulary)if(!string(v.word,120)||!v.word.trim()||!string(v.meaning)||!finite(v.due)||!Number.isInteger(v.stage)||v.stage< -1||v.stage>3||!Number.isInteger(v.reviews)||v.reviews<0)fail('kosakata tidak sah.');
 for(const b of state.bookmarks)if(!known(b))fail('penanda tidak dikenal.');
 for(const n of state.notes)if(!known(n.questionId)||!string(n.text)||!['','vocabulary','structure','evidence','time','guess'].includes(n.cause))fail('catatan tidak sah.');
 for(const id of state.completedLessons)if(!string(id,100)||(knownLessonIds&&!knownLessonIds.has(id)))fail('materi tidak dikenal.');
 const session=s=>{
  if(!s||!string(s.id,180)||!['diagnostic','short','section','final','practice'].includes(s.mode)||!Array.isArray(s.questionIds)||!s.questionIds.length||s.questionIds.length>600||s.questionIds.some(id=>!known(id))||new Set(s.questionIds).size!==s.questionIds.length)fail('sesi tidak sah.');
  s.visited??=s.completedAt?s.questionIds.slice():s.questionIds.slice(0,s.index+1);if(!Array.isArray(s.visited)||new Set(s.visited).size!==s.visited.length||s.visited.some(id=>!s.questionIds.includes(id)))fail('daftar soal dikunjungi tidak sah.');
  s.questionTimes??={};if(typeof s.questionTimes!=='object'||Array.isArray(s.questionTimes)||Object.entries(s.questionTimes).some(([id,t])=>!s.questionIds.includes(id)||!finite(t)))fail('durasi soal tidak sah.');
  if(!s.answers||typeof s.answers!=='object'||Array.isArray(s.answers)||!finite(s.startedAt)||!Number.isInteger(s.index)||s.index<0||s.index>=s.questionIds.length||!finite(s.deadline)||!finite(s.sectionStartedAt)||!finite(s.lastQuestionAt)||!finite(s.elapsed))fail('waktu atau jawaban sesi tidak sah.');
  for(const [id,a] of Object.entries(s.answers))if(!s.questionIds.includes(id)||!a||![0,1,2,3].includes(a.choice)||!finite(a.elapsed)||!['sure','guess'].includes(a.confidence))fail('jawaban sesi tidak sah.');
  if(!Array.isArray(s.played)||s.played.some(x=>!string(x,100))||!Array.isArray(s.completedSections)||s.completedSections.some(x=>!Object.hasOwn(SECTIONS,x))||typeof s.invalidAudio!=='boolean'||(s.completedAt!==undefined&&!finite(s.completedAt)))fail('status sesi tidak sah.');
 };
 for(const s of state.sessions){session(s);if(!s.result||!['correct','wrong','blank','total'].every(k=>Number.isInteger(s.result[k])&&s.result[k]>=0)||s.result.total!==s.questionIds.length||s.result.correct+s.result.wrong+s.result.blank!==s.result.total||s.result.accuracy!==s.result.correct/s.result.total||!finite(s.completedAt))fail('hasil sesi tidak sah.');}
 if(state.activeSession!==null)session(state.activeSession);
 if(new Set(state.attempts.map(a=>a.id)).size!==state.attempts.length||new Set(state.sessions.map(s=>s.id)).size!==state.sessions.length||new Set(state.vocabulary.map(v=>v.word)).size!==state.vocabulary.length)fail('ID duplikat.');
 if(!state.preferences||!['light','dark'].includes(state.preferences.theme))fail('tema tidak sah.');
 return state;
}
