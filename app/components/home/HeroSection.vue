<template>
  <section class="relative h-[70vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50">
    <!-- Slides -->
    <div class="absolute inset-0">
      <TransitionGroup name="fade">
        <div
          v-for="(slide, index) in slides"
          v-show="currentSlide === index"
          :key="slide.id"
          class="absolute inset-0"
        >
          <!-- Background Image/Gradient -->
          <div
            class="absolute inset-0 bg-cover bg-center"
            :style="{ backgroundImage: slide.image ? `url(${slide.image})` : undefined }"
          >
            <!-- Fallback gradient if no image -->
            <div
              v-if="!slide.image"
              class="absolute inset-0"
              :class="slide.gradient"
            />
          </div>
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/60" />
        </div>
      </TransitionGroup>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
    <div class="absolute bottom-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />

    <!-- Content -->
    <div class="container-app relative z-10 h-full flex items-center">
      <div class="max-w-2xl">
        <TransitionGroup name="slide-up">
          <div v-show="contentVisible" :key="currentSlide">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span class="text-gradient">{{ activeSlide.title }}</span>
            </h1>
            <p class="text-xl md:text-2xl text-slate-700 mb-4">
              {{ activeSlide.subtitle }}
            </p>
            <p class="text-lg text-slate-500 mb-8">
              {{ activeSlide.description }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="#products" class="btn-accent">
                <Icon name="heroicons:shopping-bag" class="w-5 h-5" />
                <span>{{ $t('common.browseProducts') }}</span>
              </a>
              <a :href="telegramUrl" target="_blank" class="btn-ghost">
                <Icon name="simple-icons:telegram" class="w-5 h-5" />
                <span>{{ $t('common.contactUs') }}</span>
              </a>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Slide Indicators -->
    <div class="absolute bottom-6 inset-x-0 z-20 flex justify-center gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        :class="[
          'h-2 rounded-full transition-all duration-300',
          currentSlide === index
            ? 'bg-red-500 w-8'
            : 'bg-slate-300 hover:bg-slate-400 w-2'
        ]"
        @click="goToSlide(index)"
      />
    </div>

    <!-- Navigation Arrows -->
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 border border-slate-200 text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all shadow-sm"
      @click="prevSlide"
    >
      <Icon name="heroicons:chevron-left" class="w-6 h-6" />
    </button>
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 border border-slate-200 text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all shadow-sm"
      @click="nextSlide"
    >
      <Icon name="heroicons:chevron-right" class="w-6 h-6" />
    </button>
  </section>
</template>

<script setup lang="ts">
interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image?: string
  gradient?: string
}

// Mock slides - will be replaced with API data later
const slides: HeroSlide[] = [
  {
    id: 1,
    title: 'DJI Mavic 3 Pro',
    subtitle: 'Flagship Triple-Camera Drone',
    description: 'Experience unprecedented flight with Hasselblad camera and 43 minutes of flight time.',
    gradient: 'bg-gradient-to-br from-slate-50 via-red-50 to-white'
  },
  {
    id: 2,
    title: 'DJI Osmo Pocket 3',
    subtitle: 'Pocket-Sized Gimbal Camera',
    description: 'Capture smooth 4K video with one hand. Perfect for Vloggers and content creators.',
    gradient: 'bg-gradient-to-br from-white via-orange-50 to-slate-50'
  },
  {
    id: 3,
    title: 'DJI RS 4 Pro',
    subtitle: 'Professional Gimbal Stabilizer',
    description: 'Professional-grade stabilization for cinema cameras. 4.5kg payload with 12-hour battery.',
    gradient: 'bg-gradient-to-br from-slate-50 via-blue-50 to-white'
  }
]

const config = useRuntimeConfig()
const currentSlide = ref(0)
const contentVisible = ref(true)

const activeSlide = computed((): HeroSlide => slides[currentSlide.value]!)

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
  slideInterval = setInterval(nextSlide, 6000)
})

onUnmounted(() => {
  clearInterval(slideInterval)
})

// Reset interval when manually changing slides
const resetInterval = () => {
  clearInterval(slideInterval)
  slideInterval = setInterval(nextSlide, 6000)
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
