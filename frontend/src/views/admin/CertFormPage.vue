<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCertificationStore } from '@/stores/certifications'
import api from '@/services/api'
import AppButton from '@/components/common/AppButton.vue'
import AppInput from '@/components/common/AppInput.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const certStore = useCertificationStore()

const isEditing = computed(() => !!route.params.id)
const loading = ref(false)
const fetchingData = ref(false)

const form = ref({
  title: '',
  provider: '',
  category: '',
  description: '',
  duration: '',
  level: '',
  isFree: true,
  freeNote: '',
  url: '',
  skills: '',
  certificateType: 'Certificate of Completion',
  language: 'English',
  thumbnail: ''
})

const errors = ref({})

const isThumbnailValid = computed(() => {
  if (!form.value.thumbnail) return true; // It's valid if empty
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const lowercasedUrl = form.value.thumbnail.toLowerCase();
  return validExtensions.some(ext => lowercasedUrl.endsWith(ext));
});

const categories = ['IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other']
const levels = ['Beginner', 'Intermediate', 'Advanced']

onMounted(async () => {
  if (isEditing.value) {
    fetchingData.value = true
    try {
      const cert = await certStore.fetchCertificationById(route.params.id)
      if (cert) {
        form.value = {
          title: cert.title,
          provider: cert.provider,
          category: cert.category,
          description: cert.description,
          duration: cert.duration,
          level: cert.level,
          isFree: cert.isFree,
          freeNote: cert.freeNote || '',
          url: cert.url,
          skills: cert.skills?.join(', ') || '',
          certificateType: cert.certificateType || 'Certificate of Completion',
          language: cert.language || 'English',
          thumbnail: cert.thumbnail || ''
        }
      }
    } catch (error) {
      toast.error('Failed to load certification')
      router.push('/admin/certifications')
    } finally {
      fetchingData.value = false
    }
  }
})

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.title) errors.value.title = 'Title is required'
  if (!form.value.provider) errors.value.provider = 'Provider is required'
  if (!form.value.category) errors.value.category = 'Category is required'
  if (!form.value.description) errors.value.description = 'Description is required'
  if (form.value.description && form.value.description.length < 50) {
    errors.value.description = 'Description must be at least 50 characters'
  }
  if (!form.value.duration) errors.value.duration = 'Duration is required'
  if (!form.value.level) errors.value.level = 'Level is required'
  if (!form.value.url) errors.value.url = 'URL is required'
  if (form.value.url && !form.value.url.match(/^https?:\/\/.+/)) {
    errors.value.url = 'URL must start with http:// or https://'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.error('Please fix the errors')
    return
  }

  loading.value = true
  try {
    const certData = {
      ...form.value,
      skills: form.value.skills.split(',').map(s => s.trim()).filter(Boolean)
    }
    
    if (isEditing.value) {
      await certStore.updateCertification(route.params.id, certData)
      toast.success('Certification updated successfully!')
    } else {
      await certStore.createCertification(certData)
      toast.success('Certification created successfully!')
    }
    
    router.push('/admin/certifications')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to save certification')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-2 text-text-muted text-sm mb-4">
        <RouterLink to="/admin/certifications" class="hover:text-white">Certifications</RouterLink>
        <span>/</span>
        <span class="text-white">{{ isEditing ? 'Edit' : 'Create' }}</span>
      </div>
      <h1 class="text-2xl font-bold text-white">
        {{ isEditing ? 'Edit Certification' : 'Add New Certification' }}
      </h1>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit">
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Info Card -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-white mb-6">Basic Information</h2>
            <div class="space-y-4">
              <AppInput
                v-model="form.title"
                label="Title"
                placeholder="e.g., Google IT Support Professional Certificate"
                :error="errors.title"
                required
              />
              
              <div class="grid md:grid-cols-2 gap-4">
                <AppInput
                  v-model="form.provider"
                  label="Provider"
                  placeholder="e.g., Google, IBM, Meta"
                  :error="errors.provider"
                  required
                />
                
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">
                    Category <span class="text-red-400">*</span>
                  </label>
                  <select v-model="form.category" class="input" :class="{ 'border-red-500': errors.category }">
                    <option value="" disabled>Select category</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                  </select>
                  <p v-if="errors.category" class="mt-1 text-sm text-red-400">{{ errors.category }}</p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">
                  Description <span class="text-red-400">*</span>
                </label>
                <textarea
                  v-model="form.description"
                  rows="5"
                  placeholder="Describe what learners will gain from this certification..."
                  class="input resize-none"
                  :class="{ 'border-red-500': errors.description }"
                ></textarea>
                <p v-if="errors.description" class="mt-1 text-sm text-red-400">{{ errors.description }}</p>
                <p class="mt-1 text-xs text-text-muted">{{ form.description.length }}/500 characters (min 50)</p>
              </div>

              <AppInput
                v-model="form.url"
                label="Certification URL"
                placeholder="https://www.coursera.org/..."
                :error="errors.url"
                required
              />
            </div>
          </div>

          <!-- Details Card -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-white mb-6">Details</h2>
            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <AppInput
                  v-model="form.duration"
                  label="Duration"
                  placeholder="e.g., 6 months, 3-4 weeks"
                  :error="errors.duration"
                  required
                />
                
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">
                    Level <span class="text-red-400">*</span>
                  </label>
                  <select v-model="form.level" class="input" :class="{ 'border-red-500': errors.level }">
                    <option value="" disabled>Select level</option>
                    <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
                  </select>
                  <p v-if="errors.level" class="mt-1 text-sm text-red-400">{{ errors.level }}</p>
                </div>
              </div>

              <AppInput
                v-model="form.skills"
                label="Skills (comma separated)"
                placeholder="e.g., Python, Machine Learning, Data Analysis"
              />

              <div class="grid md:grid-cols-2 gap-4">
                <AppInput
                  v-model="form.certificateType"
                  label="Certificate Type"
                  placeholder="e.g., Professional Certificate"
                />
                
                <AppInput
                  v-model="form.language"
                  label="Language"
                  placeholder="e.g., English"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Pricing Card -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-white mb-6">Pricing</h2>
            <div class="space-y-4">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="form.isFree"
                  class="w-5 h-5 text-accent-primary bg-bg-tertiary border-white/20 rounded focus:ring-accent-primary/50"
                />
                <span class="text-white">This certification is free</span>
              </label>
              
              <AppInput
                v-if="form.isFree"
                v-model="form.freeNote"
                label="Free Note (optional)"
                placeholder="e.g., Free with financial aid"
              />
            </div>
          </div>

          <!-- Thumbnail Card -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-white mb-6">Thumbnail</h2>
            <div class="space-y-4">
              <AppInput
                v-model="form.thumbnail"
                label="Thumbnail URL"
                placeholder="https://..."
              />
              <p class="mt-1 text-xs text-text-muted">Use a direct image link (e.g., from Imgur) ending in .jpg, .png, etc.</p>
              <p v-if="form.thumbnail && !isThumbnailValid" class="mt-1 text-sm text-amber-400">URL might not be a direct image link. Preview may not work.</p>
              
              <div v-if="form.thumbnail" class="aspect-video rounded-lg overflow-hidden bg-bg-tertiary">
                <img v-if="isThumbnailValid" :src="form.thumbnail" alt="Thumbnail preview" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <p class="text-amber-400 text-sm">Invalid or indirect URL</p>
                </div>
              </div>
              
              <div v-else class="aspect-video rounded-lg bg-bg-tertiary flex items-center justify-center">
                <p class="text-text-muted text-sm">No thumbnail</p>
              </div>
            </div>
          </div>

          <!-- Actions Card -->
          <div class="card p-6">
            <div class="space-y-3">
              <AppButton
                type="submit"
                variant="primary"
                size="lg"
                block
                :loading="loading"
              >
                {{ isEditing ? 'Update Certification' : 'Create Certification' }}
              </AppButton>
              
              <RouterLink to="/admin/certifications" class="block">
                <AppButton variant="ghost" size="lg" block>
                  Cancel
                </AppButton>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
