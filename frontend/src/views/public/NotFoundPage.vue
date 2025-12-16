<script setup>
import { RouterLink } from 'vue-router'
import AppButton from '@/components/common/AppButton.vue'
</script>

<template>
  <div class="min-h-[calc(100vh-16rem)] flex items-center justify-center py-20">
    <div class="text-center">
      <!-- 404 Illustration -->
      <div class="text-9xl font-bold gradient-text mb-4">404</div>
      
      <h1 class="text-3xl font-bold text-white mb-4">Page Not Found</h1>
      
      <p class="text-text-secondary max-w-md mx-auto mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink to="/">
          <AppButton variant="primary" size="lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </AppButton>
        </RouterLink>
        <RouterLink to="/catalog">
          <AppButton variant="secondary" size="lg">
            Browse Certifications
          </AppButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
