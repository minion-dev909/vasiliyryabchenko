<template>
  <div class="flex-col flex first:[&>div]:pt-1">
    <template
      v-if="data.length > 0"
      v-for="item in data"
      :key="item"
    >
      <ListsItemCatalogue
        :page="item.Page ? item.Page : 'null'"
        :data="item.Catalogue"
      />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Array
})

onMounted(()=>{
  console.log('123')
})
</script>
