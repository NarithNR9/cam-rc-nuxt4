import type { Category } from '~/types'
import { mockCategories, getMockCategoryBySlug } from '~/data/mockCategories'
import { mockProducts } from '~/data/mockProducts'

/**
 * Composable for fetching categories
 * Currently uses mock data - switch to Directus when backend is ready
 */
export function useCategories() {
  const {
    data: categories,
    status,
    error,
    refresh
  } = useAsyncData<Category[]>(
    'categories',
    async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 200))

      // Add product counts to categories
      return mockCategories.map(cat => ({
        ...cat,
        product_count: mockProducts.filter(p => p.category === cat.name).length
      }))
    },
    {
      default: () => []
    }
  )

  return {
    categories,
    status,
    error,
    refresh
  }
}

/**
 * Composable for fetching a single category by slug
 */
export function useCategory(slug: string) {
  const {
    data: category,
    status,
    error,
    refresh
  } = useAsyncData<Category | null>(
    `category-${slug}`,
    async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 200))

      const cat = getMockCategoryBySlug(slug)
      if (!cat) return null

      // Add product count
      return {
        ...cat,
        product_count: mockProducts.filter(p => p.category === cat.name).length
      }
    },
    {
      default: () => null
    }
  )

  return {
    category,
    status,
    error,
    refresh
  }
}

/**
 * Composable for fetching products by category slug
 */
export function useProductsByCategory(slug: string) {
  const {
    data: products,
    status,
    error,
    refresh
  } = useAsyncData(
    `products-by-category-${slug}`,
    async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300))

      const category = getMockCategoryBySlug(slug)
      if (!category) return []

      return mockProducts.filter(p => p.category === category.name)
    },
    {
      default: () => []
    }
  )

  return {
    products,
    status,
    error,
    refresh
  }
}
