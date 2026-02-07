<template>
  <div class="space-y-4">
    <!-- Main Image -->
    <div class="gallery-main">
      <!-- Show actual image if URL exists -->
      <img
        v-if="currentImageUrl"
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
    <div v-if="validImages.length > 1" class="grid grid-cols-5 gap-2">
      <button
        v-for="(imageUrl, index) in validImages"
        :key="index"
        :class="['gallery-thumb', { active: activeIndex === index }]"
        @click="activeIndex = index"
      >
        <img
          :src="imageUrl"
          :alt="`${alt} - ${index + 1}`"
          class="w-full h-full object-cover"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  alt: string
}>()

const activeIndex = ref(0)

// Filter valid image URLs
const validImages = computed(() => {
  return props.images.filter(img => img && (img.startsWith('http') || img.startsWith('/')))
})

// Get current image URL
const currentImageUrl = computed(() => {
  if (validImages.value.length > 0 && activeIndex.value < validImages.value.length) {
    return validImages.value[activeIndex.value]
  }
  // If no valid images in array, check if the first image in props is valid
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
})
</script>
