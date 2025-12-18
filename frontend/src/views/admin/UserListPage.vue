<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/services/api'
import AppButton from '@/components/common/AppButton.vue'

const toast = useToast()

const searchQuery = ref('')
const selectedRole = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const loading = ref(true)
const users = ref([])

onMounted(async () => {
  loading.value = true
  try {
    const response = await api.get('/admin/users')
    users.value = response.data.data.users
  } catch (error) {
    console.error('Failed to fetch users:', error)
    toast.error('Failed to load users')
  } finally {
    loading.value = false
  }
})

const roles = ['all', 'user', 'admin']

const filteredUsers = computed(() => {
  let result = users.value

  if (selectedRole.value !== 'all') {
    result = result.filter(u => u.role === selectedRole.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(u =>
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query)
    )
  }

  return result
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredUsers.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))

const toggleUserStatus = async (user) => {
  try {
    await api.put(`/admin/users/${user.id}/block`)
    user.isActive = !user.isActive
    toast.success(`User ${user.isActive ? 'unblocked' : 'blocked'}`)
  } catch (error) {
    toast.error('Failed to update user status')
  }
}

const changeRole = async (user, newRole) => {
  try {
    await api.put(`/admin/users/${user.id}/role`, { role: newRole })
    user.role = newRole
    toast.success(`User role changed to ${newRole}`)
  } catch (error) {
    toast.error('Failed to change role')
  }
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-white mb-1">Users</h1>
      <p class="text-text-secondary">Manage user accounts and permissions</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="card p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-white">{{ users.length }}</p>
            <p class="text-text-muted text-sm">Total Users</p>
          </div>
          <div class="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-white">{{ users.filter(u => u.isActive).length }}</p>
            <p class="text-text-muted text-sm">Active</p>
          </div>
          <div class="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-white">{{ users.filter(u => u.role === 'admin').length }}</p>
            <p class="text-text-muted text-sm">Admins</p>
          </div>
          <div class="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or email..."
            class="input pl-10"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <!-- Role Filter -->
        <select v-model="selectedRole" class="input md:w-40">
          <option v-for="role in roles" :key="role" :value="role">
            {{ role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1) }}
          </option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-bg-tertiary">
            <tr>
              <th class="text-left py-4 px-4 text-text-muted font-medium text-sm">User</th>
              <th class="text-left py-4 px-4 text-text-muted font-medium text-sm">Interest</th>
              <th class="text-left py-4 px-4 text-text-muted font-medium text-sm">Role</th>
              <th class="text-left py-4 px-4 text-text-muted font-medium text-sm">Status</th>
              <th class="text-left py-4 px-4 text-text-muted font-medium text-sm">Joined</th>
              <th class="text-right py-4 px-4 text-text-muted font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in paginatedUsers"
              :key="user.id"
              class="border-b border-white/5 hover:bg-bg-tertiary/50 transition-colors"
            >
              <td class="py-4 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-medium text-white">
                    {{ user.name.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div>
                    <p class="text-white font-medium">{{ user.name }}</p>
                    <p class="text-text-muted text-sm">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="badge badge-primary">{{ user.interestField }}</span>
              </td>
              <td class="py-4 px-4">
                <select
                  :value="user.role"
                  @change="changeRole(user, $event.target.value)"
                  class="bg-bg-tertiary border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-accent-primary"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td class="py-4 px-4">
                <span
                  class="badge"
                  :class="user.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'"
                >
                  {{ user.isActive ? 'Active' : 'Blocked' }}
                </span>
              </td>
              <td class="py-4 px-4 text-text-muted text-sm">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="toggleUserStatus(user)"
                    class="p-2 transition-colors"
                    :class="user.isActive ? 'text-text-secondary hover:text-red-400' : 'text-text-secondary hover:text-emerald-400'"
                    :title="user.isActive ? 'Block User' : 'Unblock User'"
                  >
                    <svg v-if="user.isActive" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredUsers.length === 0" class="text-center py-12">
        <p class="text-text-muted">No users found</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between px-4 py-4 border-t border-white/5">
        <p class="text-sm text-text-muted">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} of {{ filteredUsers.length }}
        </p>
        <div class="flex gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded bg-bg-tertiary text-text-secondary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded bg-bg-tertiary text-text-secondary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
