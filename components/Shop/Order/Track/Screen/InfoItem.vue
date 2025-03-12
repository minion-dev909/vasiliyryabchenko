<template>
  <div class="flex flex-col gap-2">
    <div class="text-gray-500 text-sm md:text-base">{{ $t(label) }}</div>
    <div class="text-black font-bold text-lg">{{ value }}</div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
  label: String,
  value: String,
});
</script>
