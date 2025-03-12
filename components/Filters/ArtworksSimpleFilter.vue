<template>
  <div
    class="group text-lg flex mt-1 flex-col [&>div:not(.active)]:cursor-pointer [&>div.active]:text-gray-500 text-black hover:[&>div]:text-gray-500"
  >
    <div
      v-if="filterQuery.Label=='Type'"
    >
      <div>Painting</div>
      <div>Graphics</div>
    </div>
    <div
      v-else-if="filterQuery.Label=='Series'"
    >
      <div>Spirit of Colorado</div>
      <div>Heaven's Reflection</div>
      <div>Jouney to the Childhood</div>
      <div>Princess</div>
      <div>Prince</div>
    </div>
  </div>
</template>
<script setup>
const { t } = useI18n();
const props = defineProps({
  filtersBar: Boolean,
  filterQuery: Object,
  query: Object,
});
console.log("simplefilter");
console.log(props.filterQuery);
console.log(props.query);
</script>