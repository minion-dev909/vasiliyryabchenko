<template>
  <div>
    <NuxtLayout name="page-sidebar-page">
      <template #sidecontent>
        <BackToLink
          class="text-gray-500 pb-5"
          :label="$t('Library')"
          prefix="library/"
        ></BackToLink>
      </template>
      <template #content>
        <PageTitle :Label="PageName" />
        <IntersectionObserver>
          <div
            class="font-medium text-xl text-justify"
            v-html="publicationsData.data[0].translations[0].Text"
          ></div>
        </IntersectionObserver>
        <div class="pt-5 flex flex-col text-lg gap-7 group text-justify">
          <NuxtLinkLocale
            class="group-hover:text-gray-500 hover:!text-gray-900 transition-all flex flex-col gap-3"
            :href="`/library/publications/${publicationsData.data[0].translations[0].Menu0URL}`"
          >
            <IntersectionObserver>
              <div class="text-xl font-medium">{{ publicationsData.data[0].translations[0].Menu0Label }}</div>
              <div
                class="text-base md:text-lg font-light text-gray-500"
                v-html="publicationsData.data[0].translations[0].Menu0Text"
              ></div>
            </IntersectionObserver>
          </NuxtLinkLocale>
          <NuxtLinkLocale
            class="group-hover:text-gray-500 hover:!text-gray-900 transition-all flex flex-col gap-3"
            :href="`/library/publications/${publicationsData.data[0].translations[0].Menu1URL}`"
          >
            <IntersectionObserver>
              <div class="text-xl font-medium">{{ publicationsData.data[0].translations[0].Menu1Label }}</div>
              <div
                class="text-base md:text-lg font-light text-gray-500"
                v-html="publicationsData.data[0].translations[0].Menu1Text"
              ></div>
            </IntersectionObserver>
          </NuxtLinkLocale>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const PageName = ref("Publications");
const { data: publicationsData, error1 } = await useFetch("/api/publications");
console.log("library/publications");
console.log(publicationsData);
</script>
