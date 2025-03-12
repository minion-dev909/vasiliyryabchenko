<template>
  <!-- <div class="w-full h-full">
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
        v-for="item in data"
        :key="item"
        class="py-8 px-4 md:px-8"
      ></ListsItemCatalogue>
    </div>
  </div> -->
</template>

<script setup>
// const { apiBase, apiToken, locale } = useRuntimeData();
// const requestURL = `${apiBase}/content/items/Interviews?locale=${locale.value}&sort={"Year":-1}&limit=3`;

// // Использование useFetch для загрузки данных
// const { data, execute } = await useFetch(requestURL, {
//   headers: {
//     "api-key": `${apiToken}`,
//   },
// });
// console.log("%%%%%");
// console.log(data);
// onActivated(() => {
//   execute();
// });
</script>
