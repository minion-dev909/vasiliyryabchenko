<template>
  <div class="w-full h-full">
    <NuxtLayout name="section-element-header">
      <template #left>{{ $t("Catalogues") }}</template>
      <template #right
        ><NuxtLinkLocale to="/library/publications/catalogues">{{
          $t("All Catalogues")
        }}</NuxtLinkLocale></template
      >
    </NuxtLayout>
    <div class="transition-all !mb-8 duration-all w-full h-[calc(100%-3.8rem)]">
      <ListsItemCatalogue
        :data="item"
        v-for="item in cataloguesData.data"
        :key="item"
        class="py-8 px-4 md:px-8"
      ></ListsItemCatalogue>
    </div>
  </div>
</template>

<script setup>
const { data: cataloguesData, error1 } = await useFetch("/api/catalogues");
// const { newApiBase } = useRuntimeData();
// const requestURL = `${newApiBase}/items/Catalogues?fields=*,translations.*&deep={"translations":{"_filter":{"_and":[{"languages_code":{"_eq":"en"}}]}}}`;
// let { data, execute, error, pending } = useFetch(
//   requestURL,
//   {
//     method: "GET",
//     lazy: true, // Ensure that the request is triggered manually by calling execute()
//   }
// );

// console.log(requestURL)
// console.log(data);
console.log("****");
console.log(cataloguesData);
// onActivated(() => {
//   execute();
// });
</script>
