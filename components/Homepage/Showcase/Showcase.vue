<template>
  <NuxtLayout name="single-page-section-full">
    <template #header>
      <div class="w-full flex flex-row items-center justify-between pt-6">
        <SinglePageSectionTitle :Label="label" />
        <div>
          <NuxtLinkLocale
            to="/artwork"
            class="text-gray-400 hover:text-black transition-all"
            >{{ $t("All Artworks") }}</NuxtLinkLocale
          >
        </div>
      </div>
    </template>
    <template #content>
      <HomepageShowcaseSlider :data="caseData" :prefix="prefix" />
    </template>
  </NuxtLayout>
</template>
<script setup>
// const { apiBase, apiToken, locale } = useRuntimeData();
const { data: caseData, error1 } = await useFetch("/api/artworks");
const props = defineProps({
  label: String,
  model: String,
  prefix: String,
});
console.log("showcase");
console.log(caseData);
// const requestURL = `${apiBase}/content/items/${props.model}?locale=${locale.value}&sort={"Year":-1}&limit=5`;

// // Использование useFetch для загрузки данных
// const { data, execute } = await useFetch(requestURL, {
//   headers: {
//     "api-key": `${apiToken}`,
//   },
// });
// console.log("showcase");
// console.log(data);
// onActivated(() => {
//   execute();
// });
</script>
