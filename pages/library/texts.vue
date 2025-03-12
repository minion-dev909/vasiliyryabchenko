<template>
  <div>
    <NuxtLayout
      name="page-query-list"
      :requestAPI="request"
      searchField="Text"
      :filtersQueries="filtersQueries"
      Text=""
      :filterBarDefault="true"
      :component="component"
      pageTitle="Texts"
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
import List from "@/components/Lists/Texts.vue";
const component = List;
const request = "/Texts";

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
];
</script>
