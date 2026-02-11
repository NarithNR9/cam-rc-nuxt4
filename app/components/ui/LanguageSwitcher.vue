<template>
  <div class="relative">
    <button
      class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-red-200 transition-colors text-sm shadow-sm"
      @click="isOpen = !isOpen"
    >
      <Icon name="heroicons:language" class="w-4 h-4 text-slate-500" />
      <span class="text-slate-700">{{ currentLocaleName }}</span>
      <Icon
        name="heroicons:chevron-down"
        class="w-4 h-4 text-slate-400 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="absolute left-0 md:right-0 md:left-auto mt-2 py-1 w-32 bg-white border border-slate-200 rounded-lg shadow-xl z-50"
      >
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          class="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
          :class="locale.code === currentLocale ? 'text-red-600' : 'text-slate-600'"
          @click="switchLocale(locale.code)"
        >
          <span v-if="locale.code === currentLocale">
            <Icon name="heroicons:check" class="w-4 h-4" />
          </span>
          <span v-else class="w-4" />
          <span>{{ locale.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const isOpen = ref(false)

const currentLocale = computed(() => locale.value)

const availableLocales = computed(() => {
  return locales.value.map(l => ({
    code: typeof l === 'string' ? l : l.code,
    name: typeof l === 'string' ? l : l.name || l.code
  }))
})

const currentLocaleName = computed(() => {
  const current = availableLocales.value.find(l => l.code === currentLocale.value)
  return current?.name || currentLocale.value
})

const switchLocale = async (code: string) => {
  await setLocale(code as 'en' | 'km' | 'zh')
  isOpen.value = false
}

// Close dropdown when clicking outside
const closeDropdown = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
