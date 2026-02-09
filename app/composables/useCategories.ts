import type { Category } from '~/types'

/**
 * Composable for fetching categories from Directus
 */
export function useCategories() {
  const { directus, readItems } = useDirectusClient()

  const {
    data: categories,
    status,
    error,
    refresh
  } = useAsyncData<Category[]>(
    'categories',
    async () => {
      const cats = await directus.request(
        readItems('categories', {
          filter: { status: { _eq: 'published' } },
          sort: ['sort'],
          fields: ['*']
        })
      )

      // Get product counts per category
      const products = await directus.request(
        readItems('products', {
          filter: { status: { _eq: 'published' } },
          fields: ['category'],
          limit: -1
        })
      )

      const countMap: Record<number, number> = {}
      for (const p of products as any[]) {
        const catId = typeof p.category === 'object' ? p.category?.id : p.category
        if (catId) {
          countMap[catId] = (countMap[catId] || 0) + 1
        }
      }

      return (cats as any[]).map(cat => ({
        ...cat,
        product_count: countMap[cat.id] || 0
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
  const { directus, readItems } = useDirectusClient()

  const {
    data: category,
    status,
    error,
    refresh
  } = useAsyncData<Category | null>(
    `category-${slug}`,
    async () => {
      const cats = await directus.request(
        readItems('categories', {
          filter: {
            slug: { _eq: slug },
            status: { _eq: 'published' }
          },
          fields: ['*'],
          limit: 1
        })
      )

      const cat = (cats as any[])[0]
      if (!cat) return null

      // Get product count for this category
      const products = await directus.request(
        readItems('products', {
          filter: {
            category: { _eq: cat.id },
            status: { _eq: 'published' }
          },
          fields: ['id'],
          limit: -1
        })
      )

      return {
        ...cat,
        product_count: (products as any[]).length
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
  const { directus, readItems } = useDirectusClient()

  const {
    data: products,
    status,
    error,
    refresh
  } = useAsyncData(
    `products-by-category-${slug}`,
    async () => {
      return await directus.request(
        readItems('products', {
          filter: {
            category: { slug: { _eq: slug } },
            status: { _eq: 'published' }
          },
          fields: ['*', 'category.name', 'category.slug', 'image.*'],
          sort: ['sort']
        })
      )
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
