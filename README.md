# Ruang TOEFL

Aplikasi belajar TOEFL ITP Level 1 untuk pemakaian pribadi, berbahasa Indonesia. Materi → contoh → latihan → bukti jawaban → penguatan → tes. Seluruh soal internal adalah **latihan orisinal bergaya TOEFL ITP**, bukan soal resmi ETS. Tidak ada Speaking atau Writing iBT dalam simulasi.

## Jalankan

Diperlukan Node.js 22.12+; versi yang diuji 24.19.0 (lihat `.node-version`).

```sh
npm ci
npm run dev
```

Buka alamat yang dicetak Vite, dengan subpath `/CODE-TOEFL/`. Tidak perlu akun, backend, Python, token, atau API berbayar. Arsip MP3 sintetis sudah disertakan, tetapi dinonaktifkan secara bawaan. Materi teori tidak memerlukan audio.

Untuk hasil statis:

```sh
npm run build
npm run preview
```

Buka alamat preview dengan subpath `/CODE-TOEFL/`. Folder `dist/` berisi hasil hosting; jangan membuka `index.html` melalui `file://` karena modul dan IndexedDB membutuhkan origin HTTP yang konsisten.

## Memperbarui versi ZIP di Windows

1. Di aplikasi lama, buka **Pengaturan → Ekspor JSON** terlebih dahulu.
2. Unduh ZIP dari branch yang memuat perubahan, ekstrak ke folder baru, dan buka terminal **di folder yang berisi `package.json` dan `package-lock.json`**.
3. Jalankan `npm ci`, lalu `npm run dev`. Jangan menjalankan dua server sekaligus pada port berbeda jika ingin memakai progres origin yang sama.
4. Buka alamat yang dicetak terminal dengan `/CODE-TOEFL/`. Masuk **Materi lengkap** untuk grammar/kosakata/Structure atau **Listening: teori & sumber**.
5. Jika progres tidak tampil karena alamat/port berubah, gunakan **Pengaturan → Impor JSON** pada cadangan. Jangan menghapus profil lama sebelum memeriksa pemulihan.

Perubahan yang di-push ke GitHub tidak otomatis memperbarui folder ZIP yang sudah ada di komputer.

## Yang tersedia

- Beranda dari riwayat nyata dan jalur 8 minggu yang fleksibel. Tombol awal mengarahkan ke materi.
- **28 bab, 84 subbab, 56 cek pemahaman**: grammar dasar, Structure, kosakata, Reading, dan teori Listening. Ada tujuan belajar, fondasi, contoh dibedah, jebakan, serta jawaban cek pemahaman dengan alasan. Angka ini dihitung dari data, bukan tambahan bank soal.
- **Bank dan latihan dari materi: paket 10–20 soal**, dengan pilihan sasaran 10, 15, atau 20. Jumlah aktual dicetak pada kartu; bacaan/audio tetap utuh dan soal tidak digandakan untuk memenuhi jumlah. Structure dikelompokkan per topik.
- Setiap kartu menampilkan pratinjau dan ID soal pertama dari paket yang benar-benar akan dibuka. Paket dalam satu tampilan tidak tumpang tindih. Mengubah filter/ukuran dapat menyusun ulang soal; gunakan filter belum dikerjakan untuk menghindari soal lama.
- Memilih paket berbeda saat latihan belum selesai meminta konfirmasi: latihan lama disimpan ke Perkembangan lalu paket baru dibuka dari nomor 1. Membatalkan tetap di bank; melanjutkan paket yang sama mempertahankan nomor dan jawaban. Sesi lama satu soal diberi penjelasan dan tombol beralih ke paket baru.
- Bila filter sangat sempit belum dapat menghasilkan 10 soal dalam konteks utuh, aplikasi menjelaskan kekurangan dan menawarkan perluasan filter. Soal pendamping dari bacaan/audio dihitung terpisah dari soal yang cocok filter.
- Latihan materi/penguatan mendahulukan paket dengan soal belum dikerjakan paling banyak; setelah bank topik habis, soal lama dapat muncul kembali.
- Pembahasan menyorot **alasan pilihan pengguna**, alasan kunci, empat opsi, bukti, dan strategi terkait. Pada error identification, label memperjelas bagian yang harus diperbaiki.
- 600 soal: 240 Structure, 180 Listening, 180 Reading. Pembahasan berbahasa Indonesia menyertakan kunci, alasan keempat pilihan, konsep, dan bukti.
- 36 bacaan, 109 rekaman stimulus, satu rekaman cek suara, serta 100 entri kamus lokal. Audio sintetis eSpeak NG; bukan rekaman penutur manusia.
- Filter bagian, topik, kesulitan, soal baru, pernah salah, dan penanda. Soal berbagi konteks selalu dibuka sebagai satu kelompok.
- Pilihan “yakin”/“masih menebak”, catatan penyebab kesalahan menurut pengguna, dan catatan pribadi.
- Kamus melalui pencarian, seleksi kata pada materi, atau tombol pencarian yang dapat diakses keyboard. Kata tak tersedia ditandai jujur, dapat diberi catatan, atau dicari melalui tautan eksternal.
- Kosakata per tema: 5 kelompok berisi 50 entri dari 100 kata kamus, lengkap dengan contoh dan tombol simpan.
- Flashcard: ingat → 1, 3, 7, 14 hari; belum ingat → 1 hari. Aturan sederhana, bukan pengukuran ingatan terkalibrasi.
- Tes singkat dan tes per bagian Structure/Reading aktif tanpa audio. Diagnostik 30 soal, tes Listening/campuran, dan simulasi akhir 140 soal memakai **arsip sintetis opsional**; tidak tersedia sebagai paket rekaman manusia. Paket akhir memakai stimulus tersendiri.
- Jalur Listening teori dan tautan penerbit ETS/ELLLO/Randall, dengan petunjuk belajar dan catatan pribadi yang tersimpan/ikut cadangan. Audio dan kuis eksternal dibuka di situs asal; pemutar eksternal belum diuji dari lingkungan pengembangan.
- IndexedDB, cadangan JSON tervalidasi, migrasi skema, tema terang/gelap, serta layout laptop/HP.

## Paket dan waktu

| Dataset | Structure | Listening | Reading | Total |
| --- | ---: | ---: | ---: | ---: |
| Diagnostik | 10 | 10 | 10 | 30 |
| Latihan | 190 | 120 | 120 | 430 |
| Akhir | 40 | 50 | 50 | 140 |

Simulasi: Listening 50 soal/35 menit → Structure 40/25 menit → Reading 50/55 menit; total maksimum 115 menit. Structure akhir berisi 15 completion + 25 error identification. Listening akhir: 30 percakapan pendek, 2 percakapan panjang (8 soal), dan 3 paparan (12 soal). Rekaman akhir total **1.279,951 detik ≈ 21 menit 20 detik**, menyisakan sekitar 13 menit 40 detik untuk membaca/menjawab dan transisi. Ini paket mandiri, bukan peniruan kecepatan administrasi resmi.

Pengguna memulai rekaman secara berurutan. Setiap stimulus hanya sekali diputar dalam tes; tidak ada pengulangan bebas, perubahan kecepatan, kamus, transkrip, atau pembahasan selama tes. Pada kelompok panjang, pertanyaan ditampilkan berurutan setelah rekaman bersama; Part A juga menyuarakan pertanyaan. Di mode belajar tersedia ulang dan kecepatan; transkrip dibuka setelah menjawab.

Timer memakai tenggat waktu absolut, bukan hitungan interval yang bisa melambat ketika tab tidak aktif. Refresh memulihkan jawaban dan waktu; tidak ada jeda biasa. Bila tab tertidur melampaui beberapa bagian, semua bagian yang lewat dikunci. Bagian dapat diselesaikan lebih awal untuk belajar mandiri. Sesi audio yang gagal dimuat atau dipulihkan di tengah pemutaran ditandai **terganggu**, tidak dianggap tes lengkap, dan dikeluarkan dari rekomendasi serta perbandingan progres.

Diagnostik hanyalah pemetaan awal. Rekomendasi mengelompokkan respons tes valid terbaru (maksimal 300) per topik dan mengurutkan proporsi kesalahan; kurang dari 5 respons diberi peringatan bukti sedikit. Tidak ada AI adaptif atau konversi ke skor TOEFL 310–677.

## Data pribadi

Satu profil lokal pada origin browser yang sama. Tidak dikirim ke server. Membuka port atau domain lain menghasilkan ruang penyimpanan lain. Menghapus data browser dapat menghapus seluruh progres: ekspor secara berkala melalui Pengaturan. Impor mengganti profil setelah validasi dan konfirmasi.

- `src/core/storage.js`: database IndexedDB versi 3, satu dokumen profil dalam store `state`.
- `src/core/engine.js`: skema profil versi 3, validasi dan migrasi v1/v2 → v3 dengan nilai awal bidang tambahan.
- Catatan eksternal disimpan dalam `listeningStudies`, terpisah dari `attempts` dan akurasi tes. Preferensi `syntheticAudio` default false; progres lama dipertahankan. Sesi Listening lama diberi status terganggu bila arsip dinonaktifkan; jawaban dan tenggat tetap tersimpan.
- Isian cek pemahaman materi hanya refleksi sementara, tidak disimpan dan tidak menghasilkan skor.
- `src/core/session.js`: sesi, durasi, penguncian bagian, dan penilaian idempoten (sesi sama tidak dinilai dua kali).
- Soal yang belum dibuka tetap kosong pada hasil tes, tetapi tidak menandai soal tersebut sebagai sudah dipelajari.
- Perbandingan membedakan pertama/pengulangan dan mode belajar/tes. Kedua pengelompokan ini adalah dimensi berbeda, sehingga tidak boleh dijumlahkan sebagai empat kelompok terpisah.
- Waktu per soal mencakup waktu sampai berpindah soal, termasuk tab tidak aktif. Unvisited berwaktu nol. Ini bukan pengukuran waktu kognitif.
- Web Locks membatasi satu tab penulis per origin untuk mencegah penimpaan; fallback browser tanpa Web Locks tidak menjamin perlindungan dua tab.

## Pengujian

```sh
npm test
npm run content:check
npm run build
npm run test:browser
npm audit
npm run inventory
```

Uji browser memakai build produksi di `/CODE-TOEFL/`, bukan sekadar server pengembangan. Jika Chromium belum tersedia:

```sh
npx playwright install chromium
```

Di Linux yang sudah memiliki `/usr/bin/chromium`, konfigurasi menggunakannya. Lokasi lain dapat ditetapkan melalui `TOEFL_CHROMIUM`. Di CI Linux gunakan `npx playwright install --with-deps chromium`.

Lihat [hasil verifikasi](docs/VERIFICATION.md), [inventaris mesin](docs/inventory.json), dan [catatan kualitas](docs/CONTENT_REVIEW.md). Pemeriksaan program tidak membuktikan setiap kunci atau inferensi benar secara bahasa.

## Struktur dan pengembangan konten

```text
src/app.js                 tampilan, navigasi, interaksi
src/style.css              tema dan responsivitas
src/core/                  penyimpanan, penilaian, sesi, aturan ulang
src/data/catalog.js        keterampilan dan bentuk metadata soal
src/data/structure.js       kalimat dan soal Structure
src/data/reading.js         bacaan dan pertanyaan Reading
src/data/listening.js       naskah dan pertanyaan Listening
src/data/*refinements.js    revisi pengecoh dari peninjauan kedua
src/data/lessons.js         jalur dan metadata materi
src/data/course.js          28 bab, contoh, cek pemahaman
src/data/vocabulary-topics.js kelompok kosakata
src/data/listening-sources.js katalog tautan penerbit
src/views/listening.js      alur teori dan catatan eksternal
src/data/dictionary.js      kamus dan alias bentuk kata
src/data/audio-manifest.json hash, durasi, suara, status audio
public/audio/              arsip MP3 sintetis opsional
scripts/                   produksi audio, validasi, inventaris
```

Petunjuk penambahan ada di [CONTRIBUTING.md](CONTRIBUTING.md). Jangan mengedit kunci untuk menyesuaikan hasil uji. Perubahan ID setelah digunakan dapat memutus cadangan; lakukan migrasi eksplisit jika diperlukan.

## GitHub Pages

Base Vite sudah `/CODE-TOEFL/`. Workflow `checks.yml` menjalankan pemeriksaan pada push/PR. Workflow `pages.yml` hanya dapat dijalankan manual; tidak otomatis menerbitkan website ketika kode di-push.

Untuk menerbitkan sendiri, pilih sumber **GitHub Actions** di Settings → Pages, kemudian jalankan workflow **Publikasikan GitHub Pages (manual)** dari branch yang diinginkan. Verifikasi hasil deployment di GitHub sebelum membagikan URL. Mengunggah kode bukan bukti website telah online.

## Sumber, hak penggunaan, dan batasan

Lihat [SOURCES.md](docs/SOURCES.md), [CONTENT-LICENSE.md](CONTENT-LICENSE.md), dan [LICENSE](LICENSE). Tidak ada materi ETS atau penyedia lain yang disalin massal. Lampiran AES bukan sumber aplikasi dan tidak disertakan.

**Batasan nyata:** format publik, persiapan, dan ketentuan izin ETS diperiksa langsung 16 Oktober 2026. Ini bukan akses soal tes aktif terbaru. Beranda/katalog ELLLO berhasil dibaca; pemutarnya belum diuji. Pemutar contoh ETS dan situs Randall diblokir jaringan; tidak ada rekaman manusia yang diunduh atau diganti di dalam aplikasi. Konten belum ditinjau ahli independen atau diuji empiris. Audit kedua penyusun mencakup sampel 140 soal; 460 lainnya masih draf editorial. Suara sintetis mekanis dan belum diaudit pengucapannya satu per satu oleh manusia. Tidak ada terjemahan bebas kalimat, sinkronisasi lintas perangkat, service worker untuk jaminan offline, atau keamanan ujian terawasi; aset statis tetap dapat diperiksa dari sumber browser.
