<template>
  <div>
    <NuxtLayout
      name="page-query-list"
      :requestAPI="request"
      :filtersQueries="filtersQueries"
      :TextRequest="TextRequest"
      :component="component"
      :filterBarDefault="true"
      pageTitle="Exhibitions"
      v-if="request && component"
    >
    </NuxtLayout>
  </div>
</template>

<script setup>
import List from "@/components/Lists/Exhibitions.vue";
const component = List;
const request = "/Exhibitions";
const TextRequest = "/ExhibitionList";
const filtersQueries = [
  {
    Name: "Information.Year",
    Label: "",
    QueryType: "Simple",
    ViewType: "SlideBar",
  },
  {
    Name: "Information.Type",
    Label: "Type",
    QueryType: "Simple",
    ViewType: "Default",
  },
  {
    Name: "Information.Country",
    Label: "Country",
    QueryType: "Simple",
    ViewType: "Slider",
  },
];
</script>
