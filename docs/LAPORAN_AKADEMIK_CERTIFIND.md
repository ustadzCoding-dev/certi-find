# LAPORAN PROYEK AKHIR
## PENGEMBANGAN PLATFORM PENCARIAN SERTIFIKASI GRATIS BERBASIS WEB
### "CERTIFIND"

---

**Disusun Oleh:**
[Nama Mahasiswa]
[NIM]

**Program Studi:**
[Nama Program Studi]

**Fakultas:**
[Nama Fakultas]

**Universitas:**
[Nama Universitas]

**Tahun:**
2024

---

## DAFTAR ISI

1. [BAB I - PENDAHULUAN](#bab-i---pendahuluan)
2. [BAB II - TINJAUAN PUSTAKA](#bab-ii---tinjauan-pustaka)
3. [BAB III - METODOLOGI](#bab-iii---metodologi)
4. [BAB IV - ANALISIS DAN PERANCANGAN](#bab-iv---analisis-dan-perancangan)
5. [BAB V - IMPLEMENTASI](#bab-v---implementasi)
6. [BAB VI - PENGUJIAN](#bab-vi---pengujian)
7. [BAB VII - KESIMPULAN DAN SARAN](#bab-vii---kesimpulan-dan-saran)
8. [DAFTAR PUSTAKA](#daftar-pustaka)
9. [LAMPIRAN](#lampiran)

---

## BAB I - PENDAHULUAN

### 1.1 Latar Belakang

Di era digital saat ini, kebutuhan akan peningkatan kompetensi dan keterampilan menjadi semakin penting bagi individu yang ingin bersaing di pasar kerja global. Sertifikasi profesional telah menjadi salah satu cara yang efektif untuk membuktikan kemampuan dan keahlian seseorang dalam bidang tertentu. Banyak perusahaan teknologi terkemuka seperti Google, IBM, Meta, Microsoft, dan Amazon menawarkan program sertifikasi yang dapat diakses secara gratis atau dengan biaya yang terjangkau.

Namun, dengan banyaknya pilihan sertifikasi yang tersedia, calon pembelajar sering menghadapi kesulitan dalam menemukan sertifikasi yang tepat sesuai dengan bidang minat dan tingkat keahlian mereka. Informasi tentang sertifikasi tersebar di berbagai platform, membuatnya sulit untuk dibandingkan dan dievaluasi secara efisien.

Berdasarkan permasalahan tersebut, dikembangkanlah **CertiFind** - sebuah platform web yang dirancang untuk membantu pengguna menemukan, mengelola, dan melacak sertifikasi gratis dari berbagai penyedia terkemuka di seluruh dunia.

### 1.2 Rumusan Masalah

Berdasarkan latar belakang yang telah diuraikan, dapat dirumuskan beberapa masalah sebagai berikut:

1. Bagaimana merancang dan mengembangkan platform web yang dapat menampilkan katalog sertifikasi gratis secara terorganisir?
2. Bagaimana mengimplementasikan sistem autentikasi dan otorisasi yang aman untuk pengguna?
3. Bagaimana membangun fitur bookmark yang memungkinkan pengguna menyimpan sertifikasi favorit?
4. Bagaimana mengembangkan panel admin untuk mengelola konten dan pengguna platform?

### 1.3 Tujuan Penelitian

Tujuan dari pengembangan proyek ini adalah:

1. Merancang dan mengembangkan aplikasi web CertiFind menggunakan arsitektur modern berbasis Vue.js dan Node.js
2. Mengimplementasikan sistem manajemen sertifikasi dengan fitur pencarian, filter, dan kategorisasi
3. Membangun sistem autentikasi berbasis JWT (JSON Web Token) yang aman
4. Mengembangkan fitur bookmark untuk personalisasi pengalaman pengguna
5. Membangun panel administrasi untuk pengelolaan konten dan pengguna

### 1.4 Batasan Masalah

Untuk menjaga fokus pengembangan, proyek ini memiliki batasan sebagai berikut:

1. Aplikasi dikembangkan sebagai aplikasi web responsif
2. Data sertifikasi bersumber dari input manual melalui panel admin
3. Sistem tidak mengintegrasikan pembayaran online
4. Verifikasi penyelesaian sertifikasi tidak dilakukan oleh sistem

### 1.5 Manfaat Penelitian

**Manfaat Praktis:**
- Mempermudah pencarian sertifikasi gratis bagi masyarakat umum
- Menghemat waktu dalam membandingkan berbagai pilihan sertifikasi
- Membantu pengguna melacak sertifikasi yang diminati

**Manfaat Akademis:**
- Sebagai bahan pembelajaran tentang pengembangan full-stack web application
- Mendemonstrasikan penerapan arsitektur REST API
- Memberikan contoh implementasi autentikasi dan otorisasi berbasis token

---

## BAB II - TINJAUAN PUSTAKA

### 2.1 Aplikasi Web

Aplikasi web adalah program komputer yang berjalan di browser web dan dapat diakses melalui jaringan internet. Berbeda dengan aplikasi desktop tradisional, aplikasi web tidak memerlukan instalasi di perangkat pengguna dan dapat diakses dari berbagai platform dengan menggunakan browser (Shklar & Rosen, 2009).

### 2.2 Single Page Application (SPA)

Single Page Application adalah pendekatan pengembangan aplikasi web di mana seluruh aplikasi dimuat dalam satu halaman HTML. Navigasi dan interaksi dilakukan secara dinamis tanpa perlu memuat ulang halaman secara penuh. SPA memberikan pengalaman pengguna yang lebih baik dengan respon yang cepat dan transisi yang mulus (Mikowski & Powell, 2013).

### 2.3 Vue.js Framework

Vue.js adalah framework JavaScript progresif untuk membangun antarmuka pengguna. Dikembangkan oleh Evan You, Vue.js dirancang untuk dapat diadopsi secara bertahap dan fokus pada *view layer* dari aplikasi. Fitur utama Vue.js meliputi:

- **Reactive Data Binding**: Perubahan data secara otomatis memperbarui tampilan
- **Component-Based Architecture**: Aplikasi dibangun dari komponen yang dapat digunakan kembali
- **Virtual DOM**: Optimasi performa rendering
- **Vue Router**: Pengelolaan navigasi SPA
- **Pinia**: State management modern untuk Vue 3

### 2.4 Node.js dan Express.js

Node.js adalah runtime JavaScript yang dibangun di atas V8 JavaScript Engine milik Chrome. Node.js memungkinkan pengembang untuk menjalankan JavaScript di sisi server (Tilkov & Vinoski, 2010).

Express.js adalah framework web minimal dan fleksibel untuk Node.js yang menyediakan serangkaian fitur untuk aplikasi web dan mobile. Express.js mempermudah pembuatan API RESTful dengan routing yang intuitif dan middleware yang dapat dikustomisasi.

### 2.5 MongoDB dan Mongoose

MongoDB adalah database NoSQL yang menyimpan data dalam format dokumen BSON (Binary JSON). MongoDB cocok untuk aplikasi yang membutuhkan fleksibilitas skema dan skalabilitas horizontal (Chodorow, 2013).

Mongoose adalah ODM (Object Data Modeling) library untuk MongoDB dan Node.js. Mongoose menyediakan solusi berbasis skema untuk memodelkan data aplikasi dengan built-in type casting, validation, dan query building.

### 2.6 JWT (JSON Web Token)

JSON Web Token adalah standar terbuka (RFC 7519) yang mendefinisikan cara yang ringkas dan mandiri untuk mentransmisikan informasi secara aman antara pihak sebagai objek JSON. JWT sering digunakan untuk autentikasi dan pertukaran informasi dalam aplikasi web modern (Jones et al., 2015).

### 2.7 REST API

REST (Representational State Transfer) adalah gaya arsitektur untuk merancang layanan web yang skalabel dan dapat dipelihara. API RESTful menggunakan metode HTTP standar (GET, POST, PUT, DELETE) untuk melakukan operasi CRUD pada sumber daya (Fielding, 2000).

### 2.8 Tailwind CSS

Tailwind CSS adalah framework CSS utility-first yang memungkinkan pengembang membangun desain kustom tanpa meninggalkan HTML. Berbeda dengan framework CSS tradisional, Tailwind menyediakan kelas-kelas utilitas tingkat rendah yang dapat dikombinasikan untuk membuat desain unik (Tailwind Labs, 2023).

---

## BAB III - METODOLOGI

### 3.1 Metode Pengembangan

Proyek CertiFind dikembangkan menggunakan metodologi **Agile Software Development** dengan pendekatan iteratif. Pengembangan dilakukan dalam beberapa sprint dengan fokus pada:

1. **Sprint 1**: Setup proyek dan infrastruktur dasar
2. **Sprint 2**: Pengembangan komponen UI dan halaman publik
3. **Sprint 3**: Implementasi autentikasi dan halaman pengguna
4. **Sprint 4**: Pengembangan panel admin
5. **Sprint 5**: Backend API development
6. **Sprint 6**: Integrasi frontend-backend dan pengujian

### 3.2 Tools dan Teknologi

#### 3.2.1 Frontend Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Vue.js | 3.x | Framework JavaScript |
| Vite | 5.x | Build tool dan dev server |
| Vue Router | 4.x | Client-side routing |
| Pinia | 2.x | State management |
| Tailwind CSS | 3.x | Utility-first CSS framework |
| Axios | 1.x | HTTP client |
| Vue Toastification | 2.x | Notifikasi toast |

#### 3.2.2 Backend Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Node.js | 18.x | Runtime JavaScript |
| Express.js | 4.x | Web framework |
| MongoDB | 7.x | Database NoSQL |
| Mongoose | 8.x | ODM untuk MongoDB |
| JWT | - | Autentikasi token |
| Bcrypt | 5.x | Password hashing |
| Joi | 17.x | Validasi data |
| Nodemailer | 6.x | Pengiriman email |

#### 3.2.3 Development Tools

| Tool | Fungsi |
|------|--------|
| Visual Studio Code | Code editor |
| Git | Version control |
| Postman | API testing |
| MongoDB Compass | Database GUI |

### 3.3 Arsitektur Sistem

Sistem CertiFind menggunakan arsitektur **Client-Server** dengan pemisahan yang jelas antara frontend dan backend:

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Vue.js SPA                           │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │ │
│  │  │  Views  │  │ Stores  │  │ Router  │  │  API    │    │ │
│  │  │(Pages)  │  │(Pinia)  │  │         │  │ Service │    │ │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         SERVER                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   Express.js API                        │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │ │
│  │  │ Routes  │  │ Control │  │ Middle  │  │ Models  │    │ │
│  │  │         │  │  -lers  │  │  -ware  │  │         │    │ │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Mongoose ODM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATABASE                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                      MongoDB                            │ │
│  │  ┌─────────┐  ┌─────────────┐  ┌─────────┐             │ │
│  │  │  Users  │  │Certifications│  │Bookmarks│             │ │
│  │  └─────────┘  └─────────────┘  └─────────┘             │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## BAB IV - ANALISIS DAN PERANCANGAN

### 4.1 Analisis Kebutuhan

#### 4.1.1 Kebutuhan Fungsional

**A. Modul Pengguna Publik (Guest)**
- FR-01: Sistem harus menampilkan halaman landing dengan informasi platform
- FR-02: Sistem harus menyediakan katalog sertifikasi yang dapat diakses publik
- FR-03: Sistem harus mendukung pencarian sertifikasi berdasarkan kata kunci
- FR-04: Sistem harus menyediakan filter berdasarkan kategori dan level
- FR-05: Sistem harus menampilkan detail sertifikasi

**B. Modul Autentikasi**
- FR-06: Sistem harus menyediakan form registrasi pengguna baru
- FR-07: Sistem harus menyediakan form login dengan email dan password
- FR-08: Sistem harus mengimplementasikan autentikasi berbasis JWT
- FR-09: Sistem harus menyediakan fungsi logout

**C. Modul Pengguna Terdaftar**
- FR-10: Sistem harus menyediakan halaman profil pengguna
- FR-11: Sistem harus memungkinkan pengguna mengedit profil
- FR-12: Sistem harus menyediakan fitur bookmark sertifikasi
- FR-13: Sistem harus menampilkan daftar bookmark pengguna

**D. Modul Administrasi**
- FR-14: Sistem harus menyediakan dashboard admin dengan statistik
- FR-15: Sistem harus memungkinkan admin menambah sertifikasi baru
- FR-16: Sistem harus memungkinkan admin mengedit sertifikasi
- FR-17: Sistem harus memungkinkan admin menghapus sertifikasi
- FR-18: Sistem harus menampilkan daftar pengguna untuk admin
- FR-19: Sistem harus memungkinkan admin memblokir/membuka blokir pengguna
- FR-20: Sistem harus memungkinkan admin mengubah role pengguna

#### 4.1.2 Kebutuhan Non-Fungsional

| ID | Kebutuhan | Deskripsi |
|----|-----------|-----------|
| NFR-01 | Performa | Halaman harus dimuat dalam waktu < 3 detik |
| NFR-02 | Keamanan | Password harus di-hash menggunakan bcrypt |
| NFR-03 | Keamanan | API harus dilindungi dengan autentikasi JWT |
| NFR-04 | Usability | Antarmuka harus responsif di berbagai ukuran layar |
| NFR-05 | Usability | Desain harus mengikuti prinsip UX modern |
| NFR-06 | Reliability | Sistem harus menangani error dengan graceful |
| NFR-07 | Maintainability | Kode harus terstruktur dan terdokumentasi |

### 4.2 Use Case Diagram

```
                        ┌─────────────────────────────────────┐
                        │           CertiFind System          │
                        │                                     │
    ┌──────┐           │  ┌─────────────────────────────┐   │
    │Guest │◄──────────┼──┤ Lihat Katalog Sertifikasi   │   │
    └──┬───┘           │  └─────────────────────────────┘   │
       │               │  ┌─────────────────────────────┐   │
       ├───────────────┼──┤ Cari Sertifikasi            │   │
       │               │  └─────────────────────────────┘   │
       │               │  ┌─────────────────────────────┐   │
       ├───────────────┼──┤ Filter Sertifikasi          │   │
       │               │  └─────────────────────────────┘   │
       │               │  ┌─────────────────────────────┐   │
       ├───────────────┼──┤ Lihat Detail Sertifikasi    │   │
       │               │  └─────────────────────────────┘   │
       │               │  ┌─────────────────────────────┐   │
       └───────────────┼──┤ Registrasi                  │   │
                       │  └─────────────────────────────┘   │
                       │                                     │
    ┌──────┐           │  ┌─────────────────────────────┐   │
    │ User │◄──────────┼──┤ Login                       │   │
    └──┬───┘           │  └─────────────────────────────┘   │
       │               │  ┌─────────────────────────────┐   │
       ├───────────────┼──┤ Kelola Profil               │   │
       │               │  └─────────────────────────────┘   │
       │               │  ┌─────────────────────────────┐   │
       ├───────────────┼──┤ Bookmark Sertifikasi        │   │
       │               │  └─────────────────────────────┘   │
       │               │  ┌─────────────────────────────┐   │
       └───────────────┼──┤ Lihat Bookmark              │   │
                       │  └─────────────────────────────┘   │
                       │                                     │
    ┌──────┐           │  ┌─────────────────────────────┐   │
    │Admin │◄──────────┼──┤ Lihat Dashboard             │   │
    └──┬───┘           │  └─────────────────────────────┘   │
       │               │  ┌─────────────────────────────┐   │
       ├───────────────┼──┤ Kelola Sertifikasi (CRUD)   │   │
       │               │  └─────────────────────────────┘   │
       │               │  ┌─────────────────────────────┐   │
       └───────────────┼──┤ Kelola Pengguna             │   │
                       │  └─────────────────────────────┘   │
                       └─────────────────────────────────────┘
```

### 4.3 Entity Relationship Diagram (ERD)

```
┌────────────────────┐       ┌────────────────────────┐
│       USERS        │       │    CERTIFICATIONS      │
├────────────────────┤       ├────────────────────────┤
│ _id: ObjectId (PK) │       │ _id: ObjectId (PK)     │
│ name: String       │       │ title: String          │
│ email: String      │       │ provider: String       │
│ password: String   │       │ category: String       │
│ role: String       │       │ description: String    │
│ interestField: Str │       │ duration: String       │
│ isActive: Boolean  │       │ level: String          │
│ createdAt: Date    │       │ isFree: Boolean        │
│ updatedAt: Date    │       │ freeNote: String       │
└────────┬───────────┘       │ url: String            │
         │                   │ skills: [String]       │
         │                   │ certificateType: Str   │
         │ 1                 │ language: String       │
         │                   │ thumbnail: String      │
         │                   │ createdBy: ObjectId(FK)│
         ▼                   │ isActive: Boolean      │
┌────────────────────┐       │ createdAt: Date        │
│     BOOKMARKS      │       │ updatedAt: Date        │
├────────────────────┤       └───────────┬────────────┘
│ _id: ObjectId (PK) │                   │
│ userId: ObjectId   │◄──────────────────┘
│         (FK)       │           1
│ certificationId:   │
│    ObjectId (FK)   │
│ createdAt: Date    │
└────────────────────┘
```

### 4.4 Perancangan Database

#### 4.4.1 Koleksi Users

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    format: email
  },
  password: {
    type: String,
    required: true,
    minLength: 6  // Stored as bcrypt hash
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  interestField: {
    type: String,
    enum: ['IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### 4.4.2 Koleksi Certifications

```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    maxLength: 200
  },
  provider: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other']
  },
  description: {
    type: String,
    required: true,
    minLength: 50,
    maxLength: 2000
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  isFree: {
    type: Boolean,
    default: true
  },
  freeNote: String,
  url: {
    type: String,
    required: true,
    format: uri
  },
  skills: [String],
  certificateType: String,
  language: {
    type: String,
    default: 'English'
  },
  thumbnail: String,
  createdBy: {
    type: ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### 4.4.3 Koleksi Bookmarks

```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  certificationId: {
    type: ObjectId,
    ref: 'Certification',
    required: true
  },
  createdAt: Date
}
// Compound unique index on [userId, certificationId]
```

### 4.5 Perancangan API

#### 4.5.1 Endpoint Authentication

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | /api/auth/register | Registrasi pengguna baru | No |
| POST | /api/auth/login | Login pengguna | No |
| GET | /api/auth/me | Get profil pengguna saat ini | Yes |
| PUT | /api/auth/profile | Update profil pengguna | Yes |

#### 4.5.2 Endpoint Certifications

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | /api/certifications | Get semua sertifikasi | No |
| GET | /api/certifications/:id | Get detail sertifikasi | No |
| POST | /api/certifications | Tambah sertifikasi baru | Admin |
| PUT | /api/certifications/:id | Update sertifikasi | Admin |
| DELETE | /api/certifications/:id | Hapus sertifikasi | Admin |

#### 4.5.3 Endpoint Bookmarks

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | /api/bookmarks | Get bookmark pengguna | Yes |
| POST | /api/bookmarks | Tambah bookmark | Yes |
| DELETE | /api/bookmarks/:certId | Hapus bookmark | Yes |
| GET | /api/bookmarks/check/:certId | Cek status bookmark | Yes |

#### 4.5.4 Endpoint Admin

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | /api/admin/stats | Get statistik dashboard | Admin |
| GET | /api/admin/users | Get daftar pengguna | Admin |
| PUT | /api/admin/users/:id/block | Toggle status pengguna | Admin |
| PUT | /api/admin/users/:id/role | Ubah role pengguna | Admin |

### 4.6 Perancangan Antarmuka

#### 4.6.1 Sitemap

```
CertiFind
├── Halaman Publik
│   ├── Landing Page (/)
│   ├── Catalog (/catalog)
│   ├── Detail Sertifikasi (/certification/:id)
│   ├── About (/about)
│   ├── Login (/login)
│   ├── Register (/register)
│   └── 404 Not Found
│
├── Halaman User (Protected)
│   ├── Profile (/profile)
│   └── Bookmarks (/bookmarks)
│
└── Halaman Admin (Protected + Admin Only)
    ├── Dashboard (/admin)
    ├── Kelola Sertifikasi (/admin/certifications)
    ├── Form Sertifikasi (/admin/certifications/create)
    ├── Edit Sertifikasi (/admin/certifications/edit/:id)
    └── Kelola Users (/admin/users)
```

#### 4.6.2 Desain Sistem

**Tema Warna:**
- Primary Background: #0a0a0f (Dark)
- Secondary Background: #12121a
- Tertiary Background: #1a1a25
- Accent Primary: #8b5cf6 (Purple)
- Accent Secondary: #3b82f6 (Blue)
- Text Primary: #ffffff
- Text Secondary: #a1a1aa
- Text Muted: #71717a

**Tipografi:**
- Font Family: Inter (Google Fonts)
- Heading: Bold, various sizes
- Body: Regular, 16px base

**Komponen UI:**
- Cards dengan glassmorphism effect
- Gradient buttons
- Rounded corners (8px - 16px)
- Subtle shadows dan borders
- Smooth transitions dan hover effects

---

## BAB V - IMPLEMENTASI

### 5.1 Struktur Proyek

#### 5.1.1 Frontend Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppButton.vue
│   │   │   ├── AppInput.vue
│   │   │   ├── AppNavbar.vue
│   │   │   └── AppFooter.vue
│   │   └── certification/
│   │       └── CertCard.vue
│   ├── views/
│   │   ├── public/
│   │   │   ├── LandingPage.vue
│   │   │   ├── CatalogPage.vue
│   │   │   ├── DetailPage.vue
│   │   │   ├── LoginPage.vue
│   │   │   ├── RegisterPage.vue
│   │   │   ├── AboutPage.vue
│   │   │   └── NotFoundPage.vue
│   │   ├── user/
│   │   │   ├── ProfilePage.vue
│   │   │   └── BookmarksPage.vue
│   │   └── admin/
│   │       ├── AdminLayout.vue
│   │       ├── DashboardPage.vue
│   │       ├── CertListPage.vue
│   │       ├── CertFormPage.vue
│   │       └── UserListPage.vue
│   ├── stores/
│   │   ├── auth.js
│   │   ├── certifications.js
│   │   └── bookmarks.js
│   ├── services/
│   │   └── api.js
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   ├── main.js
│   └── index.css
├── .env
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.cjs
└── vite.config.js
```

#### 5.1.2 Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── email.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── certController.js
│   │   ├── bookmarkController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   └── validate.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Certification.js
│   │   └── Bookmark.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── certRoutes.js
│   │   ├── bookmarkRoutes.js
│   │   └── adminRoutes.js
│   ├── services/
│   │   └── emailService.js
│   ├── validators/
│   │   └── schemas.js
│   ├── seeds/
│   │   └── seedData.js
│   └── app.js
├── .env
├── .env.example
├── server.js
└── package.json
```

### 5.2 Implementasi Backend

#### 5.2.1 Konfigurasi Database

```javascript
// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
```

#### 5.2.2 Model User dengan Password Hashing

```javascript
// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    interestField: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### 5.2.3 Middleware Autentikasi

```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Authentication required' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user || !user.isActive) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid or inactive user' 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ 
            success: false, 
            message: 'Invalid token' 
        });
    }
};

module.exports = auth;
```

### 5.3 Implementasi Frontend

#### 5.3.1 State Management dengan Pinia

```javascript
// src/stores/auth.js
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('certifind_token') || null,
        loading: false,
        error: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.user?.role === 'admin'
    },

    actions: {
        async login(credentials) {
            this.loading = true
            try {
                const response = await api.post('/auth/login', credentials)
                this.token = response.data.data.token
                this.user = response.data.data.user
                localStorage.setItem('certifind_token', this.token)
                return response.data
            } catch (error) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        },

        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('certifind_token')
        }
    }
})
```

#### 5.3.2 Komponen Reusable

```vue
<!-- src/components/common/AppButton.vue -->
<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost', 'danger', 'white'].includes(v)
  },
  size: { type: String, default: 'md' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false }
})

const variantClasses = {
  primary: 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:shadow-glow',
  secondary: 'bg-bg-tertiary text-white border border-white/10 hover:border-accent-primary/50',
  white: 'bg-white text-purple-600 hover:bg-gray-100'
  // ... more variants
}
</script>

<template>
  <button :class="[variantClasses[variant], sizeClasses[size]]" :disabled="disabled || loading">
    <slot v-if="!loading" />
    <span v-else>Loading...</span>
  </button>
</template>
```

#### 5.3.3 Navigation Guard

```javascript
// src/router/index.js
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    
    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next({ name: 'Login', query: { redirect: to.fullPath } })
    }
    
    // Check if route requires admin role
    if (to.meta.requiresAdmin && !authStore.isAdmin) {
        return next({ name: 'Home' })
    }
    
    next()
})
```

### 5.4 Fitur Utama yang Diimplementasikan

#### 5.4.1 Sistem Autentikasi
- Registrasi dengan validasi form
- Login dengan email dan password
- JWT token storage di localStorage
- Auto-logout saat token expired
- Password hashing dengan bcrypt

#### 5.4.2 Katalog Sertifikasi
- Tampilan grid responsif
- Pencarian real-time
- Filter berdasarkan kategori dan level
- Pagination dengan load more
- Detail page dengan informasi lengkap

#### 5.4.3 Fitur Bookmark
- Toggle bookmark dengan satu klik
- Sinkronisasi dengan backend
- Halaman bookmark pribadi
- Hapus bookmark dengan konfirmasi

#### 5.4.4 Panel Admin
- Dashboard dengan statistik real-time
- CRUD sertifikasi lengkap
- Manajemen pengguna
- Toggle status aktif/nonaktif

---

## BAB VI - PENGUJIAN

### 6.1 Pengujian Fungsional

#### 6.1.1 Pengujian Modul Autentikasi

| ID | Test Case | Input | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-01 | Registrasi dengan data valid | name, email, password, interest | User terdaftar, redirect ke home | ✅ Pass |
| TC-02 | Registrasi dengan email yang sudah ada | email duplikat | Error: Email already registered | ✅ Pass |
| TC-03 | Login dengan kredensial valid | email, password valid | Login berhasil, token tersimpan | ✅ Pass |
| TC-04 | Login dengan password salah | password salah | Error: Invalid credentials | ✅ Pass |
| TC-05 | Logout | Click logout | Token dihapus, redirect ke home | ✅ Pass |

#### 6.1.2 Pengujian Modul Sertifikasi

| ID | Test Case | Input | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-06 | Tampilkan katalog | - | Daftar sertifikasi tampil | ✅ Pass |
| TC-07 | Pencarian sertifikasi | "Google" | Sertifikasi Google tampil | ✅ Pass |
| TC-08 | Filter kategori | Category: IT | Hanya sertifikasi IT tampil | ✅ Pass |
| TC-09 | Filter level | Level: Beginner | Hanya level Beginner tampil | ✅ Pass |
| TC-10 | Lihat detail | Click card | Halaman detail tampil | ✅ Pass |

#### 6.1.3 Pengujian Modul Bookmark

| ID | Test Case | Input | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-11 | Tambah bookmark | Click bookmark icon | Sertifikasi tersimpan | ✅ Pass |
| TC-12 | Hapus bookmark | Click bookmark icon (toggled) | Bookmark dihapus | ✅ Pass |
| TC-13 | Lihat daftar bookmark | Navigate ke /bookmarks | Daftar bookmark tampil | ✅ Pass |
| TC-14 | Bookmark tanpa login | Click bookmark | Redirect ke login | ✅ Pass |

#### 6.1.4 Pengujian Modul Admin

| ID | Test Case | Input | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| TC-15 | Tambah sertifikasi | Form lengkap | Sertifikasi tersimpan | ✅ Pass |
| TC-16 | Edit sertifikasi | Ubah title | Sertifikasi terupdate | ✅ Pass |
| TC-17 | Hapus sertifikasi | Konfirmasi hapus | Sertifikasi terhapus | ✅ Pass |
| TC-18 | Blokir pengguna | Toggle status | User terblokir | ✅ Pass |
| TC-19 | Ubah role | Ubah ke admin | Role terupdate | ✅ Pass |

### 6.2 Pengujian Non-Fungsional

#### 6.2.1 Pengujian Responsivitas

| Device | Resolusi | Status |
|--------|----------|--------|
| Desktop | 1920x1080 | ✅ Pass |
| Laptop | 1366x768 | ✅ Pass |
| Tablet | 768x1024 | ✅ Pass |
| Mobile | 375x667 | ✅ Pass |

#### 6.2.2 Pengujian Browser Compatibility

| Browser | Versi | Status |
|---------|-------|--------|
| Google Chrome | 120+ | ✅ Pass |
| Mozilla Firefox | 120+ | ✅ Pass |
| Microsoft Edge | 120+ | ✅ Pass |
| Safari | 17+ | ✅ Pass |

#### 6.2.3 Pengujian Keamanan

| Test | Deskripsi | Status |
|------|-----------|--------|
| Password Hashing | Password tersimpan sebagai hash bcrypt | ✅ Pass |
| JWT Validation | Token invalid ditolak | ✅ Pass |
| Route Protection | Halaman admin tidak bisa diakses user biasa | ✅ Pass |
| Input Validation | Input berbahaya ditolak oleh Joi | ✅ Pass |

---

## BAB VII - KESIMPULAN DAN SARAN

### 7.1 Kesimpulan

Berdasarkan hasil analisis, perancangan, implementasi, dan pengujian yang telah dilakukan, dapat disimpulkan bahwa:

1. **Platform CertiFind berhasil dikembangkan** sebagai aplikasi web full-stack yang memungkinkan pengguna untuk menemukan dan mengelola sertifikasi gratis dari berbagai penyedia terkemuka.

2. **Arsitektur modern yang digunakan** (Vue.js + Express.js + MongoDB) terbukti efektif dalam membangun aplikasi web yang responsif, skalabel, dan maintainable.

3. **Sistem autentikasi berbasis JWT** berhasil diimplementasikan dengan tingkat keamanan yang memadai melalui penggunaan password hashing dan token validation.

4. **Fitur bookmark** memberikan nilai tambah bagi pengguna dalam mempersonalisasi pengalaman mereka di platform.

5. **Panel administrasi** menyediakan kontrol penuh bagi admin untuk mengelola konten dan pengguna platform secara efisien.

6. **Pengujian menunjukkan** bahwa semua fitur utama berfungsi sesuai dengan spesifikasi kebutuhan yang telah ditentukan.

### 7.2 Saran Pengembangan

Untuk pengembangan lebih lanjut, disarankan:

1. **Implementasi OAuth2** untuk login menggunakan akun Google, GitHub, atau LinkedIn guna mempermudah proses autentikasi.

2. **Fitur Progress Tracking** untuk melacak kemajuan pengguna dalam menyelesaikan sertifikasi yang telah di-bookmark.

3. **Sistem Rekomendasi** berbasis machine learning untuk memberikan rekomendasi sertifikasi yang dipersonalisasi berdasarkan minat dan riwayat pengguna.

4. **Push Notifications** untuk menginformasikan pengguna tentang sertifikasi baru atau update pada sertifikasi yang di-bookmark.

5. **Fitur Komunitas** seperti forum diskusi atau review dari pengguna yang telah menyelesaikan sertifikasi.

6. **Mobile Application** menggunakan React Native atau Flutter untuk menjangkau pengguna mobile secara lebih optimal.

7. **Integrasi API** dengan platform penyedia sertifikasi untuk mendapatkan data sertifikasi secara otomatis.

8. **Analytics Dashboard** untuk admin dengan visualisasi data yang lebih komprehensif.

---

## DAFTAR PUSTAKA

1. Chodorow, K. (2013). *MongoDB: The Definitive Guide* (2nd ed.). O'Reilly Media.

2. Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures* (Doctoral dissertation). University of California, Irvine.

3. Jones, M., Bradley, J., & Sakimura, N. (2015). *JSON Web Token (JWT)*. RFC 7519. IETF.

4. Mikowski, M. S., & Powell, J. C. (2013). *Single Page Web Applications: JavaScript end-to-end*. Manning Publications.

5. Shklar, L., & Rosen, R. (2009). *Web Application Architecture: Principles, Protocols and Practices* (2nd ed.). Wiley.

6. Tailwind Labs. (2023). *Tailwind CSS Documentation*. Retrieved from https://tailwindcss.com/docs

7. Tilkov, S., & Vinoski, S. (2010). Node.js: Using JavaScript to Build High-Performance Network Programs. *IEEE Internet Computing*, 14(6), 80-83.

8. Vue.js Team. (2023). *Vue.js 3 Documentation*. Retrieved from https://vuejs.org/guide

9. Express.js Foundation. (2023). *Express.js Documentation*. Retrieved from https://expressjs.com

10. MongoDB Inc. (2023). *MongoDB Documentation*. Retrieved from https://docs.mongodb.com

---

## LAMPIRAN

### Lampiran A: Konfigurasi Environment

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

#### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/certifind
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=CertiFind <noreply@certifind.com>
FRONTEND_URL=http://localhost:5173
```

### Lampiran B: Akun Demo

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@certifind.com | admin123 |
| User | demo@certifind.com | demo123 |

### Lampiran C: Cara Menjalankan Aplikasi

#### Langkah 1: Clone Repository
```bash
git clone <repository-url>
cd certiFind
```

#### Langkah 2: Install Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

#### Langkah 3: Konfigurasi Environment
```bash
# Copy .env.example ke .env di folder backend
# Sesuaikan nilai-nilai sesuai kebutuhan
```

#### Langkah 4: Seed Database
```bash
cd backend
npm run seed
```

#### Langkah 5: Jalankan Aplikasi
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### Langkah 6: Akses Aplikasi
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

---

**Dokumen ini dibuat sebagai laporan akademik proyek pengembangan platform CertiFind.**

*© 2024 - Semua hak cipta dilindungi undang-undang*
