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
        <SinglePageInformationItem index="Category" :item="data.Category" />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();
const model = "Media";
const prefix = "library/media-archive";

const data = ref("");

function handleInformation(newValue) {
  data.value = newValue;
  console.log(data.value);
}
</script>
