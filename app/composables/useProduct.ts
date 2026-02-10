import type { Product, ProductSpec } from '~/types'
import { getFileId } from '~/composables/useDirectus'

/**
 * Composable for fetching a single product by ID from Directus
 */
export function useProduct(id: string | number) {
  const { directus, readItem } = useDirectusClient()
  const { getAssetUrl } = useDirectusAsset()
  const numericId = typeof id === 'string' ? Number(id) : id

  const {
    data: product,
    status,
    error,
    refresh
  } = useAsyncData<Product | null>(
    `product-${id}`,
    async () => {
      const item = await directus.request(
        readItem('products', numericId, {
          fields: ['*', 'category.*', 'image.*', 'gallery.directus_files_id.*']
        })
      )
      return item as Product | null
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

  // All images as full asset URLs (primary + gallery)
  const allImageIds = computed<string[]>(() => {
    const ids: string[] = []
    if (primaryImageId.value) {
      ids.push(primaryImageId.value)
    }
    ids.push(...galleryImageIds.value)
    return ids.map(id => getAssetUrl(id))
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

  // YouTube embed URL
  const youtubeEmbedUrl = computed((): string | null => {
    const url = product.value?.youtube_url
    if (!url) return null
    const watchMatch = url.match(/[?&]v=([^&]+)/)
    if (watchMatch?.[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
    if (shortMatch?.[1]) return `https://www.youtube.com/embed/${shortMatch[1]}`
    return null
  })

  return {
    product,
    status,
    error,
    refresh,
    primaryImageId,
    galleryImageIds,
    allImageIds,
    youtubeEmbedUrl,
    groupedSpecs,
    getSpecGroupIcon
  }
}
