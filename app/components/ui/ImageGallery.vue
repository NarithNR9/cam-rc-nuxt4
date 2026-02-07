<template>
  <div class="space-y-4">
    <!-- Main Image -->
    <div class="gallery-main">
      <NuxtImg
        v-if="activeImageId"
        provider="directus"
        :src="activeImageId"
        :alt="alt"
        width="800"
        height="800"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Icon name="heroicons:photo" class="w-24 h-24 text-slate-600" />
      </div>
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" class="grid grid-cols-5 gap-2">
      <button
        v-for="(imageId, index) in images"
        :key="imageId"
        :class="['gallery-thumb', { active: activeIndex === index }]"
        @click="activeIndex = index"
      >
        <NuxtImg
          provider="directus"
          :src="imageId"
          :alt="`${alt} - Image ${index + 1}`"
          width="100"
          height="100"
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

const activeImageId = computed(() => props.images[activeIndex.value] || null)

// Reset to first image when images change
watch(() => props.images, () => {
  activeIndex.value = 0
})
</script>
