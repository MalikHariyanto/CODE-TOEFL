# Verifikasi implementasi

Lingkungan: Linux x86_64, Node.js 24.19.0, npm 11.9.0, Vite 7.3.7, Playwright 1.61.1, Chromium sistem. Tanggal sesi: 16–17 Oktober 2026. Laporan ini membedakan pengujian perangkat lunak dari peninjauan bahasa.

## Pemeriksaan yang dijalankan

| Pemeriksaan | Hasil yang diamati |
| --- | --- |
| `npm ci` dengan lockfile | Berhasil; dependency dapat dipasang ulang |
| `npm run content:check` | 600 soal, 36 bacaan, 109 stimulus audio; rujukan, bukti, checksum, dan pemisahan set valid |
| `npm test` | 30 pengujian Node lulus; tidak ada gagal atau dilewati |
| `npm run test:browser` | 26 pengujian Chromium terhadap build produksi subpath lulus; tidak ada dilewati |
| `npm run build` | Berhasil; berkas statis di `dist/`, base `/CODE-TOEFL/` |
| `npm audit` setelah pembaruan | Tidak ada kerentanan yang dilaporkan registry pada versi yang diuji |
| Produksi audio | 109 stimulus + 1 cek suara dibuat, metadata durasi/hash tersimpan; pengulangan generator memakai ulang naskah yang sama |
| GitHub Pages | Hanya workflow manual disiapkan; deployment tidak dijalankan atau diverifikasi |
| Halaman ETS | Format, persiapan, dan izin berhasil HTTPS HTTP 200; tabel Level 1 dikonfirmasi 16 Oktober 2026 |
| Sumber Listening eksternal | Beranda dan katalog B1 ELLLO berhasil HTTP 200; pemutar ELLLO belum diuji. Target pemutar ETS dan Randall 403. Tidak ada media manusia lokal |

## Unit dan penyimpanan (30)

Penilaian benar/salah/kosong dan input di luar rentang; tenggat absolut; perpindahan bagian ketika tab tertidur lama; submit idempoten; validasi/migrasi cadangan; interval kosakata 1/3/7/14; normalisasi kata; rekomendasi dengan bukti sedikit; kelompok konteks; sampel fondasi 60 soal; jumlah dataset dan komposisi Structure akhir; pencatatan waktu soal kosong dan pembatasan tenggat; penolakan hasil/durasi rusak; soal tak dibuka tidak dianggap dipelajari; hasil audio terganggu tidak direkomendasikan; round-trip IndexedDB dan JSON; upgrade database versi 1 tanpa menghapus kosakata. Tambahan: kelengkapan struktur 28 bab/84 subbab/56 cek (bukan validasi kebenaran bahasa), migrasi profil v1/v2 ke v3 dengan Listening default nonaktif, URL/catatan eksternal tervalidasi, latihan 10–20 soal dan konteks utuh serta penguatan baru, round-trip catatan melalui IndexedDB versi 2→3/JSON, pemeliharaan durasi jawaban lama tanpa questionTimes; serta mapping semua 28 bab ke paket latihan yang tersedia.

## Browser produksi (26)

1. Seluruh 110 MP3 diambil dari subpath, didekode oleh AudioContext, dibandingkan durasinya, dan diperiksa peak/RMS agar bukan rekaman kosong.
2. Setelah opt-in arsip sintetis melalui Pengaturan: diagnostik 30 soal → hasil dan rekomendasi → materi → latihan → pembahasan → kosakata → refresh → kosakata tetap ada → tes singkat → jawaban pulih setelah refresh → hasil.
3. Tenggat tes singkat diubah oleh harness menjadi lewat; refresh menghasilkan auto-submit satu kali, lalu refresh lagi tidak menambah sesi.
4. HP 390×844, tidak ada overflow halaman, tombol skip mendapat fokus keyboard, tema gelap, kamus kata tidak dikenal, dan catatan pribadi persisten.
5. Setelah opt-in arsip sintetis: paket akhir 140 soal melewati seluruh 35 rekaman stimulus, 50/40/50 soal, penguncian bagian, penilaian 140 benar pada input kunci, dan tepat 140 percobaan tersimpan.
6. Pemblokiran satu MP3 secara sengaja menghasilkan pesan audio gagal dan hasil terganggu.
7. Ekspor JSON nyata melalui download, penolakan versi skema tidak dikenal, impor cadangan valid, dan data tetap ada setelah refresh.
8. Bank tidak menampilkan ID final; filter topik Reading membuka paket minimal 10 soal dengan seluruh soal tiap konteks.
9. Tab kedua ditolak sebagai penulis profil.
10. Penanda, keyakinan menebak, catatan penyebab kesalahan, dan catatan pribadi bertahan setelah refresh.
11. Default teori memblokir simulasi sintetis tanpa memuat MP3; tiga tautan sumber tampil. Catatan eksternal tersimpan, dipulihkan setelah refresh, serta ikut ekspor–impor tanpa menjadi percobaan tes.
12. Pencarian bab, tiga subbab, dua cek pemahaman, pembukaan jawaban beralasan, latihan sepuluh soal, pembahasan pengecoh terpilih, dan penguatan soal baru.
13. Tema kosakata menyimpan entri kamus nyata dan memulihkannya sebagai flashcard setelah refresh.
14. Halaman materi/Listening HP tidak overflow; tema gelap dan perpindahan fokus keyboard antarisian berjalan.
15. Database versi 2 berisi sesi Listening lama ditingkatkan menjadi versi 3; pilihan, keyakinan, materi selesai, dan durasi jawaban dipertahankan. Tidak memuat audio robot; pengguna dapat mengakhirinya dengan status terganggu.
16. Error identification membedakan bagian yang harus diperbaiki dan tiga bagian yang sudah benar.
17. Seluruh delapan bab fondasi/kosakata tambahan dibuka dari perpustakaan dan tombolnya menjalankan paket latihan sesuai topik; tiap paket 10–20 soal dengan konteks utuh.

Pemutaran pada uji alur dipercepat dengan seek oleh harness setelah browser benar-benar memuat MP3. Tidak ada klaim bahwa asisten mendengarkan seluruh rekaman atau menjalankan simulasi selama 115 menit waktu nyata. Pemajuan waktu/tenggat adalah metode pengujian, bukan fitur bantuan yang diberikan dalam UI tes.

## Peninjauan visual dan bahasa

Beranda desktop dan HP serta materi panjang desktop 1280×720 dan HP 390×844 diperiksa melalui screenshot; tema gelap dan fokus skip diperiksa browser. Seluruh halaman menggunakan kontrol native berlabel dan fokus terlihat; pilihan menampilkan radio, huruf, serta tanda benar/salah, sehingga tidak mengandalkan warna. Ini bukan audit WCAG lengkap dengan pembaca layar, bukan uji semua kombinasi browser/HP, dan tidak mengklaimnya demikian.

Peninjauan konten terpisah tercatat di `CONTENT_REVIEW.md`: putaran kedua pada 140 soal oleh penyusun, bukan ahli independen; 460 masih draf editorial. Lulus test key yang dikodekan hanya membuktikan algoritme memakai kunci tersebut, bukan bahwa kuncinya benar secara linguistik.

## Temuan yang diperbaiki

Percobaan awal menemukan stylesheet import yang tidak diperlukan, impor JSON Node tanpa atribut, dan pemeriksaan UI yang terlalu cepat sebelum penyimpanan selesai. Stylesheet dan impor dibetulkan; UI menampilkan status menyimpan dan memperingatkan refresh saat tulis belum selesai, serta test menunggu perubahan yang benar-benar persisten. Selector uji filter disesuaikan dengan nama kontrol aksesibilitas. Countdown awal yang berpotensi memberi waktu baru setelah tab tertidur diubah menjadi rangkaian tenggat absolut. Vite dan esbuild diperbarui setelah audit dependency.

Kegagalan awal tersebut tidak dicatat sebagai lulus; pemeriksaan terdampak dijalankan ulang. Seluruh hasil lulus di atas merujuk rangkaian akhir, bukan hasil pertama.

## Temuan pada perluasan materi

Dua selector pengujian awal menjadi ambigu setelah tema kosakata ditambahkan dan diperbaiki agar menunjuk kontrol/area yang benar. Pengujian migrasi semula membuat paket dengan urutan berbeda dari diagnostik sebenarnya; seed disesuaikan ke Listening–Structure–Reading. Pemeriksaan lanjut menemukan durasi lama dapat kembali nol ketika `questionTimes` belum terisi: `recordQuestionTime` kini mempertahankan elapsed jawaban lama. Pengujian regresi khusus ditambahkan. Pada revisi perluasan materi, 24/24 Node dan 17/17 browser lulus; pemeriksaan bank terbaru dijelaskan di bawah.

Build produksi lulus dengan peringatan Vite bahwa satu bundle JavaScript melebihi 500 kB. Ini belum dioptimalkan dengan pemecahan bundle. Arsip MP3 sekitar 17 MiB tetap berada dalam repository untuk kompatibilitas, tetapi tidak dimuat oleh alur default teori. Tidak ada tambahan unduhan audio penerbit. Pengujian browser tidak memutar atau menilai kualitas rekaman manusia di situs eksternal.

Pemeriksaan tambahan menemukan `practiceSkill` bab fondasi tertimpa nilai undefined saat penggabungan objek materi. Penggabungan diperbaiki; bab pengaturan waktu memakai latihan Reading rinci. Pengujian baru memeriksa mapping seluruh 28 bab dan menjalankan tombol latihan pada kedelapan bab tambahan melalui browser. Hasil revisi tersebut adalah 24/24 Node dan 17/17 browser sebelum perluasan regresi Bank Latihan berikut.


## Perbaikan Bank Latihan: paket dan sesi tersimpan

Bug direproduksi di browser pada kode sebelum perubahan: kartu S011 berpratinjau kalimat orchard, kartu S012 kalimat translating records; setelah membuka S011 dan memilih S012 tanpa menutup latihan, aplikasi tetap membuka S011 dengan sesi satu soal. Penyebabnya guard `startSession` yang selalu mengarahkan kembali ke sesi lama. Ini bukan bukti seluruh naskah bank identik.

Perbaikan menyatukan data pratinjau dan tombol pada objek paket. Paket 10–20 soal mempertahankan seluruh konteks, tanpa duplikat dalam satu tampilan. Structure dipisah per topik; soal pendamping satu stimulus dicatat terpisah dari kecocokan filter. Sasaran 10/15/20 dapat menghasilkan jumlah aktual berbeda dalam rentang 10–20 agar sisa tidak terlalu pendek. Memilih paket berbeda menyimpan/menutup latihan lama setelah konfirmasi; membatalkan tetap di bank. Paket yang sama dilanjutkan dengan nomor dan jawaban sebelumnya. Sesi satu soal dari versi lama dijelaskan dan dapat dialihkan tanpa kehilangan jawaban.

Tambahan **6 tes Node**: seluruh 430 soal latihan terpaket unik dan utuh untuk tiga ukuran; kartu Structure disjoint dan deteksi paket sama; filter Reading serta soal pendamping; filter satu soal tidak dipalsukan menjadi 10; pembagian sisa tanpa potong konteks; pemilihan paket baru dan penolakan ukuran yang tidak didukung. Seluruh 28 bab tetap memiliki paket praktik 10–20 yang sesuai. Jumlah konten tetap 600; tidak menambah soal untuk mengejar ukuran sesi.

Tambahan **7 tes browser** (nomor 18–24 dari total 24):

18. Kartu berbeda membuka soal pertama sesuai pratinjau; pembatalan tidak mengubah sesi; konfirmasi menyimpan jawaban lama dan membuka paket terpilih tanpa tumpang tindih. Refresh mempertahankan paket baru.
19. Sepuluh soal unik dijawab, dibahas, dan dinilai menjadi 10/10; filter belum dikerjakan membuka paket berikutnya.
20. Melanjutkan paket yang sama mempertahankan soal nomor 2 dan jawabannya.
21. Pilihan 20 soal Structure dan 15 Reading dibuka dengan jumlah aktual yang tepat pada kasus uji; semua soal Reading satu stimulus tetap utuh.
22. Satu penanda tidak menghasilkan sesi satu soal; kondisi belum cukup dan tombol perluasan filter berfungsi.
23. Pemilih ukuran dapat difokuskan dengan keyboard; bank dan pratinjau tidak overflow pada HP 390×844, screenshot desktop 1440×1000 juga diperiksa.
24. Profil lama dengan sesi satu soal menampilkan penjelasan pembaruan dan dapat beralih ke paket 10 soal, dengan pilihan lama tetap tersimpan.

**Hasil akhir revisi bank: 30/30 Node dan 24/24 Chromium lulus, tanpa gagal atau dilewati.** Build produksi dijalankan oleh suite browser dan lulus; validasi 600 soal tetap lulus. Peringatan bundle Vite >500 kB tetap ada. Uji ini memverifikasi penautan, partisi, interaksi, dan penilaian; tidak menambah cakupan audit bahasa independen.


## Dukungan deployment Vercel (17 Oktober 2026)

Konfigurasi lama menetapkan base `/CODE-TOEFL/` untuk semua build, sedangkan hosting Vercel root memerlukan `/`. Ini ketidaksesuaian nyata pada konfigurasi, tetapi penyebab tepat deployment pengguna belum dikonfirmasi langsung: permintaan HTTPS ke `https://belajar-toefl-two.vercel.app/` ditolak tunnel proxy 403. Tidak ada klaim situs live tersebut telah dibuka, diperbaiki di akun Vercel, atau dipublikasikan ulang.

`vercel.json` kini menentukan framework Vite, instalasi `npm ci`, build `npm run build:vercel`, dan output `dist`. Perintah build khusus memvalidasi konten dan memaksa base `/` melalui CLI Vite, termasuk ketika variabel `VERCEL` tidak tersedia. `vite.config.js` juga mengenali `VERCEL=1`; build standar tetap `/CODE-TOEFL/`. Tidak menambah rewrite catch-all karena navigasi aplikasi tidak memerlukan rute server baru.

Dua kasus browser deployment dijalankan pada **kedua base**: JavaScript/CSS mendapat HTTP 200 dan tipe konten sesuai, halaman benar-benar selesai boot, kamus dapat menyimpan data dan memulihkannya setelah refresh; MP3 pemeriksaan suara dirujuk pada base yang tepat dan dikembalikan sebagai audio. Hasil: **30/30 Node**, **26/26 browser pada subpath**, serta **2/2 smoke browser tambahan pada root Vercel** lulus. Kedua build berhasil. Build `npm run build:vercel` juga dijalankan tanpa env VERCEL, dan referensi JS/CSS dalam HTML hasilnya dipastikan memakai `/assets/`. Workflow CI menambah pemeriksaan root tersebut setelah suite subpath.

Angka 26 mencakup dua kasus deployment pada subpath (25–26 dalam cakupan keseluruhan); angka 2 adalah pengulangan kasus yang sama pada konfigurasi root berbeda, bukan dua fitur konten baru. Peringatan bundle >500 kB tetap ada. Publikasi Vercel Production memerlukan proyek pengguna mengambil commit baru dan pengaturan root/build/output yang sesuai; belum dikerjakan atau diverifikasi dari lingkungan ini.
