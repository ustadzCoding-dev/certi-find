<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import api from '@/services/api'
import AppButton from '@/components/common/AppButton.vue'

const loading = ref(true)
const dashboardData = ref(null)

onMounted(async () => {
  try {
    const response = await api.get('/admin/stats')
    dashboardData.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
  } finally {
    loading.value = false
  }
})

// Computed stats from API data
const stats = computed(() => {
  if (!dashboardData.value) return []
  const s = dashboardData.value.stats
  return [
    {
      label: 'Total Certifications',
      value: s.totalCertifications,
      icon: 'cert',
      color: 'from-purple-500 to-indigo-500',
      change: `${s.activeCertifications} active`
    },
    {
      label: 'Total Users',
      value: s.totalUsers,
      icon: 'users',
      color: 'from-blue-500 to-cyan-500',
      change: `+${s.newUsersThisWeek} this week`
    },
    {
      label: 'Total Bookmarks',
      value: s.totalBookmarks,
      icon: 'bookmark',
      color: 'from-emerald-500 to-teal-500',
      change: 'All time'
    },
    {
      label: 'Categories',
      value: 6,
      icon: 'category',
      color: 'from-orange-500 to-amber-500',
      change: 'Active'
    }
  ]
})

// Category stats from API
const categoryStats = computed(() => {
  if (!dashboardData.value?.categoryStats) return []
  const total = dashboardData.value.categoryStats.reduce((sum, c) => sum + c.count, 0)
  return dashboardData.value.categoryStats.map(cat => ({
    name: cat._id,
    count: cat.count,
    percentage: total > 0 ? Math.round((cat.count / total) * 100) : 0
  }))
})

// Recent users from API
const recentUsers = computed(() => {
  if (!dashboardData.value?.recentUsers) return []
  return dashboardData.value.recentUsers.map(user => ({
    name: user.name,
    email: user.email,
    date: new Date(user.createdAt).toLocaleDateString(),
    interest: user.interestField
  }))
})

// Recent certs from API
const recentCerts = computed(() => {
  if (!dashboardData.value?.recentCertifications) return []
  return dashboardData.value.recentCertifications.map(cert => ({
    _id: cert._id,
    title: cert.title,
    provider: cert.provider,
    date: new Date(cert.createdAt).toLocaleDateString()
  }))
})
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p class="text-text-secondary">Welcome to the CertiFind admin panel</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="card p-6 relative overflow-hidden"
      >
        <div class="absolute top-0 right-0 w-24 h-24 opacity-10">
          <div :class="`w-full h-full bg-gradient-to-br ${stat.color} rounded-full blur-2xl`"></div>
        </div>
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-3">
            <!-- Cert Icon -->
            <div v-if="stat.icon === 'cert'" :class="`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <!-- Users Icon -->
            <div v-if="stat.icon === 'users'" :class="`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <!-- Bookmark Icon -->
            <div v-if="stat.icon === 'bookmark'" :class="`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <!-- Category Icon -->
            <div v-if="stat.icon === 'category'" :class="`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-white">{{ stat.value }}</p>
          <p class="text-text-muted text-sm">{{ stat.label }}</p>
          <p class="text-emerald-400 text-xs mt-1">{{ stat.change }}</p>
        </div>
      </div>
    </div>

    <!-- Charts & Tables -->
    <div class="grid lg:grid-cols-2 gap-6 mb-8">
      <!-- Category Distribution -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-white mb-6">Certifications by Category</h3>
        <div class="space-y-4">
          <div v-for="cat in categoryStats" :key="cat.name">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-text-secondary">{{ cat.name }}</span>
              <span class="text-white font-medium">{{ cat.count }}</span>
            </div>
            <div class="h-2 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-500"
                :style="{ width: `${cat.percentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Users -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-white">Recent Users</h3>
          <RouterLink to="/admin/users" class="text-sm text-accent-primary hover:text-accent-secondary">
            View all →
          </RouterLink>
        </div>
        <div class="space-y-4">
          <div
            v-for="user in recentUsers"
            :key="user.email"
            class="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-medium text-white">
                {{ user.name.split(' ').map(n => n[0]).join('') }}
              </div>
              <div>
                <p class="text-white font-medium text-sm">{{ user.name }}</p>
                <p class="text-text-muted text-xs">{{ user.email }}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="badge badge-primary text-xs">{{ user.interest }}</span>
              <p class="text-text-muted text-xs mt-1">{{ user.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Certifications -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-white">Recently Added Certifications</h3>
        <RouterLink to="/admin/certifications">
          <AppButton variant="primary" size="sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New
          </AppButton>
        </RouterLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left py-3 px-4 text-text-muted font-medium text-sm">Title</th>
              <th class="text-left py-3 px-4 text-text-muted font-medium text-sm">Provider</th>
              <th class="text-left py-3 px-4 text-text-muted font-medium text-sm">Added</th>
              <th class="text-right py-3 px-4 text-text-muted font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cert in recentCerts"
              :key="cert.title"
              class="border-b border-white/5 hover:bg-bg-tertiary/50 transition-colors"
            >
              <td class="py-3 px-4 text-white">{{ cert.title }}</td>
              <td class="py-3 px-4 text-text-secondary">{{ cert.provider }}</td>
              <td class="py-3 px-4 text-text-muted text-sm">{{ cert.date }}</td>
              <td class="py-3 px-4 text-right">
                <button class="p-2 text-text-secondary hover:text-accent-primary transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
