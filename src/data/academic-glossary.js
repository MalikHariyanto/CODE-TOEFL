// Curated contextual help. Everyday words intentionally have no automatic translation.
export const academicGlossary=[
 ['researcher','peneliti',['researcher','researchers']],['laboratory','laboratorium',['laboratory','laboratories']],
 ['sample','sampel; bagian yang diperiksa',['sample','samples']],['finding','temuan / hasil penelitian',['finding','findings']],
 ['indicate','menunjukkan; memberi petunjuk',['indicate','indicates','indicated']],['substantial','cukup besar; dalam contoh peningkatan, menjelaskan besarnya perubahan',['substantial']],
 ['rainfall','curah hujan',['rainfall']],['technician','teknisi',['technician','technicians']],
 ['consistent','konsisten; menunjukkan pola yang selaras',['consistent']],['equipment','peralatan; biasanya tidak terhitung',['equipment']],
 ['experiment','percobaan / eksperimen',['experiment','experiments']],['failure','kegagalan; pada equipment failure berarti kerusakan alat',['failure']],
 ['contaminated','terkontaminasi; tercampur zat yang tidak diinginkan',['contaminated']],['trial','uji coba; dalam konteks penelitian',['trial','trials']],
 ['analyze','menganalisis; memeriksa bagian atau pola',['analyze','analyzes','analyzing','analyzed']],
 ['algae','alga / ganggang',['algae']],['grant','hibah; dana bantuan untuk kegiatan seperti penelitian',['grant','grants']],
 ['data','data; kumpulan informasi hasil pengamatan',['data']],['publishing','menerbitkan / memublikasikan',['publishing']],
 ['fragile','rapuh; mudah rusak',['fragile']],['instruments','instrumen / alat ukur; dalam konteks penelitian',['instruments']],
 ['proposal','usulan / proposal',['proposal','proposals']],['concentration','konsentrasi; kadar zat dalam larutan pada konteks kimia',['concentration']],
 ['stable','stabil; keadaannya tidak mudah berubah',['stable']],['expansion','perluasan / pertumbuhan',['expansion']],
 ['evidence','bukti yang mendukung suatu penjelasan',['evidence']],['infer','menyimpulkan dari petunjuk',['infer','inferred']],
 ['hypothesis','hipotesis; dugaan yang dapat diuji',['hypothesis']],['sediment','sedimen / endapan',['sediment','sediments']],
 ['erosion','erosi; pengikisan tanah atau batuan',['erosion']],['species','spesies; kelompok jenis makhluk hidup',['species']],
 ['habitat','habitat; lingkungan hidup alami',['habitat','habitats']],['nutrients','zat gizi / unsur hara',['nutrients']],
 ['survey','survei; pengumpulan informasi secara sistematis',['survey','surveys']],['decline','penurunan / menurun; sesuai fungsi dalam kalimat',['decline','declined']],
 ['procedure','prosedur; urutan langkah kerja',['procedure','procedures']],['estimate','perkiraan / memperkirakan; sesuai fungsi dalam kalimat',['estimate','estimated']],
 ['reliable','andal; dapat dipercaya',['reliable']],['accurate','akurat; sesuai keadaan atau ukuran sebenarnya',['accurate']],
 ['although','meskipun; penghubung yang diikuti klausa',['although']],['despite','meskipun; diikuti frasa nominal atau bentuk -ing',['despite']],
 ['because of','karena; frasa yang diikuti unsur nominal',['because of']]
].map(([word,meaning,forms])=>({word,meaning,forms}));
const boundary=(text,form)=>new RegExp(`\\b${form.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`,'i').exec(text);
export function glossaryFor(text,limit=6){return academicGlossary.map(entry=>{
 const matches=entry.forms.map(form=>boundary(text,form)).filter(Boolean).sort((a,b)=>a.index-b.index);
 return matches.length?{...entry,matched:matches[0][0],index:matches[0].index}:null;
}).filter(Boolean).sort((a,b)=>a.index-b.index).slice(0,limit);}
