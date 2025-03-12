<template>
  <div v-if="query" :class="!filtersBar ? 'px-4 md:px-8' : 'px-4 md:px-0 md:pr-8'">
    <div class="flex flex-col [&>div>div]:duration-500 [&>div]:scroll-mt-[5em]">
      <ListsItemArticle
        v-if="query && queryAmount > 0"
        v-for="(item, index) in query"
        :key="index"
        :data="item"
        :id="generateId(query, item)"
        class="last:border-b-0 border-b"
      />
    </div>
  </div>
</template>

<script setup>
// Получаем свойства компонента
const props = defineProps({
  query: Object,
  queryAmount: Number,
  filtersBar: Boolean,
});

// Для использования props в Composition API, преобразуем их в реактивные ссылки
const { query, queryAmount, filtersBar } = toRefs(props);

const { generateId } = useGenerateId();
</script>
