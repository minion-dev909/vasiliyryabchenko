<template>
  <div>
    <NuxtLayout
      name="page-query-list"
      :requestAPI="request"
      :filtersQueries="filtersQueries"
      :TextRequest="TextRequest"
      :component="component"
      :filterBarDefault="true"
      pageTitle="Interviews"
      v-if="request && component"
    >
    </NuxtLayout>
  </div>
</template>

<script setup>
import List from "@/components/Lists/Interviews.vue";
const component = List;
const request = "/Interviews";

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
    Name: "Interviewer",
    Label: "Interviewer",
    QueryType: "Simple",
    ViewType: "Slider",
  },
];
</script>
