<template>
  <NuxtLayout name="page-sidebar-page-grid">
    <template #content>
      <PageHeader
        :filtersBar="filtersBar"
        pageTitle="Projects"
        :searchRequest="searchRequest"
        :searchQuery="searchQuery"
      ></PageHeader>
      <div class="flex flex-row relative">
        <NuxtLayout
          name="page-filters-bar"
          :queryAmount="queryAmount"
          :filtersBar="filtersBar"
        >
          <FiltersQueries
            v-if="filtersQueries"
            :query="projectsData.data[0]"
            :filtersBar="filtersBar"
            :filtersQueries="filtersQueries"
          ></FiltersQueries>
        </NuxtLayout>
        <div
          class="transition-all duration-500"
          :class="filtersBar ? 'md:w-8/12 xl:w-9/12' : 'w-full'"
        >
          <div class="relative">
            <PageIntro :limited="false" :filtersBar="filtersBar" :Text="projectsData.data[0].translations[0].Text" />
            <transition name="fadedelay">
              <ListsProjects
                :query="projectsData.data[0]"
                :queryAmount="queryAmount"
                :filtersBar="filtersBar"
              />
            </transition>
          </div>
          
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
<script setup>

import List from "@/components/Lists/Projects.vue";
const component = List;
const request = "/Projects";
const TextRequest = "/ProjectsList";
const queryAmount=ref(1);
const filtersBar=ref(1);
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
  {
    Name: "WorkMode",
    Label: "Work Mode",
    QueryType: "Simple",
    ViewType: "Default",
  },
  {
    Name: "Status",
    Label: "Status",
    QueryType: "Simple",
    ViewType: "Default",
  },
];
const { data: projectsData, error1 } = await useFetch("/api/projects");
console.log("hhh");
console.log(projectsData);
</script>
