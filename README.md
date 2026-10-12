# WarungKas

Aplikasi kasir mobile sederhana untuk warung kecil. Bekerja **offline**, tanpa akun dan tanpa langganan.

Proyek Akhir Mata Kuliah Mobile Programming (2026), STMIK AMIKBANDUNG.

## Latar Belakang

Banyak warung masih menghitung dengan kalkulator biasa atau hafalan, sehingga rawan salah hitung harga dan uang kembalian. Tidak adanya pencatatan transaksi juga menyulitkan pemilik warung mengetahui pemasukan harian dan bulanan. Aplikasi kasir yang ada di pasaran umumnya terlalu kompleks, mahal, atau membutuhkan internet.

WarungKas dibuat agar pemilik warung cukup menekan tombol harga untuk menghitung belanjaan pembeli.

## Fitur

- **Kasir tombol harga**: tekan tombol harga barang, total dihitung otomatis tanpa mengetik satu per satu.
- **Uang kembalian otomatis**: masukkan uang pembeli, kembalian langsung ditampilkan.
- **Kelola harga**: tambah dan hapus tombol harga kapan saja sesuai dagangan, tanpa mengubah kode.
- **Riwayat transaksi**: setiap transaksi tersimpan otomatis, lengkap dengan total pemasukan harian dan bulanan.
- **Profil warung**: diisi saat pertama kali aplikasi digunakan.
- **Multi shop management**.
- **Offline**: seluruh data tersimpan lokal di perangkat.


## Cara Menjalankan

Prasyarat: Node.js dan perangkat Android (atau emulator).

```bash
git clone https://github.com/NaGm-Aa/warungkas.git
cd warungkas
npm install
npx expo start
```

Lalu buka aplikasi di perangkat atau emulator sesuai petunjuk yang muncul di terminal.

Kebutuhan minimum: Android 8.0+ / iOS 13.0+, RAM 2 GB, ruang penyimpanan 100 MB.

Metodologi dan Pengujian

- Pengembangan dengan pendekatan **Agile/Scrum**: analisis, desain, coding, testing, deployment.
- Pengujian fungsional dengan metode **black box testing** pada fitur tambah harga, hapus harga, kalkulator, kembalian, penyimpanan transaksi, dan halaman riwayat.

Rencana Pengembangan

- Ekspor riwayat transaksi ke PDF.
- Penambahan nama pada tombol harga dan perbaikan tampilan.
- Versi multi perangkat dengan cloud agar profil yang sama dapat dipakai di perangkat lain.

Pengembang

**Sabili Sajid**, Teknik Informatika, STMIK AMIKBANDUNG
GitHub: [NaGm-Aa](https://github.com/NaGm-Aa)
