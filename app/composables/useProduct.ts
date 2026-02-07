import type { Product, ProductSpec } from '~/types'
import { getMockProductById } from '~/data/mockProducts'
import { getFileId } from '~/composables/useDirectus'

/**
 * Composable for fetching a single product by ID
 * Currently uses mock data - switch to Directus when backend is ready
 */
export function useProduct(id: string | number) {
  // Use mock data instead of Directus fetch
  const {
    data: product,
    status,
    error,
    refresh
  } = useAsyncData<Product | null>(
    `product-${id}`,
    async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 200))
      return getMockProductById(id)
    },
    {
      default: () => null
    }
  )

  // Primary image URL or ID
  const primaryImageId = computed(() => {
    if (!product.value) return null
    const img = product.value.image
    if (!img) return null
    // If it's already a full URL, return as-is
    if (typeof img === 'string' && (img.startsWith('http') || img.startsWith('/'))) {
      return img
    }
    // Otherwise use getFileId for Directus file objects
    return getFileId(img as string | { id: string } | null)
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
