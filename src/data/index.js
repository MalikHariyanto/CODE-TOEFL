import {applyRefinements} from './refinements.js';
import structure from './structure.js';
import reading,{readingStimuli} from './reading.js';
import listening,{listeningStimuli} from './listening.js';
import audio from './audio-manifest.json' with {type:'json'};
export const questions=applyRefinements([...structure,...reading,...listening]);
export const stimuli=[...readingStimuli,...listeningStimuli.map(s=>({...s,...audio[s.id]}))];
export const questionById=new Map(questions.map(q=>[q.id,q]));
export const stimulusById=new Map(stimuli.map(s=>[s.id,s]));
