<template>
  <div
    v-show="queryAmount"
    class="hover:text-gray-900 flex-none cursor-pointer w-max"
    @click="toggleFilterBar"
    v-text="
      !filtersBar ? `${$t('Filters')} [${filters.length}]` : `${$t('Close')}`
    "
  ></div>
</template>

<script setup>
const props = defineProps({
    filtersBar: Boolean,
    queryAmount: Number,
    filters: Object,
    toggleFilterBar: Function
});
</script>