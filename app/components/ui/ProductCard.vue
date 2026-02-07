<template>
  <NuxtLink :to="`/products/${product.id}`" class="product-card block">
    <!-- Image -->
    <div class="product-card-image">
      <!-- Use placeholder for mock data -->
      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div class="text-center">
          <Icon :name="categoryIcon" class="w-16 h-16 text-slate-400 mb-2" />
          <span class="text-xs text-slate-500">{{ categoryName }}</span>
        </div>
      </div>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span :class="['badge', stockConfig.bgColor]">
          {{ stockConfig.label }}
        </span>
      </div>
      <div class="absolute top-3 right-3">
        <span class="badge badge-category">
          {{ categoryName }}
        </span>
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <h3 class="font-semibold text-slate-800 line-clamp-2 mb-2 min-h-[3rem]">
        {{ product.name }}
      </h3>
      <p class="price-tag">
        {{ formattedPrice }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/types'
import { formatPrice, getStockStatusConfig } from '~/composables/useDirectus'

const props = defineProps<{
  product: Product
}>()

const formattedPrice = computed(() => formatPrice(props.product.price))

const stockConfig = computed(() => getStockStatusConfig(props.product.stock_status))

const categoryName = computed(() => {
  const cat = props.product.category
  if (typeof cat === 'string') return cat
  if (cat && typeof cat === 'object' && 'name' in cat) return cat.name
  return ''
})

const categoryIcon = computed(() => {
  const icons: Record<string, string> = {
    Drones: 'heroicons:paper-airplane',
    Gimbals: 'heroicons:adjustments-horizontal',
    Cameras: 'heroicons:camera',
    Accessories: 'heroicons:wrench-screwdriver'
  }
  return icons[categoryName.value] || 'heroicons:cube'
})
</script>
