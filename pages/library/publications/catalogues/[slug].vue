<template>
  <div>
    <NuxtLayout
      @valueChanged="handleInformation"
      v-if="route && model"
      name="page-single-page-manual"
      :slug="route.params.slug"
      :model="model"
      :prefix="prefix"
    >
      <template #information v-if="data">
        <SinglePageInformationItem index="Year" :item="data.Year" />
        <SinglePageInformationItem index="Type" :item="data.Type" />
        <SinglePageInformationItem index="Author" :item="data.Author" />
        <SinglePageInformationItem index="Publisher" :item="data.Publisher" />
        <SinglePageInformationItem index="Languages" :item="data.Languages" />
        <SinglePageInformationItem index="ISBN" :item="data.ISBN" />
        <SinglePageInformationItem index="Link" :item="data.Link" />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();
const model = "Catalogues";
const prefix = "library/publications/catalogues/";

const data = ref("");

function handleInformation(newValue) {
  data.value = newValue;
  console.log(data.value);
}
</script>
