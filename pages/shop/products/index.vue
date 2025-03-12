<template>
  <div>
    <NuxtLayout
    class="min-h-[90vh]"
      name="page-query-list"
      :requestAPI="request"
      :filtersQueries="filtersQueries"
      :TextRequest="TextRequest"
      :component="component"
      :filterBarDefault="false"
      pageTitle="Shop"
      v-if="request && component"
    >
    </NuxtLayout>
    <ShopFooter/>
    <ShopQuickBar/>
  </div>
</template>

<script setup>
import List from "@/components/Lists/Products.vue";
const component = List;
const request = "/Products";

const filtersQueries = [
  {
    Name: "Type",
    Label: "Type",
    QueryType: "Simple",
    ViewType: "Simple",
  },
  {
    Name: "Category",
    Label: "Category",
    QueryType: "Simple",
    ViewType: "Slider",
  },
];
</script>