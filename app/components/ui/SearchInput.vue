<template>
  <div class="relative">
    <Icon
      name="heroicons:magnifying-glass"
      class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
    />
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder || 'Search products...'"
      class="search-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
      @click="$emit('update:modelValue', '')"
    >
      <Icon name="heroicons:x-mark" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
