# CertiFind Backend API

Backend API untuk platform penemuan sertifikasi gratis.

## 🚀 Quick Start

### Instalasi
```bash
npm install
cp .env.example .env
npm run dev
```

### Environment Variables
Lihat `backend/.env.example` untuk template lengkap.

**Konfigurasi Penting:**
- `MONGODB_URI` - Connection string MongoDB
- `JWT_SECRET` - Secret key untuk JWT (gunakan string random yang kuat)
- `SMTP_*` - Konfigurasi email (Gmail SMTP)

### Scripts
- `npm run dev` - Jalankan dengan nodemon (development)
- `npm start` - Jalankan production
- `npm run seed` - Seed database dengan data contoh

## 📁 Struktur Folder

```
src/
├── config/
│   ├── db.js           # MongoDB connection
│   └── email.js        # Email configuration
├── controllers/        # Request handlers
├── middleware/         # Custom middleware
├── models/            # Mongoose schemas
├── routes/            # API routes
├── services/          # Business logic
└── validators/        # Input validation
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Certifications
- `GET /api/certifications` - List sertifikasi
- `GET /api/certifications/:id` - Detail sertifikasi
- `POST /api/certifications` - Create (admin)
- `PUT /api/certifications/:id` - Update (admin)
- `DELETE /api/certifications/:id` - Delete (admin)

### Bookmarks
- `GET /api/bookmarks` - List bookmark user
- `POST /api/bookmarks/:certId` - Add bookmark
- `DELETE /api/bookmarks/:certId` - Remove bookmark

### Admin
- `GET /api/admin/users` - List users
- `GET /api/admin/stats` - Platform stats

## 🔐 Security

- JWT untuk authentication
- bcryptjs untuk password hashing
- Joi untuk input validation
- CORS configuration
- Environment variables untuk sensitive data
