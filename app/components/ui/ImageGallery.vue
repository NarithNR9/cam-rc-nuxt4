<template>
  <div class="space-y-4">
    <!-- Main Image -->
    <div class="gallery-main">
      <!-- Placeholder for mock data -->
      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
        <div class="text-center">
          <Icon name="heroicons:photo" class="w-24 h-24 text-slate-600 mb-4" />
          <p class="text-slate-500 text-sm">{{ alt }}</p>
        </div>
      </div>
    </div>

    <!-- Thumbnails (hidden for mock data) -->
    <div v-if="images.length > 1" class="grid grid-cols-5 gap-2">
      <button
        v-for="(imageId, index) in images"
        :key="imageId"
        :class="['gallery-thumb', { active: activeIndex === index }]"
        @click="activeIndex = index"
      >
        <div class="w-full h-full flex items-center justify-center bg-slate-800">
          <Icon name="heroicons:photo" class="w-6 h-6 text-slate-600" />
        </div>
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

// Reset to first image when images change
watch(() => props.images, () => {
  activeIndex.value = 0
})
</script>
