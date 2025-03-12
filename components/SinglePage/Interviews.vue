<template>
  <div class="flex-col flex first:[&>div]:pt-1">
    <template v-for="item in data" :key="item">
      <ListsItemInterview :data="item" />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});

</script>
