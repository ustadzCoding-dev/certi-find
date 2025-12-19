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
        isAdmin: (state) => state.user?.role === 'admin',
        userName: (state) => state.user?.name || 'Guest',
        userInitials: (state) => {
            if (!state.user?.name) return 'G'
            return state.user.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)
        }
    },

    actions: {
        async register(userData) {
            this.loading = true
            this.error = null
            try {
                const response = await api.post('/auth/register', userData)
                this.token = response.data.data.token
                this.user = response.data.data.user
                localStorage.setItem('certifind_token', this.token)
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
            this.error = null
            try {
                const response = await api.post('/auth/login', credentials)
                this.token = response.data.data.token
                this.user = response.data.data.user
                localStorage.setItem('certifind_token', this.token)
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
            this.loading = true
            try {
                const response = await api.get('/auth/me')
                this.user = response.data.data.user
            } catch (error) {
                console.error('Fetch user error:', error)
                this.logout()
            } finally {
                this.loading = false
            }
        },

        async updateProfile(profileData) {
            this.loading = true
            try {
                const response = await api.put('/auth/profile', profileData)
                this.user = response.data.data
                return response.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Update failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        logout() {
            this.user = null
            this.token = null
            this.error = null
            localStorage.removeItem('certifind_token')
        },

        clearError() {
            this.error = null
        }
    }
})
