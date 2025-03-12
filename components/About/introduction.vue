<template>
  <div v-if="data">
    <IntersectionObserver>
      <PageTitle Label="Introduction" />
    </IntersectionObserver>
    <Quote :data="data.data[0].translations[0]"/>
    <GeneralMediaObject
      :MediaObject="data.data[0].translations[0]"
    ></GeneralMediaObject>
    <div
      class="text-justify lg:text-left xl:text-justify 2xl:text-left grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-10"
    >
      <IntersectionObserver
        v-if="data.data[0].translations[0].Text"
        class="flex flex-col xl:text-lg gap-12"
      >
        <div class="flex-col flex gap-3">
          <div class="text-gray-500">{{ $t("Description") }}</div>
          <div v-html="data.data[0].translations[0].Text"></div>
        </div>
      </IntersectionObserver>
      <IntersectionObserver
        class="flex flex-col gap-12 xl:text-lg"
        v-if="data.data[0].translations[0].Information"
      >
        <div class="flex-col flex gap-3">
          <div class="text-gray-500">{{ data.data[0].translations[0].Information[0] }}</div>
          <div v-html="data.data[0].translations[0].InformationText[0]"></div>
          <div class="text-gray-500">{{ data.data[0].translations[0].Information[1] }}</div>
          <div v-html="data.data[0].translations[0].InformationText[1]"></div>
          <div class="text-gray-500">{{ data.data[0].translations[0].Information[2] }}</div>
          <div v-html="data.data[0].translations[0].InformationText[2]"></div>
        </div>
      </IntersectionObserver>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object
});
</script>
