# Website Pembangunan Jalan Kawasan Pendukung KIPP 1A

Semua orang bisa **melihat** website. Hanya admin (username + password) yang bisa **mengubah** teks/angka, mengganti foto,
dan menambah/menghapus ikon alat, divisi, ROW, dokumentasi, dll.

## 1. Upload ke GitHub
1. Buat repository baru, upload semua isi folder ini (`index.html`, `app.js`, `firebase-config.js`, folder `img`).
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. Website aktif di `https://USERNAME.github.io/NAMA-REPO/`.

> Tanpa langkah 2 (Firebase), website berjalan **mode demo**: login `admin` / `admin123`, perubahan hanya tersimpan di browser Anda sendiri.
> Agar perubahan terlihat oleh semua pengunjung, pasang Firebase (gratis) seperti di bawah.

## 2. Pasang Firebase (agar data tersimpan untuk semua pengunjung)
1. https://console.firebase.google.com → **Add project**.
2. **Build → Authentication → Get started → Email/Password → Enable**.
   Tab *Users* → **Add user**: email `admin@kipp.local`, password pilihan Anda.
   (Di halaman login cukup ketik username `admin`; atau ganti sesuai keinginan, mis. `budi@kipp.local` → username `budi`.)
3. **Build → Firestore Database → Create database** (production mode). Tab **Rules**, tempel lalu Publish:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'admin@kipp.local';
    }
  }
}
```
   (jika memakai email admin lain, ganti `admin@kipp.local` di rules.)
4. **Project settings (ikon roda gigi) → Your apps → Web (`</>`)** → daftarkan app → salin `firebaseConfig`.
5. Buka `firebase-config.js`, ganti `null` dengan config tersebut, commit ke GitHub.
6. (Disarankan) Authentication → Settings → User actions → matikan *Enable create (sign-up)*.

## 3. Cara memakai sebagai admin
Buka website → klik **🔒 Admin** di bagian bawah → login. Klik teks untuk mengetik, klik gambar untuk mengganti foto,
tombol **+ Tambah** / **✕** untuk menambah/menghapus item, lalu tekan **💾 Simpan**.

Catatan: gambar Pencapaian Pekerjaan dan Kurva-S berupa gambar (hasil Excel); ganti dengan klik gambarnya.
