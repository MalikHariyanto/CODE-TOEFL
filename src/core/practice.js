import {groupQuestions} from './engine.js';

export const PRACTICE_SIZES=[10,15,20];

// Partition intact contexts. Prefer covering every question, then sizes nearest
// the chosen target. Never pad with duplicate questions or split a passage.
function partition(groups,target){
 const memo=new Map();
 function from(index){
  if(index===groups.length)return {packs:[],unpacked:[],missing:0,cost:0};
  if(memo.has(index))return memo.get(index);
  const next=from(index+1);
  let best={packs:next.packs,unpacked:[...groups[index],...next.unpacked],missing:groups[index].length+next.missing,cost:next.cost};
  let count=0;
  for(let end=index;end<groups.length;end++){
   count+=groups[end].length;if(count>20)break;if(count<10)continue;
   const tail=from(end+1),cost=(count-target)**2+tail.cost;
   if(tail.missing<best.missing||(tail.missing===best.missing&&cost<best.cost)){
    best={packs:[groups.slice(index,end+1).flat(),...tail.packs],unpacked:tail.unpacked,missing:tail.missing,cost};
   }
  }
  memo.set(index,best);return best;
 }
 return from(0);
}

export function buildPracticePacks(questions,matching,target=10){
 if(!PRACTICE_SIZES.includes(target))throw new Error('Pilih sasaran 10, 15, atau 20 soal.');
 const practice=questions.filter(q=>q.split==='practice');
 const matchedIds=new Set(matching.filter(q=>q.split==='practice').map(q=>q.id));
 const buckets=new Map();
 for(const group of groupQuestions(practice)){
  if(!group.some(q=>matchedIds.has(q.id)))continue;
  // Structure is organized by topic. Shared reading/audio stays together even
  // when only one question in its context matched a topic/history filter.
  const first=group[0],key=first.section==='structure'?first.skill:first.section;
  if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(group);
 }
 const packs=[],unpacked=[];
 for(const [topic,groups] of buckets){
  const result=partition(groups,target);unpacked.push(...result.unpacked);
  result.packs.forEach((qs,i)=>packs.push({id:`${topic}:${qs[0].id}:${qs.at(-1).id}`,topic,number:i+1,questions:qs,matchedCount:qs.filter(q=>matchedIds.has(q.id)).length}));
 }
 return {packs,unpacked};
}

export function samePractice(session,questions){
 return session?.mode==='practice'&&session.questionIds.length===questions.length&&session.questionIds.every((id,i)=>id===questions[i].id);
}

export function lessonBundle(questions,skill,attempts=[],preferNew=true,target=10){
 const matching=questions.filter(q=>q.split==='practice'&&q.skill===skill);
 const {packs}=buildPracticePacks(questions,matching,target);
 const seen=new Set(attempts.map(a=>a.questionId));
 if(preferNew)packs.sort((a,b)=>b.questions.filter(q=>!seen.has(q.id)).length-a.questions.filter(q=>!seen.has(q.id)).length);
 return packs[0]?.questions||[];
}
