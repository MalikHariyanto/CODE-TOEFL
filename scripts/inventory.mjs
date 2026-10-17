import {lessons} from '../src/data/lessons.js';
import {dictionary} from '../src/data/dictionary.js';
import {vocabularyTopics} from '../src/data/vocabulary-topics.js';
import {questions,stimuli} from '../src/data/index.js';
const rows={};for(const split of ['diagnostic','practice','final']){rows[split]={};for(const section of ['structure','listening','reading'])rows[split][section]=questions.filter(q=>q.split===split&&q.section===section).length;}
console.table(rows);console.log('Total',questions.length);for(const split of ['diagnostic','practice','final']){const s=stimuli.filter(s=>s.split===split);console.log(split,{passages:s.filter(s=>s.type==='reading').length,audio:s.filter(s=>s.type==='listening').length,audioSeconds:Math.round(s.reduce((n,s)=>n+(s.duration||0),0))});}

console.log('Materi', {chapters:lessons.length,subchapters:lessons.reduce((n,l)=>n+l.parts.length,0),checks:lessons.reduce((n,l)=>n+l.checks.length,0),dictionaryEntries:dictionary.length,vocabularyThemes:vocabularyTopics.length,themedEntries:new Set(vocabularyTopics.flatMap(t=>t.words)).size,localHumanRecordings:0,syntheticAudioDefault:false});
