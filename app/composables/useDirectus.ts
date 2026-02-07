import type { StockStatus, StockStatusConfig } from '~/types'

/**
 * Access the Directus client instance
 */
export function useDirectus() {
  const { $directus } = useNuxtApp()
  return $directus
}

/**
 * Construct Directus asset URLs
 */
export function useDirectusAsset() {
  const config = useRuntimeConfig()

  const getAssetUrl = (
    fileId: string | null | undefined,
    options?: {
      width?: number
      height?: number
      quality?: number
      fit?: 'cover' | 'contain' | 'inside' | 'outside'
      format?: 'auto' | 'webp' | 'jpg' | 'png'
    }
  ): string => {
    if (!fileId) return '/images/placeholder.svg'

    const baseUrl = `${config.public.directusUrl}/assets/${fileId}`
    const params = new URLSearchParams()

    if (options?.width) params.set('width', options.width.toString())
    if (options?.height) params.set('height', options.height.toString())
    if (options?.quality) params.set('quality', options.quality.toString())
    if (options?.fit) params.set('fit', options.fit)
    if (options?.format) params.set('format', options.format)

    const queryString = params.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }

  const getOgImageUrl = (fileId: string | null | undefined): string => {
    return getAssetUrl(fileId, {
      width: 1200,
      height: 630,
      fit: 'cover',
      quality: 80,
      format: 'jpg'
    })
  }

  const getThumbnailUrl = (fileId: string | null | undefined): string => {
    return getAssetUrl(fileId, {
      width: 400,
      height: 400,
      fit: 'cover',
      quality: 80,
      format: 'webp'
    })
  }

  return {
    getAssetUrl,
    getOgImageUrl,
    getThumbnailUrl
  }
}

/**
 * Format price in USD
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

/**
 * Get stock status display configuration
 */
export function getStockStatusConfig(status: StockStatus): StockStatusConfig {
  const configs: Record<StockStatus, StockStatusConfig> = {
    in_stock: {
      label: 'In Stock',
      labelKm: 'មានក្នុងស្តុក',
      color: 'text-emerald-400',
      bgColor: 'badge-in-stock'
    },
    low_stock: {
      label: 'Low Stock',
      labelKm: 'ស្តុកតិច',
      color: 'text-amber-400',
      bgColor: 'badge-low-stock'
    },
    out_of_stock: {
      label: 'Out of Stock',
      labelKm: 'អស់ស្តុក',
      color: 'text-red-400',
      bgColor: 'badge-out-of-stock'
    },
    pre_order: {
      label: 'Pre-Order',
      labelKm: 'កម្មង់មុន',
      color: 'text-blue-400',
      bgColor: 'badge-pre-order'
    }
  }

  return configs[status] || configs.in_stock
}

/**
 * Get file ID from Directus file object or string
 */
export function getFileId(file: string | { id: string } | null | undefined): string | null {
  if (!file) return null
  if (typeof file === 'string') return file
  return file.id
}
