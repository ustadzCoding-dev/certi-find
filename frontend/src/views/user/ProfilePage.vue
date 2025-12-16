<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import AppButton from '@/components/common/AppButton.vue'
import AppInput from '@/components/common/AppInput.vue'

const authStore = useAuthStore()
const toast = useToast()

const isEditing = ref(false)
const loading = ref(false)

const form = ref({
  name: '',
  email: '',
  interestField: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const interestOptions = [
  { value: 'IT', label: 'IT & Programming' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Business', label: 'Business' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Other', label: 'Other' }
]

onMounted(() => {
  if (authStore.user) {
    form.value = {
      name: authStore.user.name || '',
      email: authStore.user.email || '',
      interestField: authStore.user.interestField || ''
    }
  }
})

const userInitials = computed(() => {
  if (!authStore.user?.name) return 'U'
  return authStore.user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const startEditing = () => {
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  form.value = {
    name: authStore.user.name || '',
    email: authStore.user.email || '',
    interestField: authStore.user.interestField || ''
  }
}

const saveProfile = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update local state
    authStore.user = {
      ...authStore.user,
      name: form.value.name,
      interestField: form.value.interestField
    }
    
    isEditing.value = false
    toast.success('Profile updated successfully!')
  } catch (error) {
    toast.error('Failed to update profile')
  } finally {
    loading.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }
  
  if (passwordForm.value.newPassword.length < 6) {
    toast.error('Password must be at least 6 characters')
    return
  }
  
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Password changed successfully!')
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  } catch (error) {
    toast.error('Failed to change password')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen py-12">
    <div class="container-custom">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p class="text-text-secondary">Manage your account settings and preferences</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Profile Card -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Info -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-white">Profile Information</h2>
              <AppButton
                v-if="!isEditing"
                variant="secondary"
                size="sm"
                @click="startEditing"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit
              </AppButton>
            </div>

            <div class="flex items-center gap-6 mb-8">
              <!-- Avatar -->
              <div class="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-3xl font-bold text-white">
                {{ userInitials }}
              </div>
              <div>
                <h3 class="text-xl font-semibold text-white">{{ authStore.user?.name }}</h3>
                <p class="text-text-secondary">{{ authStore.user?.email }}</p>
                <span class="inline-block mt-2 px-3 py-1 bg-accent-primary/20 text-accent-primary rounded-full text-sm">
                  {{ authStore.user?.role === 'admin' ? 'Admin' : 'User' }}
                </span>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="saveProfile" class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <AppInput
                  v-model="form.name"
                  label="Full Name"
                  :disabled="!isEditing"
                  icon="user"
                />
                <AppInput
                  v-model="form.email"
                  type="email"
                  label="Email"
                  disabled
                  icon="email"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">
                  Interest Field
                </label>
                <select
                  v-model="form.interestField"
                  class="input"
                  :disabled="!isEditing"
                >
                  <option v-for="opt in interestOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>

              <div v-if="isEditing" class="flex gap-3 pt-4">
                <AppButton type="submit" variant="primary" :loading="loading">
                  Save Changes
                </AppButton>
                <AppButton type="button" variant="ghost" @click="cancelEditing">
                  Cancel
                </AppButton>
              </div>
            </form>
          </div>

          <!-- Change Password -->
          <div class="card p-6">
            <h2 class="text-xl font-semibold text-white mb-6">Change Password</h2>
            <form @submit.prevent="changePassword" class="space-y-4">
              <AppInput
                v-model="passwordForm.currentPassword"
                type="password"
                label="Current Password"
                placeholder="Enter current password"
                icon="password"
              />
              <div class="grid md:grid-cols-2 gap-4">
                <AppInput
                  v-model="passwordForm.newPassword"
                  type="password"
                  label="New Password"
                  placeholder="Enter new password"
                  icon="password"
                />
                <AppInput
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  icon="password"
                />
              </div>
              <AppButton type="submit" variant="secondary" :loading="loading">
                Update Password
              </AppButton>
            </form>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Account Stats -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Account Stats</h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-text-muted">Member Since</span>
                <span class="text-white">Dec 2024</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">Bookmarks</span>
                <span class="text-white">0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">Interest</span>
                <span class="text-white">{{ form.interestField || 'Not set' }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div class="space-y-2">
              <RouterLink to="/bookmarks" class="block p-3 rounded-lg hover:bg-bg-tertiary transition-colors text-text-secondary hover:text-white">
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  My Bookmarks
                </div>
              </RouterLink>
              <RouterLink to="/catalog" class="block p-3 rounded-lg hover:bg-bg-tertiary transition-colors text-text-secondary hover:text-white">
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Browse Catalog
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
