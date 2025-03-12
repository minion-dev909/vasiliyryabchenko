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
        <SinglePageInformationItem index="Interviewer" :item="data.Interviewer" />
      </template>
    </NuxtLayout>
  </div>
</template>


<script setup>
const route = useRoute();
const model = "Interviews";
const prefix = "library/interviews/";
import component from "@/components/Blocks/Conversation.vue";

const data = ref("");

function handleInformation(newValue) {
  data.value = newValue;
  console.log(data.value);
}
</script>
