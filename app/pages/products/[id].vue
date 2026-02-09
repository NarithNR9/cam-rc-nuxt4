<template>
  <div class="container-app py-8">
    <!-- Back Navigation -->
    <NuxtLink
      :to="localePath('/') + '#products'"
      class="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 mb-8 transition-colors"
    >
      <Icon name="heroicons:arrow-left" class="w-5 h-5" />
      <span>Back to Products</span>
    </NuxtLink>

    <!-- Loading State -->
    <div v-if="status === 'pending'" class="grid lg:grid-cols-2 gap-8">
      <div class="skeleton-image rounded-2xl" style="aspect-ratio: 1" />
      <div class="space-y-4">
        <div class="skeleton-text-lg w-3/4 h-8" />
        <div class="skeleton-text w-1/4 h-10" />
        <div class="skeleton-text w-full h-4" />
        <div class="skeleton-text w-full h-4" />
        <div class="skeleton-text w-2/3 h-4" />
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!product" class="text-center py-16">
      <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
      <p class="text-slate-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <NuxtLink :to="localePath('/')" class="btn-accent">
        Browse All Products
      </NuxtLink>
    </div>

    <!-- Product Content -->
    <div v-else class="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <!-- Image Gallery -->
      <div>
        <UiImageGallery :images="allImageIds" :alt="product.name" />
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <!-- Category & Stock -->
        <div class="flex items-center gap-3">
          <NuxtLink
            :to="localePath(`/categories/${categorySlug}`)"
            class="badge badge-category hover:bg-slate-200 hover:border-slate-300 transition-colors"
          >
            {{ categoryName }}
          </NuxtLink>
          <span :class="['badge', stockConfig.bgColor]">
            {{ stockConfig.label }}
          </span>
        </div>

        <!-- Name -->
        <h1 class="text-3xl md:text-4xl font-bold text-slate-800">
          {{ product.name }}
        </h1>

        <!-- Price -->
        <p class="price-tag-lg">
          {{ formattedPrice }}
        </p>

        <!-- Description -->
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-600 leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <!-- CTA Buttons -->
        <UiCTAButtons
          :product-name="product.name"
          :product-price="product.price"
        />

        <!-- Specifications -->
        <div v-if="Object.keys(groupedSpecs).length > 0" class="pt-6 border-t border-slate-200">
          <h3 class="text-lg font-semibold text-slate-800 mb-4">Specifications</h3>
          <UiSpecsList
            :grouped-specs="groupedSpecs"
            :get-icon="getSpecGroupIcon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice, getStockStatusConfig } from '~/composables/useDirectus'

const localePath = useLocalePath()
const route = useRoute()
const productId = Number(route.params.id)

const {
  product,
  status,
  allImageIds,
  groupedSpecs,
  getSpecGroupIcon
} = useProduct(productId)

const { getOgImageUrl } = useDirectusAsset()

const formattedPrice = computed(() =>
  product.value ? formatPrice(product.value.price) : ''
)

const stockConfig = computed(() =>
  product.value ? getStockStatusConfig(product.value.stock_status) : getStockStatusConfig('in_stock')
)

const categoryName = computed(() => {
  if (!product.value) return ''
  const cat = product.value.category
  if (typeof cat === 'string') return cat
  if (cat && typeof cat === 'object' && 'name' in cat) return cat.name
  return ''
})

const categorySlug = computed(() => {
  if (!product.value) return ''
  const cat = product.value.category
  if (typeof cat === 'object' && cat && 'slug' in cat) return cat.slug
  // Convert category name to slug (lowercase)
  return categoryName.value.toLowerCase()
})

// Helper to get image URL (handles both URLs and Directus file IDs)
const getImageUrl = (img: string | { id: string } | null | undefined): string | undefined => {
  if (!img) return undefined
  // If it's already a full URL, return as-is
  if (typeof img === 'string' && img.startsWith('http')) {
    return img
  }
  // Otherwise construct Directus asset URL
  const imageId = typeof img === 'string' ? img : img.id
  return getOgImageUrl(imageId)
}

// Dynamic SEO Meta
useSeoMeta({
  title: () => product.value ? `${product.value.name} | Cambodia RC` : 'Product | Cambodia RC',
  description: () => product.value?.description || 'DJI product available at Cambodia RC',
  ogTitle: () => product.value?.name || 'Product',
  ogDescription: () => product.value?.description || 'DJI product available at Cambodia RC',
  ogImage: () => product.value ? getImageUrl(product.value.image as string | { id: string } | null) : undefined,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

// Structured Data (JSON-LD)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => {
        if (!product.value) return '{}'
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.value.name,
          description: product.value.description,
          image: getImageUrl(product.value.image as string | { id: string } | null),
          offers: {
            '@type': 'Offer',
            price: product.value.price,
            priceCurrency: 'USD',
            availability: product.value.stock_status === 'in_stock'
              ? 'https://schema.org/InStock'
              : product.value.stock_status === 'out_of_stock'
              ? 'https://schema.org/OutOfStock'
              : product.value.stock_status === 'pre_order'
              ? 'https://schema.org/PreOrder'
              : 'https://schema.org/LimitedAvailability'
          }
        })
      })
    }
  ]
})
</script>
