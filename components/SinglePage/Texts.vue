<template>
  <div class="flex-col flex first:[&>div]:pt-1">
    <template
      v-if="data.length > 0"
      v-for="item in data"
      :key="item"
    >
      <ListsItemText
        :query="item"
      />
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
