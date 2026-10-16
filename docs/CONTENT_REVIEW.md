# Catatan peninjauan konten

Tanggal: 16 Oktober 2026. Penyusun/pemeriksa pada sesi ini: asisten implementasi, **bukan penilai TOEFL independen**. Tidak ada klaim validasi ahli, uji coba peserta, indeks daya pembeda, atau kalibrasi empiris.

## Cakupan

- 600 soal ditulis sebagai konten orisinal; tidak diturunkan dari soal ETS atau penyedia komersial.
- Seluruh 600 diperiksa secara program: skema, ID, empat pilihan unik, indeks kunci, empat alasan, materi rujukan, kutipan pada stimulus, pemisahan dataset, serta audio/naskah dan checksum.
- Peninjauan kedua penyusun: **140 soal unik**. Dua puluh Structure sebagai sampel lintas topik; 20 Reading/Listening diagnostik dan latihan; seluruh 100 Reading/Listening akhir. Daftar ID dan hash versi yang ditinjau ada di `reviewed-items.json`. Ini peninjauan terarah terhadap kecocokan pertanyaan–kunci–bukti dan kelemahan pengecoh, bukan sertifikasi bahasa.
- 120 di antaranya memperoleh revisi pengecoh dalam `*refinements.js` agar alternatif tetap terkait konteks, dengan kesalahan pada cakupan, waktu, sebab, atau bukti. Revisi tidak menambah jumlah soal.
- 460 soal lainnya belum melalui peninjauan kedua yang sama. Label `editorial-draft` dipertahankan. Semua soal masih memerlukan peninjauan ahli sebelum penggunaan dengan konsekuensi penting.

## Masalah yang ditemukan dan ditangani

1. Sejumlah pembahasan awal memiliki ketidakkonsistenan bahasa. Teks tersebut ditulis ulang dalam Bahasa Indonesia; pemeriksaan karakter dan pembacaan ulang sampel dilakukan. Pemeriksaan karakter sendiri tidak membuktikan bahasa sudah sempurna.
2. Beberapa pengecoh terlalu jauh dari topik. Revisi terutama pada 50 Reading dan 50 Listening akhir menambah alternatif dekat konteks dan menghindari jawaban yang hanya dipilih karena opsi lain tidak masuk akal.
3. S228 memakai “insisted” yang berpotensi dibaca sebagai penegasan fakta. Diganti “demanded” agar target mandative subjunctive lebih tegas.
4. S240 sebelumnya mengandalkan perbandingan `any other devices` yang dapat menimbulkan perdebatan penggunaan. Diganti kesalahan comparative ganda `more simpler`.
5. L174 diperiksa ulang agar tidak memiliki beberapa opsi yang semuanya tidak dapat disimpulkan. Alternatif salah kini berupa pengamatan visual yang sudah dinyatakan, sementara kunci membedakan perpindahan benda dan peniruan gaya.
6. Stem L176 diperjelas menjadi asumsi yang diperingatkan pembicara, sehingga tidak mencampur “mungkin berfungsi” dengan “pasti selalu berfungsi”.
7. Pengecoh bentuk kata yang berupa kata rekaan diganti bentuk/frasa bahasa Inggris yang dikenal, tanpa menjadikannya kunci alternatif.

## Sampel yang ditelaah

- Structure: S001–S010, S021, S031, S061, S081, S141, S142, S161, S201, S216, S240.
- Reading diagnostik/latihan: R001–R005 dan R061–R065.
- Reading akhir: R131–R180.
- Listening diagnostik/latihan: L001–L005 dan L011–L015.
- Listening akhir: L131–L180.

Pemeriksaan Reading/Listening membandingkan jawaban dengan stimulus yang sama; tidak menggunakan fakta luar untuk menentukan kunci. Teks sains dan sejarah adalah contoh pendidikan orisinal, bukan laporan riset faktual yang dikutip dari publikasi nyata.

## Kesulitan dan audio

Label awal didasarkan pada tuntutan keterampilan: inferensi/tujuan, integrasi konteks panjang, inversi/reduced clauses, serta beberapa pola kesalahan kompleks diberi “sulit”; selebihnya “menengah”. Ini heuristik editorial, bukan estimasi kemampuan atau jaminan tingkat kesulitan per peserta. Lihat jumlah aktual pada `inventory.json`.

109 rekaman stimulus + 1 uji suara telah diperiksa keberadaan, checksum, durasi, decode, dan energi suara. Naskah dan identitas voice diperiksa oleh generator. **Belum ada audit pengucapan dan kewajaran suara per rekaman oleh pendengar manusia.** eSpeak NG dapat terdengar mekanis dan tidak cukup menggambarkan intonasi alami. Makna implisit dalam soal disandarkan terutama pada ujaran eksplisit/konteks, bukan nada sintetis saja.

## Prioritas lanjutan

Tinjau 460 soal yang belum masuk putaran kedua; mintalah pengajar independen memeriksa ambiguitas dan kealamian seluruh bank. Dengarkan semua rekaman, ganti dengan rekaman lebih natural bila tersedia secara sah. Uji coba dengan pengguna diperlukan sebelum mengubah label menjadi klaim kesulitan empiris. Verifikasi halaman ETS setelah akses jaringan tersedia.

## Perluasan materi dan perubahan Listening

Ditambahkan 28 bab total (20 bab keterampilan diperluas + 8 fondasi/kosakata), 84 subbab, dan 56 cek pemahaman. Setiap subbab memuat penjelasan, contoh Inggris, serta analisis Indonesia; setiap cek memuat jawaban dan alasan. Lima tema kosakata menata 50 entri dari kamus 100 entri, bukan menambah kata baru. Materi dibaca ulang oleh penyusun untuk konsistensi pola, contoh, jawaban, dan batas klaim. Cakupan ini **tidak mengubah** hitungan peninjauan kedua 140/600 soal dan bukan tinjauan ahli independen.

Pemeriksaan khusus meliputi: finite/nonfinite, kepala subjek, countability, embedded question, fungsi relative pronoun, bentuk sesudah connector, active/passive reduction, batas inversi, perbandingan sejajar, kehati-hatian inferensi, fungsi contoh, used to/be used to, hardly/hard, dan result in/from. Rumusan memakai kata pembatas seperti “umumnya” ketika aturan memiliki konteks/pengecualian. Contoh pendidikan ini bukan uraian lengkap semua tata bahasa Inggris.

Perubahan pembahasan menempatkan alasan pengecoh yang dipilih pengguna di awal, lalu alasan kunci, bukti, dan empat pilihan. Pada error identification ditegaskan kunci adalah bagian yang perlu diperbaiki. Ini perbaikan presentasi dan akses ke teori; **bukan klaim seluruh 600 penjelasan telah ditulis ulang atau diaudit ulang oleh ahli**.

Keluhan pengguna tentang suara mekanis ditangani dengan default teori dan sumber penerbit, bukan memberi label manusia pada eSpeak. Seluruh 109 stimulus masih sintetis, nonaktif secara bawaan; 0 rekaman manusia lokal. Paket ITP lengkap dengan rekaman manusia belum selesai/tersedia. Berdasarkan arahan pengguna, prioritas dialihkan ke teori dan penjelasan; import audio pihak ketiga tidak dipaksakan.

Halaman format/persiapan/izin ETS kini berhasil diperiksa HTTP 200; ketentuan dan tanggal ada di SOURCES.md. Soal tes aktif terbaru tidak digunakan dan tidak diklaim tersedia.
