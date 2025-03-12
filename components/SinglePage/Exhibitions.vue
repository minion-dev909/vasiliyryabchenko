<template>
  <div class="flex-col flex first:[&>div]:pt-1">
    <template v-for="item in data" :key="item">
      <ListsItemExhibition :data="item" />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
console.log("SinglePage_Exhibitions");
console.log(props.data);
</script>
