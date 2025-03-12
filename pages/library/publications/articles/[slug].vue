<template>
  <div>
    <NuxtLayout
      :component="component"
      @valueChanged="handleInformation"
      v-if="route && model"
      name="page-single-page-w"
      :slug="route.params.slug"
      :model="model"
      :prefix="prefix"
    >
      <template #information v-if="data">
        <SinglePageInformationItem index="Year" :item="data.Year" />
        <SinglePageInformationItem index="Type" :item="data.Type" />
        <SinglePageInformationItem index="Author" :item="data.Author" />
        <SinglePageInformationItem index="Publisher" :item="data.Publisher" />
        <SinglePageInformationItem index="Link" :item="data.Link" />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();
const model = "Articles";
const prefix = "library/publications/articles/";
import component from "@/components/Blocks/Content.vue";

const data = ref("");

function handleInformation(newValue) {
  data.value = newValue;
  console.log(data.value);
}
</script>
