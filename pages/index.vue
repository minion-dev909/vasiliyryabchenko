<template>
  <div>
    <div class="bg-white w-full">
      <NuxtLayout name="section-full-sidebar" class="border-b">
        <template #sidecontent>
          <div
            class="w-full h-full flex flex-col justify-start gap-6 px-4 md:px-8 lg:pb-8"
          >
            <HomepageExploreBar
            ></HomepageExploreBar>
          </div>
        </template>
        <template #content>
          <HomepageGallery></HomepageGallery>
        </template>
      </NuxtLayout>
      <NuxtLayout name="section-full">
        <HomepageExhibitions></HomepageExhibitions>
      </NuxtLayout>
      <NuxtLayout name="section-full">
        <HomepageShowcase class="border-t" model="Artwork" prefix="artwork" label="Latest Artworks"/>
      </NuxtLayout>
      <NuxtLayout name="section-full" class="grid grid-cols-1 lg:grid-cols-2 justify-between items-start">
        <HomepageCatalogues></HomepageCatalogues>
        <HomepageArticles class="border-t lg:border-t-0"></HomepageArticles>
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup>
// Вызов fetch запроса при монтировании компонента
onMounted(() => {
  // execute();
});
</script>
