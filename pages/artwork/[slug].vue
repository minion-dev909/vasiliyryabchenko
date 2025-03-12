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
        <SinglePageInformationItem index="Series" :item="data.Series" />
        <SinglePageInformationItem index="Medium" :item="data.Medium" />
        <SinglePageInformationItem index="Dimensions" :item="data.Dimensions" />
        <SinglePageInformationItem index="PlaceCreated" :item="data.PlaceCreated" />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();
const model = "Artwork";
const prefix = "artwork";

const data = ref("");

function handleInformation(newValue) {
  data.value = newValue;
  console.log(data.value);
}

</script>
