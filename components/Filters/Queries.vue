<template>
  <div class="flex flex-col gap-3" v-if="filtersQueries">
    <div
      class="mb-5"
      v-for="(filterQuery, QueryIndex) in filtersQueries"
      :key="QueryIndex"
    >
      <div class="text-md text-gray-500 before:transition-all">
        {{ $t(filterQuery.Label) }}
      </div>
      <component
        v-if="filterQuery && filterQuery.QueryType"
        :is="
          filterQuery.ViewType === 'Slider'
            ? SliderFilter
            : filterQuery.ViewType === 'SlideBar'
            ? SlideBarFilter
            : SimpleFilter
        "
        :query="query"
        :filterQuery="filterQuery"
        :filtersBar="filtersBar"
        :isFilterActive="isFilterActive"
        :addFilterItem="addFilterItem"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  query: Object,
  filtersBar: Boolean,
  filtersQueries: Object,
  openedFilter: String,
  isFilterActive: Function,
  addFilterItem: Function,
  openFilter: Function,
});
const SlideBarFilter = resolveComponent("FiltersSlideBarFilter");
const SliderFilter = resolveComponent("FiltersSliderFilter");
const SimpleFilter = resolveComponent("FiltersSimpleFilter");
</script>
