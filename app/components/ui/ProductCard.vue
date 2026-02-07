<template>
  <NuxtLink :to="`/products/${product.id}`" class="product-card block">
    <!-- Image -->
    <div class="product-card-image">
      <NuxtImg
        v-if="imageUrl"
        provider="directus"
        :src="imageId || ''"
        :alt="product.name"
        width="400"
        height="400"
        loading="lazy"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Icon name="heroicons:photo" class="w-16 h-16 text-slate-600" />
      </div>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span :class="['badge', stockConfig.bgColor]">
          {{ stockConfig.label }}
        </span>
      </div>
      <div class="absolute top-3 right-3">
        <span class="badge badge-category">
          {{ product.category }}
        </span>
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <h3 class="font-semibold text-slate-100 line-clamp-2 mb-2 min-h-[3rem]">
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
import { formatPrice, getStockStatusConfig, getFileId } from '~/composables/useDirectus'

const props = defineProps<{
  product: Product
}>()

const { getAssetUrl } = useDirectusAsset()

const imageId = computed(() =>
  getFileId(props.product.image as string | { id: string } | null)
)

const imageUrl = computed(() =>
  imageId.value ? getAssetUrl(imageId.value, { width: 400, height: 400, fit: 'cover' }) : null
)

const formattedPrice = computed(() => formatPrice(props.product.price))

const stockConfig = computed(() => getStockStatusConfig(props.product.stock_status))
</script>
