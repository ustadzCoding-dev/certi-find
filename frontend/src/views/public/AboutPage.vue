<script setup>
import { RouterLink } from 'vue-router'
import AppButton from '@/components/common/AppButton.vue'

const features = [
  {
    icon: '🎯',
    title: 'Curated Collection',
    description: 'Hand-picked certifications from top providers like Google, IBM, Meta, Microsoft, and more.'
  },
  {
    icon: '💰',
    title: '100% Free',
    description: 'All certifications are free or have free audit options. No hidden costs.'
  },
  {
    icon: '🔍',
    title: 'Smart Filtering',
    description: 'Find the perfect certification with our advanced filtering by category, level, and provider.'
  },
  {
    icon: '📚',
    title: 'Save & Track',
    description: 'Bookmark your favorite certifications and access them anytime from your profile.'
  },
  {
    icon: '📧',
    title: 'Stay Updated',
    description: 'Get notified about new certifications matching your interests.'
  },
  {
    icon: '🚀',
    title: 'Career Growth',
    description: 'Boost your resume with verified credentials from industry leaders.'
  }
]

const team = [
  {
    name: 'CertiFind Team',
    role: 'Full Stack Developer',
    avatar: '👨‍💻',
    description: 'Passionate about helping learners find the right certifications for their career.'
  }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            About <span class="gradient-text">CertiFind</span>
          </h1>
          <p class="text-xl text-text-secondary leading-relaxed">
            CertiFind is your go-to platform for discovering free certifications from the world's leading tech companies and educational institutions.
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="section-padding bg-bg-secondary/50">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">
              Our <span class="gradient-text">Mission</span>
            </h2>
            <p class="text-text-secondary leading-relaxed mb-6">
              We believe that quality education should be accessible to everyone. That's why we created CertiFind — to help students, fresh graduates, and professionals discover free certifications that can boost their careers.
            </p>
            <p class="text-text-secondary leading-relaxed mb-6">
              Our platform curates certifications from trusted providers like Google, IBM, Meta, Microsoft, AWS, and many more. We verify that each certification is either completely free or has a free audit option available.
            </p>
            <div class="flex gap-4">
              <RouterLink to="/catalog">
                <AppButton variant="primary">
                  Explore Certifications
                </AppButton>
              </RouterLink>
              <RouterLink to="/register">
                <AppButton variant="secondary">
                  Join Us
                </AppButton>
              </RouterLink>
            </div>
          </div>
          <div class="relative">
            <div class="card p-8 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10">
              <div class="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div class="text-4xl font-bold gradient-text">50+</div>
                  <div class="text-text-secondary text-sm mt-1">Free Certifications</div>
                </div>
                <div>
                  <div class="text-4xl font-bold gradient-text">10+</div>
                  <div class="text-text-secondary text-sm mt-1">Top Providers</div>
                </div>
                <div>
                  <div class="text-4xl font-bold gradient-text">5</div>
                  <div class="text-text-secondary text-sm mt-1">Categories</div>
                </div>
                <div>
                  <div class="text-4xl font-bold gradient-text">100%</div>
                  <div class="text-text-secondary text-sm mt-1">Free to Use</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">
            Why Choose <span class="gradient-text">CertiFind</span>?
          </h2>
          <p class="text-text-secondary max-w-2xl mx-auto">
            We make it easy to find, save, and track free certifications for your career growth.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="card card-hover p-6"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-lg font-semibold text-white mb-2">{{ feature.title }}</h3>
            <p class="text-text-secondary text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section-padding bg-bg-secondary/50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">
            How It <span class="gradient-text">Works</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
              1
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Browse</h3>
            <p class="text-text-secondary text-sm">Explore our curated collection of free certifications</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
              2
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Filter</h3>
            <p class="text-text-secondary text-sm">Use filters to find certifications matching your interests</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
              3
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Save</h3>
            <p class="text-text-secondary text-sm">Bookmark your favorites to access them later</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
              4
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Learn</h3>
            <p class="text-text-secondary text-sm">Start your learning journey and earn certifications</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="card bg-gradient-primary p-8 md:p-12 text-center relative overflow-hidden">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          </div>
          <div class="relative z-10">
            <h2 class="text-3xl font-bold text-white mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p class="text-white/80 max-w-xl mx-auto mb-8">
              Join thousands of learners who have discovered free certifications through CertiFind.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/catalog">
                <AppButton variant="secondary" size="lg" class="bg-white text-accent-primary hover:bg-white/90">
                  Browse Certifications
                </AppButton>
              </RouterLink>
              <RouterLink to="/register">
                <AppButton variant="ghost" size="lg" class="text-white border-white/30 hover:bg-white/10">
                  Create Account
                </AppButton>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
