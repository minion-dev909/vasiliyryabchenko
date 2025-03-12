<template>
  <SinglePageInformationTextSection v-if="value.Start || value.End"
    :label="label"
    :value="getDates(value, '<br>')"
  />
</template>
<script setup>
const { getDates } = useDatesConverter();
const props = defineProps({
  label: String,
  value: [Object, Array],
});
</script>
