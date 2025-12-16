<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBookmarkStore } from '@/stores/bookmarks'
import { useToast } from 'vue-toastification'
import AppButton from '@/components/common/AppButton.vue'
import AppInput from '@/components/common/AppInput.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const bookmarkStore = useBookmarkStore()
const toast = useToast()

const form = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const rememberMe = ref(false)

const validateForm = () => {
  let isValid = true
  errors.value = { email: '', password: '' }

  if (!form.value.email) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email format'
    isValid = false
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required'
    isValid = false
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    // Call actual login API
    await authStore.login({
      email: form.value.email,
      password: form.value.password
    })
    
    // Fetch bookmarks after login
    await bookmarkStore.fetchBookmarks()
    
    toast.success('Welcome back!')
    
    // Redirect to intended page or home
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
    <!-- Background effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl"></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <!-- Card -->
      <div class="card glass p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <RouterLink to="/" class="inline-flex items-center gap-2 mb-6">
            <div class="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </RouterLink>
          <h1 class="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p class="text-text-secondary">Sign in to continue your learning journey</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <AppInput
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            icon="email"
            :error="errors.email"
            required
          />

          <AppInput
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            icon="password"
            :error="errors.password"
            required
          />

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="rememberMe"
                class="w-4 h-4 text-accent-primary bg-bg-tertiary border-white/20 rounded focus:ring-accent-primary/50"
              />
              <span class="text-sm text-text-secondary">Remember me</span>
            </label>
            <a href="#" class="text-sm text-accent-primary hover:text-accent-secondary transition-colors">
              Forgot password?
            </a>
          </div>

          <!-- Submit Button -->
          <AppButton
            type="submit"
            variant="primary"
            size="lg"
            block
            :loading="loading"
          >
            Sign In
          </AppButton>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/10"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-bg-secondary text-text-muted">or continue with</span>
          </div>
        </div>

        <!-- Google OAuth -->
        <AppButton variant="secondary" size="lg" block disabled>
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </AppButton>

        <!-- Register Link -->
        <p class="text-center text-text-secondary mt-6">
          Don't have an account?
          <RouterLink to="/register" class="text-accent-primary hover:text-accent-secondary transition-colors font-medium">
            Sign up
          </RouterLink>
        </p>
      </div>

      <!-- Demo Hint -->
      <div class="mt-4 p-4 bg-accent-primary/10 rounded-lg border border-accent-primary/20 text-center">
        <p class="text-sm text-text-secondary">
          <span class="text-accent-primary font-medium">Demo Accounts:</span><br>
          Admin: admin@certifind.com / admin123<br>
          User: demo@certifind.com / demo123
        </p>
      </div>
    </div>
  </div>
</template>
