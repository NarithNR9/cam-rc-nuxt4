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
    </div>
  </nav>

  <!-- Mobile Menu - Teleported to body -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
        @click="mobileMenuOpen = false"
      />
    </Transition>

    <!-- Mobile Menu Panel -->
    <Transition name="slide-down">
      <div
        v-if="mobileMenuOpen"
        class="fixed top-0 left-0 right-0 bg-white z-[70] md:hidden shadow-2xl"
      >
        <div class="container-app">
          <!-- Header with logo and close button -->
          <div class="flex items-center justify-between h-16 border-b border-slate-200">
            <NuxtLink :to="localePath('/')" class="flex items-center gap-2" @click="mobileMenuOpen = false">
              <img src="/images/logo.png" alt="Cambodia RC" class="h-12 w-12 object-contain" />
              <span class="text-xl font-bold text-slate-800">Cambodia RC</span>
            </NuxtLink>
            <button
              class="p-2 text-slate-600 hover:text-red-600"
              @click="mobileMenuOpen = false"
            >
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>

          <!-- Menu Items -->
          <div class="py-4">
            <div class="flex flex-col gap-1">
              <NuxtLink
                :to="localePath('/')"
                class="text-slate-700 hover:text-red-600 hover:bg-slate-50 transition-colors py-3 px-2 rounded-lg font-medium"
                @click="mobileMenuOpen = false"
              >
                {{ $t('common.home') }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/') + '#products'"
                class="text-slate-700 hover:text-red-600 hover:bg-slate-50 transition-colors py-3 px-2 rounded-lg font-medium"
                @click="mobileMenuOpen = false"
              >
                {{ $t('common.products') }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/categories')"
                class="text-slate-700 hover:text-red-600 hover:bg-slate-50 transition-colors py-3 px-2 rounded-lg font-medium"
                @click="mobileMenuOpen = false"
              >
                {{ $t('common.categories') }}
              </NuxtLink>

              <!-- Mobile Language Switcher -->
              <div class="py-3 px-2">
                <UiLanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const mobileMenuOpen = ref(false)

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

// Prevent body scroll when menu is open
watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
