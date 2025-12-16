# Dokumen Project Plan

## Platform Rekomendasi Sertifikasi Gratis

**Nama Platform: CertiFind**

**List Anggota:**
1. **(ID)** - [Nama] - Full Stack Developer - **[Aktif]**

## A. Ringkasan Eksekutif

### Problem Statement

Mahasiswa dan fresh graduates sering kesulitan menemukan sertifikasi gratis yang relevan dengan bidang karir mereka. Informasi tersebar di berbagai platform tanpa sistem yang terorganisir, menyebabkan:

- **What:** Tidak ada platform terpusat untuk mencari sertifikasi gratis dengan fitur personalisasi
- **When:** Ketika mahasiswa mempersiapkan diri memasuki dunia kerja
- **Where:** Pencarian manual di Google, media sosial, atau forum
- **Who:** Mahasiswa, fresh graduates, job seekers, dan admin pengelola konten
- **Why:** Informasi tersebar, tidak terverifikasi, sulit difilter, dan tidak ada sistem tracking personal
- **How:** Diperlukan platform dengan authentication, admin panel untuk manajemen konten, dan notifikasi

**Dampak:** Waktu terbuang untuk searching, melewatkan sertifikasi berkualitas, tidak ada tracking progress pribadi, dan kesulitan memilih sertifikasi yang tepat untuk career path mereka.

### Research Questions

1. Bagaimana membuat sistem authentication yang aman namun tetap sederhana untuk MVP?
2. Bagaimana merancang admin panel yang efisien untuk CRUD sertifikasi?
3. Bagaimana mengimplementasikan email notification yang relevan tanpa spam?
4. Fitur-fitur apa yang paling efektif untuk meningkatkan engagement user?

### Latar Belakang

Sertifikasi online gratis dari platform seperti Coursera, edX, Google, Microsoft, dan lainnya dapat meningkatkan daya saing lulusan baru. Namun, informasi tentang sertifikasi ini tersebar dan tidak semua orang tahu platform mana yang menyediakan sertifikasi berkualitas secara gratis.

CertiFind hadir sebagai solusi lengkap yang menyediakan katalog terorganisir dengan fitur authentication untuk tracking personal, admin panel untuk manajemen konten yang dinamis, dan email notification untuk engagement.

### Alasan Memilih Proyek

1. **High Impact:** Membantu ribuan mahasiswa menemukan sertifikasi gratis dengan cepat
2. **Scalable:** Database sertifikasi dapat terus ditambah oleh admin
3. **Practical Value:** Langsung applicable untuk career preparation
4. **Complete System:** Authentication + CRUD + Notification = Real-world application
5. **Portfolio Value:** Menunjukkan kemampuan full-stack development yang komprehensif

---

## B. Cakupan Proyek dan Hasil Kerja

### Batasan Proyek

#### In Scope (Enhanced MVP - Yang Dikerjakan):

**Core Features:**
- ✅ **Landing Page** dengan value proposition jelas
- ✅ **Katalog Sertifikasi** (minimal 30-50 sertifikasi ter-kurasi)
- ✅ **Filter by Category** (IT, Business, Design, Marketing, Data Science)
- ✅ **Search by Keyword** (cari berdasarkan nama atau provider)
- ✅ **Detail Page** untuk setiap sertifikasi
- ✅ **Responsive Design** (mobile-friendly)

**Authentication & Profile:**
- ✅ **User Registration** (email, password, name, interest field)
- ✅ **User Login/Logout** dengan JWT authentication
- ✅ **User Profile Page** (view & edit profile)
- ✅ **Bookmark/Save Sertifikasi** (user dapat save favorit)
- ✅ **My Bookmarks Page** (daftar sertifikasi yang disimpan)
- ✅ **Protected Routes** (halaman yang hanya bisa diakses user login)
- ✅ **Social login** (Google OAuth)

**Admin Panel:**
- ✅ **Admin Login** (role-based authentication)
- ✅ **Admin Dashboard** (statistics: total certs, users, categories)
- ✅ **CRUD Sertifikasi:**
  - Create: Tambah sertifikasi baru dengan form
  - Read: List semua sertifikasi dengan pagination
  - Update: Edit sertifikasi existing
  - Delete: Hapus sertifikasi
- ✅ **Category Management** (tambah/edit kategori)
- ✅ **User Management** (view users, block/unblock)

**Email Notification:**
- ✅ **Welcome Email** (saat user register)
- ✅ **Bookmark Confirmation** (saat save sertifikasi)
- ✅ **Weekly Digest** (rekomendasi sertifikasi baru - optional)
- ✅ **Admin Notification** (saat ada user baru register)

#### Out of Scope (Tidak Dikerjakan pada MVP):

- ❌ Rating & review system
- ❌ Personalized AI/ML recommendation
- ❌ Progress tracking untuk setiap sertifikasi
- ❌ Community forum atau discussion
- ❌ Multi-language support
- ❌ Advanced analytics dashboard
- ❌ Payment gateway (semua sertifikasi gratis)
- ❌ Mobile app (React Native/Flutter)
- ❌ Real-time chat support
---

## D. Tech Stack & Tools

### Front-End

| Technology | Purpose | Why? |
|:-----------|:--------|:-----|
| **Vue 3** | UI Framework | Reactive, simple, component-based |
| **Vite** | Build Tool | Fast dev server, optimized build |
| **Vue Router** | Navigation | SPA routing + protected routes |
| **Pinia** | State Management | Store user auth state, bookmarks |
| **Tailwind CSS** | Styling | Rapid UI development, responsive |
| **Axios** | HTTP Client | API calls dengan interceptors untuk JWT |
| **VueUse** | Utilities | Form validation, composables |
| **Vue Toastification** | Notifications | Toast messages untuk feedback |

### Back-End

| Technology | Purpose | Why? |
|:-----------|:--------|:-----|
| **Node.js** | Runtime | JavaScript di server |
| **Express.js** | Web Framework | RESTful API, middleware support |
| **MongoDB** | Database | NoSQL, flexible schema untuk MVP |
| **Mongoose** | ODM | Schema validation, query builder |
| **JWT** | Authentication | Stateless token-based auth |
| **Bcrypt** | Password Hashing | Secure password storage |
| **Nodemailer** | Email Service | Send transactional emails |
| **Joi** | Validation | Request body validation |
| **dotenv** | Environment Variables | Config management |
| **CORS** | Cross-Origin | Allow Vue frontend access |

### Email Service

| Option | Use Case | Cost |
|:-------|:---------|:-----|
| **Nodemailer + Gmail SMTP** | Recommended untuk MVP | Free (max 500/day) |
| **SendGrid** | Scalable alternative | Free tier 100/day |
| **Mailgun** | Production-ready | Free tier available |

**Rekomendasi:** Gunakan **Nodemailer + Gmail SMTP** untuk MVP (gratis dan cukup).

### Deployment

| Component | Platform | Why? |
|:----------|:---------|:-----|
| **Frontend** | Vercel/Netlify | Free, auto-deploy from GitHub |
| **Backend** | Railway/Render | Free tier, supports Node.js + MongoDB |
| **Database** | MongoDB Atlas | Free tier 512MB, global cluster |
| **Email** | Gmail SMTP | Free, 500 emails/day |

### Development Tools

- **VS Code** + Extensions (Volar, ESLint, Prettier)
- **Postman** untuk API testing
- **MongoDB Compass** untuk database GUI
- **Vue DevTools** browser extension
- **Git + GitHub** version control
- **Figma** untuk design

---

## E. Database Design

### Entity Relationship Diagram (ERD)

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│     USERS       │         │  CERTIFICATIONS │         │   BOOKMARKS     │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤
│ _id (PK)        │         │ _id (PK)        │         │ _id (PK)        │
│ name            │         │ title           │         │ userId (FK)     │
│ email (unique)  │◄────┐   │ provider        │◄────┐   │ certId (FK)     │
│ password (hash) │     └───│ category        │     └───│ createdAt       │
│ role (enum)     │         │ description     │         └─────────────────┘
│ interestField   │         │ duration        │
│ createdAt       │         │ level           │
│ updatedAt       │         │ isFree          │
└─────────────────┘         │ freeNote        │
                            │ url             │
                            │ skills (array)  │
                            │ thumbnail       │
                            │ createdBy (FK)  │
                            │ createdAt       │
                            │ updatedAt       │
                            └─────────────────┘
```

### Collections Schema

#### 1. Users Collection

```javascript
const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 3
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  interestField: { 
    type: String, 
    enum: ['IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});
```

#### 2. Certifications Collection

```javascript
const CertificationSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
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
    minlength: 50
  },
  duration: { 
    type: String, 
    required: true 
  },
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  isFree: { 
    type: Boolean, 
    default: true 
  },
  freeNote: { 
    type: String 
  },
  url: { 
    type: String, 
    required: true,
    match: /^https?:\/\/.+/
  },
  skills: [{ 
    type: String 
  }],
  certificateType: { 
    type: String,
    default: 'Certificate of Completion'
  },
  language: { 
    type: String,
    default: 'English'
  },
  thumbnail: { 
    type: String,
    default: '/images/default-cert.jpg'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});
```

#### 3. Bookmarks Collection

```javascript
const BookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  certificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certification',
    required: true
  }
}, { 
  timestamps: true 
});

// Compound index untuk prevent duplicate bookmarks
BookmarkSchema.index({ userId: 1, certificationId: 1 }, { unique: true });
```

---

## F. API Endpoints Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| POST | `/api/auth/register` | Register user baru | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user profile | Yes (User) |
| PUT | `/api/auth/profile` | Update user profile | Yes (User) |

**Example Request - Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "interestField": "IT"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "interestField": "IT"
    }
  }
}
```

### Certification Endpoints (Public)

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| GET | `/api/certifications` | Get all certifications (with filters) | No |
| GET | `/api/certifications/:id` | Get certification by ID | No |
| GET | `/api/certifications/category/:category` | Get by category | No |
| GET | `/api/certifications/search?q=keyword` | Search certifications | No |

**Example Request - Get All with Filters:**
```
GET /api/certifications?category=IT&level=Beginner&page=1&limit=12
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "certifications": [...],
    "pagination": {
      "total": 45,
      "page": 1,
      "pages": 4,
      "limit": 12
    }
  }
}
```

### Certification Endpoints (Admin Only)

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| POST | `/api/certifications` | Create new certification | Yes (Admin) |
| PUT | `/api/certifications/:id` | Update certification | Yes (Admin) |
| DELETE | `/api/certifications/:id` | Delete certification | Yes (Admin) |

**Example Request - Create Certification:**
```json
POST /api/certifications
Headers: { "Authorization": "Bearer <admin_token>" }
{
  "title": "AWS Cloud Practitioner",
  "provider": "Amazon Web Services",
  "category": "IT",
  "description": "Introduction to AWS cloud services...",
  "duration": "3-4 months",
  "level": "Beginner",
  "isFree": true,
  "freeNote": "Free training materials, exam costs $100",
  "url": "https://aws.amazon.com/certification/",
  "skills": ["Cloud Computing", "AWS", "Infrastructure"],
  "certificateType": "Professional Certificate",
  "language": "English"
}
```

### Bookmark Endpoints

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| GET | `/api/bookmarks` | Get user's bookmarks | Yes (User) |
| POST | `/api/bookmarks` | Add bookmark | Yes (User) |
| DELETE | `/api/bookmarks/:certId` | Remove bookmark | Yes (User) |

**Example Request - Add Bookmark:**
```json
POST /api/bookmarks
Headers: { "Authorization": "Bearer <user_token>" }
{
  "certificationId": "507f1f77bcf86cd799439011"
}
```

### Admin Dashboard Endpoints

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| GET | `/api/admin/stats` | Get dashboard statistics | Yes (Admin) |
| GET | `/api/admin/users` | Get all users | Yes (Admin) |
| PUT | `/api/admin/users/:id/block` | Block/Unblock user | Yes (Admin) |

**Example Response - Dashboard Stats:**
```json
{
  "success": true,
  "data": {
    "totalCertifications": 48,
    "totalUsers": 245,
    "totalBookmarks": 892,
    "categoriesCount": {
      "IT": 15,
      "Data Science": 12,
      "Business": 8,
      "Design": 7,
      "Marketing": 6
    },
    "recentUsers": [...],
    "recentCertifications": [...]
  }
}
```

---

## G. Email Templates & Triggers

### 1. Welcome Email

**Trigger:** User completes registration

**Template:**
```
Subject: Welcome to CertiFind! 🎓

Hi {{name}},

Welcome to CertiFind! We're excited to help you discover free certifications for your career growth.

Here's what you can do:
✅ Browse 50+ curated free certifications
✅ Save your favorite certifications
✅ Get personalized recommendations based on your interest: {{interestField}}

Start exploring: [View Certifications]

Happy learning!

The CertiFind Team
```

**Implementation:**
```javascript
const sendWelcomeEmail = async (user) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Welcome to CertiFind! 🎓',
    html: welcomeTemplate(user.name, user.interestField)
  };
  
  await transporter.sendMail(mailOptions);
};
```

### 2. Bookmark Confirmation Email

**Trigger:** User bookmarks a certification

**Template:**
```
Subject: Certification Saved: {{certTitle}}

Hi {{userName}},

You've successfully saved "{{certTitle}}" to your bookmarks!

Quick Details:
📚 Provider: {{provider}}
⏱️ Duration: {{duration}}
🎯 Level: {{level}}

Access your bookmarks anytime: [My Bookmarks]

Ready to start learning? [Go to Certification]

Keep learning!
CertiFind Team
```

### 3. Admin Notification (New User)

**Trigger:** New user registers

**Template:**
```
Subject: [CertiFind Admin] New User Registration

New user registered:

Name: {{name}}
Email: {{email}}
Interest: {{interestField}}
Registered: {{timestamp}}

View in admin panel: [Admin Dashboard]
```

### 4. Weekly Digest (Optional - Future)

**Trigger:** Every Monday 9 AM (cron job)

**Template:**
```
Subject: This Week's Top Certifications 🚀

Hi {{name}},

Check out new certifications added this week in {{interestField}}:

1. {{cert1Title}} - {{provider1}}
2. {{cert2Title}} - {{provider2}}
3. {{cert3Title}} - {{provider3}}

[View All New Certifications]

Not interested? [Unsubscribe]
```

---

## H. Frontend Routes & Pages

### Public Routes (No Auth Required)

| Route | Component | Description |
|:------|:----------|:------------|
| `/` | LandingPage | Hero, value prop, CTA |
| `/catalog` | CatalogPage | Browse all certifications |
| `/certification/:id` | DetailPage | Certification details |
| `/login` | LoginPage | User login form |
| `/register` | RegisterPage | User registration form |
| `/about` | AboutPage | About CertiFind |

### Protected Routes (Auth Required - User)

| Route | Component | Description |
|:------|:----------|:------------|
| `/profile` | ProfilePage | View & edit profile |
| `/bookmarks` | BookmarksPage | Saved certifications |
| `/dashboard` | UserDashboard | Personal dashboard (optional) |

### Admin Routes (Auth Required - Admin Only)

| Route | Component | Description |
|:------|:----------|:------------|
| `/admin` | AdminDashboard | Statistics overview |
| `/admin/certifications` | AdminCertList | List all certifications |
| `/admin/certifications/create` | AdminCertCreate | Create new certification |
| `/admin/certifications/edit/:id` | AdminCertEdit | Edit certification |
| `/admin/users` | AdminUserList | Manage users |
| `/admin/categories` | AdminCategories | Manage categories (optional) |

### Route Guards Implementation

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  // Public routes
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginPage },
  
  // Protected user routes
  {
    path: '/profile',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/bookmarks',
    component: BookmarksPage,
    meta: { requiresAuth: true }
  },
  
  // Admin routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', component: AdminDashboard },
      { path: 'certifications', component: AdminCertList },
      { path: 'certifications/create', component: AdminCertCreate }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && authStore.user?.role !== 'admin') {
    next('/')
  } else {
    next()
  }
})

export default router
```

---

## I. State Management (Pinia Stores)

### 1. Auth Store

```javascript
// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    userName: (state) => state.user?.name || 'Guest'
  },
  
  actions: {
    async register(userData) {
      this.loading = true
      try {
        const response = await axios.post('/api/auth/register', userData)
        this.token = response.data.data.token
        this.user = response.data.data.user
        localStorage.setItem('token', this.token)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async login(credentials) {
      this.loading = true
      try {
        const response = await axios.post('/api/auth/login', credentials)
        this.token = response.data.data.token
        this.user = response.data.data.user
        localStorage.setItem('token', this.token)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async fetchUser() {
      if (!this.token) return
      try {
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = response.data.data
      } catch (error) {
        this.logout()
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
```

### 2. Certification Store

```javascript
// stores/certifications.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCertificationStore = defineStore('certifications', {
  state: () => ({
    certifications: [],
    currentCert: null,
    filters: {
      category: 'all',
      level: 'all',
      searchQuery: ''
    },
    loading: false,
    pagination: {
      page: 1,
      limit: 12,
      total: 0
    }
  }),
  
  getters: {
    filteredCertifications: (state) => {
      let result = state.certifications
      
      if (state.filters.category !== 'all') {
        result = result.filter(c => c.category === state.filters.category)
      }
      
      if (state.filters.level !== 'all') {
        result = result.filter(c => c.level === state.filters.level)
      }
      
      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase()
        result = result.filter(c => 
          c.title.toLowerCase().includes(query) ||
          c.provider.toLowerCase().includes(query)
        )
      }
      
      return result
    }
  },
  
  actions: {
    async fetchCertifications() {
      this.loading = true
      try {
        const params = {
          page: this.pagination.page,
          limit: this.pagination.limit,
          ...(this.filters.category !== 'all' && { category: this.filters.category }),
          ...(this.filters.level !== 'all' && { level: this.filters.level }),
          ...(this.filters.searchQuery && { q: this.filters.searchQuery })
        }
        
        const response = await axios.get('/api/certifications', { params })
        this.certifications = response.data.data.certifications
        this.pagination = response.data.data.pagination
      } catch (error) {
        console.error('Fetch certifications error:', error)
      } finally {
        this.loading = false
      }
    },
    
    async fetchCertificationById(id) {
      try {
        const response = await axios.get(`/api/certifications/${id}`)
        this.currentCert = response.data.data
      } catch (error) {
        console.error('Fetch certification error:', error)
      }
    },
    
    setFilter(filterType, value) {
      this.filters[filterType] = value
      this.pagination.page = 1 // Reset to first page
      this.fetchCertifications()
    }
  }
})
```

### 3. Bookmark Store

```javascript
// stores/bookmarks.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useBookmarkStore = defineStore('bookmarks', {
  state: () => ({
    bookmarks: [],
    loading: false
  }),
  
  getters: {
    bookmarkedIds: (state) => state.bookmarks.map(b => b.certificationId),
    isBookmarked: (state) => (certId) => state.bookmarkedIds.includes(certId)
  },
  
  actions: {
    async fetchBookmarks() {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) return
      
      this.loading = true
      try {
        const response = await axios.get('/api/bookmarks', {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        this.bookmarks = response.data.data
      } catch (error) {
        console.error('Fetch bookmarks error:', error)
      } finally {
        this.loading = false
      }
    },
    
    async addBookmark(certificationId) {
      const authStore = useAuthStore()
      try {
        await axios.post('/api/bookmarks', 
          { certificationId },
          { headers: { Authorization: `Bearer ${authStore.token}` } }
        )
        await this.fetchBookmarks()
      } catch (error) {
        console.error('Add bookmark error:', error)
        throw error
      }
    },
    
    async removeBookmark(certificationId) {
      const authStore = useAuthStore()
      try {
        await axios.delete(`/api/bookmarks/${certificationId}`, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        await this.fetchBookmarks()
      } catch (error) {
        console.error('Remove bookmark error:', error)
        throw error
      }
    }
  }
})
```

---

## K. Testing Strategy

### Unit Testing

**Backend (Mocha + Chai / Jest):**
```javascript
// Example: Test user registration
describe('POST /api/auth/register', () => {
  it('should register new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        interestField: 'IT'
      });
    
    expect(response.status).to.equal(201);
    expect(response.body.data).to.have.property('token');
  });
  
  it('should reject duplicate email', async () => {
    // First registration
    await registerUser();
    
    // Duplicate attempt
    const response = await registerDuplicateUser();
    expect(response.status).to.equal(400);
  });
});
```

**Frontend (Vitest + Vue Test Utils):**
```javascript
// Example: Test login form
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import LoginForm from '@/components/LoginForm.vue'

describe('LoginForm', () => {
  it('validates email format', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [createPinia()]
      }
    });
    
    await wrapper.find('input[type="email"]').setValue('invalid-email');
    await wrapper.find('form').trigger('submit');
    
    expect(wrapper.text()).toContain('Invalid email format');
  });
});
```

### Integration Testing

**Test Scenarios:**

1. **Complete User Flow:**
   - Register → Login → Browse Catalog → Bookmark → View Bookmarks → Logout

2. **Admin Flow:**
   - Admin Login → View Dashboard → Create Certification → Edit → Delete

3. **Email Flow:**
   - Register → Check email sent
   - Bookmark → Check confirmation email

4. **Security Flow:**
   - Access protected route without auth → Redirect to login
   - User tries to access admin route → Forbidden
---
### 2. Source Code

**GitHub Repository Structure:**
```
certifind/
├── frontend/               # Vue 3 app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── views/         # Page components
│   │   ├── stores/        # Pinia stores
│   │   ├── router/        # Vue Router config
│   │   ├── services/      # API services
│   │   ├── utils/         # Helper functions
│   │   └── assets/        # Images, icons
│   ├── public/
│   └── package.json
│
├── backend/               # Express API
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth, validation
│   │   ├── services/      # Email, utils
│   │   └── config/        # DB, environment
│   ├── tests/            # API tests
│   └── package.json
│
├── docs/                  # Documentation
│   ├── API.md            # API documentation
│   ├── USER_GUIDE.md     # User manual
│   └── DEVELOPER.md      # Setup guide
│
└── README.md             # Main readme
```

### 3. Documentation

**README.md (Main):**
```markdown
# CertiFind - Platform Rekomendasi Sertifikasi Gratis

## 🎯 Overview
Platform untuk membantu mahasiswa menemukan sertifikasi gratis...

## ✨ Features
- User authentication & profile
- Browse 50+ certifications
- Search & filter
- Bookmark favorites
- Admin panel (CRUD)
- Email notifications

## 🚀 Tech Stack
**Frontend:** Vue 3, Vite, Tailwind CSS, Pinia
**Backend:** Node.js, Express, MongoDB, JWT
**Email:** Nodemailer

## 📦 Installation
[Detailed setup instructions...]

## 🔑 Environment Variables
[List of required env vars...]

## 📱 Screenshots
[Include screenshots of main features...]

## 👥 Team
[Your name and role...]

## 📄 License
MIT
```

**API.md (API Documentation):**
- List all endpoints
- Request/response examples
- Authentication flow
- Error codes

**USER_GUIDE.md (User Manual):**
- How to register
- How to search certifications
- How to bookmark
- Admin features guide

### 4. Presentation Materials

**Slide Deck (12-15 slides):**
1. Cover slide
2. Problem statement
3. Solution overview
4. Key features demo (screenshots)
5. Tech stack
6. Architecture diagram
7. Database design
8. User flow
9. Admin panel demo
10. Email notification demo
11. Challenges & solutions
12. Future roadmap
13. Demo video QR code
14. Thank you + Q&A

**Video Demo (5-7 minutes):**
- Intro (30 sec): Problem + solution
- User journey (2 min): Register → Browse → Bookmark
- Admin demo (2 min): Login → CRUD certifications
- Email demo (1 min): Show inbox
- Outro (30 sec): Tech stack + thank you

### Development Principles:
- **Agile Methodology:** Iterative development with weekly sprints
- **Test-Driven:** Write tests alongside features
- **Documentation-First:** Document as you code
- **Code Quality:** ESLint, Prettier, code reviews
- **Version Control:** Git branching strategy (main, develop, feature branches)

---

**Let's build something amazing! 🚀**

---

*Dokumen ini adalah living document dan dapat diupdate seiring progress proyek.*

**Version:** 1.0  
**Last Updated:** [Current Date]  
**Author:** [Your Name]  
**Project:** CertiFind - Platform Rekomendasi Sertifikasi Gratis