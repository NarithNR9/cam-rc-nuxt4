<template>
  <section class="relative min-h-[70vh] flex items-center">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <NuxtImg
        v-if="backgroundImageId"
        provider="directus"
        :src="backgroundImageId"
        alt="Featured Product"
        class="w-full h-full object-cover"
        width="1920"
        height="1080"
      />
      <div v-else class="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800" />
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 hero-gradient" />
    </div>

    <!-- Content -->
    <div class="container-app relative z-10 py-20">
      <div class="max-w-2xl">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span class="text-gradient">DJI Products</span>
          <br />
          <span class="text-slate-100">in Cambodia</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-300 mb-8 font-khmer">
          ផលិតផល DJI ជាផ្លូវការនៅកម្ពុជា។ Drones, Gimbals, និង Cameras សម្រាប់អ្នកជំនាញ។
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="#products" class="btn-accent">
            <Icon name="heroicons:shopping-bag" class="w-5 h-5" />
            <span>Browse Products</span>
          </a>
          <NuxtLink to="#" class="btn-ghost">
            <Icon name="simple-icons:telegram" class="w-5 h-5" />
            <span class="font-khmer">ទាក់ទងយើង</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Featured Product Card (if available) -->
      <div
        v-if="featuredProduct"
        class="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-80"
      >
        <div class="glass-card p-4">
          <div class="aspect-square rounded-xl overflow-hidden bg-slate-800 mb-4">
            <NuxtImg
              v-if="featuredImageId"
              provider="directus"
              :src="featuredImageId"
              :alt="featuredProduct.name"
              width="400"
              height="400"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="font-semibold text-slate-100 mb-2">{{ featuredProduct.name }}</h3>
          <p class="price-tag mb-3">{{ formatPrice(featuredProduct.price) }}</p>
          <NuxtLink
            :to="`/products/${featuredProduct.id}`"
            class="btn-accent w-full text-center text-sm py-2"
          >
            View Details
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types'
import { formatPrice, getFileId } from '~/composables/useDirectus'

const props = defineProps<{
  featuredProduct?: Product | null
}>()

const backgroundImageId = computed(() => {
  if (!props.featuredProduct) return null
  return getFileId(props.featuredProduct.image as string | { id: string } | null)
})

const featuredImageId = computed(() => {
  if (!props.featuredProduct) return null
  return getFileId(props.featuredProduct.image as string | { id: string } | null)
})
</script>
