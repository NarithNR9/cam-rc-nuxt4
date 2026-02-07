<template>
  <div class="min-h-screen flex flex-col">
    <LayoutNavbar />
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
