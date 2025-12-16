<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isMenuOpen = ref(false)
const isProfileOpen = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const user = computed(() => authStore.user)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value
}

const closeProfile = () => {
  isProfileOpen.value = false
}

const logout = () => {
  authStore.logout()
  closeProfile()
  router.push('/')
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Catalog', path: '/catalog' },
  { name: 'About', path: '/about' }
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-lg border-b border-white/5">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <span class="text-xl font-bold gradient-text">CertiFind</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-text-secondary hover:text-white transition-colors duration-300"
            active-class="text-white font-medium"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <!-- Auth Buttons / User Menu -->
        <div class="hidden md:flex items-center gap-4">
          <template v-if="!isAuthenticated">
            <RouterLink to="/login" class="btn btn-ghost">
              Login
            </RouterLink>
            <RouterLink to="/register" class="btn btn-primary">
              Get Started
            </RouterLink>
          </template>
          
          <template v-else>
            <!-- Bookmarks Link -->
            <RouterLink to="/bookmarks" class="text-text-secondary hover:text-white transition-colors p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </RouterLink>

            <!-- Admin Link -->
            <RouterLink v-if="isAdmin" to="/admin" class="text-text-secondary hover:text-accent-primary transition-colors p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </RouterLink>

            <!-- Profile Dropdown -->
            <div class="relative">
              <button
                @click="toggleProfile"
                class="flex items-center gap-2 p-2 rounded-lg hover:bg-bg-secondary transition-colors"
              >
                <div class="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-medium">
                  {{ authStore.userInitials }}
                </div>
                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <transition name="dropdown">
                <div
                  v-if="isProfileOpen"
                  class="absolute right-0 mt-2 w-48 bg-bg-secondary rounded-lg border border-white/10 shadow-xl overflow-hidden"
                  @mouseleave="closeProfile"
                >
                  <div class="px-4 py-3 border-b border-white/10">
                    <p class="text-sm font-medium text-white">{{ user?.name }}</p>
                    <p class="text-xs text-text-muted truncate">{{ user?.email }}</p>
                  </div>
                  <div class="py-1">
                    <RouterLink
                      to="/profile"
                      class="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-tertiary hover:text-white transition-colors"
                      @click="closeProfile"
                    >
                      My Profile
                    </RouterLink>
                    <RouterLink
                      to="/bookmarks"
                      class="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-tertiary hover:text-white transition-colors"
                      @click="closeProfile"
                    >
                      My Bookmarks
                    </RouterLink>
                    <button
                      @click="logout"
                      class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-bg-tertiary transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 text-text-secondary hover:text-white"
        >
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide">
        <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-white/5">
          <div class="flex flex-col gap-2">
            <RouterLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="px-4 py-2 text-text-secondary hover:text-white hover:bg-bg-secondary rounded-lg transition-colors"
              @click="isMenuOpen = false"
            >
              {{ link.name }}
            </RouterLink>
            
            <template v-if="!isAuthenticated">
              <hr class="border-white/5 my-2">
              <RouterLink
                to="/login"
                class="px-4 py-2 text-text-secondary hover:text-white hover:bg-bg-secondary rounded-lg transition-colors"
                @click="isMenuOpen = false"
              >
                Login
              </RouterLink>
              <RouterLink
                to="/register"
                class="mx-4 btn btn-primary text-center"
                @click="isMenuOpen = false"
              >
                Get Started
              </RouterLink>
            </template>
            
            <template v-else>
              <hr class="border-white/5 my-2">
              <RouterLink
                to="/profile"
                class="px-4 py-2 text-text-secondary hover:text-white hover:bg-bg-secondary rounded-lg transition-colors"
                @click="isMenuOpen = false"
              >
                My Profile
              </RouterLink>
              <RouterLink
                to="/bookmarks"
                class="px-4 py-2 text-text-secondary hover:text-white hover:bg-bg-secondary rounded-lg transition-colors"
                @click="isMenuOpen = false"
              >
                My Bookmarks
              </RouterLink>
              <RouterLink
                v-if="isAdmin"
                to="/admin"
                class="px-4 py-2 text-accent-primary hover:bg-bg-secondary rounded-lg transition-colors"
                @click="isMenuOpen = false"
              >
                Admin Panel
              </RouterLink>
              <button
                @click="logout; isMenuOpen = false"
                class="px-4 py-2 text-left text-red-400 hover:bg-bg-secondary rounded-lg transition-colors"
              >
                Logout
              </button>
            </template>
          </div>
        </div>
      </transition>
    </div>
  </nav>
  
  <!-- Spacer for fixed navbar -->
  <div class="h-16"></div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
