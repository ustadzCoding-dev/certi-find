import { defineStore } from 'pinia'
import api from '@/services/api'

export const useCertificationStore = defineStore('certifications', {
    state: () => ({
        certifications: [],
        currentCert: null,
        categories: ['IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        filters: {
            category: 'all',
            level: 'all',
            searchQuery: ''
        },
        loading: false,
        error: null,
        pagination: {
            page: 1,
            limit: 12,
            total: 0,
            pages: 0
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
                    c.provider.toLowerCase().includes(query) ||
                    c.skills?.some(s => s.toLowerCase().includes(query))
                )
            }

            return result
        },

        totalCertifications: (state) => state.pagination.total,

        hasMorePages: (state) => state.pagination.page < state.pagination.pages
    },

    actions: {
        async fetchCertifications(append = false) {
            this.loading = true
            this.error = null
            try {
                const params = {
                    page: this.pagination.page,
                    limit: this.pagination.limit,
                    ...(this.filters.category !== 'all' && { category: this.filters.category }),
                    ...(this.filters.level !== 'all' && { level: this.filters.level }),
                    ...(this.filters.searchQuery && { q: this.filters.searchQuery })
                }

                const response = await api.get('/certifications', { params })

                if (append) {
                    this.certifications = [...this.certifications, ...response.data.data.certifications]
                } else {
                    this.certifications = response.data.data.certifications
                }

                this.pagination = {
                    ...this.pagination,
                    ...response.data.data.pagination
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch certifications'
                console.error('Fetch certifications error:', error)
            } finally {
                this.loading = false
            }
        },

        async fetchCertificationById(id) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get(`/certifications/${id}`)
                this.currentCert = response.data.data.certification
                return response.data.data.certification
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch certification'
                console.error('Fetch certification error:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchByCategory(category) {
            this.filters.category = category
            this.pagination.page = 1
            await this.fetchCertifications()
        },

        async searchCertifications(query) {
            this.filters.searchQuery = query
            this.pagination.page = 1
            await this.fetchCertifications()
        },

        setFilter(filterType, value) {
            this.filters[filterType] = value
            this.pagination.page = 1
            this.fetchCertifications()
        },

        resetFilters() {
            this.filters = {
                category: 'all',
                level: 'all',
                searchQuery: ''
            }
            this.pagination.page = 1
            this.fetchCertifications()
        },

        async loadMore() {
            if (this.hasMorePages && !this.loading) {
                this.pagination.page++
                await this.fetchCertifications(true)
            }
        },

        // Admin actions
        async createCertification(certData) {
            this.loading = true
            try {
                const response = await api.post('/certifications', certData)
                this.certifications.unshift(response.data.data)
                return response.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to create certification'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateCertification(id, certData) {
            this.loading = true
            try {
                const response = await api.put(`/certifications/${id}`, certData)
                const index = this.certifications.findIndex(c => c._id === id)
                if (index !== -1) {
                    this.certifications[index] = response.data.data
                }
                return response.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to update certification'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteCertification(id) {
            this.loading = true
            try {
                await api.delete(`/certifications/${id}`)
                this.certifications = this.certifications.filter(c => c._id !== id)
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to delete certification'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})
