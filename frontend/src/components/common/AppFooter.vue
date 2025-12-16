<script setup>
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()

const footerLinks = {
  platform: [
    { name: 'Browse Catalog', path: '/catalog' },
    { name: 'Categories', path: '/catalog' },
    { name: 'About Us', path: '/about' }
  ],
  resources: [
    { name: 'How It Works', path: '/about' },
    { name: 'FAQ', path: '/about' },
    { name: 'Contact', path: '/about' }
  ],
  categories: [
    { name: 'IT & Programming', path: '/catalog?category=IT' },
    { name: 'Data Science', path: '/catalog?category=Data Science' },
    { name: 'Business', path: '/catalog?category=Business' },
    { name: 'Design', path: '/catalog?category=Design' },
    { name: 'Marketing', path: '/catalog?category=Marketing' }
  ]
}

const socialLinks = [
  { name: 'GitHub', icon: 'github', url: '#' },
  { name: 'Twitter', icon: 'twitter', url: '#' },
  { name: 'LinkedIn', icon: 'linkedin', url: '#' }
]
</script>

<template>
  <footer class="bg-bg-secondary border-t border-white/5">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <RouterLink to="/" class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span class="text-xl font-bold gradient-text">CertiFind</span>
          </RouterLink>
          <p class="text-text-secondary text-sm leading-relaxed mb-4">
            Discover free certifications from top providers. Boost your career with verified credentials.
          </p>
          <!-- Social Links -->
          <div class="flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="w-9 h-9 bg-bg-tertiary rounded-lg flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-primary transition-all duration-300"
              :aria-label="social.name"
            >
              <!-- GitHub -->
              <svg v-if="social.icon === 'github'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
              <!-- Twitter -->
              <svg v-if="social.icon === 'twitter'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              <!-- LinkedIn -->
              <svg v-if="social.icon === 'linkedin'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Platform Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">Platform</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.platform" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-text-secondary hover:text-white transition-colors text-sm"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Resources Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">Resources</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.resources" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-text-secondary hover:text-white transition-colors text-sm"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Categories Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">Categories</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.categories" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-text-secondary hover:text-white transition-colors text-sm"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-text-muted text-sm">
          © {{ currentYear }} CertiFind. All rights reserved.
        </p>
        <div class="flex gap-6">
          <a href="#" class="text-text-muted hover:text-white text-sm transition-colors">
            Privacy Policy
          </a>
          <a href="#" class="text-text-muted hover:text-white text-sm transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
