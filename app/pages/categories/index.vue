<template>
  <div class="container-app py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
        Product Categories
      </h1>
      <p class="text-slate-500">
        Browse our products by category
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="skeleton-card p-6">
        <div class="flex items-start gap-4">
          <div class="skeleton w-16 h-16 rounded-xl" />
          <div class="flex-1 space-y-3">
            <div class="skeleton-text-lg w-1/3" />
            <div class="skeleton-text w-full" />
            <div class="skeleton-text w-2/3" />
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="`/categories/${category.slug}`"
        class="glass-card p-6 group hover:border-red-200 transition-all duration-300"
      >
        <div class="flex items-start gap-4">
          <!-- Icon -->
          <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center flex-shrink-0 group-hover:from-red-200 group-hover:to-red-100 transition-all">
            <Icon :name="category.icon || 'heroicons:cube'" class="w-8 h-8 text-red-500" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2 mb-2">
              <h2 class="text-xl font-semibold text-slate-800 group-hover:text-red-600 transition-colors">
                {{ category.name }}
              </h2>
              <span class="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                {{ category.product_count }} products
              </span>
            </div>
            <p class="text-slate-500 text-sm line-clamp-2">
              {{ category.description }}
            </p>

            <!-- View Link -->
            <div class="mt-4 flex items-center gap-1 text-red-500 text-sm font-medium group-hover:text-red-600 transition-colors">
              <span>Browse {{ category.name }}</span>
              <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { categories, status } = useCategories()

useSeoMeta({
  title: 'Product Categories | Cambodia RC',
  description: 'Browse DJI products by category - Drones, Gimbals, Cameras, and Accessories.',
  ogTitle: 'Product Categories | Cambodia RC',
  ogDescription: 'Browse DJI products by category - Drones, Gimbals, Cameras, and Accessories.'
})
</script>
