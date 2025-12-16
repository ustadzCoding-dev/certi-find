import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Public Views
import LandingPage from '@/views/public/LandingPage.vue'
import CatalogPage from '@/views/public/CatalogPage.vue'
import DetailPage from '@/views/public/DetailPage.vue'
import LoginPage from '@/views/public/LoginPage.vue'
import RegisterPage from '@/views/public/RegisterPage.vue'
import AboutPage from '@/views/public/AboutPage.vue'

// User Views
import ProfilePage from '@/views/user/ProfilePage.vue'
import BookmarksPage from '@/views/user/BookmarksPage.vue'

// Admin Views
import AdminLayout from '@/views/admin/AdminLayout.vue'
import DashboardPage from '@/views/admin/DashboardPage.vue'
import CertListPage from '@/views/admin/CertListPage.vue'
import CertFormPage from '@/views/admin/CertFormPage.vue'
import UserListPage from '@/views/admin/UserListPage.vue'

const routes = [
    // Public Routes
    {
        path: '/',
        name: 'home',
        component: LandingPage,
        meta: { title: 'CertiFind - Discover Free Certifications' }
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: CatalogPage,
        meta: { title: 'Catalog - CertiFind' }
    },
    {
        path: '/certification/:id',
        name: 'certification-detail',
        component: DetailPage,
        meta: { title: 'Certification Details - CertiFind' }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: { title: 'Login - CertiFind', guestOnly: true }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: { title: 'Register - CertiFind', guestOnly: true }
    },
    {
        path: '/about',
        name: 'about',
        component: AboutPage,
        meta: { title: 'About - CertiFind' }
    },

    // Protected User Routes
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
        meta: { title: 'My Profile - CertiFind', requiresAuth: true }
    },
    {
        path: '/bookmarks',
        name: 'bookmarks',
        component: BookmarksPage,
        meta: { title: 'My Bookmarks - CertiFind', requiresAuth: true }
    },

    // Admin Routes
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true, requiresAdmin: true },
        children: [
            {
                path: '',
                name: 'admin-dashboard',
                component: DashboardPage,
                meta: { title: 'Admin Dashboard - CertiFind' }
            },
            {
                path: 'certifications',
                name: 'admin-certifications',
                component: CertListPage,
                meta: { title: 'Manage Certifications - CertiFind' }
            },
            {
                path: 'certifications/create',
                name: 'admin-cert-create',
                component: CertFormPage,
                meta: { title: 'Add Certification - CertiFind' }
            },
            {
                path: 'certifications/edit/:id',
                name: 'admin-cert-edit',
                component: CertFormPage,
                meta: { title: 'Edit Certification - CertiFind' }
            },
            {
                path: 'users',
                name: 'admin-users',
                component: UserListPage,
                meta: { title: 'Manage Users - CertiFind' }
            }
        ]
    },

    // 404 Catch-all
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/public/NotFoundPage.vue'),
        meta: { title: '404 - Page Not Found' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// Navigation Guards
router.beforeEach((to, from, next) => {
    // Update document title
    document.title = to.meta.title || 'CertiFind'

    const authStore = useAuthStore()

    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'login', query: { redirect: to.fullPath } })
        return
    }

    // Check if route requires admin role
    if (to.meta.requiresAdmin && !authStore.isAdmin) {
        next({ name: 'home' })
        return
    }

    // Check if route is for guests only (login/register)
    if (to.meta.guestOnly && authStore.isAuthenticated) {
        next({ name: 'home' })
        return
    }

    next()
})

export default router
