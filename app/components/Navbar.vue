<template>
  <nav class="navbar-glass">
    <div class="container-app">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
          <img src="/images/logo.png" alt="Cambodia RC" class="h-12 w-12 object-contain" />
          <span class="text-xl font-bold text-slate-800">Cambodia RC</span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink
            :to="localePath('/')"
            class="text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
          >
            {{ $t('common.home') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/') + '#products'"
            class="text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
          >
            {{ $t('common.products') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/categories')"
            class="text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
          >
            {{ $t('common.categories') }}
          </NuxtLink>

          <!-- Language Switcher -->
          <UiLanguageSwitcher />

          <a
            :href="telegramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-accent text-sm py-2 px-4"
          >
            <Icon name="simple-icons:telegram" class="w-4 h-4" />
            <span>{{ $t('nav.orderViaTelegram') }}</span>
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-slate-600 hover:text-red-600"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Icon
            :name="mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
            class="w-6 h-6"
          />
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition name="slide-up">
        <div
          v-if="mobileMenuOpen"
          class="md:hidden py-4 border-t border-slate-200"
        >
          <div class="flex flex-col gap-3">
            <NuxtLink
              :to="localePath('/')"
              class="text-slate-600 hover:text-red-600 transition-colors py-2"
              @click="mobileMenuOpen = false"
            >
              {{ $t('common.home') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/') + '#products'"
              class="text-slate-600 hover:text-red-600 transition-colors py-2"
              @click="mobileMenuOpen = false"
            >
              {{ $t('common.products') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/categories')"
              class="text-slate-600 hover:text-red-600 transition-colors py-2"
              @click="mobileMenuOpen = false"
            >
              {{ $t('common.categories') }}
            </NuxtLink>

            <!-- Mobile Language Switcher -->
            <div class="py-2">
              <UiLanguageSwitcher />
            </div>

            <a
              :href="telegramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-accent text-center mt-2"
            >
              <Icon name="simple-icons:telegram" class="w-5 h-5" />
              <span>{{ $t('nav.orderViaTelegram') }}</span>
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const localePath = useLocalePath()
const mobileMenuOpen = ref(false)

const telegramUrl = computed(() => {
  const username = config.public.telegramUsername
  const message = 'សួស្តី! ខ្ញុំចង់សាកសួរអំពីផលិតផល។'
  return `https://t.me/${username}?text=${encodeURIComponent(message)}`
})

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>
