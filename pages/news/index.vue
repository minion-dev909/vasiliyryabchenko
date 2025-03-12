<template>
  <div>
    <NuxtLayout
      name="page-query-list"
      :requestAPI="request"
      :filtersQueries="filtersQueries"
      :TextRequest="TextRequest"
      :component="component"
      :filterBarDefault="true"
      pageTitle="News"
      v-if="request && component"
    >
    </NuxtLayout>
  </div>
</template>

<script setup>
import List from "@/components/Lists/News.vue";
const component = List;
const request = "/News";

const filtersQueries = [
];
</script>
