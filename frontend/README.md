# CertiFind Frontend

Frontend aplikasi CertiFind - Platform penemuan sertifikasi gratis. Dibangun dengan Vue 3, Vite, dan TailwindCSS.

## 🚀 Quick Start

### Instalasi
```bash
npm install
cp .env .env.local
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Environment Variables

**Development** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

**Production** (`.env.production`):
```env
VITE_API_URL=https://your-production-backend-url/api
```

### Scripts
- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview production build

## 📁 Struktur Folder

```
src/
├── components/
│   └── common/              # Shared components
│       ├── AppNavbar.vue
│       └── AppFooter.vue
├── views/
│   ├── public/              # Public pages
│   │   ├── LandingPage.vue
│   │   ├── CatalogPage.vue
│   │   ├── DetailPage.vue
│   │   ├── LoginPage.vue
│   │   ├── RegisterPage.vue
│   │   └── AboutPage.vue
│   ├── user/                # User pages
│   │   ├── BookmarksPage.vue
│   │   └── ProfilePage.vue
│   └── admin/               # Admin pages
│       ├── DashboardPage.vue
│       ├── CertListPage.vue
│       ├── CertFormPage.vue
│       └── UserListPage.vue
├── router/
│   └── index.js             # Vue Router configuration
├── stores/
│   ├── auth.js              # Authentication store (Pinia)
│   ├── cert.js              # Certification store
│   └── bookmark.js          # Bookmark store
├── services/
│   └── api.js               # Axios instance & API calls
├── App.vue                  # Root component
├── main.js                  # Entry point
├── index.css                # Global styles
└── style.css                # Additional styles
```

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework
- **Vue Toastification** - Toast notifications

## 📚 Development Guide

### Component Structure
Semua components menggunakan Vue 3 `<script setup>` syntax:

```vue
<script setup>
import { ref } from 'vue'

const message = ref('Hello')
</script>

<template>
  <div>{{ message }}</div>
</template>
```

### State Management (Pinia)
```javascript
// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  
  const login = async (email, password) => {
    // Login logic
  }
  
  return { user, token, login }
})
```

### API Calls
```javascript
// services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

## 🎨 Styling

Menggunakan TailwindCSS untuk styling. Konfigurasi ada di `tailwind.config.js`.

### Warna Tema
- Primary: Biru
- Secondary: Abu-abu
- Success: Hijau
- Error: Merah

## 🔐 Authentication

Token JWT disimpan di localStorage dan otomatis ditambahkan ke setiap request melalui axios interceptor.

## 📦 Build & Deployment

### Build Production
```bash
npm run build
```

Output akan berada di folder `dist/`.

### Deploy ke Netlify
Repository sudah dikonfigurasi dengan `netlify.toml` untuk auto-deploy.

## 🐛 Troubleshooting

**CORS Error?**
- Pastikan `VITE_API_URL` di `.env` sesuai dengan backend URL
- Pastikan backend sudah running

**Token tidak tersimpan?**
- Cek localStorage di browser DevTools
- Pastikan login berhasil (cek response API)

**Build gagal?**
- Hapus folder `node_modules` dan `dist`
- Jalankan `npm install` ulang
- Cek error message di console

## 📖 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
