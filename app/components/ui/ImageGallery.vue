<template>
  <div class="space-y-4">
    <!-- Main Image / YouTube -->
    <div class="gallery-main">
      <!-- YouTube embed -->
      <iframe
        v-if="isYouTubeActive && youtubeUrl"
        :src="youtubeUrl"
        class="w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <!-- Show actual image if URL exists -->
      <img
        v-else-if="currentImageUrl"
        :src="currentImageUrl"
        :alt="alt"
        class="w-full h-full object-contain bg-slate-50"
      />
      <!-- Fallback placeholder -->
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div class="text-center">
          <Icon name="heroicons:photo" class="w-24 h-24 text-slate-400 mb-4" />
          <p class="text-slate-500 text-sm">{{ alt }}</p>
        </div>
      </div>
    </div>

    <!-- Thumbnails -->
    <div v-if="totalItems > 1" class="grid grid-cols-5 gap-2">
      <button
        v-for="(imageUrl, index) in validImages"
        :key="index"
        :class="['gallery-thumb', { active: activeIndex === index && !isYouTubeActive }]"
        @click="activeIndex = index; isYouTubeActive = false"
      >
        <img
          :src="imageUrl"
          :alt="`${alt} - ${index + 1}`"
          class="w-full h-full object-cover"
        />
      </button>
      <!-- YouTube thumbnail -->
      <button
        v-if="youtubeUrl"
        :class="['gallery-thumb relative', { active: isYouTubeActive }]"
        @click="isYouTubeActive = true"
      >
        <div class="w-full h-full bg-slate-900 flex items-center justify-center">
          <Icon name="heroicons:play" class="w-8 h-8 text-white" />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  alt: string
  youtubeUrl?: string | null
}>()

const activeIndex = ref(0)
const isYouTubeActive = ref(false)

// Filter valid image URLs
const validImages = computed(() => {
  return props.images.filter(img => img && (img.startsWith('http') || img.startsWith('/')))
})

// Total gallery items (images + youtube)
const totalItems = computed(() => validImages.value.length + (props.youtubeUrl ? 1 : 0))

// Get current image URL
const currentImageUrl = computed(() => {
  if (validImages.value.length > 0 && activeIndex.value < validImages.value.length) {
    return validImages.value[activeIndex.value]
  }
  if (props.images.length > 0) {
    const firstImage = props.images[0]
    if (firstImage && (firstImage.startsWith('http') || firstImage.startsWith('/'))) {
      return firstImage
    }
  }
  return null
})

// Reset to first image when images change
watch(() => props.images, () => {
  activeIndex.value = 0
  isYouTubeActive.value = false
})
</script>
