<template>
  <TemplatingGrid3Cols class="grid-cols-2">
    <div class="lg:col-span-2 flex flex-row relative px-4 md:px-8">
      <div
        :class="filtersBar ? 'lg:left-[50%]' : 'left-0'"
        class="flex flex-row justify-between items-center transition-all duration-500 relative order-last font-medium"
      >
        <PageTitle :Label="pageTitle" />
      </div>
    </div>
    <div class="xl:col-span-2">
      <div
        class="grid lg:grid-cols-2 w-full lg:justify-items-end h-full px-4 md:px-8"
      >
        <QuerySearch
          :searchRequest="searchRequest"
          :searchQuery="searchQuery"
        />
      </div>
    </div>
  </TemplatingGrid3Cols>
</template>

<script setup>
const props = defineProps({
  filtersBar: Boolean,
  pageTitle: String,
  searchRequest: String,
  searchQuery: Function,
});
</script>
