<template>
  <div
    v-if="exhibitionData.data"
    :class="!filtersBar ? 'px-4 md:px-8' : 'px-4 md:px-0 md:pr-8'"
  >
    <div class="flex flex-col [&>div>div]:duration-500 [&>div]:scroll-mt-[5em]">
      <ListsItemExhibition
        v-for="(item, index) in exhibitionData.data"
        :key="index"
        :data="item"
        :id="generateId(exhibitionData.data, item)"
        class="last:border-b-0 border-b"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  query: Object,
  queryAmount: Number,
  filtersBar: Boolean,
});
console.log("list_exhibitions");
console.log(props);
const { data: exhibitionData, error1 } = await useFetch("/api/exhibition");
console.log(exhibitionData);
console.log("end");
const { generateId } = useGenerateId();
</script>
