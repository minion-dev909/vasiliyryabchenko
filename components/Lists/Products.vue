<template>
  <div
    v-if="productData.data"
    class="pt-4"
    :class="!filtersBar ? 'px-4 md:px-8' : 'px-4 md:px-0 md:pr-8'"
  >
    <div
      class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-10"
    >
      <ListsItemProduct
        v-for="(item, index) in productData.data"
        :key="index"
        :data="item"
        :id="generateId(productData.data, item)"
      />
    </div>
  </div>
</template>

<script setup>
// Получаем свойства компонента
// const props = defineProps({
//   query: Object,
//   queryAmount: Number,
//   filtersBar: Boolean,
// });
const { data: productData, error } = await useFetch("/api/product");
console.log(productData);
console.log("lists/product");
// console.log(props.query);
// Для использования props в Composition API, преобразуем их в реактивные ссылки
// const { query, queryAmount, filtersBar } = toRefs(props);

 const { generateId } = useGenerateId();
</script>
