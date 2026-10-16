# Verifikasi implementasi

Lingkungan: Linux x86_64, Node.js 24.19.0, npm 11.9.0, Vite 7.3.7, Playwright 1.61.1, Chromium sistem. Tanggal sesi: 16 Oktober 2026. Laporan ini membedakan pengujian perangkat lunak dari peninjauan bahasa.

## Pemeriksaan yang dijalankan

| Pemeriksaan | Hasil yang diamati |
| --- | --- |
| `npm ci` dengan lockfile | Berhasil; dependency dapat dipasang ulang |
| `npm run content:check` | 600 soal, 36 bacaan, 109 stimulus audio; rujukan, bukti, checksum, dan pemisahan set valid |
| `npm test` | 17 pengujian Node lulus; tidak ada gagal atau dilewati |
| `npm run test:browser` | 10 pengujian Chromium terhadap build produksi lulus; tidak ada dilewati |
| `npm run build` | Berhasil; berkas statis di `dist/`, base `/CODE-TOEFL/` |
| `npm audit` setelah pembaruan | Tidak ada kerentanan yang dilaporkan registry pada versi yang diuji |
| Produksi audio | 109 stimulus + 1 cek suara dibuat, metadata durasi/hash tersimpan; pengulangan generator memakai ulang naskah yang sama |
| GitHub Pages | Hanya workflow manual disiapkan; deployment tidak dijalankan atau diverifikasi |
| Halaman ETS | Permintaan ditolak proxy HTTP 403; verifikasi langsung belum selesai |

## Unit dan penyimpanan (17)

Penilaian benar/salah/kosong dan input di luar rentang; tenggat absolut; perpindahan bagian ketika tab tertidur lama; submit idempoten; validasi/migrasi cadangan; interval kosakata 1/3/7/14; normalisasi kata; rekomendasi dengan bukti sedikit; kelompok konteks; sampel fondasi 60 soal; jumlah dataset dan komposisi Structure akhir; pencatatan waktu soal kosong dan pembatasan tenggat; penolakan hasil/durasi rusak; soal tak dibuka tidak dianggap dipelajari; hasil audio terganggu tidak direkomendasikan; round-trip IndexedDB dan JSON; upgrade database versi 1 tanpa menghapus kosakata.

## Browser produksi (10)

1. Seluruh 110 MP3 diambil dari subpath, didekode oleh AudioContext, dibandingkan durasinya, dan diperiksa peak/RMS agar bukan rekaman kosong.
2. Diagnostik 30 soal → hasil dan rekomendasi → materi → latihan → pembahasan → kosakata → refresh → kosakata tetap ada → tes singkat → jawaban pulih setelah refresh → hasil.
3. Tenggat tes singkat diubah oleh harness menjadi lewat; refresh menghasilkan auto-submit satu kali, lalu refresh lagi tidak menambah sesi.
4. HP 390×844, tidak ada overflow halaman, tombol skip mendapat fokus keyboard, tema gelap, kamus kata tidak dikenal, dan catatan pribadi persisten.
5. Paket akhir 140 soal melewati seluruh 35 rekaman stimulus, 50/40/50 soal, penguncian bagian, penilaian 140 benar pada input kunci, dan tepat 140 percobaan tersimpan.
6. Pemblokiran satu MP3 secara sengaja menghasilkan pesan audio gagal dan hasil terganggu.
7. Ekspor JSON nyata melalui download, penolakan versi skema tidak dikenal, impor cadangan valid, dan data tetap ada setelah refresh.
8. Bank tidak menampilkan ID final; filter topik Reading membuka seluruh lima soal konteks.
9. Tab kedua ditolak sebagai penulis profil.
10. Penanda, keyakinan menebak, catatan penyebab kesalahan, dan catatan pribadi bertahan setelah refresh.

Pemutaran pada uji alur dipercepat dengan seek oleh harness setelah browser benar-benar memuat MP3. Tidak ada klaim bahwa asisten mendengarkan seluruh rekaman atau menjalankan simulasi selama 115 menit waktu nyata. Pemajuan waktu/tenggat adalah metode pengujian, bukan fitur bantuan yang diberikan dalam UI tes.

## Peninjauan visual dan bahasa

Beranda desktop 1440×1100 dan HP 390×844 diperiksa melalui screenshot; tema gelap dan fokus skip diperiksa browser. Seluruh halaman menggunakan kontrol native berlabel dan fokus terlihat; pilihan menampilkan radio, huruf, serta tanda benar/salah, sehingga tidak mengandalkan warna. Ini bukan audit WCAG lengkap dengan pembaca layar, bukan uji semua kombinasi browser/HP, dan tidak mengklaimnya demikian.

Peninjauan konten terpisah tercatat di `CONTENT_REVIEW.md`: putaran kedua pada 140 soal oleh penyusun, bukan ahli independen; 460 masih draf editorial. Lulus test key yang dikodekan hanya membuktikan algoritme memakai kunci tersebut, bukan bahwa kuncinya benar secara linguistik.

## Temuan yang diperbaiki

Percobaan awal menemukan stylesheet import yang tidak diperlukan, impor JSON Node tanpa atribut, dan pemeriksaan UI yang terlalu cepat sebelum penyimpanan selesai. Stylesheet dan impor dibetulkan; UI menampilkan status menyimpan dan memperingatkan refresh saat tulis belum selesai, serta test menunggu perubahan yang benar-benar persisten. Selector uji filter disesuaikan dengan nama kontrol aksesibilitas. Countdown awal yang berpotensi memberi waktu baru setelah tab tertidur diubah menjadi rangkaian tenggat absolut. Vite dan esbuild diperbarui setelah audit dependency.

Kegagalan awal tersebut tidak dicatat sebagai lulus; pemeriksaan terdampak dijalankan ulang. Seluruh hasil lulus di atas merujuk rangkaian akhir, bukan hasil pertama.
