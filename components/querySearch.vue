<template>
  <input
    :value="searchRequest ? searchRequest : ''"
    :placeholder="$t('Search')"
    type="email"
    class="hidden md:block text-lg w-full xl:w-1/2 lg:col-span-2 bg-transparent border-b-2 focus:ring-0 focus:outline-0"
    @input="searchQuery($event)"
  />
</template>

<script setup>
const props = defineProps({
    searchRequest: String,
    searchQuery: Function
})
</script>