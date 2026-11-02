# Invita

Pembuat undangan digital gratis. HTML, CSS, dan JavaScript murni, tanpa framework dan tanpa server.

## Cara pasang di GitHub Pages
1. Buat repositori baru di GitHub (misalnya `invita`).
2. Unggah seluruh isi folder ini (`index.html`, `view.html`, folder `css/` dan `js/`) ke cabang `main`.
3. Buka Settings > Pages, pilih Source "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Tunggu beberapa menit, lalu buka `https://NAMAANDA.github.io/invita/`.

Untuk mencoba di komputer sendiri jalankan `python3 -m http.server 8000` di folder ini lalu buka `http://localhost:8000`. Jangan buka `index.html` langsung dari file, karena ekspor HTML butuh `fetch`.

## Struktur
```
index.html          aplikasi (beranda, template, dashboard, editor)
view.html           penampil undangan publik (membaca data dari tautan)
css/app.css         gaya aplikasi
css/invitation.css  gaya undangan (6 gaya tata letak x tema warna)
js/invitation.js    mesin render undangan (countdown, peta, RSVP, galeri, musik, QR)
js/templates.js     12 kategori, 24 template
js/share.js         tautan statis dan ekspor file HTML mandiri
js/store.js         penyimpanan proyek (IndexedDB)
js/viewer.js        boot penampil publik
js/app.js           logika aplikasi
```

## Cara berbagi undangan (tanpa backend)
- **Tautan statis**: seluruh data undangan dikompres dan dikodekan di bagian `#` alamat `view.html`. Siapa pun yang membuka tautan melihat undangan yang sama, dari perangkat apa pun. Foto dan musik yang diunggah dari perangkat tidak ikut karena terlalu besar. Pakai foto dari URL, atau gunakan file HTML.
- **File HTML mandiri**: satu file berisi semuanya (termasuk foto dan musik). Unggah ke repositori GitHub Pages Anda, lalu catat tautan publiknya di jendela "Bagikan & terbitkan". Status "Diterbitkan" hanya berarti Anda sudah mencatat tautan, Invita tidak bisa memeriksa apakah halamannya aktif.

## Keterbatasan yang perlu diketahui
- Proyek disimpan di browser perangkat ini. Menghapus data situs, ganti browser, atau ganti perangkat membuat proyek tidak terlihat. Gunakan **Export JSON** di Dashboard sebagai cadangan.
- Buku tamu hanya menyimpan ucapan di perangkat tamu yang menulisnya (tanpa server tidak ada tempat penampungan bersama). Konfirmasi kehadiran (RSVP) sampai ke penyelenggara lewat pesan WhatsApp.
- Pratinjau tautan di WhatsApp hanya menampilkan judul umum, karena data undangan ada di bagian `#` yang tidak dibaca oleh pembuat pratinjau.
- Peta memakai embed Google Maps tanpa API key. Link pendek (maps.app.goo.gl) tidak bisa dibaca isinya, jadi isi juga alamat agar peta tampil.
- QR Code, font, dan ekspor gambar memakai pustaka dari CDN (cdnjs, Google Fonts), jadi butuh internet.
- Unduh gambar memakai html2canvas. Foto dari URL luar yang tidak mengizinkan akses lintas situs bisa membuat ekspor gambar gagal. PDF dibuat lewat dialog cetak browser ("Simpan sebagai PDF").
