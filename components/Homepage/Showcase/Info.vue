<template>
  <div class="h-fit flex flex-col font-medium gap-4 text-center lg:text-left px-4 md:px-8">
    <div class="flex flex-col gap-2">
      <div v-if="item.Year" class="text-[.8rem] h-6 text-gray-500">
        {{ item.Year }}
      </div>
      <div class="text-3xl">
        {{ item.Title }}
      </div>
    </div>
    <div
      class="text-gray-500 text-sm md:text-base"
      v-if="item.Dimensions"
      v-html="
        DimensionConverter(item.Dimensions, '/') +
        ', ' +
        item.Medium
      "
    ></div>
  </div>
</template>

<script setup>
const { DimensionConverter } = useDimensionConverter();
const props = defineProps({
  item: Object,
});
</script>
