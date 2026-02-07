export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  image?: string
  product_count?: number
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Drones',
    slug: 'drones',
    description: 'Professional and consumer drones for aerial photography, videography, and FPV flying.',
    icon: 'heroicons:paper-airplane'
  },
  {
    id: '2',
    name: 'Gimbals',
    slug: 'gimbals',
    description: 'Handheld and mounted stabilizers for smooth, cinematic footage with any camera.',
    icon: 'heroicons:adjustments-horizontal'
  },
  {
    id: '3',
    name: 'Cameras',
    slug: 'cameras',
    description: 'Action cameras, pocket gimbals, and professional cinema cameras for every creator.',
    icon: 'heroicons:camera'
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Essential accessories including microphones, power stations, goggles, and more.',
    icon: 'heroicons:wrench-screwdriver'
  }
]

export function getMockCategoryBySlug(slug: string): Category | null {
  return mockCategories.find(c => c.slug === slug) || null
}

export function getMockCategoryById(id: string): Category | null {
  return mockCategories.find(c => c.id === id) || null
}
