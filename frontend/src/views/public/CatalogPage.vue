<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCertificationStore } from '@/stores/certifications'
import CertCard from '@/components/certification/CertCard.vue'
import AppButton from '@/components/common/AppButton.vue'

const route = useRoute()
const router = useRouter()
const certStore = useCertificationStore()

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedLevel = ref('all')

// Initialize from URL query and fetch data
onMounted(async () => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
    certStore.filters.category = route.query.category
  }
  if (route.query.level) {
    selectedLevel.value = route.query.level
    certStore.filters.level = route.query.level
  }
  if (route.query.q) {
    searchQuery.value = route.query.q
    certStore.filters.searchQuery = route.query.q
  }
  
  // Fetch certifications from API
  await certStore.fetchCertifications()
})

// Filtered certifications
const filteredCertifications = computed(() => {
  let result = certStore.certifications

  if (selectedCategory.value !== 'all') {
    result = result.filter(c => c.category === selectedCategory.value)
  }

  if (selectedLevel.value !== 'all') {
    result = result.filter(c => c.level === selectedLevel.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(c =>
      c.title.toLowerCase().includes(query) ||
      c.provider.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.skills?.some(s => s.toLowerCase().includes(query))
    )
  }

  return result
})

// Update URL when filters change
watch([selectedCategory, selectedLevel, searchQuery], () => {
  const query = {}
  if (selectedCategory.value !== 'all') query.category = selectedCategory.value
  if (selectedLevel.value !== 'all') query.level = selectedLevel.value
  if (searchQuery.value) query.q = searchQuery.value
  
  router.replace({ query })
})

const clearFilters = () => {
  selectedCategory.value = 'all'
  selectedLevel.value = 'all'
  searchQuery.value = ''
}

const hasActiveFilters = computed(() => {
  return selectedCategory.value !== 'all' || selectedLevel.value !== 'all' || searchQuery.value
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <section class="bg-bg-secondary/50 py-12">
      <div class="container-custom">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          Explore <span class="gradient-text">Certifications</span>
        </h1>
        <p class="text-text-secondary max-w-2xl">
          Browse our curated collection of free certifications from top providers worldwide.
        </p>

        <!-- Search Bar -->
        <div class="mt-8 max-w-2xl">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by title, provider, or skill..."
              class="w-full px-6 py-4 pl-14 bg-bg-tertiary border border-white/10 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all"
            />
            <svg class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar Filters -->
          <aside class="lg:w-64 flex-shrink-0">
            <div class="lg:sticky lg:top-24 space-y-6">
              <!-- Category Filter -->
              <div class="card p-5">
                <h3 class="font-semibold text-white mb-4">Category</h3>
                <div class="space-y-2">
                  <label
                    v-for="cat in ['all', ...certStore.categories]"
                    :key="cat"
                    class="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      :value="cat"
                      v-model="selectedCategory"
                      class="w-4 h-4 text-accent-primary bg-bg-tertiary border-white/20 focus:ring-accent-primary/50"
                    />
                    <span class="text-text-secondary group-hover:text-white transition-colors capitalize">
                      {{ cat === 'all' ? 'All Categories' : cat }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Level Filter -->
              <div class="card p-5">
                <h3 class="font-semibold text-white mb-4">Level</h3>
                <div class="space-y-2">
                  <label
                    v-for="level in ['all', ...certStore.levels]"
                    :key="level"
                    class="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      :value="level"
                      v-model="selectedLevel"
                      class="w-4 h-4 text-accent-primary bg-bg-tertiary border-white/20 focus:ring-accent-primary/50"
                    />
                    <span class="text-text-secondary group-hover:text-white transition-colors capitalize">
                      {{ level === 'all' ? 'All Levels' : level }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Clear Filters -->
              <AppButton
                v-if="hasActiveFilters"
                variant="ghost"
                block
                @click="clearFilters"
              >
                Clear Filters
              </AppButton>
            </div>
          </aside>

          <!-- Results Grid -->
          <div class="flex-1">
            <!-- Results count -->
            <div class="flex items-center justify-between mb-6">
              <p class="text-text-secondary">
                Showing <span class="text-white font-medium">{{ filteredCertifications.length }}</span> certifications
              </p>
            </div>

            <!-- Grid -->
            <div v-if="filteredCertifications.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <CertCard
                v-for="cert in filteredCertifications"
                :key="cert.id"
                :certification="cert"
              />
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-16">
              <div class="text-6xl mb-4">🔍</div>
              <h3 class="text-xl font-semibold text-white mb-2">No certifications found</h3>
              <p class="text-text-secondary mb-6">
                Try adjusting your filters or search query
              </p>
              <AppButton variant="primary" @click="clearFilters">
                Clear Filters
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
