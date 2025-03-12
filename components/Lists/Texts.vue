<template>
  <div
    v-if="query"
    class="pt-4"
    :class="!filtersBar ? 'px-4 md:px-8' : 'px-4 md:px-0 md:pr-8'"
  >
    <div
      class="flex flex-col transition-all [&>div>div]:duration-500 [&>div]:scroll-mt-[5em]"
    >
      <ListsItemText
        v-if="query && queryAmount > 0"
        v-for="(item, index) in query"
        :key="index"
        :query="item"
        :id="generateId(query, item)"
        :opened="openedTextId === index"
        @open-text="handleOpenText(index)"
      />
    </div>
  </div>
</template>

<script setup>
const openedTextId = ref(null);
const props = defineProps({
  query: Object,
  queryAmount: Number,
  filtersBar: Boolean,
});
const { generateId } = useGenerateId();
</script>
