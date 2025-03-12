<template>
  <div class="h-fit flex flex-col font-medium">
    <div class="flex flex-col gap-2">
      <div v-if="item.translations[0].Year" class="text-[.8rem] h-6 text-gray-500">
        {{ item.translations[0].Year }}
      </div>
      <div class="text-xl">
        {{ item.translations[0].Title }}
      </div>
    </div>
    <!-- <div
      class="text-gray-500 text-sm md:text-base"
      v-if="item.Dimensions"
      v-html="
        DimensionConverter(item.Dimensions, '/') +
        ', ' +
        item.Medium
      "
    ></div> -->
  </div>
</template>

<script setup>

const { DimensionConverter } = useDimensionConverter();
const props = defineProps({
  item: Object,
});

</script>
