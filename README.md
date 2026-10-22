# Our 2nd Anniversary — Gilang & Ayu

Website anniversary statis dengan HTML, CSS, dan JavaScript. Dibuat untuk dipublikasikan melalui GitHub Pages.

## Isi proyek

- `index.html` — semua bagian halaman dan konten utama
- `css/style.css` — tema midnight purple/blue, layout, responsivitas, animasi
- `js/main.js` — bintang, efek scroll, musik, dan surat cinta
- `js/timer.js` — penghitung waktu hubungan dan countdown anniversary
- `js/gallery.js` — data foto, slideshow, caption, dan kontrol galeri
- `assets/images/` — gambar contoh SVG yang dapat diganti
- `assets/audio/` — tempat file audio milikmu yang penggunaannya diizinkan

## Menjalankan secara lokal

1. Ekstrak ZIP.
2. Buka folder `our-2nd-anniversary`.
3. Buka `index.html` di browser. Untuk pengalaman yang lebih konsisten, gunakan ekstensi server lokal seperti Live Server di VS Code.

Tidak diperlukan proses build atau instalasi package.

## Mengganti foto galeri

1. Masukkan foto milikmu ke `assets/images/`, misalnya `foto-kencan-01.jpg`.
2. Buka `js/gallery.js`.
3. Pada daftar `memories`, ubah nilai `image` dari `assets/images/memory-01.svg` menjadi nama file fotomu.
4. Ubah `alt`, `title`, `eyebrow`, dan `description` sesuai kenangan kalian.
5. Simpan dan refresh halaman.

Contoh nama file: `foto-kencan-01.jpg`. Gunakan nama file sederhana tanpa karakter khusus agar mudah dikelola.

## Mengganti screenshot chat

Ganti file berikut dengan screenshot yang sudah kamu siapkan, sambil mempertahankan nama file yang sama:

- `assets/images/chat-01.svg`
- `assets/images/chat-02.svg`
- `assets/images/chat-03.svg`

Jika memakai JPG/PNG, ubah juga ekstensi pada `src` di `index.html`. Pastikan informasi pribadi yang tidak ingin dipublikasikan sudah disamarkan.

## Mengatur tanggal jadian

Tanggal timer disimpan di `js/timer.js` sebagai:

`new Date("2024-10-27T00:00:00")`

Tanggal target anniversary memakai 27 Oktober setiap tahun. Jangan mengubah tanggal ini kecuali memang ingin mengganti titik awal penghitung.

## Menggunakan musik

File rekaman lagu Tulus — *Teman Hidup* tidak disertakan dalam proyek ini. Jika kamu memiliki file audio yang boleh digunakan, letakkan di:

`assets/audio/teman-hidup.mp3`

Tombol musik akan mengontrol file tersebut. Jangan mengunggah rekaman berhak cipta ke repository publik tanpa izin atau dasar penggunaan yang sah. Kamu juga bisa mengganti `<source>` di `index.html` ke file audio lain yang penggunaannya diizinkan.

Sebagian browser memblokir autoplay. Musik baru akan dicoba diputar setelah pengunjung menekan tombol mulai atau kontrol musik.

## Mengedit surat cinta

Buka `js/main.js`, lalu cari array `paragraphs`. Edit kalimat di dalam daftar tersebut. Setiap item adalah satu paragraf surat.

## Publikasi ke GitHub Pages

1. Masuk ke GitHub dan buat repository baru bernama `our-2nd-anniversary`.
2. Pilih **Public** jika memang ingin link dapat dibuka publik.
3. Unggah isi folder proyek ini. Pastikan `index.html` berada di root repository, bukan di dalam folder bersarang lain.
4. Buka **Settings → Pages**.
5. Di bagian build/deployment, pilih **Deploy from a branch**.
6. Pilih branch `main` dan folder `/(root)`, lalu simpan.
7. Tunggu proses deployment selesai. GitHub akan menampilkan URL Pages di halaman pengaturan tersebut, biasanya berbentuk `https://USERNAME.github.io/our-2nd-anniversary/`.
8. Buka URL itu di HP dan uji tombol mulai, musik, timer, slideshow, dan surat.

Nama menu GitHub bisa sedikit berubah. Website belum dipublikasikan hanya dengan membuat file lokal atau mengunduh ZIP; kamu harus mengunggahnya ke repository dan mengaktifkan Pages sendiri.

## Catatan privasi dan kualitas

- Repository Public berarti file gambar, kode, dan aset yang diunggah dapat diakses orang lain.
- Jangan masukkan kata sandi, nomor telepon, alamat, atau percakapan sensitif.
- Uji semua gambar setelah menggantinya.
- Google Fonts memerlukan koneksi internet; fallback font lokal sudah disediakan.
- Tidak ada backend, login, atau database. Website ini merupakan website statis.
