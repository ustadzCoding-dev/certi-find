import { defineStore } from 'pinia'
import api from '@/services/api'

export const useBookmarkStore = defineStore('bookmarks', {
    state: () => ({
        bookmarks: [],
        loading: false,
        error: null
    }),

    getters: {
        bookmarkedIds: (state) => state.bookmarks.map(b => b.certificationId?.id || b.certificationId),

        isBookmarked: (state) => (certId) => {
            return state.bookmarks.some(b =>
                (b.certificationId?.id || b.certificationId) === certId
            )
        },

        bookmarkCount: (state) => state.bookmarks.length
    },

    actions: {
        async fetchBookmarks() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/bookmarks')
                this.bookmarks = response.data.data.bookmarks
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch bookmarks'
                console.error('Fetch bookmarks error:', error)
            } finally {
                this.loading = false
            }
        },

        async addBookmark(certificationId) {
            this.loading = true
            try {
                const response = await api.post('/bookmarks', { certificationId })
                // Add to local state
                this.bookmarks.push(response.data.data.bookmark)
                return response.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to add bookmark'
                throw error
            } finally {
                this.loading = false
            }
        },

        async removeBookmark(certificationId) {
            this.loading = true
            try {
                await api.delete(`/bookmarks/${certificationId}`)
                // Remove from local state
                this.bookmarks = this.bookmarks.filter(b =>
                    (b.certificationId?.id || b.certificationId) !== certificationId
                )
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to remove bookmark'
                throw error
            } finally {
                this.loading = false
            }
        },

        async toggleBookmark(certificationId) {
            if (this.isBookmarked(certificationId)) {
                await this.removeBookmark(certificationId)
                return false
            } else {
                await this.addBookmark(certificationId)
                return true
            }
        },

        clearBookmarks() {
            this.bookmarks = []
        }
    }
})
