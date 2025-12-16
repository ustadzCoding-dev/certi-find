<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isSidebarOpen = ref(true)

const menuItems = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: 'dashboard'
  },
  {
    name: 'Certifications',
    path: '/admin/certifications',
    icon: 'certifications'
  },
  {
    name: 'Users',
    path: '/admin/users',
    icon: 'users'
  }
]

const isActive = (path) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside
      class="fixed lg:sticky top-0 left-0 z-40 h-screen transition-transform duration-300"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="h-full w-64 bg-bg-secondary border-r border-white/5 flex flex-col">
        <!-- Logo -->
        <div class="p-6 border-b border-white/5">
          <RouterLink to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span class="text-xl font-bold gradient-text">CertiFind</span>
          </RouterLink>
          <p class="text-xs text-text-muted mt-2">Admin Panel</p>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-2">
          <RouterLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
            :class="isActive(item.path) 
              ? 'bg-accent-primary/20 text-accent-primary' 
              : 'text-text-secondary hover:bg-bg-tertiary hover:text-white'"
          >
            <!-- Dashboard Icon -->
            <svg v-if="item.icon === 'dashboard'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <!-- Certifications Icon -->
            <svg v-if="item.icon === 'certifications'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <!-- Users Icon -->
            <svg v-if="item.icon === 'users'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{{ item.name }}</span>
          </RouterLink>
        </nav>

        <!-- User Info -->
        <div class="p-4 border-t border-white/5">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-medium text-white">
              {{ authStore.userInitials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">{{ authStore.user?.name }}</p>
              <p class="text-xs text-text-muted truncate">{{ authStore.user?.email }}</p>
            </div>
          </div>
          <button
            @click="logout"
            class="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 lg:ml-0">
      <!-- Mobile Header -->
      <header class="lg:hidden sticky top-0 z-30 bg-bg-primary border-b border-white/5 px-4 py-3">
        <div class="flex items-center justify-between">
          <button @click="toggleSidebar" class="p-2 text-text-secondary hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span class="text-lg font-semibold gradient-text">Admin Panel</span>
          <div class="w-10"></div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6 lg:p-8">
        <RouterView />
      </main>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/50 z-30 lg:hidden"
      @click="toggleSidebar"
    ></div>
  </div>
</template>
