import { readItem } from '@directus/sdk'
import type { Product, ProductSpec } from '~/types'
import { getFileId } from '~/composables/useDirectus'

/**
 * Composable for fetching a single product by ID
 */
export function useProduct(id: string | number) {
  const directus = useDirectus()

  // Fetch single product with expanded relations
  const {
    data: product,
    status,
    error,
    refresh
  } = useAsyncData<Product | null>(
    `product-${id}`,
    async () => {
      try {
        const item = await directus.request(
          readItem('products', id, {
            fields: [
              'id',
              'name',
              'price',
              'category',
              'description',
              'specs',
              'image',
              'gallery.directus_files_id',
              'stock_status',
              'featured',
              'date_created',
              'date_updated'
            ]
          })
        )
        return item as Product
      } catch {
        return null
      }
    },
    {
      default: () => null
    }
  )

  // Primary image ID
  const primaryImageId = computed(() => {
    if (!product.value) return null
    return getFileId(product.value.image as string | { id: string } | null)
  })

  // Gallery image IDs
  const galleryImageIds = computed<string[]>(() => {
    if (!product.value?.gallery) return []

    return product.value.gallery
      .map((g) => {
        if (typeof g.directus_files_id === 'string') return g.directus_files_id
        if (g.directus_files_id && typeof g.directus_files_id === 'object') {
          return (g.directus_files_id as { id: string }).id
        }
        return null
      })
      .filter((id): id is string => id !== null)
  })

  // All images (primary + gallery)
  const allImageIds = computed<string[]>(() => {
    const images: string[] = []
    if (primaryImageId.value) {
      images.push(primaryImageId.value)
    }
    images.push(...galleryImageIds.value)
    return images
  })

  // Group specs by category
  const groupedSpecs = computed(() => {
    if (!product.value?.specs) return {}

    const groups: Record<string, ProductSpec[]> = {}

    for (const spec of product.value.specs) {
      const group = spec.group || 'General'
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(spec)
    }

    return groups
  })

  // Spec group icons mapping
  const specGroupIcons: Record<string, string> = {
    Camera: 'heroicons:camera',
    Flight: 'heroicons:paper-airplane',
    Battery: 'heroicons:battery-100',
    Gimbal: 'heroicons:adjustments-horizontal',
    Video: 'heroicons:video-camera',
    Transmission: 'heroicons:signal',
    Storage: 'heroicons:server',
    General: 'heroicons:information-circle',
    Dimensions: 'heroicons:cube',
    Weight: 'heroicons:scale'
  }

  const getSpecGroupIcon = (group: string): string => {
    return specGroupIcons[group] || 'heroicons:tag'
  }

  return {
    product,
    status,
    error,
    refresh,
    primaryImageId,
    galleryImageIds,
    allImageIds,
    groupedSpecs,
    getSpecGroupIcon
  }
}
