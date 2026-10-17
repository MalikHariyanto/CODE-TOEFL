import {lessons} from '../src/data/lessons.js';
import {vocabularyTopics} from '../src/data/vocabulary-topics.js';
import {questions,stimuli} from '../src/data/index.js';
import {dictionary} from '../src/data/dictionary.js';
import fs from 'node:fs';
const bySplit={};for(const split of ['diagnostic','practice','final']){bySplit[split]={};for(const section of ['structure','listening','reading'])bySplit[split][section]=questions.filter(q=>q.split===split&&q.section===section).length;bySplit[split].passages=stimuli.filter(s=>s.split===split&&s.type==='reading').length;const audio=stimuli.filter(s=>s.split===split&&s.type==='listening');bySplit[split].audioStimuli=audio.length;bySplit[split].audioSeconds=Number(audio.reduce((n,s)=>n+s.duration,0).toFixed(3));}
const learning={chapters:lessons.length,subchapters:lessons.reduce((n,l)=>n+l.parts.length,0),comprehensionChecks:lessons.reduce((n,l)=>n+l.checks.length,0),vocabularyThemes:vocabularyTopics.length,themedEntries:new Set(vocabularyTopics.flatMap(t=>t.words)).size};
const inventory={learning,localHumanAudioFiles:0,syntheticAudioDefault:false,totalQuestions:questions.length,bySplit,readingPassages:stimuli.filter(s=>s.type==='reading').length,audioStimuli:stimuli.filter(s=>s.type==='listening').length,audioCheckFiles:1,dictionaryEntries:dictionary.length,difficulty:Object.fromEntries(['menengah','sulit'].map(d=>[d,questions.filter(q=>q.difficulty===d).length]))};fs.writeFileSync('docs/inventory.json',JSON.stringify(inventory,null,2)+'\n');console.log(inventory);
