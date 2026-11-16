import test from 'node:test';
import assert from 'node:assert/strict';
import {grammarChapters,grammarStages} from '../src/data/grammar.js';
import {glossaryFor} from '../src/data/academic-glossary.js';

test('guided grammar curriculum provides comparisons, corrections and two explained checks per chapter',()=>{
 assert.equal(grammarChapters.length,11);assert.equal(new Set(grammarChapters.map(c=>c.id)).size,11);
 for(const c of grammarChapters){
  assert.ok(grammarStages[c.stage]);assert.ok(c.goal&&c.concept&&c.terms,c.id);
  assert.equal(c.examples.length,2,c.id);for(const e of c.examples)assert.ok(e.sentence&&e.pattern&&e.why,c.id);
  assert.equal(c.trap.length,3,c.id);assert.notEqual(c.trap[0],c.trap[1],c.id);
  assert.equal(c.checks.length,2,c.id);
  for(const check of c.checks){assert.ok(check.prompt&&check.hint,c.id);assert.ok(Number.isInteger(check.answer)&&check.answer>=0&&check.answer<check.options.length,c.id);assert.equal(new Set(check.options).size,check.options.length,c.id);assert.equal(check.reasons.length,check.options.length,c.id);assert.ok(check.reasons.every(Boolean),c.id);}
 }
});
test('selective glossary excludes everyday words, preserves phrases, and matches whole words in reading order',()=>{
 assert.deepEqual(glossaryFor('She studies English every day.'),[]);
 assert.deepEqual(glossaryFor('The findings indicate a substantial increase in rainfall.').map(e=>e.matched),['findings','indicate','substantial','rainfall']);
 assert.equal(glossaryFor('The experiments stopped because of equipment failure.').find(e=>e.word==='because of').matched,'because of');
 assert.deepEqual(glossaryFor('sampling reconsideration trialled'),[]);
 assert.equal(glossaryFor('The FINDINGS indicate a change.')[0].matched,'FINDINGS');
});
