export const skills = {
 'listening-intent':['listening','Maksud percakapan pendek',1], 'listening-paraphrase':['listening','Parafrasa',2], 'listening-implied':['listening','Ungkapan, negasi, dan makna tersirat',3], 'listening-conversation':['listening','Percakapan panjang',5], 'listening-talk':['listening','Paparan akademik singkat',7],
 'structure-core':['structure','Subjek dan kata kerja utama',1], 'structure-agreement':['structure','Subject–verb agreement',2], 'structure-clause':['structure','Frasa dan klausa',2], 'structure-connectors':['structure','Penghubung',3], 'structure-form':['structure','Bentuk kata dan parallel structure',4], 'structure-reduced':['structure','Reduced clauses',5], 'structure-inversion':['structure','Inversion',6], 'structure-error':['structure','Error identification campuran',7],
 'reading-main':['reading','Ide utama dan struktur paragraf',1], 'reading-detail':['reading','Informasi rinci',2], 'reading-reference':['reading','Rujukan kata',3], 'reading-vocabulary':['reading','Kosakata dalam konteks',4], 'reading-inference':['reading','Inferensi',5], 'reading-purpose':['reading','Tujuan dan organisasi bacaan',6], 'reading-time':['reading','Pengaturan waktu',8]
};
export function editorialDifficulty(section,skill,split,sentence=''){
 if(section==='reading')return /inference|purpose/.test(skill)||(split==='final'&&skill==='reading-main')?'sulit':'menengah';
 if(section==='listening')return skill==='listening-implied'||(split==='final'&&/talk|conversation/.test(skill))?'sulit':'menengah';
 return /inversion|reduced/.test(skill)||(split==='final'&&skill==='structure-clause')||(skill==='structure-error'&&/Only|Not until|Neither|Having|Hardly|Seldom|The more|The longer/i.test(sentence))?'sulit':'menengah';
}
export const provenance={source:'Naskah orisinal proyek Ruang TOEFL, 2026',permission:'original-project-content',reviewStatus:'editorial-draft',label:'Latihan orisinal bergaya TOEFL ITP'};
export function makeQuestion(id,section,skill,split,prompt,correct,wrong,evidence,explanation,extra={}) {
 const pairs=[[correct[0],correct[1]],...wrong];const offset=Number(id.replace(/\D/g,''))%4;
 const rotated=[...pairs.slice(offset),...pairs.slice(0,offset)];
 return {id,section,skill,split,difficulty:editorialDifficulty(section,skill,split,extra.sentence||''),prompt,options:rotated.map(x=>x[0]),answer:rotated.findIndex(x=>x===pairs[0]),rationales:rotated.map(x=>x[1]),evidence,explanation,lesson:skill,stimulus:null,...provenance,...extra};
}
