<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const showPassword = ref(false)
const isFocused = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-text-secondary mb-2">
      {{ label }}
      <span v-if="required" class="text-red-400">*</span>
    </label>

    <!-- Input wrapper -->
    <div class="relative">
      <!-- Left icon -->
      <div
        v-if="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
      >
        <!-- Email icon -->
        <svg v-if="icon === 'email'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <!-- Password/Lock icon -->
        <svg v-else-if="icon === 'password'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <!-- User icon -->
        <svg v-else-if="icon === 'user'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <!-- Search icon -->
        <svg v-else-if="icon === 'search'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <!-- Input element -->
      <input
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="input"
        :class="{
          'pl-10': icon,
          'pr-10': type === 'password',
          'border-red-500 focus:border-red-500 focus:ring-red-500/20': error,
          'opacity-50 cursor-not-allowed': disabled
        }"
        @input="handleInput"
        @focus="isFocused = true; $emit('focus', $event)"
        @blur="isFocused = false; $emit('blur', $event)"
      />

      <!-- Password toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePassword"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
      >
        <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      </button>
    </div>

    <!-- Error message -->
    <p v-if="error" class="mt-2 text-sm text-red-400">
      {{ error }}
    </p>
  </div>
</template>
