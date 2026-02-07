<template>
  <div class="container-app py-8">
    <!-- Back Navigation -->
    <NuxtLink
      :to="localePath('/categories')"
      class="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 mb-6 transition-colors"
    >
      <Icon name="heroicons:arrow-left" class="w-5 h-5" />
      <span>All Categories</span>
    </NuxtLink>

    <!-- Loading State -->
    <div v-if="categoryStatus === 'pending'" class="space-y-8">
      <div class="space-y-4">
        <div class="skeleton-text-lg w-1/4 h-10" />
        <div class="skeleton-text w-1/2" />
      </div>
      <div class="product-grid">
        <div v-for="i in 4" :key="i" class="skeleton-card">
          <div class="skeleton-image" />
          <div class="p-4 space-y-3">
            <div class="skeleton-text-lg w-3/4" />
            <div class="skeleton-text w-1/3" />
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!category" class="text-center py-16">
      <Icon name="heroicons:folder-open" class="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Category Not Found</h2>
      <p class="text-slate-500 mb-6">The category you're looking for doesn't exist.</p>
      <NuxtLink :to="localePath('/categories')" class="btn-accent">
        View All Categories
      </NuxtLink>
    </div>

    <!-- Category Content -->
    <div v-else>
      <!-- Category Header -->
      <div class="flex items-start gap-4 mb-8">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center flex-shrink-0">
          <Icon :name="category.icon || 'heroicons:cube'" class="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            {{ category.name }}
          </h1>
          <p class="text-slate-500">
            {{ category.description }}
          </p>
          <p class="text-sm text-slate-400 mt-2">
            {{ category.product_count }} products
          </p>
        </div>
      </div>

      <!-- Filters Row -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8">
        <div class="flex-1">
          <UiSearchInput v-model="searchQuery" />
        </div>
        <div class="flex-shrink-0">
          <UiPriceSort v-model="sortBy" />
        </div>
      </div>

      <!-- Products Loading -->
      <div v-if="productsStatus === 'pending'" class="product-grid">
        <div v-for="i in 4" :key="i" class="skeleton-card">
          <div class="skeleton-image" />
          <div class="p-4 space-y-3">
            <div class="skeleton-text-lg w-3/4" />
            <div class="skeleton-text w-1/3" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProducts.length === 0" class="text-center py-16">
        <Icon name="heroicons:shopping-bag" class="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-slate-800 mb-2">No products found</h3>
        <p class="text-slate-500 mb-4">
          {{ searchQuery ? 'Try adjusting your search' : 'No products in this category yet' }}
        </p>
        <button v-if="searchQuery" class="btn-ghost" @click="searchQuery = ''">
          Clear Search
        </button>
      </div>

      <!-- Product Grid -->
      <div v-else class="product-grid">
        <UiProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string

const { category, status: categoryStatus } = useCategory(slug)
const { products, status: productsStatus } = useProductsByCategory(slug)

const searchQuery = ref('')
const sortBy = ref<'newest' | 'price_asc' | 'price_desc' | 'name_asc'>('newest')

const filteredProducts = computed(() => {
  if (!products.value) return []

  let result = [...products.value] as Product[]

  // Search filter
  if (searchQuery.value.trim()) {
    const search = searchQuery.value.toLowerCase()
    result = result.filter(
      p => p.name.toLowerCase().includes(search) ||
           p.description?.toLowerCase().includes(search)
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'name_asc':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'newest':
    default:
      result.sort((a, b) => {
        const dateA = a.date_created ? new Date(a.date_created).getTime() : 0
        const dateB = b.date_created ? new Date(b.date_created).getTime() : 0
        return dateB - dateA
      })
  }

  return result
})

// Dynamic SEO
useSeoMeta({
  title: () => category.value ? `${category.value.name} | Cambodia RC` : 'Category | Cambodia RC',
  description: () => category.value?.description || 'Browse DJI products by category',
  ogTitle: () => category.value?.name || 'Category',
  ogDescription: () => category.value?.description || 'Browse DJI products by category'
})
</script>
