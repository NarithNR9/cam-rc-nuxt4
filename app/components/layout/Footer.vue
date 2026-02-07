<template>
  <footer class="bg-slate-900 border-t border-slate-800 mt-20">
    <div class="container-app py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <Icon name="heroicons:cube" class="w-8 h-8 text-red-500" />
            <span class="text-xl font-bold text-slate-100">Cambodia RC</span>
          </div>
          <p class="text-slate-400 text-sm mb-4 font-khmer">
            អ្នកលក់ផ្លូវការផលិតផល DJI នៅកម្ពុជា។ Drones, Gimbals, និង Cameras គុណភាពខ្ពស់។
          </p>
          <div class="flex gap-3">
            <a
              href="https://facebook.com/cambodiarc"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Icon name="simple-icons:facebook" class="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/cambodiarc"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Icon name="simple-icons:instagram" class="w-5 h-5" />
            </a>
            <a
              href="https://t.me/cambodiarc"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Icon name="simple-icons:telegram" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-slate-100 mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-slate-400 hover:text-slate-200 transition-colors text-sm">
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#products" class="text-slate-400 hover:text-slate-200 transition-colors text-sm">
                Products
              </NuxtLink>
            </li>
            <li>
              <a href="https://www.dji.com" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-slate-200 transition-colors text-sm">
                DJI Official
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-slate-100 mb-4">Contact</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3 text-sm">
              <Icon name="heroicons:map-pin" class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span class="text-slate-400 font-khmer">
                ភ្នំពេញ, ប្រទេសកម្ពុជា
              </span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <Icon name="heroicons:phone" class="w-5 h-5 text-red-400 flex-shrink-0" />
              <a :href="`tel:${phoneNumber}`" class="text-slate-400 hover:text-slate-200 transition-colors">
                {{ phoneNumber }}
              </a>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <Icon name="simple-icons:telegram" class="w-5 h-5 text-red-400 flex-shrink-0" />
              <a
                :href="`https://t.me/${telegramUsername}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-400 hover:text-slate-200 transition-colors"
              >
                @{{ telegramUsername }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-slate-800 text-center">
        <p class="text-slate-500 text-sm">
          © {{ currentYear }} Cambodia RC. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const phoneNumber = computed(() => config.public.phoneNumber)
const telegramUsername = computed(() => config.public.telegramUsername)
const currentYear = new Date().getFullYear()
</script>
