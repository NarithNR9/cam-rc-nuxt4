<template>
  <footer class="bg-slate-50 border-t border-slate-200 mt-20">
    <div class="container-app py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <img src="/images/logo.png" alt="Cambodia RC" class="h-12 w-12 object-contain" />
            <span class="text-xl font-bold text-slate-800">Cambodia RC</span>
          </div>
          <p class="text-slate-500 text-sm mb-4">
            {{ $t('footer.description') }}
          </p>
          <div class="flex gap-3">
            <a
              href="https://facebook.com/cambodiarc"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-white border border-slate-200 hover:border-red-300 text-slate-500 hover:text-red-600 transition-colors"
            >
              <Icon name="simple-icons:facebook" class="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/cambodiarc"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-white border border-slate-200 hover:border-red-300 text-slate-500 hover:text-red-600 transition-colors"
            >
              <Icon name="simple-icons:instagram" class="w-5 h-5" />
            </a>
            <a
              href="https://t.me/cambodiarc"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-white border border-slate-200 hover:border-red-300 text-slate-500 hover:text-red-600 transition-colors"
            >
              <Icon name="simple-icons:telegram" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-slate-800 mb-4">{{ $t('footer.quickLinks') }}</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink :to="localePath('/')" class="text-slate-500 hover:text-red-600 transition-colors text-sm">
                {{ $t('common.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/') + '#products'" class="text-slate-500 hover:text-red-600 transition-colors text-sm">
                {{ $t('common.products') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/categories')" class="text-slate-500 hover:text-red-600 transition-colors text-sm">
                {{ $t('common.categories') }}
              </NuxtLink>
            </li>
            <li>
              <a href="https://www.dji.com" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-red-600 transition-colors text-sm">
                DJI Official
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-slate-800 mb-4">{{ $t('footer.contact') }}</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3 text-sm">
              <Icon name="heroicons:map-pin" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span class="text-slate-500">
                {{ $t('footer.location') }}
              </span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <Icon name="heroicons:phone" class="w-5 h-5 text-red-500 flex-shrink-0" />
              <a :href="`tel:${phoneNumber}`" class="text-slate-500 hover:text-red-600 transition-colors">
                {{ phoneNumber }}
              </a>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <Icon name="simple-icons:telegram" class="w-5 h-5 text-red-500 flex-shrink-0" />
              <a
                :href="`https://t.me/${telegramUsername}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-500 hover:text-red-600 transition-colors"
              >
                @{{ telegramUsername }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-slate-200 text-center">
        <p class="text-slate-400 text-sm">
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const localePath = useLocalePath()

const phoneNumber = computed(() => config.public.phoneNumber)
const telegramUsername = computed(() => config.public.telegramUsername)
const currentYear = new Date().getFullYear()
</script>
