<template>
  <div class="flex-col flex first:[&>div]:pt-1">
    <template v-for="item in data" :key="item">
      <ListsItemProject :data="item" :thumbs="false"/>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
console.log("singlepage/projects");
console.log(props.data);
</script>