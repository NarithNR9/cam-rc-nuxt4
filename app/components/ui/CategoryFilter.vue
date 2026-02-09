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
import type { ProductCategoryName } from '~/types'

defineProps<{
  modelValue: ProductCategoryName | 'all' | string
  counts: Record<string, number>
}>()

defineEmits<{
  'update:modelValue': [value: ProductCategoryName | 'all' | string]
}>()

const { t } = useI18n()

const categories = computed(() => [
  { value: 'all' as const, label: t('common.all') },
  { value: 'Drones' as const, label: t('category.drones') },
  { value: 'Gimbals' as const, label: t('category.gimbals') },
  { value: 'Cameras' as const, label: t('category.cameras') },
  { value: 'Accessories' as const, label: t('category.accessories') }
])
</script>
