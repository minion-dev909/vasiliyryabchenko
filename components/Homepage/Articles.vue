<template>
  <div class="w-full h-full">
    <NuxtLayout name="section-element-header">
      <template #left>{{ $t("Articles") }}</template>
      <template #right
        ><NuxtLinkLocale to="/library/publications/articles">{{
          $t("All Articles")
        }}</NuxtLinkLocale></template
      >
    </NuxtLayout>
    <div class="transition-all !mb-8 duration-all w-full h-[calc(100%-3.8rem)]">
      <ListsItemArticle
        v-for="item in data.data"
        :key="item"
        class="py-8 px-4 md:px-8"
        :data="item"
      ></ListsItemArticle>
    </div>
  </div>
</template>

<script setup>
const { newApiBase } = useRuntimeData();
const requestURL = `${newApiBase}/items/Aticles?fields=*,translations.*&deep={"translations":{"_filter":{"_and":[{"languages_code":{"_eq":"en"}}]}}}`;
let { data, execute, error, pending } = useFetch(
  requestURL,
  {
    method: "GET",
    lazy: true, // Ensure that the request is triggered manually by calling execute()
  }
);

onActivated(() => {
  execute();
});
</script>
