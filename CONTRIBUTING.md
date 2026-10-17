# Menambah materi dan soal

Gunakan konten orisinal atau konten dengan izin yang dapat dibuktikan. Jangan menyalin soal resmi ETS atau mengganti beberapa kata untuk menyamarkan asal.

## Soal

Setiap soal harus memiliki `id`, `section`, `skill`, `difficulty`, `stimulus` (atau null untuk Structure), `prompt`, empat `options`, `answer` berupa indeks 0–3, empat `rationales`, `explanation`, `evidence`, `lesson`, `source`, `permission`, `reviewStatus`, dan `split`.

- Penjelasan/rationale bahasa Indonesia; stimulus, kalimat, opsi, dan pertanyaan bahasa Inggris.
- Satu jawaban terbaik, tiga pengecoh yang masuk akal. Pengecoh tidak boleh juga benar di bawah pembacaan wajar.
- `makeQuestion` merotasi pilihan secara deterministik sambil menjaga kunci dan alasan. Jangan mengira pilihan pertama selalu benar di hasil akhir.
- `g` dalam `structure.js` membuat completion; `e` membuat satu kesalahan di antara empat rentang kalimat yang persis sesuai teks. Rentang disorot dengan label A–D.
- `passage` dalam `reading.js` membuat bacaan dan kelompok soal. Letakkan kutipan bukti yang benar-benar ada, gunakan elipsis jika memotong.
- `listen`/`short` dalam `listening.js` membuat naskah dan kelompok. Satu stimulus harus milik satu dataset; jangan membagikannya antara diagnostik, latihan, dan akhir.
- `refinements.js` menimpa hanya pengecoh dari peninjauan ulang. Hapus atau perbarui entri itu bila menyunting soal yang sama, agar perubahan dasar tidak tertimpa.
- Label kesulitan awal menggunakan pertimbangan keterampilan (misalnya inferensi, inversi, integrasi percakapan). Tinjau label secara editorial; belum ada kalibrasi statistik.

**Penting:** pembagian Structure pada helper awal mengikuti nomor urut (1–10 diagnostik, 11–200 latihan, 201–240 akhir). Untuk memperluasnya, ubah helper menjadi split eksplisit atau set split dengan sengaja, lalu perbarui tes inventaris. Jangan sekadar menambah kalimat dan menganggapnya latihan. Reading/Listening memiliki parameter split eksplisit. Jangan mengubah ID konten yang sudah dipakai pengguna tanpa migrasi.

Materi ada di `lessons.js`, terhubung lewat ID keterampilan. `reading-time` menggunakan latihan bagian Reading sebagai penerapan pengaturan waktu. Penguatan memilih kelompok yang belum dikerjakan, atau kelompok terakhir bila semuanya pernah dikerjakan.

## Kamus

Tambahkan entri `word|pos|meaning|example|note` di `dictionary.js`. Alias bentuk kata bersifat eksplisit; tidak ada tebakan arti otomatis. Contoh kamus harus independen dari soal final. Coba pencarian dengan kapitalisasi dan tanda baca. Jangan menaruh pemanggilan API berbayar atau secret di frontend.

## Audio

MP3 sudah ada; produksi ulang hanya diperlukan saat naskah berubah. Linux x86_64, Python 3, dan ffmpeg/ffprobe diperlukan untuk generator saat ini.

```sh
python3 -m pip install --target /workspace/.toefl-tools espeakng-loader==0.2.4
npm run audio:build
```

Untuk lokasi lain, instal modul di Python aktif atau gunakan direktori alat lewat `TOEFL_TOOLS`. Generator memakai library eSpeak NG lokal, suara `en-us+m3`, `en-us+f3`, `en-us`, dan narator `en-us+m1`. Naskah asli, pertanyaan Part A, checksum MP3, durasi, dan status `ready` dicatat. Rekaman yang sudah sesuai hash naskah dipakai ulang. Jangan menandai rekaman siap sebelum berkas dan durasinya benar-benar ada.

```sh
npm run content:check
node scripts/write-inventory.mjs
npm test
npm run test:browser
```

Validator memeriksa ID, pilihan, kunci, pembahasan, pelajaran, kutipan bukti, pemisahan stimulus, hash naskah dan MP3. Pemeriksaan audio browser mengecek decode dan energi suara, bukan ketepatan setiap pengucapan. Dengarkan rekaman baru dan tinjau bahasa secara terpisah sebelum menyebutnya tervalidasi linguistik.

Simpan catatan revisi, sumber, tanggal, dan cakupan peninjauan. Jangan memakai cache, `node_modules/`, cadangan profil, atau lampiran pribadi dalam commit.

## Bab materi dan sumber Listening

`src/data/course.js` berisi uraian lanjut per ID keterampilan (`course`) dan delapan bab fondasi/kosakata (`foundations`). Setiap bab punya tujuan (`goals`), tiga subbab (`parts`: heading, text, example, analysis), jebakan (`pitfalls`), serta dua cek pemahaman (`checks`: prompt, answer, why). `src/data/lessons.js` menggabungkan katalog dan metadata sumber. Uraian Bahasa Indonesia, contoh Bahasa Inggris. Tautan ETS adalah acuan ruang lingkup format, bukan sumber salinan penjelasan. Periksa akurasi penggunaan dan pengecualian grammar secara terpisah dari lulus skema.

`practiceSkill` menghubungkan bab tambahan ke bank latihan yang sesuai. `src/core/practice.js` menyusun paket 10–20 soal dengan sasaran pilihan 10/15/20. Kelompok stimulus dipulihkan setelah pencocokan topik/riwayat. Partisi mengutamakan cakupan seluruh soal kemudian kedekatan ukuran; sisa tidak diisi duplikat dan konteks tidak dipotong. Filter terlalu sempit menghasilkan kondisi belum cukup soal, bukan sesi tunggal. `lessonBundle` memilih paket dengan soal belum pernah dikerjakan terbanyak. Pratinjau dan handler bank memakai objek paket yang sama. `samePractice` membedakan lanjut paket tersimpan dan perpindahan paket yang perlu menyimpan/menutup latihan lama. Jangan memakai soal final sebagai contoh materi.

Tema kosakata ada di `src/data/vocabulary-topics.js`; semua kata harus ada dalam `dictionary.js`. Tema mengatur entri yang sudah ada, tidak menambah jumlah kamus secara fiktif. Cek pemahaman bukan soal pilihan ganda dan tidak dimasukkan ke inventaris 600 soal.

Tautan penerbit di `src/data/listening-sources.js` tidak memberi izin mengunduh atau mereproduksi audio/soal. Catat status verifikasi apa adanya. Jangan menghubungkan rekaman manusia yang tidak terkait dengan pertanyaan sintetis lama. Bila menambah penerbit, sesuaikan validasi URL, sumber/izin, dan pengujian; jangan mengizinkan protokol JavaScript/data. Audio sintetis tetap berlabel dan opt-in.

Skema 3 menambah `listeningStudies` dan preferensi `syntheticAudio:false`. Cadangan skema 1–2 dimigrasikan tanpa menghapus progres. Jangan menurunkan nomor versi IndexedDB setelah pengguna membuka versi 3; versi aplikasi lama tidak dapat membuka database versi lebih baru pada origin yang sama.
