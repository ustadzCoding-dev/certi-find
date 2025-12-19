<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCertificationStore } from '@/stores/certifications'
import api from '@/services/api'
import AppButton from '@/components/common/AppButton.vue'

const toast = useToast()
const certStore = useCertificationStore()

const searchQuery = ref('')
const selectedCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  await certStore.fetchCertifications()
  loading.value = false
})

const categories = ['all', 'IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other']

const filteredCertifications = computed(() => {
  let result = certStore.certifications

  if (selectedCategory.value !== 'all') {
    result = result.filter(c => c.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(c =>
      c.title.toLowerCase().includes(query) ||
      c.provider.toLowerCase().includes(query)
    )
  }

  return result
})

const paginatedCertifications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCertifications.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredCertifications.value.length / itemsPerPage))

const toggleStatus = async (cert) => {
  try {
    await api.put(`/certifications/${cert.id}`, { isActive: !cert.isActive })
    cert.isActive = !cert.isActive
    toast.success(`Certification ${cert.isActive ? 'activated' : 'deactivated'}`)
  } catch (error) {
    toast.error('Failed to update status')
  }
}

const deleteCertification = async (id) => {
  if (confirm('Are you sure you want to delete this certification?')) {
    try {
      await certStore.deleteCertification(id)
      toast.success('Certification deleted')
    } catch (error) {
      toast.error('Failed to delete certification')
    }
  }
}

const levelColors = {
  Beginner: 'bg-emerald-500/20 text-emerald-400',
  Intermediate: 'bg-amber-500/20 text-amber-400',
  Advanced: 'bg-red-500/20 text-red-400'
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-white mb-1">Certifications</h1>
        <p class="text-text-secondary">Manage all certifications in the platform</p>
      </div>
      <RouterLink to="/admin/certifications/create">
        <AppButton variant="primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Certification
        </AppButton>
      </RouterLink>
    </div>

    <!-- Filters -->
    <div class="card p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by title or provider..."
            class="input pl-10"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <!-- Category Filter -->
        <select v-model="selectedCategory" class="input md:w-48">
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat === 'all' ? 'All Categories' : cat }}
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
              <th class="text-left py-4 px-4 text-text-muted font-medium text-sm">Title</th>
              <th class="text-left py-4 px-4 text-text-muted font-medium text-sm">Provider</th>
              <th class="text-left py-4 px-4 text-text-muted font-medium text-sm">Category</th>
              <th class="text-left py-4 px-4 text-text-muted font-medium text-sm">Level</th>
              <th class="text-left py-4 px-4 text-text-muted font-medium text-sm">Status</th>
              <th class="text-right py-4 px-4 text-text-muted font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cert in paginatedCertifications"
              :key="cert.id"
              class="border-b border-white/5 hover:bg-bg-tertiary/50 transition-colors"
            >
              <td class="py-4 px-4">
                <div class="max-w-xs">
                  <p class="text-white font-medium truncate">{{ cert.title }}</p>
                  <p class="text-text-muted text-xs">{{ cert.duration }}</p>
                </div>
              </td>
              <td class="py-4 px-4 text-text-secondary">{{ cert.provider }}</td>
              <td class="py-4 px-4">
                <span class="badge badge-primary">{{ cert.category }}</span>
              </td>
              <td class="py-4 px-4">
                <span class="badge" :class="levelColors[cert.level]">{{ cert.level }}</span>
              </td>
              <td class="py-4 px-4">
                <button
                  @click="toggleStatus(cert)"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                  :class="cert.isActive ? 'bg-emerald-500' : 'bg-gray-600'"
                >
                  <span
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    :class="cert.isActive ? 'translate-x-6' : 'translate-x-1'"
                  ></span>
                </button>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center justify-end gap-2">
                  <RouterLink
                    :to="`/admin/certifications/edit/${cert.id}`"
                    class="p-2 text-text-secondary hover:text-accent-primary transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </RouterLink>
                  <button
                    @click="deleteCertification(cert.id)"
                    class="p-2 text-text-secondary hover:text-red-400 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCertifications.length === 0" class="text-center py-12">
        <p class="text-text-muted">No certifications found</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between px-4 py-4 border-t border-white/5">
        <p class="text-sm text-text-muted">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredCertifications.length) }} of {{ filteredCertifications.length }}
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
