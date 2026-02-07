import type { Product, ProductCategory, ProductFilters } from '~/types'
import { mockProducts } from '~/data/mockProducts'
import { getFileId } from '~/composables/useDirectus'

/**
 * Composable for fetching and filtering products
 * Currently uses mock data - switch to Directus when backend is ready
 */
export function useProducts() {
  // Reactive filters
  const filters = reactive<ProductFilters>({
    search: '',
    category: 'all',
    sortBy: 'newest'
  })

  // Use mock data instead of Directus fetch
  const {
    data: products,
    status,
    error,
    refresh
  } = useAsyncData<Product[]>(
    'products',
    async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300))
      return mockProducts
    },
    {
      default: () => []
    }
  )

  // Filter and sort products
  const filteredProducts = computed(() => {
    if (!products.value) return []

    let result = [...products.value]

    // Search filter
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      )
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category)
    }

    // Sort
    switch (filters.sortBy) {
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

  // Featured products for hero
  const featuredProducts = computed(() => {
    if (!products.value) return []
    return products.value.filter((p) => p.featured)
  })

  // Primary featured product
  const primaryFeaturedProduct = computed(() => {
    return featuredProducts.value[0] || null
  })

  // Category counts for badges
  const categoryCounts = computed(() => {
    if (!products.value) return {}

    const counts: Record<string, number> = { all: products.value.length }
    const categories: ProductCategory[] = ['Drones', 'Gimbals', 'Cameras', 'Accessories']

    for (const category of categories) {
      counts[category] = products.value.filter((p) => p.category === category).length
    }

    return counts
  })

  // Get image ID from product
  const getProductImageId = (product: Product): string | null => {
    return getFileId(product.image as string | { id: string } | null)
  }

  // Clear all filters
  const clearFilters = () => {
    filters.search = ''
    filters.category = 'all'
    filters.sortBy = 'newest'
  }

  // Check if any filters are active
  const hasActiveFilters = computed(() => {
    return (
      filters.search.trim() !== '' ||
      filters.category !== 'all' ||
      filters.sortBy !== 'newest'
    )
  })

  return {
    products,
    filteredProducts,
    featuredProducts,
    primaryFeaturedProduct,
    categoryCounts,
    filters,
    status,
    error,
    refresh,
    getProductImageId,
    clearFilters,
    hasActiveFilters
  }
}
