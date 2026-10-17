# Sumber dan izin

Pencatatan: 16 Oktober 2026 (Asia/Bangkok). Berhasil membaca halaman, memverifikasi tautan, dan menguji pemutaran adalah tiga hal berbeda. Tidak ada lampiran proposal/paper AES yang digunakan.

| Sumber | Status akses terakhir | Penggunaan | Hak penggunaan |
| --- | --- | --- | --- |
| https://www.ets.org/toefl/itp/test-content.html | **HTTP 200**, judul dan tabel Level 1 dibaca | Acuan ruang lingkup tiga bagian dan jumlah/waktu | Tidak ada izin menyalin soal/audio; ditautkan |
| https://www.ets.org/toefl/itp/prepare.html | **HTTP 200**, tautan contoh Level 1 ditemukan | Persiapan dan pintu masuk contoh resmi | Tidak menyalin soal/audio |
| https://www.ets.org/legal/permissions/how-to-request.html | **HTTP 200**, ketentuan dibaca | Konfirmasi perlunya izin tertulis untuk reproduksi | Belum meminta atau memperoleh izin |
| https://rt.ets.org/toefl_www/toefl_itp/test_preparation/sample_questions/level1_section1_listening_comprehension.html | Tautan dikonfirmasi pada halaman prepare ETS; akses target ditolak proxy 403 | Tombol membuka contoh di situs asli | **Pemutar dan audio belum diuji**, tidak diunduh |
| https://elllo.org/ dan https://elllo.org/levels/views/B1-views.html | Beranda dan katalog B1 berhasil HTTP 200 pada pemeriksaan ulang; tautan B1 ditemukan pada beranda | Tautan katalog percakapan tingkat menengah; pilih dan periksa jenis rekaman pada pelajaran | Tidak mengambil audio/kuis, tidak mengasumsikan lisensi reproduksi; pemutaran belum diaudit |
| https://www.esl-lab.com/ | Akses ditolak proxy 403 | Tautan Randall untuk latihan umum, bukan paket ITP | Tidak mengambil audio/kuis; rekaman per pelajaran belum diverifikasi |
| Naskah soal, materi, dan kamus internal | Disusun orisinal untuk aplikasi | Bank internal, 28 bab, 84 subbab, 56 cek pemahaman | CC BY 4.0 untuk konten internal; bukan lisensi konten penerbit lain |
| https://pypi.org/project/espeakng-loader/0.2.4/ | Wheel diunduh dengan verifikasi TLS/hash normal pada implementasi awal | Alat produksi arsip suara sintetis | Wheel/engine tidak dibundel sebagai kode web |
| https://raw.githubusercontent.com/espeak-ng/espeak-ng/1.52.0/COPYING | HTTP 200 pada implementasi awal; GPLv3 dibaca | Lisensi engine sintetis | Bukan lisensi kode aplikasi; bukan sumber soal |
| https://raw.githubusercontent.com/espeak-ng/espeak-ng/1.52.0/README.md | HTTP 200 pada implementasi awal | Identitas engine | Tidak disalin menjadi materi |
| https://dictionary.cambridge.org/dictionary/english/ | Tautan opsional; konten tidak diambil/diuji langsung | Pengguna mencari kata yang belum ada dalam kamus lokal | Tidak ada isi kamus eksternal yang dibundel |

Percobaan awal akses tiga halaman `www.ets.org` ditolak 403. Setelah domain tersedia pada lingkungan, ketiganya berhasil diambil dengan HTTPS dan HTTP 200. Status lama tidak dipertahankan sebagai kesimpulan terakhir.

## Format ITP Level 1 yang dikonfirmasi

Halaman ETS Test Content menyebut Listening 50 soal/35 menit, Structure and Written Expression 40/25 menit, Reading 50/55 menit; total 140/115 menit. Paket internal mengikuti tiga bagian tersebut; tidak memuat tugas Writing/Speaking iBT. Susunan 15 completion + 25 error dan distribusi stimulus panjang dalam bank merupakan rancangan editorial paket internal, bukan klaim menyalin paket resmi terbaru.

**Bukan bocoran atau arsip soal tes aktif terbaru.** Tanggal akses menyatakan kapan format publik diperiksa, bukan tanggal rilis soal ETS. Materi grammar/kosakata adalah uraian orisinal untuk keterampilan terkait. ETS menjadi acuan format dan ruang lingkup, bukan penulis, validator, atau pemberi pengesahan materi aplikasi. Belum ada peninjauan ahli bahasa independen.

## Mengapa audio/kuis penerbit dibuka di situs asal?

Halaman izin ETS menjelaskan permohonan izin tertulis untuk reproduksi, waktu respons yang dapat memakan beberapa minggu, dan bahwa izin reproduksi pada situs publik/tidak aman tidak diberikan. Aplikasi statis GitHub Pages merupakan situs publik. Karena belum ada izin, tidak ada salinan soal atau audio ETS di repository.

Beranda ELLLO menyebut natural English, penutur berbagai negara, serta aktivitas dengan audio/video, transkrip, kosakata, dan kuis. Ini keterangan penerbit pada katalog, bukan verifikasi setiap rekaman.

ELLLO dan Randall ditautkan sebagai pilihan belajar umum; jenis rekaman dan ketersediaan tiap pelajaran harus diperiksa di situs penerbit. Tidak mengklaim semua isi katalog merupakan rekaman manusia atau bahwa pemutarnya sudah diuji. Kuis penerbit dikerjakan di situs asal agar tetap berpasangan dengan audio yang benar. Catatan belajar internal adalah masukan pribadi pengguna, tidak dinilai sebagai tes ETS dan tidak dibaca otomatis dari situs lain.

## Arsip audio sintetis internal

`public/audio/L-A*.mp3`: **109** stimulus orisinal; `check.mp3`: satu rekaman pemeriksaan suara. Seluruhnya eSpeak NG 1.52.0, **0 rekaman manusia lokal**. Tidak memakai speechSynthesis browser sebagai sumber simulasi. Metadata di `src/data/audio-manifest.json`: hash naskah/berkas, durasi, varian suara, label sintetis.

Arsip dipertahankan untuk progres lama dan penggunaan opsional. Audio mekanis **dinonaktifkan secara bawaan**; bank Listening, diagnostik tiga bagian, dan simulasi lengkap dibatasi sampai pengguna mengaktifkannya di Pengaturan. Paket simulasi rekaman manusia belum tersedia. Teori Listening, cek pemahaman, serta tes Structure/Reading tetap dapat digunakan tanpa arsip ini. Tes decode bukan audit pengucapan manusia.

## Pengaturan jaringan lingkungan

Tambahan domain penerbit disimpan ke draft cloud. Draft tidak menerapkan aturan pada mesin berjalan dan bukan publikasi website. Pembatasan akses sumber eksternal tidak menghalangi materi lokal. Jika akses penelitian ingin dilanjutkan, tinjau domain di pengaturan lingkungan dan publikasikan konfigurasi lingkungan sebelum menguji ulang sumber yang terblokir; tidak perlu untuk menjalankan aplikasi lokal.

## Lisensi

Kode aplikasi: MIT (`LICENSE`). Konten orisinal internal: `CONTENT-LICENSE.md`. Konten pihak ketiga tidak memperoleh lisensi baru hanya karena ditautkan. “TOEFL” dan “ETS” digunakan untuk menyebut format/rujukan; aplikasi tidak berafiliasi atau disahkan ETS.
