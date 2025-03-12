<template>
  <div>
    <NuxtLayout name="page-sidebar-page">
      <template #content v-if="libraryData">
        <PageTitle :Label="PageName" />
        <IntersectionObserver>
          <div
            class="font-medium text-xl text-justify"
            v-if="libraryData.data[0].translations[0].Text"
            v-html="libraryData.data[0].translations[0].Text"
          ></div>
        </IntersectionObserver>
        <div
          class="pt-5 flex flex-col text-lg gap-7 group text-justify"
        >
          <IntersectionObserver>
            <NuxtLinkLocale
              class="group-hover:text-gray-500 hover:!text-gray-900 transition-all flex flex-col gap-3"
              v-if="libraryData.data[0].translations[0].Menu0DataURL"
              :to="'/library/' + libraryData.data[0].translations[0].Menu0DataURL"
              :key="index"
            >
              <div class="text-xl font-medium">{{ libraryData.data[0].translations[0].Menu0DataLabel }}</div>
              <div
                class="text-base md:text-lg font-light text-gray-500"
                v-html="libraryData.data[0].translations[0].Menu0DataText"
              ></div>
            </NuxtLinkLocale>
            <NuxtLinkLocale
              class="group-hover:text-gray-500 hover:!text-gray-900 transition-all flex flex-col gap-3"
              v-if="libraryData.data[0].translations[0].Menu1DataURL"
              :to="'/library/' + libraryData.data[0].translations[0].Menu1DataURL"
              :key="index"
            >
              <div class="text-xl font-medium">{{ libraryData.data[0].translations[0].Menu1DataLabel }}</div>
              <div
                class="text-base md:text-lg font-light text-gray-500"
                v-html="libraryData.data[0].translations[0].Menu1DataText"
              ></div>
            </NuxtLinkLocale>
            <NuxtLinkLocale
              class="group-hover:text-gray-500 hover:!text-gray-900 transition-all flex flex-col gap-3"
              v-if="libraryData.data[0].translations[0].Menu2DataURL"
              :to="'/library/' + libraryData.data[0].translations[0].Menu2DataURL"
              :key="index"
            >
              <div class="text-xl font-medium">{{ libraryData.data[0].translations[0].Menu2DataLabel }}</div>
              <div
                class="text-base md:text-lg font-light text-gray-500"
                v-html="libraryData.data[0].translations[0].Menu02ataText"
              ></div>
            </NuxtLinkLocale>
            <NuxtLinkLocale
              class="group-hover:text-gray-500 hover:!text-gray-900 transition-all flex flex-col gap-3"
              v-if="libraryData.data[0].translations[0].Menu3DataURL"
              :to="'/library/' + libraryData.data[0].translations[0].Menu3DataURL"
              :key="index"
            >
              <div class="text-xl font-medium">{{ libraryData.data[0].translations[0].Menu3DataLabel }}</div>
              <div
                class="text-base md:text-lg font-light text-gray-500"
                v-html="libraryData.data[0].translations[0].Menu3DataText"
              ></div>
            </NuxtLinkLocale>
          </IntersectionObserver>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const PageName = ref("Library");
console.log("library/index");
const { data: libraryData, error1 } = await useFetch("/api/library");
console.log(libraryData);
</script>
