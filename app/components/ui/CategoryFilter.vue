<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="cat in categories"
      :key="cat.value"
      :class="['category-pill', { active: modelValue === cat.value }]"
      @click="$emit('update:modelValue', cat.value)"
    >
      <span>{{ cat.label }}</span>
      <span
        v-if="counts[cat.value] !== undefined"
        class="text-xs opacity-70"
      >
        ({{ counts[cat.value] }})
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ProductCategory } from '~/types'

defineProps<{
  modelValue: ProductCategory | 'all'
  counts: Record<string, number>
}>()

defineEmits<{
  'update:modelValue': [value: ProductCategory | 'all']
}>()

const categories = [
  { value: 'all' as const, label: 'All' },
  { value: 'Drones' as const, label: 'Drones' },
  { value: 'Gimbals' as const, label: 'Gimbals' },
  { value: 'Cameras' as const, label: 'Cameras' },
  { value: 'Accessories' as const, label: 'Accessories' }
]
</script>
