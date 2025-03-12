<template>
  <div v-if="linkTitle && link" class="flex-col flex">
    <div class="text-gray-500">{{ $t(label) }}</div>
    <NuxtLinkLocale
      :to="link"
      class="transition-all before:transition-all text-gray-500 hover:text-gray-800 hover:before:text-gray-800 before:content-['•'] before:text-sm before:text-gray-500 before:mr-2"
      v-text="linkTitle"
    >
    </NuxtLinkLocale>
  </div>
</template>
<script setup>
const props = defineProps({
  label: String,
  linkTitle: String,
  link: String,
});



</script>
