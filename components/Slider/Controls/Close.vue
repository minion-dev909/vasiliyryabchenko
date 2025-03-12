<template>
  <div @click="toggleFullscreen">
    <Icon
      class="fullscreen-icon hover:animate-spin cursor-pointer transition-all hover:text-gray-900 text-gray-500"
      name="solar:close-circle-broken"
      size="1.5em"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  toggleFullscreen: Function,
});
</script>
