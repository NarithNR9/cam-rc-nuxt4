<template>
  <div class="space-y-4">
    <div
      v-for="(specs, group) in groupedSpecs"
      :key="group"
      class="spec-group"
    >
      <h4 class="spec-group-title">
        <Icon :name="getIcon(group as string)" class="w-4 h-4 text-red-400" />
        <span>{{ group }}</span>
      </h4>
      <div class="space-y-0">
        <div
          v-for="spec in specs"
          :key="spec.label"
          class="spec-item"
        >
          <span class="spec-label">{{ spec.label }}</span>
          <span class="spec-value">{{ spec.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductSpec } from '~/types'

defineProps<{
  groupedSpecs: Record<string, ProductSpec[]>
  getIcon: (group: string) => string
}>()
</script>
