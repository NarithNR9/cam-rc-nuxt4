// Category Types for Directus 'categories' collection
export interface Category {
  id: number
  name: string
  slug: string
  description: string
  icon?: string
  image?: string | DirectusFile | null
  product_count?: number
}

// Product Types for Directus 'products' collection
export type ProductCategoryName = 'Drones' | 'Gimbals' | 'Cameras' | 'Accessories'

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order'

export interface ProductSpec {
  label: string
  value: string
  group?: string
}

export interface DirectusFile {
  id: string
  filename_download?: string
  title?: string
  description?: string
  type?: string
  width?: number
  height?: number
}

export interface Product {
  id: number
  name: string
  price: number
  category: ProductCategoryName | string | Category
  category_id?: string
  description: string
  specs: ProductSpec[]
  image: string | DirectusFile | null
  gallery: Array<{ directus_files_id: string | DirectusFile }> | null
  stock_status: StockStatus
  date_created?: string
  date_updated?: string
}

export interface ProductFilters {
  search: string
  category: ProductCategoryName | 'all' | string
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'name_asc'
}

export interface StockStatusConfig {
  label: string
  labelKm: string
  color: string
  bgColor: string
}
