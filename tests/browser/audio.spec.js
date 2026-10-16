import {test,expect} from '@playwright/test';
import {stimuli} from '../../src/data/index.js';
test('all question recordings and sound check are present, decodable, and non-silent',async({page})=>{
 await page.goto('./');const files=stimuli.filter(s=>s.type==='listening').map(s=>({id:s.id,file:s.audio,duration:s.duration}));files.push({id:'CHECK',file:'audio/check.mp3'});
 const result=await page.evaluate(async files=>{const context=new AudioContext(),out=[];for(let i=0;i<files.length;i+=6){out.push(...await Promise.all(files.slice(i,i+6).map(async s=>{const r=await fetch('/CODE-TOEFL/'+s.file);if(!r.ok)throw Error(s.id+' HTTP '+r.status);const b=await context.decodeAudioData(await r.arrayBuffer());const channel=b.getChannelData(0);let peak=0,energy=0;for(const x of channel){peak=Math.max(peak,Math.abs(x));energy+=x*x;}return {id:s.id,duration:b.duration,expected:s.duration,peak,rms:Math.sqrt(energy/channel.length)};})));}await context.close();return out;},files);
 expect(result.length).toBe(110);for(const r of result){expect(r.duration).toBeGreaterThan(1);expect(r.peak,r.id).toBeGreaterThan(.05);expect(r.rms,r.id).toBeGreaterThan(.005);if(r.expected)expect(Math.abs(r.duration-r.expected),r.id).toBeLessThan(.2);}
});
