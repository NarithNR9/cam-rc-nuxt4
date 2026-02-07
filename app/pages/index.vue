<template>
  <div>
    <!-- Hero Section -->
    <HomeHeroSection />

    <!-- Products Section -->
    <section id="products" class="container-app py-16">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            {{ $t('products.title') }}
          </h2>
          <p class="text-slate-500">
            {{ $t('products.subtitle') }}
          </p>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-col lg:flex-row gap-4 mb-8">
        <!-- Search -->
        <div class="w-full lg:w-80">
          <UiSearchInput v-model="filters.search" :placeholder="$t('products.searchPlaceholder')" />
        </div>

        <!-- Categories -->
        <div class="flex-1">
          <UiCategoryFilter
            v-model="filters.category"
            :counts="categoryCounts"
          />
        </div>

        <!-- Sort -->
        <div class="flex-shrink-0">
          <UiPriceSort v-model="filters.sortBy" />
        </div>
      </div>

      <!-- Clear Filters -->
      <div v-if="hasActiveFilters" class="mb-6">
        <button
          class="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          @click="clearFilters"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
          {{ $t('common.clearFilters') }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="status === 'pending'" class="product-grid">
        <div v-for="i in 8" :key="i" class="skeleton-card">
          <div class="skeleton-image" />
          <div class="p-4 space-y-3">
            <div class="skeleton-text-lg w-3/4" />
            <div class="skeleton-text w-1/3" />
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-slate-800 mb-2">{{ $t('products.failedToLoad') }}</h3>
        <p class="text-slate-500 mb-4">{{ error.message }}</p>
        <button class="btn-accent" @click="refresh()">
          {{ $t('common.tryAgain') }}
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProducts.length === 0" class="text-center py-16">
        <Icon name="heroicons:magnifying-glass" class="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-slate-800 mb-2">{{ $t('products.notFound') }}</h3>
        <p class="text-slate-500 mb-4">
          {{ $t('products.notFoundDesc') }}
        </p>
        <button class="btn-ghost" @click="clearFilters">
          {{ $t('common.clearFilters') }}
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
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const {
  filteredProducts,
  categoryCounts,
  filters,
  status,
  error,
  refresh,
  clearFilters,
  hasActiveFilters
} = useProducts()

// Static SEO for homepage
useSeoMeta({
  title: 'Cambodia RC - DJI Dealer | Drones, Gimbals & Cameras',
  description: 'Official DJI dealer in Cambodia. Shop premium drones, gimbals, and cameras. Fast delivery and expert support in Phnom Penh.',
  ogTitle: 'Cambodia RC - DJI Dealer | Drones, Gimbals & Cameras',
  ogDescription: 'Official DJI dealer in Cambodia. Shop premium drones, gimbals, and cameras.',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
</script>
