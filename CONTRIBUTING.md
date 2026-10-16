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
