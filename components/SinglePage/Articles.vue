<template>
    <div class="flex-col flex first:[&>div]:pt-1">
      <template v-for="item in data" :key="item">
        <ListsItemArticle :data="item"/>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: Object,
    },
  };
  </script>
  