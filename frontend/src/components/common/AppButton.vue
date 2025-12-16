<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost', 'danger', 'white'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const variantClasses = {
  primary: 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:shadow-glow hover:scale-105',
  secondary: 'bg-bg-tertiary text-white border border-white/10 hover:border-accent-primary/50 hover:bg-bg-secondary',
  outline: 'bg-transparent border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white',
  ghost: 'bg-transparent text-text-secondary hover:text-white hover:bg-bg-tertiary',
  danger: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white',
  white: 'bg-white text-purple-600 hover:bg-gray-100 hover:scale-105'
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-primary/50',
  variantClasses[props.variant],
  sizeClasses[props.size],
  {
    'w-full': props.block,
    'opacity-50 cursor-not-allowed': props.disabled || props.loading,
    'pointer-events-none': props.loading
  }
])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    
    <slot v-if="!loading" />
    <span v-else>Loading...</span>
  </button>
</template>
