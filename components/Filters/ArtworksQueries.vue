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
        :is="
          filterQuery.ViewType === 'Slider'
            ? ArtworksSliderFilter
            : filterQuery.ViewType === 'SlideBar'
            ? ArtworksSlideBarFilter
            : ArtworksSimpleFilter
        "
        :query="data"
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
  data: Object,
  filtersBar: Boolean,
  filtersQueries: Object,
  openedFilter: String,
  isFilterActive: Function,
  addFilterItem: Function,
  openFilter: Function,
});
console.log("ArtworksQueries");
console.log(props);
const ArtworksSlideBarFilter = resolveComponent("FiltersArtworksSimpleFilter");
const ArtworksSliderFilter = resolveComponent("FiltersArtworksSimpleFilter");
const ArtworksSimpleFilter = resolveComponent("FiltersArtworksSimpleFilter");
</script>
