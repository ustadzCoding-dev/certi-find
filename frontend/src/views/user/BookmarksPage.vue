<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useBookmarkStore } from '@/stores/bookmarks'
import { useToast } from 'vue-toastification'
import AppButton from '@/components/common/AppButton.vue'

const bookmarkStore = useBookmarkStore()
const toast = useToast()
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  await bookmarkStore.fetchBookmarks()
  loading.value = false
})

const bookmarks = computed(() => {
  return bookmarkStore.bookmarks
})

const removeBookmark = async (certId) => {
  try {
    await bookmarkStore.removeBookmark(certId)
    toast.success('Removed from bookmarks')
  } catch (error) {
    toast.error('Failed to remove bookmark')
  }
}

const levelColors = {
  Beginner: 'bg-emerald-500/20 text-emerald-400',
  Intermediate: 'bg-amber-500/20 text-amber-400',
  Advanced: 'bg-red-500/20 text-red-400'
}
</script>

<template>
  <div class="min-h-screen py-12">
    <div class="container-custom">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">My Bookmarks</h1>
        <p class="text-text-secondary">Your saved certifications for quick access</p>
      </div>

      <!-- Bookmarks Grid -->
      <div v-if="bookmarks.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="bookmark in bookmarks"
          :key="bookmark._id"
          class="card card-hover group"
        >
          <!-- Thumbnail -->
          <div class="relative overflow-hidden aspect-video">
            <img
              :src="bookmark.certificationId.thumbnail"
              :alt="bookmark.certificationId.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-bg-secondary/80 to-transparent"></div>
            
            <!-- Provider badge -->
            <div class="absolute top-3 left-3">
              <span class="badge bg-bg-primary/80 backdrop-blur-sm text-white">
                {{ bookmark.certificationId.provider }}
              </span>
            </div>
            
            <!-- Remove button -->
            <button
              @click="removeBookmark(bookmark.certificationId._id)"
              class="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-5">
            <RouterLink :to="`/certification/${bookmark.certificationId._id}`">
              <h3 class="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-accent-primary transition-colors">
                {{ bookmark.certificationId.title }}
              </h3>
            </RouterLink>

            <p class="text-text-secondary text-sm line-clamp-2 mb-4">
              {{ bookmark.certificationId.description }}
            </p>

            <!-- Meta info -->
            <div class="flex items-center gap-3 flex-wrap">
              <span class="badge" :class="levelColors[bookmark.certificationId.level]">
                {{ bookmark.certificationId.level }}
              </span>
              <span class="text-text-muted text-xs flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ bookmark.certificationId.duration }}
              </span>
              <span v-if="bookmark.certificationId.isFree" class="badge badge-success">
                Free
              </span>
            </div>

            <!-- Actions -->
            <div class="mt-4 pt-4 border-t border-white/5 flex gap-2">
              <RouterLink :to="`/certification/${bookmark.certificationId._id}`" class="flex-1">
                <AppButton variant="primary" size="sm" block>
                  View Details
                </AppButton>
              </RouterLink>
              <AppButton
                variant="ghost"
                size="sm"
                @click="removeBookmark(bookmark.certificationId._id)"
              >
                <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </AppButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="w-24 h-24 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">No bookmarks yet</h3>
        <p class="text-text-secondary mb-6 max-w-md mx-auto">
          Start exploring certifications and bookmark your favorites to access them here.
        </p>
        <RouterLink to="/catalog">
          <AppButton variant="primary" size="lg">
            Browse Certifications
          </AppButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
