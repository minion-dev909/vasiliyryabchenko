<template>
  <div>
    <NuxtLayout
      name="page-query-list"
      :requestAPI="request"
      :filtersQueries="filtersQueries"
      :filterBarDefault="true"
      :component="component"
      pageTitle="Articles"
      v-if="request && component"
    >
      <template #left
        ><BackToLink
          class="hidden lg:block"
          :label="$t('Publications')"
          prefix="library/publications"
        ></BackToLink
      ></template>
    </NuxtLayout>
  </div>
</template>

<script setup>
import List from "@/components/Lists/Articles.vue";
const component = List;
const request = "/Articles";

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
    Name: "Publisher",
    Label: "Publisher",
    QueryType: "Simple",
    ViewType: "Default",
  },
  {
    Name: "Author",
    Label: "Author",
    QueryType: "Simple",
    ViewType: "Default",
  },
];
</script>