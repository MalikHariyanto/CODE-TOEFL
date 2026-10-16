import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons} from '../src/data/lessons.js';
import {dictionary} from '../src/data/dictionary.js';
import {vocabularyTopics} from '../src/data/vocabulary-topics.js';
import {freshState,validateBackup} from '../src/core/engine.js';
import {validStudyUrl} from '../src/data/listening-sources.js';
test('course chapters provide required teaching sections, examples, pitfalls and explained checks',()=>{
 assert.equal(lessons.length,28);assert.equal(new Set(lessons.map(l=>l.id)).size,28);
 for(const l of lessons){assert.equal(l.parts.length,3,l.id);assert.ok(l.goals.length>=2);assert.ok(l.pitfalls.length>=2);assert.equal(l.checks.length,2);for(const p of l.parts){assert.ok(p.text.trim().length>0,l.id);assert.ok(p.example.trim().length>0);assert.ok(p.analysis.trim().length>0,l.id);}for(const q of l.checks){assert.ok(q.prompt&&q.answer);assert.ok(q.why.trim().length>0,l.id);}}
 const words=new Set(dictionary.map(e=>e.word));for(const t of vocabularyTopics)for(const w of t.words)assert.ok(words.has(w),w);
});
test('v1 and v2 migrate to theory-first without deleting progress',()=>{
 for(const version of [1,2]){const old={...freshState(),schemaVersion:version,preferences:{theme:'dark'},completedLessons:['structure-core'],bookmarks:['S011']};delete old.listeningStudies;const migrated=validateBackup(old);assert.equal(migrated.schemaVersion,3);assert.equal(migrated.preferences.syntheticAudio,false);assert.deepEqual(migrated.listeningStudies,[]);assert.deepEqual(migrated.completedLessons,['structure-core']);assert.deepEqual(migrated.bookmarks,['S011']);}
});
test('external study backup accepts real notes and rejects executable URLs, unknown sources and duplicate IDs',()=>{
 const s=freshState();s.listeningStudies=[{id:'note-1',source:'elllo',at:1,title:'My lesson',url:'https://elllo.org/',summary:'I listened and found evidence.',phrases:'on my plate'}];assert.deepEqual(validateBackup(s).listeningStudies,s.listeningStudies);
 for(const url of ['javascript:alert(1)','data:text/html,hello','https://elllo.org.evil.example/','https://user:pass@elllo.org/','http://elllo.org/']){assert.equal(validStudyUrl(url),false);assert.throws(()=>validateBackup({...s,listeningStudies:[{...s.listeningStudies[0],url}]}));}
 assert.throws(()=>validateBackup({...s,listeningStudies:[s.listeningStudies[0],s.listeningStudies[0]]}));assert.throws(()=>validateBackup({...s,listeningStudies:[{...s.listeningStudies[0],source:'unknown'}]}));assert.throws(()=>validateBackup({...s,preferences:{theme:'light',syntheticAudio:'true'}}));
});

test('lesson bundles contain five structure items or complete reading contexts and reinforcement avoids seen groups',async()=>{
 const {lessonBundle}=await import('../src/core/practice.js');const {questions}=await import('../src/data/index.js');
 const structure=lessonBundle(questions,'structure-core');assert.equal(structure.length,5);assert.ok(structure.every(q=>q.section==='structure'&&q.split==='practice'));
 const repeated=lessonBundle(questions,'structure-core',structure.map(q=>({questionId:q.id})),true);assert.equal(repeated.length,5);assert.ok(repeated.every(q=>!structure.some(x=>x.id===q.id)));
 const reading=lessonBundle(questions,'reading-reference');assert.equal(reading.length,5);assert.ok(reading.some(q=>q.skill==='reading-reference'));assert.equal(new Set(reading.map(q=>q.stimulus)).size,1);const whole=questions.filter(q=>q.stimulus===reading[0].stimulus);assert.deepEqual(reading,whole);assert.ok(reading.every(q=>q.split==='practice'));
});
test('every chapter including additional foundations and vocabulary links to a usable practice bundle',async()=>{
 const {lessonBundle}=await import('../src/core/practice.js');const {questions}=await import('../src/data/index.js');
 for(const l of lessons){const set=lessonBundle(questions,l.practiceSkill);assert.ok(set.length>=5,l.id);assert.ok(set.every(q=>q.split==='practice'&&q.section===l.section),l.id);assert.ok(set.some(q=>q.skill===l.practiceSkill),l.id);}
});
