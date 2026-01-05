# CertiFind - Free Certification Discovery Platform

Platform untuk menemukan dan membookmark sertifikasi gratis dari berbagai penyedia terpercaya.

## 📋 Daftar Isi

- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
- [Environment Variables](#environment-variables)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Proyek](#struktur-proyek)
- [API Documentation](#api-documentation)

## ✨ Fitur

- 🔐 Autentikasi user dengan JWT
- 📚 Katalog sertifikasi yang dapat dicari dan difilter
- 🔖 Sistem bookmark untuk menyimpan sertifikasi favorit
- 👤 Profil user dengan riwayat bookmark
- 🛡️ Panel admin untuk mengelola sertifikasi dan user
- 📧 Notifikasi email
- 🎨 UI modern dengan TailwindCSS

## 🛠️ Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework
- **Vue Toastification** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Joi** - Data validation

## 📦 Instalasi

### Prerequisites
- Node.js v16+ dan npm/yarn
- MongoDB (lokal atau cloud)
- Git

### Clone Repository
```bash
git clone https://github.com/ustadzCoding-dev/certiFind.git
cd certiFind
```

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan konfigurasi Anda
npm run dev
```

### Setup Frontend
```bash
cd frontend
npm install
cp .env .env.local
# Edit .env.local jika diperlukan
npm run dev
```

## 🔑 Environment Variables

### Backend (`backend/.env`)

Salin dari `backend/.env.example` dan sesuaikan nilai berikut:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/certifind
# Atau gunakan MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/certifind

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=CertiFind <noreply@certifind.com>

# Frontend URL (untuk CORS)
FRONTEND_URL=http://localhost:5173
```

**Catatan Penting:**
- `JWT_SECRET`: Gunakan string random yang kuat, minimal 32 karakter
- `SMTP_PASS`: Untuk Gmail, gunakan App Password (bukan password akun biasa)
- `MONGODB_URI`: Pastikan MongoDB sudah berjalan atau gunakan MongoDB Atlas

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

### Frontend Production (`frontend/.env.production`)

```env
VITE_API_URL=https://your-production-backend-url/api
```

## 🚀 Menjalankan Aplikasi

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server berjalan di http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Aplikasi berjalan di http://localhost:5173
```

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Struktur Proyek

```
certiFind/
├── backend/
│   ├── src/
│   │   ├── config/          # Konfigurasi database, email
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business services
│   │   ├── validators/      # Input validation
│   │   └── app.js           # Express app setup
│   ├── server.js            # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Vue components
│   │   ├── views/           # Page components
│   │   ├── router/          # Vue Router config
│   │   ├── stores/          # Pinia stores
│   │   ├── services/        # API services
│   │   ├── App.vue          # Root component
│   │   └── main.js          # Entry point
│   ├── public/              # Static assets
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── docs/                    # Dokumentasi
```

## 📡 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-backend-url/api`

### Authentication Endpoints
- `POST /auth/register` - Register user baru
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user info

### Certification Endpoints
- `GET /certifications` - List semua sertifikasi
- `GET /certifications/:id` - Detail sertifikasi
- `POST /certifications` - Buat sertifikasi (admin only)
- `PUT /certifications/:id` - Update sertifikasi (admin only)
- `DELETE /certifications/:id` - Hapus sertifikasi (admin only)

### Bookmark Endpoints
- `GET /bookmarks` - List bookmark user
- `POST /bookmarks/:certId` - Tambah bookmark
- `DELETE /bookmarks/:certId` - Hapus bookmark

### Admin Endpoints
- `GET /admin/users` - List semua user
- `GET /admin/stats` - Statistik platform

## 🔒 Security Best Practices

1. **Environment Variables**: Jangan commit `.env` file
2. **JWT Secret**: Gunakan string random yang kuat
3. **CORS**: Konfigurasi CORS dengan benar untuk production
4. **Password**: Gunakan bcryptjs untuk hash password
5. **Validation**: Validasi semua input dengan Joi
6. **HTTPS**: Gunakan HTTPS di production

## 📝 Lisensi

MIT License - Lihat file LICENSE untuk detail

## 👥 Kontribusi

Kontribusi sangat diterima! Silakan buat pull request dengan perubahan Anda.

---