<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBookmarkStore } from '@/stores/bookmarks'
import { useToast } from 'vue-toastification'

const props = defineProps({
  certification: {
    type: Object,
    required: true
  },
  showBookmark: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['bookmark'])

const authStore = useAuthStore()
const bookmarkStore = useBookmarkStore()
const toast = useToast()

const isBookmarked = computed(() => {
  return bookmarkStore.isBookmarked(props.certification._id)
})

const levelColors = {
  Beginner: 'bg-emerald-500/20 text-emerald-400',
  Intermediate: 'bg-amber-500/20 text-amber-400',
  Advanced: 'bg-red-500/20 text-red-400'
}

const handleBookmark = async () => {
  if (!authStore.isAuthenticated) {
    toast.warning('Please login to bookmark certifications')
    return
  }
  
  try {
    const added = await bookmarkStore.toggleBookmark(props.certification._id)
    if (added) {
      toast.success('Added to bookmarks!')
    } else {
      toast.info('Removed from bookmarks')
    }
    emit('bookmark', props.certification._id)
  } catch (error) {
    toast.error('Failed to update bookmark')
  }
}

// Default thumbnail if not provided
const thumbnailUrl = computed(() => {
  return props.certification.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
})
</script>

<template>
  <div class="card card-hover group">
    <!-- Thumbnail -->
    <div class="relative overflow-hidden aspect-video">
      <img
        :src="thumbnailUrl"
        :alt="certification.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <!-- Overlay gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-bg-secondary/80 to-transparent"></div>
      
      <!-- Provider badge -->
      <div class="absolute top-3 left-3">
        <span class="badge bg-bg-primary/80 backdrop-blur-sm text-white">
          {{ certification.provider }}
        </span>
      </div>
      
      <!-- Bookmark button -->
      <button
        v-if="showBookmark"
        @click.prevent="handleBookmark"
        class="absolute top-3 right-3 w-9 h-9 rounded-full bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-accent-primary"
        :class="{ 'bg-accent-primary': isBookmarked }"
      >
        <svg
          class="w-5 h-5"
          :class="isBookmarked ? 'text-white' : 'text-text-secondary'"
          :fill="isBookmarked ? 'currentColor' : 'none'"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Title -->
      <RouterLink :to="`/certification/${certification._id}`">
        <h3 class="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-accent-primary transition-colors">
          {{ certification.title }}
        </h3>
      </RouterLink>

      <!-- Description -->
      <p class="text-text-secondary text-sm line-clamp-2 mb-4">
        {{ certification.description }}
      </p>

      <!-- Meta info -->
      <div class="flex items-center gap-3 flex-wrap">
        <!-- Level badge -->
        <span class="badge" :class="levelColors[certification.level] || 'badge-primary'">
          {{ certification.level }}
        </span>
        
        <!-- Duration -->
        <span class="text-text-muted text-xs flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ certification.duration }}
        </span>
        
        <!-- Free badge -->
        <span v-if="certification.isFree" class="badge badge-success">
          Free
        </span>
      </div>

      <!-- Skills preview -->
      <div v-if="certification.skills?.length" class="mt-4 flex gap-2 flex-wrap">
        <span
          v-for="skill in certification.skills.slice(0, 3)"
          :key="skill"
          class="px-2 py-1 bg-bg-tertiary rounded text-xs text-text-secondary"
        >
          {{ skill }}
        </span>
        <span
          v-if="certification.skills.length > 3"
          class="px-2 py-1 text-xs text-text-muted"
        >
          +{{ certification.skills.length - 3 }} more
        </span>
      </div>
    </div>
  </div>
</template>
