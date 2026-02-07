<template>
  <div class="relative">
    <select
      :value="modelValue"
      class="appearance-none bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 pr-10
             text-slate-200 text-sm cursor-pointer
             focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20
             transition-all duration-200"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value as SortOption)"
    >
      <option value="newest">{{ $t('sort.newest') }}</option>
      <option value="price_asc">{{ $t('sort.priceLow') }}</option>
      <option value="price_desc">{{ $t('sort.priceHigh') }}</option>
      <option value="name_asc">{{ $t('sort.nameAZ') }}</option>
    </select>
    <Icon
      name="heroicons:chevron-down"
      class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
    />
  </div>
</template>

<script setup lang="ts">
type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name_asc'

defineProps<{
  modelValue: SortOption
}>()

defineEmits<{
  'update:modelValue': [value: SortOption]
}>()
</script>
