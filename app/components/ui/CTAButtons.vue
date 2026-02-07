<template>
  <div class="flex flex-col sm:flex-row gap-3">
    <!-- Telegram Order Button -->
    <a
      :href="telegramUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="cta-telegram flex-1"
    >
      <Icon name="simple-icons:telegram" class="w-5 h-5" />
      <span>ធ្វើការបញ្ជាទិញតាម Telegram</span>
    </a>

    <!-- Phone Support Button -->
    <a
      :href="`tel:${phoneNumber}`"
      class="cta-phone flex-1"
    >
      <Icon name="heroicons:phone" class="w-5 h-5" />
      <span>ទូរស័ព្ទ Support</span>
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  productName?: string
  productPrice?: number
}>()

const config = useRuntimeConfig()

const phoneNumber = computed(() => config.public.phoneNumber)

const telegramUrl = computed(() => {
  const username = config.public.telegramUsername
  let message = 'សួស្តី! ខ្ញុំចង់សាកសួរអំពីផលិតផល។'

  if (props.productName) {
    message = `សួស្តី! ខ្ញុំចង់បញ្ជាទិញ ${props.productName}`
    if (props.productPrice) {
      message += ` ($${props.productPrice})`
    }
  }

  return `https://t.me/${username}?text=${encodeURIComponent(message)}`
})
</script>
