<template>
  <ClientOnly>
    <IntersectionObserver
      class="z-[99] w-full h-full fixed left-0 top-0 bg-white overflow-y-auto"
    >
      <slot />
    </IntersectionObserver>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  toggle: Function,
});
</script>
