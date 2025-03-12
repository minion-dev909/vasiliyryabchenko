<template>
  <div>
    <NuxtLayout
      name="page-query-list"
      :requestAPI="request"
      :filtersQueries="filtersQueries"
      :filterBarDefault="true"
      :component="component"
      pageTitle="Media Archive"
      v-if="request && component"
    >
      <template #left
        ><BackToLink
          class="hidden lg:block"
          :label="$t('Library')"
          prefix="library"
        ></BackToLink
      ></template>
    </NuxtLayout>
  </div>
</template>

<script setup>
import List from "@/components/Lists/MediaArchive.vue";
const component = List;
const request = "/Media";

const filtersQueries = [
  {
    Name: "Year",
    Label: "",
    QueryType: "Simple",
    ViewType: "SlideBar",
  },
  {
    Name: "Type",
    Label: "Type",
    QueryType: "Simple",
    ViewType: "Default",
  },
  {
    Name: "Category",
    Label: "Category",
    QueryType: "Simple",
    ViewType: "Default",
  },
];
</script>