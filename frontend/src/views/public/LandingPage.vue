<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useCertificationStore } from '@/stores/certifications'
import AppButton from '@/components/common/AppButton.vue'

const router = useRouter()
const certStore = useCertificationStore()
const searchQuery = ref('')

onMounted(async () => {
  // Fetch certifications if not already loaded
  if (certStore.certifications.length === 0) {
    await certStore.fetchCertifications()
  }
})

// Get first 3 certifications as featured
const featuredCerts = computed(() => {
  return certStore.certifications.slice(0, 3)
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/catalog', query: { q: searchQuery.value } })
  }
}

const categories = [
  { 
    name: 'IT & Programming', 
    icon: '💻', 
    value: 'IT',
    description: 'Web development, cloud, cybersecurity'
  },
  { 
    name: 'Data Science', 
    icon: '📊', 
    value: 'Data Science',
    description: 'Machine learning, analytics, Python'
  },
  { 
    name: 'Business', 
    icon: '💼', 
    value: 'Business',
    description: 'Project management, leadership'
  },
  { 
    name: 'Design', 
    icon: '🎨', 
    value: 'Design',
    description: 'UI/UX, graphic design, Figma'
  },
  { 
    name: 'Marketing', 
    icon: '📈', 
    value: 'Marketing',
    description: 'Digital marketing, SEO, social media'
  }
]

// Dynamic stats from certification count
const stats = computed(() => [
  { value: `${certStore.certifications.length}+`, label: 'Free Certifications' },
  { value: '10+', label: 'Top Providers' },
  { value: '5K+', label: 'Happy Learners' }
])
</script>

<template>
  <div class="overflow-hidden">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center">
      <!-- Background effects -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 rounded-full border border-accent-primary/30 mb-8 animate-fade-in">
            <span class="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></span>
            <span class="text-sm text-accent-primary">100% Free Certifications</span>
          </div>

          <!-- Headline -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            Discover
            <span class="gradient-text"> Free Certifications </span>
            for Your Career
          </h1>

          <!-- Subheadline -->
          <p class="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-slide-up" style="animation-delay: 0.1s;">
            Find curated certifications from Google, IBM, Meta, Microsoft, and more. 
            Boost your resume with verified credentials — completely free.
          </p>

          <!-- Search Bar -->
          <div class="max-w-xl mx-auto mb-10 animate-slide-up" style="animation-delay: 0.2s;">
            <form @submit.prevent="handleSearch" class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search certifications (e.g., Python, Cloud, UX Design)"
                class="w-full px-6 py-4 pl-14 bg-bg-secondary border border-white/10 rounded-2xl text-white placeholder-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all"
              />
              <svg class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                type="submit"
                class="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-primary rounded-xl text-white font-medium hover:shadow-glow transition-all"
              >
                Search
              </button>
            </form>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 0.3s;">
            <RouterLink to="/catalog">
              <AppButton variant="primary" size="lg">
                Browse All Certifications
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </AppButton>
            </RouterLink>
            <RouterLink to="/register">
              <AppButton variant="secondary" size="lg">
                Create Free Account
              </AppButton>
            </RouterLink>
          </div>

          <!-- Stats -->
          <div class="flex justify-center gap-8 md:gap-16 mt-16 animate-slide-up" style="animation-delay: 0.4s;">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="text-3xl md:text-4xl font-bold gradient-text">{{ stat.value }}</div>
              <div class="text-sm text-text-muted mt-1">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section-padding bg-bg-secondary/50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Browse by <span class="gradient-text">Category</span>
          </h2>
          <p class="text-text-secondary max-w-2xl mx-auto">
            Find certifications that match your career goals and interests
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <RouterLink
            v-for="category in categories"
            :key="category.value"
            :to="`/catalog?category=${category.value}`"
            class="card card-hover p-6 text-center group"
          >
            <div class="text-4xl mb-4">{{ category.icon }}</div>
            <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-accent-primary transition-colors">
              {{ category.name }}
            </h3>
            <p class="text-sm text-text-muted">
              {{ category.description }}
            </p>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Certifications -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-2">
              Featured <span class="gradient-text">Certifications</span>
            </h2>
            <p class="text-text-secondary">Popular certifications from top providers</p>
          </div>
          <RouterLink to="/catalog">
            <AppButton variant="outline">
              View All
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AppButton>
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="cert in featuredCerts"
            :key="cert._id"
            class="card card-hover group overflow-hidden"
          >
            <!-- Thumbnail -->
            <div class="relative overflow-hidden aspect-video">
              <img
                :src="cert.thumbnail"
                :alt="cert.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-bg-secondary/80 to-transparent"></div>
              <div class="absolute top-3 left-3">
                <span class="badge bg-bg-primary/80 backdrop-blur-sm text-white">
                  {{ cert.provider }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-5">
              <h3 class="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-accent-primary transition-colors">
                {{ cert.title }}
              </h3>
              <p class="text-text-secondary text-sm line-clamp-2 mb-4">
                {{ cert.description }}
              </p>
              <div class="flex items-center gap-3">
                <span class="badge badge-primary">{{ cert.level }}</span>
                <span class="text-text-muted text-xs flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ cert.duration }}
                </span>
                <span class="badge badge-success">Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 md:p-16 text-center">
          <!-- Background pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          </div>

          <div class="relative z-10">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p class="text-white/80 max-w-xl mx-auto mb-8">
              Create a free account to save your favorite certifications and get personalized recommendations.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/register">
                <AppButton variant="white" size="lg">
                  Get Started for Free
                </AppButton>
              </RouterLink>
              <RouterLink to="/catalog">
                <AppButton variant="ghost" size="lg" class="text-white border-white/30 hover:bg-white/10">
                  Browse Catalog
                </AppButton>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
