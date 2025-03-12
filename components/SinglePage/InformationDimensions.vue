<template>
  <SinglePageInformationTextSection
    :label="label"
    :value="DimensionConverter(value, ' / ')"
  />
</template>
<script setup>
const { DimensionConverter } = useDimensionConverter();
const props = defineProps({
  label: String,
  value: [Object, Array],
});
</script>
