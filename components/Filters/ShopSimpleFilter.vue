<template>
    <div
      class="group text-lg flex mt-1 flex-col [&>div:not(.active)]:cursor-pointer [&>div.active]:text-gray-500 text-black hover:[&>div]:text-gray-500"
    >
      <template v-if="filterQuery.QueryType === 'Relative'">
        <div
          v-for="(item, index) in filterQuery.data"
          :key="index"
          :class="{ active: isFilterActive(item._id) }"
          @click="
            addFilterItem(filterQuery.Name+'._id', item._id, null, $t(item.Title))
          "
        >
          {{ $t(item.Title) }}
        </div>
      </template>
      <template v-else>
        <div
          v-for="(item, index) in filterQuery.data"
          :key="index"
          :class="{ active: isFilterActive(item) }"
          @click="addFilterItem(filterQuery.Name, item, '$containsi', $t(item))"
        >
          {{ $t(item) }}
        </div>
      </template>
    </div>
  </template>
  
  <script setup>
  const { t } = useI18n();
  const props = defineProps({
    filtersBar: Boolean,
    filterQuery: Object,
    isFilterActive: Function,
    addFilterItem: Function,
  });
  console.log(props);
  </script>
  