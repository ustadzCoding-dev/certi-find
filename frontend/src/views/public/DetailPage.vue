<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useCertificationStore } from '@/stores/certifications'
import { useBookmarkStore } from '@/stores/bookmarks'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import AppButton from '@/components/common/AppButton.vue'

const route = useRoute()
const router = useRouter()
const certStore = useCertificationStore()
const bookmarkStore = useBookmarkStore()
const authStore = useAuthStore()
const toast = useToast()

const certification = ref(null)
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  const id = route.params.id
  
  try {
    // Fetch certification from API
    const cert = await certStore.fetchCertificationById(id)
    certification.value = cert
    
    if (!certification.value) {
      toast.error('Certification not found')
      router.push('/catalog')
    }
  } catch (error) {
    console.error('Failed to fetch certification:', error)
    toast.error('Certification not found')
    router.push('/catalog')
  } finally {
    loading.value = false
  }
})

const isBookmarked = computed(() => {
  if (!certification.value) return false
  return bookmarkStore.isBookmarked(certification.value.id)
})

const handleBookmark = async () => {
  if (!authStore.isAuthenticated) {
    toast.warning('Please login to bookmark certifications')
    router.push('/login')
    return
  }
  
  try {
    const added = await bookmarkStore.toggleBookmark(certification.value.id)
    if (added) {
      toast.success('Added to bookmarks!')
    } else {
      toast.info('Removed from bookmarks')
    }
  } catch (error) {
    toast.error('Failed to update bookmark')
  }
}

const openCertification = () => {
  if (certification.value?.url) {
    window.open(certification.value.url, '_blank')
  }
}

const levelColors = {
  Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30'
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-32">
      <div class="animate-spin w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- Content -->
    <template v-else-if="certification">
      <!-- Hero Section -->
      <section class="relative">
        <!-- Background Image -->
        <div class="absolute inset-0 h-80 overflow-hidden">
          <img
            :src="certification.thumbnail"
            :alt="certification.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/80 to-bg-primary"></div>
        </div>

        <div class="container-custom relative z-10 pt-8 pb-12">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-text-muted mb-8">
            <RouterLink to="/" class="hover:text-white transition-colors">Home</RouterLink>
            <span>/</span>
            <RouterLink to="/catalog" class="hover:text-white transition-colors">Catalog</RouterLink>
            <span>/</span>
            <span class="text-text-secondary">{{ certification.title }}</span>
          </nav>

          <!-- Main Info -->
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Left Column -->
            <div class="flex-1">
              <!-- Provider -->
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-bg-secondary rounded-full border border-white/10 mb-4">
                <span class="text-white font-medium">{{ certification.provider }}</span>
              </div>

              <!-- Title -->
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {{ certification.title }}
              </h1>

              <!-- Meta badges -->
              <div class="flex flex-wrap items-center gap-3 mb-6">
                <span 
                  class="px-4 py-2 rounded-lg border text-sm font-medium"
                  :class="levelColors[certification.level]"
                >
                  {{ certification.level }}
                </span>
                <span class="px-4 py-2 bg-bg-secondary rounded-lg border border-white/10 text-text-secondary text-sm flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ certification.duration }}
                </span>
                <span class="px-4 py-2 bg-bg-secondary rounded-lg border border-white/10 text-text-secondary text-sm flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {{ certification.language }}
                </span>
                <span v-if="certification.isFree" class="px-4 py-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30 text-emerald-400 text-sm font-medium">
                  ✓ Free
                </span>
              </div>

              <!-- Free note -->
              <p v-if="certification.freeNote" class="text-text-secondary text-sm mb-6">
                💡 {{ certification.freeNote }}
              </p>
            </div>

            <!-- Right Column - Actions -->
            <div class="lg:w-80">
              <div class="card p-6 space-y-4">
                <AppButton
                  variant="primary"
                  size="lg"
                  block
                  @click="openCertification"
                >
                  Start Learning
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </AppButton>

                <AppButton
                  :variant="isBookmarked ? 'primary' : 'secondary'"
                  size="lg"
                  block
                  @click="handleBookmark"
                >
                  <svg
                    class="w-5 h-5"
                    :fill="isBookmarked ? 'currentColor' : 'none'"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  {{ isBookmarked ? 'Bookmarked' : 'Add to Bookmarks' }}
                </AppButton>

                <div class="pt-4 border-t border-white/10">
                  <div class="text-sm text-text-muted">Certificate Type</div>
                  <div class="text-white font-medium">{{ certification.certificateType }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Details Section -->
      <section class="section-padding pt-8">
        <div class="container-custom">
          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Description -->
            <div class="lg:col-span-2 space-y-8">
              <div class="card p-6">
                <h2 class="text-xl font-semibold text-white mb-4">About This Certification</h2>
                <div class="prose prose-invert max-w-none">
                  <p class="text-text-secondary leading-relaxed whitespace-pre-line">
                    {{ certification.description }}
                  </p>
                </div>
              </div>

              <!-- Skills -->
              <div class="card p-6">
                <h2 class="text-xl font-semibold text-white mb-4">Skills You'll Learn</h2>
                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="skill in certification.skills"
                    :key="skill"
                    class="px-4 py-2 bg-bg-tertiary rounded-lg text-text-secondary border border-white/5 hover:border-accent-primary/30 hover:text-white transition-all"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Quick Info -->
              <div class="card p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Quick Info</h3>
                <div class="space-y-4">
                  <div class="flex justify-between">
                    <span class="text-text-muted">Provider</span>
                    <span class="text-white font-medium">{{ certification.provider }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-muted">Category</span>
                    <span class="text-white font-medium">{{ certification.category }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-muted">Duration</span>
                    <span class="text-white font-medium">{{ certification.duration }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-muted">Level</span>
                    <span class="text-white font-medium">{{ certification.level }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-muted">Language</span>
                    <span class="text-white font-medium">{{ certification.language }}</span>
                  </div>
                </div>
              </div>

              <!-- Back to Catalog -->
              <RouterLink to="/catalog" class="block">
                <AppButton variant="ghost" block>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Catalog
                </AppButton>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
