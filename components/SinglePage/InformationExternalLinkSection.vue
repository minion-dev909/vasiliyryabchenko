<template>
  <div v-if="link && linkTitle" class="flex-col flex">
    <div class="text-gray-500">{{ $t(label) }}</div>
    <NuxtLink
      :to="link"
      target="_blank"
      class="transition-all text-gray-500 hover:text-gray-800"
    >
    {{ linkTitle }}
    </NuxtLink>
  </div>
</template>
<script setup>
const props = defineProps({
  label: String,
  linkTitle: String,
  link: String,
});
</script>
