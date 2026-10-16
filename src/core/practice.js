import {groupQuestions} from './engine.js';
// Match a topic, then restore every sibling in its practice-only stimulus.
// A context is never split to meet an arbitrary question count.
export function lessonBundle(questions,skill,attempts=[],reinforcement=false,target=5){
 const practice=questions.filter(q=>q.split==='practice');
 const matched=practice.filter(q=>q.skill===skill);
 const contexts=new Set(matched.filter(q=>q.stimulus).map(q=>q.stimulus));
 const ids=new Set(matched.map(q=>q.id));
 const groups=groupQuestions(practice.filter(q=>contexts.has(q.stimulus)||ids.has(q.id)));
 const seen=new Set(attempts.map(a=>a.questionId));
 const ordered=reinforcement?[...groups.filter(g=>g.every(q=>!seen.has(q.id))),...groups.filter(g=>g.some(q=>seen.has(q.id)))]:groups;
 const bundle=[];for(const g of ordered){bundle.push(...g);if(bundle.length>=target)break;}return bundle;
}
