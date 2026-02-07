<template>
  <section class="relative h-[40vh] md:h-[70vh] md:min-h-[400px] max-h-[600px] overflow-hidden">
    <!-- Slides -->
    <div class="absolute inset-0">
      <TransitionGroup name="fade">
        <div
          v-for="(slide, index) in slides"
          v-show="currentSlide === index"
          :key="slide.id"
          class="absolute inset-0"
        >
          <!-- Background Image -->
          <div
            class="absolute inset-0 bg-cover bg-center"
            :style="{ backgroundImage: `url(${slide.image})` }"
          />
          <!-- Subtle bottom gradient for text readability -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </TransitionGroup>
    </div>

    <!-- Minimal Content - Bottom Left -->
    <div class="container-app relative z-10 h-full flex items-end max-md:justify-center pb-6 md:pb-12">
      <TransitionGroup name="slide-up">
        <div v-show="contentVisible" :key="currentSlide" class="flex items-center gap-3 md:gap-6">
          <a href="#products" class="btn-accent max-md:!px-3 max-md:!py-2">
            <Icon name="heroicons:shopping-bag" class="w-5 h-5" />
            <span class="text-xs md:text-base">{{ $t('common.browseProducts') }}</span>
          </a>
          <a
            :href="telegramUrl"
            target="_blank"
            class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all font-medium"
          >
            <Icon name="simple-icons:telegram" class="w-5 h-5" />
            <span class="text-xs md:text-base">{{ $t('common.contactUs') }}</span>
          </a>
        </div>
      </TransitionGroup>
    </div>

    <!-- Slide Indicators - Bottom Center -->
    <div class="absolute bottom-2 md:bottom-6 inset-x-0 z-20 flex justify-center gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        :class="[
          'h-1.5 rounded-full transition-all duration-300',
          currentSlide === index
            ? 'bg-white w-8'
            : 'bg-white/40 hover:bg-white/60 w-1.5'
        ]"
        @click="goToSlide(index)"
      />
    </div>

    <!-- Navigation Arrows - Hidden on mobile -->
    <button
      class="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white/80 hover:bg-black/30 hover:text-white transition-all"
      @click="prevSlide"
    >
      <Icon name="heroicons:chevron-left" class="w-6 h-6" />
    </button>
    <button
      class="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white/80 hover:bg-black/30 hover:text-white transition-all"
      @click="nextSlide"
    >
      <Icon name="heroicons:chevron-right" class="w-6 h-6" />
    </button>
  </section>
</template>

<script setup lang="ts">
interface HeroSlide {
  id: number
  image: string
}

// Mock slides - will be replaced with API data later
const slides: HeroSlide[] = [
  { id: 1, image: '/heros/hero-1.jpg' },
  { id: 2, image: '/heros/hero-2.png' },
  { id: 3, image: '/heros/hero-3.jpg' }
]

const config = useRuntimeConfig()
const currentSlide = ref(0)
const contentVisible = ref(true)

const telegramUrl = computed(() => {
  const username = config.public.telegramUsername
  const message = 'សួស្តី! ខ្ញុំចង់សាកសួរអំពីផលិតផល។'
  return `https://t.me/${username}?text=${encodeURIComponent(message)}`
})

const goToSlide = (index: number) => {
  if (index === currentSlide.value) return
  contentVisible.value = false
  setTimeout(() => {
    currentSlide.value = index
    contentVisible.value = true
  }, 150)
}

const nextSlide = () => {
  goToSlide((currentSlide.value + 1) % slides.length)
}

const prevSlide = () => {
  goToSlide((currentSlide.value - 1 + slides.length) % slides.length)
}

// Auto-advance slides
let slideInterval: ReturnType<typeof setInterval>

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(slideInterval)
})

// Reset interval when manually changing slides
const resetInterval = () => {
  clearInterval(slideInterval)
  slideInterval = setInterval(nextSlide, 5000)
}

watch(currentSlide, resetInterval)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
