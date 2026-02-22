<template>
  <div class="overflow-x-auto pb-1 -mb-1 [scrollbar-width:thin]">
    <div class="flex gap-2 min-w-max">
      <button
        v-for="cat in categories"
        :key="cat.value"
        :class="['category-pill shrink-0 whitespace-nowrap', { active: modelValue === cat.value }]"
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
  </div>
</template>

<script setup lang="ts">
import type { ProductCategoryName } from '~/types'

const props = defineProps<{
  modelValue: ProductCategoryName | 'all' | string
  counts: Record<string, number>
  options?: Array<{ value: string, label: string }>
}>()

defineEmits<{
  'update:modelValue': [value: ProductCategoryName | 'all' | string]
}>()

const { t } = useI18n()

const categories = computed(() => {
  if (props.options?.length) return props.options

  return [
    { value: 'all' as const, label: t('common.all') },
    { value: 'Drones' as const, label: t('category.drones') },
    { value: 'Gimbals' as const, label: t('category.gimbals') },
    { value: 'Cameras' as const, label: t('category.cameras') },
    { value: 'Accessories' as const, label: t('category.accessories') }
  ]
})
</script>
