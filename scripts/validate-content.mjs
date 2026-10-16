import {questions,stimuli} from '../src/data/index.js';
import {lessons} from '../src/data/lessons.js';
import fs from 'node:fs';
import crypto from 'node:crypto';
export function validateContent(qs=questions,ss=stimuli){
 const normalize=s=>s.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g,' ').trim();
 const errors=[],ids=new Set(),stimIds=new Set(ss.map(s=>s.id)),map=new Map(ss.map(s=>[s.id,s])),seen=new Set(),usage=new Map();
 if(stimIds.size!==ss.length)errors.push('Duplicate stimulus ID');
 for(const q of qs){
  if(ids.has(q.id))errors.push('Duplicate question ID '+q.id);ids.add(q.id);
  for(const key of ['section','skill','difficulty','prompt','explanation','evidence','source','permission','reviewStatus','split','lesson'])if(!q[key])errors.push(q.id+' missing '+key);
  if(!['listening','structure','reading'].includes(q.section)||!['diagnostic','practice','final'].includes(q.split)||!['menengah','sulit'].includes(q.difficulty))errors.push(q.id+' invalid enum');
  if(!lessons.some(l=>l.id===q.lesson))errors.push(q.id+' missing lesson');
  if(q.options?.length!==4||new Set(q.options).size!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3)errors.push(q.id+' invalid choices');
  if(q.rationales?.length!==4||q.rationales.some(r=>!r?.trim()))errors.push(q.id+' missing rationale');
  const signature=(q.sentence||q.stimulus+' '+q.prompt)+'|'+q.options.join('|');if(seen.has(signature))errors.push(q.id+' duplicate content');seen.add(signature);
  if(q.stimulus){const original=map.get(q.stimulus)?.text||'';for(const excerpt of q.evidence.split(/…|\.\.\./).map(normalize).filter(x=>x.length>4))if(!normalize(original).includes(excerpt))errors.push(q.id+' evidence is not present in stimulus');if(!stimIds.has(q.stimulus))errors.push(q.id+' missing stimulus');if(map.get(q.stimulus)?.split!==q.split)errors.push(q.id+' stimulus split leak');const splits=usage.get(q.stimulus)||new Set();splits.add(q.split);usage.set(q.stimulus,splits);}
  else if(q.section!=='structure')errors.push(q.id+' requires stimulus');
 }
 for(const [id,splits] of usage)if(splits.size>1)errors.push(id+' cross-split leak');
 const stimulusTexts=new Set();
 for(const s of ss){const text=normalize(s.text||'');if(stimulusTexts.has(text))errors.push(s.id+' duplicate stimulus text');stimulusTexts.add(text);if(!usage.has(s.id))errors.push(s.id+' unused');if(!s.text||s.text.length<40)errors.push(s.id+' too short');if(s.type==='listening'){
  const file=new URL('../public/'+s.audio,import.meta.url);if(s.audioStatus!=='ready'||!fs.existsSync(file))errors.push(s.id+' audio not ready');else if(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')!==s.fileSha256)errors.push(s.id+' audio checksum mismatch');
  const turns=[['Narrator','Listen to the following '+(s.kind==='talk'?'talk.':'conversation.')],...s.turns];if(s.kind==='short')turns.push(...qs.filter(q=>q.stimulus===s.id).map(q=>['Narrator',q.prompt]));const scriptHash=crypto.createHash('sha256').update(JSON.stringify(turns)).digest('hex');if(scriptHash!==s.scriptSha256)errors.push(s.id+' recording script is stale');
  if(!(s.duration>1))errors.push(s.id+' invalid duration');
 }}return errors;
}
const errors=validateContent();if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Content valid: ${questions.length} questions, ${stimuli.filter(s=>s.type==='reading').length} passages, ${stimuli.filter(s=>s.type==='listening').length} audio stimuli. Editorial correctness requires separate review.`);
