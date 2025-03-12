<template>
  <div
    :class="data.Details.Description ? 'md:grid-cols-2' : 'grid-cols-1'"
    class="grid gap-10"
  >
    <div v-if="data.Details.Description" class="text-justify flex flex-col gap-3">
      <div class="text-gray-500">{{ $t("Description") }}</div>
      <div v-html="data.Details.Description"></div>
    </div>
    <div
      class="flex flex-col gap-6 text-lg font-medium first:[&>div>div]:text-base first:[&>div>div]:font-normal"
    >
      <SinglePageInformationTextSection label="Collection" :value="data.Details.Collection"/>
      <SinglePageInformationTextSection label="Location" :value="data.Details.Location"/>
      <SinglePageInformationComplexLinkSection label="Representative" :data="data"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object
});
console.log("//\\");
console.log(props.data);
</script>