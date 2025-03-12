<template>
  <div v-if="value" class="flex-col flex">
    <div class="text-gray-500">{{ $t(label) }}</div>
    <div v-html="$t(value)"></div>
  </div>
</template>
<script setup>
const props = defineProps({
  label: String,
  value: [String, Number, Object, Array],
});
</script>
