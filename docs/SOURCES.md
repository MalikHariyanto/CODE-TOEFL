# Sumber dan izin

Pencatatan: 16 Oktober 2026, zona waktu Asia/Bangkok. “Dicoba” dibedakan dari “berhasil diakses”. Tidak ada proposal/paper AES atau lampiran pribadi yang digunakan.

| Sumber | Status akses | Penggunaan | Izin |
| --- | --- | --- | --- |
| https://www.ets.org/toefl/itp/test-content.html | Dicoba; proxy mengembalikan HTTP 403 | Rujukan resmi yang perlu dikonfirmasi untuk format Level 1 | Tidak ada izin reproduksi; tautan saja |
| https://www.ets.org/toefl/itp/prepare.html | Dicoba; proxy HTTP 403 | Tautan persiapan resmi | Tidak disalin |
| https://www.ets.org/legal/permissions/how-to-request.html | Dicoba; proxy HTTP 403 | Jalur meminta izin jika kelak ingin memakai materi ETS | Belum mengajukan atau memperoleh izin |
| Naskah/soal/materi/kamus orisinal proyek | Dibuat dalam implementasi ini | Seluruh bank internal | CC BY 4.0, lihat CONTENT-LICENSE.md |
| https://pypi.org/project/espeakng-loader/0.2.4/ | Wheel terunduh melalui pip dengan verifikasi TLS dan hash distribusi normal | Alat produksi lokal, bukan dependency runtime web | Wheel tidak dibundel; bukan sumber soal |
| https://raw.githubusercontent.com/espeak-ng/espeak-ng/1.52.0/COPYING | Berhasil HTTP 200; teks GPLv3 dibaca | Verifikasi lisensi engine | GPLv3 untuk engine; bukan lisensi kode aplikasi |
| https://raw.githubusercontent.com/espeak-ng/espeak-ng/1.52.0/README.md | Berhasil HTTP 200 | Verifikasi identitas/proyek engine | Tidak disalin sebagai materi belajar |
| https://dictionary.cambridge.org/dictionary/english/ | Tautan eksternal opsional, tidak diverifikasi langsung | Pencarian pengguna untuk kata yang belum ada | Tidak ada konten kamus yang diambil atau dibundel |

## Format yang diterapkan dan batas verifikasi

Format berdasarkan acuan yang diberikan pengguna: Listening 50/35 menit, Structure 40/25 menit, Reading 50/55 menit; total 140/115 menit. Tidak ada soal Speaking, Writing, atau tugas integrasi iBT. Tambahan susunan editorial: 15 completion + 25 error identification, 30 percakapan pendek + 8 soal percakapan panjang + 12 soal paparan. Klaim **verifikasi ulang langsung melalui halaman ETS belum dapat dibuat** karena blokir jaringan.

Tambahan domain `www.ets.org` dan `ets.org` disimpan ke draft pengaturan lingkungan. Penyimpanan draft tidak dengan sendirinya menerapkan aturan ke mesin berjalan atau menerbitkan lingkungan. Setelah akses tersedia, baca sumber resmi dan catat revisi bila perlu. Jangan mengklaim ada reproduksi soal ETS yang berizin hanya karena tautannya dapat dibuka.

## Asal audio

`public/audio/L-A*.mp3`: 109 rekaman stimulus orisinal. `check.mp3`: satu pemeriksaan suara. Tidak memakai speechSynthesis browser atau layanan TTS berbayar. Engine yang diperiksa melalui `espeak_Info` melaporkan 1.52.0; loader dipin 0.2.4. File dibuat dengan ffmpeg, mono, 48 kbit/s. Metadata setiap rekaman ada di `src/data/audio-manifest.json` dan memuat SHA-256 naskah/berkas, durasi, voice variant, serta label sintetis.

Suara dua pembicara menggunakan varian berbeda. Kualitasnya mekanis; belum ada audit pengucapan manusia untuk setiap rekaman. Tes decode dan pencocokan naskah bukan bukti kualitas pedagogis audio yang setara rekaman resmi.

## Penamaan

“TOEFL” dan “ETS” digunakan untuk menyatakan format/rujukan. Aplikasi ini tidak berafiliasi, disahkan, atau diterbitkan ETS. Tidak ada sumber penyedia soal komersial lain yang digunakan untuk memenuhi jumlah internal.
