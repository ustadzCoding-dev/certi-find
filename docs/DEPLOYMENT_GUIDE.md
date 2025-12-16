# 🚀 Panduan Deploy CertiFind

## Arsitektur Deployment

```
┌─────────────────────┐         ┌─────────────────────┐
│      NETLIFY        │         │      RAILWAY        │
│   (Frontend SPA)    │ ◄─────► │   (Backend API)     │
│                     │   API   │                     │
│  certifind.netlify  │  Calls  │  certifind.railway  │
│       .app          │         │       .app          │
└─────────────────────┘         └─────────────────────┘
                                         │
                                         │
                                         ▼
                                ┌─────────────────────┐
                                │   MONGODB ATLAS     │
                                │   (Cloud Database)  │
                                └─────────────────────┘
```

---

## BAGIAN 1: Setup MongoDB Atlas (Database Cloud)

### Langkah 1: Buat Akun MongoDB Atlas
1. Kunjungi https://www.mongodb.com/cloud/atlas
2. Klik **"Try Free"** atau **"Start Free"**
3. Daftar dengan email atau login dengan Google

### Langkah 2: Buat Cluster Baru
1. Pilih **FREE** tier (M0 Sandbox)
2. Pilih region terdekat (Singapore/Tokyo untuk Asia)
3. Beri nama cluster: `certifind-cluster`
4. Klik **"Create Cluster"** (tunggu 3-5 menit)

### Langkah 3: Setup Database Access
1. Di sidebar kiri, klik **"Database Access"**
2. Klik **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `certifind_user`
5. Password: (generate password yang kuat, **CATAT!**)
6. Database User Privileges: **Atlas admin**
7. Klik **"Add User"**

### Langkah 4: Setup Network Access
1. Di sidebar kiri, klik **"Network Access"**
2. Klik **"Add IP Address"**
3. Klik **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Klik **"Confirm"**

### Langkah 5: Dapatkan Connection String
1. Kembali ke **"Database"** di sidebar
2. Klik **"Connect"** pada cluster Anda
3. Pilih **"Connect your application"**
4. Driver: **Node.js**, Version: **4.1 or later**
5. Copy connection string, contoh:
   ```
   mongodb+srv://certifind_user:<password>@certifind-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Ganti `<password>` dengan password yang Anda buat
7. Tambahkan nama database setelah `.net/`:
   ```
   mongodb+srv://certifind_user:YourPassword@certifind-cluster.xxxxx.mongodb.net/certifind?retryWrites=true&w=majority
   ```

---

## BAGIAN 2: Deploy Backend ke Railway

### Langkah 1: Buat Akun Railway
1. Kunjungi https://railway.app
2. Klik **"Login"** → **"Login with GitHub"**
3. Authorize Railway untuk mengakses GitHub Anda

### Langkah 2: Buat Project Baru
1. Di dashboard Railway, klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository **`ustadzCoding-dev/certiFind`**
4. Railway akan mendeteksi proyek Anda

### Langkah 3: Konfigurasi Root Directory
1. Setelah project terbuat, klik pada service yang dibuat
2. Pergi ke tab **"Settings"**
3. Di bagian **"Root Directory"**, masukkan: `backend`
4. Ini memberitahu Railway bahwa backend ada di folder `/backend`

### Langkah 4: Konfigurasi Environment Variables
1. Klik pada service backend
2. Pergi ke tab **"Variables"**
3. Klik **"Raw Editor"** dan paste:

```env
PORT=5000
MONGODB_URI=mongodb+srv://certifind_user:YourPassword@certifind-cluster.xxxxx.mongodb.net/certifind?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random_123456
JWT_EXPIRES_IN=7d
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=CertiFind <noreply@certifind.com>
FRONTEND_URL=https://your-app-name.netlify.app
```

> ⚠️ **PENTING:** 
> - Ganti `MONGODB_URI` dengan connection string Atlas Anda
> - Ganti `JWT_SECRET` dengan string random yang panjang
> - `FRONTEND_URL` akan diupdate setelah deploy Netlify

### Langkah 5: Konfigurasi Start Command
1. Di tab **"Settings"**
2. Scroll ke **"Start Command"**
3. Masukkan: `npm start`

### Langkah 6: Deploy
1. Railway akan otomatis deploy
2. Tunggu hingga status menjadi **"Deployed"** (2-5 menit)
3. Di tab **"Settings"**, scroll ke **"Domains"**
4. Klik **"Generate Domain"**
5. Anda akan mendapat URL seperti: `https://certifind-backend-production.up.railway.app`

### Langkah 7: Test Backend
Buka browser dan akses:
```
https://your-railway-url.up.railway.app/api/certifications
```
Jika berhasil, Anda akan melihat response JSON.

---

## BAGIAN 3: Deploy Frontend ke Netlify

### Langkah 1: Persiapan - Update API URL

Sebelum deploy, update file **`frontend/.env.production`**:

```env
VITE_API_URL=https://your-railway-url.up.railway.app/api
```

**ATAU** buat file baru `frontend/netlify.toml`:

```toml
[build]
  base = "frontend"
  publish = "dist"
  command = "npm run build"

[build.environment]
  VITE_API_URL = "https://your-railway-url.up.railway.app/api"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

> Ganti `your-railway-url` dengan URL Railway Anda yang sebenarnya.

### Langkah 2: Buat Akun Netlify
1. Kunjungi https://www.netlify.com
2. Klik **"Sign up"** → **"Sign up with GitHub"**
3. Authorize Netlify

### Langkah 3: Import Project
1. Di dashboard Netlify, klik **"Add new site"**
2. Pilih **"Import an existing project"**
3. Pilih **"Deploy with GitHub"**
4. Pilih repository **`ustadzCoding-dev/certiFind`**

### Langkah 4: Konfigurasi Build Settings
1. **Base directory:** `frontend`
2. **Build command:** `npm run build`
3. **Publish directory:** `frontend/dist`

### Langkah 5: Konfigurasi Environment Variables
1. Klik **"Show advanced"** sebelum deploy
2. Klik **"New variable"**
3. Tambahkan:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-railway-url.up.railway.app/api`

### Langkah 6: Deploy
1. Klik **"Deploy site"**
2. Tunggu proses build (2-5 menit)
3. Setelah selesai, Anda akan mendapat URL seperti:
   `https://random-name-12345.netlify.app`

### Langkah 7: Custom Domain (Opsional)
1. Di site settings, pilih **"Domain settings"**
2. Klik **"Edit site name"**
3. Ubah menjadi: `certifind` (jika tersedia)
4. URL final: `https://certifind.netlify.app`

### Langkah 8: Setup Redirects untuk SPA
1. Buat file `frontend/public/_redirects`:
   ```
   /*    /index.html   200
   ```
   
2. Commit dan push perubahan:
   ```bash
   git add .
   git commit -m "Add Netlify redirects"
   git push
   ```

---

## BAGIAN 4: Update CORS & Environment

### Update Backend CORS (Railway)

Setelah mendapat URL Netlify, update environment variable di Railway:

1. Buka Railway dashboard
2. Pilih service backend
3. Tab **"Variables"**
4. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://certifind.netlify.app
   ```
5. Railway akan otomatis redeploy

### Seed Database Production

Untuk mengisi data awal di production database:

**Opsi 1: Via Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Run seed
railway run npm run seed
```

**Opsi 2: Via Railway Shell**
1. Buka Railway dashboard
2. Klik service backend
3. Klik tab **"Shell"** (jika tersedia)
4. Jalankan: `npm run seed`

**Opsi 3: Sementara aktifkan seed di production**
1. Tambahkan endpoint seed di `backend/src/routes/adminRoutes.js`:
   ```javascript
   // TEMPORARY: Remove after seeding
   router.post('/seed-database', async (req, res) => {
     // Run seed logic here
   });
   ```
2. Akses endpoint tersebut sekali untuk seed
3. Hapus endpoint setelah selesai

---

## BAGIAN 5: Testing Production

### Checklist Testing

| Test | URL | Expected |
|------|-----|----------|
| Frontend Home | https://certifind.netlify.app | Landing page tampil |
| Catalog | https://certifind.netlify.app/catalog | Daftar sertifikasi dari API |
| Backend Health | https://your-railway.app/api/certifications | JSON response |
| Login | https://certifind.netlify.app/login | Login dengan admin@certifind.com |
| Admin Panel | https://certifind.netlify.app/admin | Dashboard admin |

### Troubleshooting

**Problem: CORS Error**
- Pastikan `FRONTEND_URL` di Railway sesuai dengan URL Netlify (tanpa trailing slash)
- Restart service Railway setelah update environment

**Problem: API Not Found**
- Pastikan `VITE_API_URL` di Netlify sudah benar
- Pastikan menggunakan `/api` di akhir URL backend

**Problem: Database Connection Failed**
- Pastikan IP `0.0.0.0/0` di-allow di MongoDB Atlas Network Access
- Verifikasi connection string di Railway Variables

**Problem: 404 on Page Refresh**
- Pastikan file `_redirects` ada di `frontend/public/`
- Atau gunakan `netlify.toml` dengan redirects configuration

---

## BAGIAN 6: URLs Final

Setelah deployment selesai, Anda akan memiliki:

| Service | URL |
|---------|-----|
| Frontend (Netlify) | `https://certifind.netlify.app` |
| Backend API (Railway) | `https://certifind-production.up.railway.app/api` |
| Database (MongoDB Atlas) | `certifind-cluster.xxxxx.mongodb.net` |

### Akun Demo Production

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@certifind.com | admin123 |
| User | demo@certifind.com | demo123 |

---

## Tips Keamanan Production

1. **Jangan commit file `.env`** - sudah ada di `.gitignore`
2. **Gunakan JWT_SECRET yang kuat** - minimal 32 karakter random
3. **Aktifkan HTTPS** - Netlify dan Railway sudah menyediakan HTTPS otomatis
4. **Batasi CORS** - hanya izinkan domain frontend Anda
5. **Monitor logs** - gunakan Railway Logs untuk debugging

---

## Biaya

| Service | Free Tier |
|---------|-----------|
| Netlify | 100GB bandwidth/bulan, unlimited sites |
| Railway | $5 credit/bulan (cukup untuk development) |
| MongoDB Atlas | 512MB storage, shared cluster |

> 💡 Untuk production serius, pertimbangkan upgrade ke paid tier.

---

🎉 **Selamat! CertiFind Anda sekarang live di internet!**
