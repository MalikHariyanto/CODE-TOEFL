import test from 'node:test';
import assert from 'node:assert/strict';
import {questions} from '../src/data/index.js';
import {buildPracticePacks,lessonBundle,samePractice} from '../src/core/practice.js';
const practice=questions.filter(q=>q.split==='practice');
function intact(packs){const ids=[];for(const p of packs){assert.ok(p.questions.length>=10&&p.questions.length<=20);for(const q of p.questions){ids.push(q.id);assert.equal(q.split,'practice');if(q.stimulus)assert.deepEqual(p.questions.filter(x=>x.stimulus===q.stimulus),practice.filter(x=>x.stimulus===q.stimulus));}}assert.equal(new Set(ids).size,ids.length);}

test('all 430 practice questions form unique intact packets of 10–20 for every target size',()=>{
 for(const size of [10,15,20]){const {packs,unpacked}=buildPracticePacks(questions,practice,size);intact(packs);assert.equal(unpacked.length,0);assert.equal(packs.flatMap(p=>p.questions).length,430);}
});
test('different cards correspond to disjoint Structure packets, with exact first-question previews',()=>{
 const matching=practice.filter(q=>q.skill==='structure-core');const {packs}=buildPracticePacks(questions,matching,10);assert.equal(packs.length,2);assert.equal(packs[0].questions[0].id,'S011');assert.equal(packs[1].questions[0].id,'S101');assert.notEqual(packs[0].id,packs[1].id);intact(packs);
 const active={mode:'practice',questionIds:packs[0].questions.map(q=>q.id)};assert.ok(samePractice(active,packs[0].questions));assert.equal(samePractice(active,packs[1].questions),false);
});
test('reading topic filters include matching questions and their intact companion context without final leaks',()=>{
 const matching=practice.filter(q=>q.skill==='reading-reference');const {packs,unpacked}=buildPracticePacks(questions,matching,10);assert.equal(unpacked.length,0);intact(packs);for(const p of packs){assert.equal(p.matchedCount,p.questions.filter(q=>q.skill==='reading-reference').length);assert.ok(p.matchedCount>0);}
});
test('a narrow history filter does not duplicate one item into a fake full session',()=>{
 const one=practice.find(q=>q.section==='structure');const r=buildPracticePacks(questions,[one],10);assert.equal(r.packs.length,0);assert.deepEqual(r.unpacked,[one]);
 const reading=practice.find(q=>q.section==='reading');const s=buildPracticePacks(questions,[reading],10);assert.equal(s.packs.length,0);assert.equal(s.unpacked.length,5);
});
test('uneven tails are redistributed, and context groups are never cut or padded',()=>{
 const items=practice.filter(q=>q.skill==='structure-error');const r=buildPracticePacks(questions,items,20);assert.equal(r.unpacked.length,0);assert.equal(r.packs.flatMap(p=>p.questions).length,50);intact(r.packs);
 const singleTopic=practice.filter(q=>q.skill==='structure-core');const s=buildPracticePacks(questions,singleTopic,15);assert.equal(s.packs.length,1);assert.equal(s.packs[0].questions.length,20);assert.equal(s.unpacked.length,0);
});
test('lesson sessions choose a different unused packet before repeating and enforce supported sizes',()=>{
 const first=lessonBundle(questions,'structure-core');const next=lessonBundle(questions,'structure-core',first.map(q=>({questionId:q.id})));assert.equal(first.length,10);assert.equal(next.length,10);assert.ok(next.every(q=>!first.some(x=>x.id===q.id)));assert.throws(()=>buildPracticePacks(questions,practice,1));
});
