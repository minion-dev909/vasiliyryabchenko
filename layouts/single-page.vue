<template>
  <TemplatingGrid3Cols class="border-b">
    <div
      class="order-last lg:order-first relative lg:col-span-1 px-4 md:px-8 lg:px-0 lg:ml-8 py-10 lg:py-0"
    >
      <div
        class="navigation transition-all top-[7em] lg:min-h-[75vh] mb-6 sticky lg:block overflow-y"
      >
        <div class="lg:flex flex-col lg:gap-1 w-full group">
          <NuxtLayout
            name="single-page-information"
            :query="query"
            :PageType="PageType"
          >
            <template #sidecontent>
              <slot name="information" />
            </template>
          </NuxtLayout>
        </div>
      </div>
    </div>
    <div class="lg:col-span-2 xl:col-span-3 h-full">
      <div class="min-h-max px-0 lg:pr-8 w-full gap-10 mb-5 h-full">
        <slot name="content-first" />
      </div>
    </div>
  </TemplatingGrid3Cols>
  <TemplatingGrid3Cols
    v-if="query.Details"
    class="py-10 lg:py-0 border-b lg:pb-6"
  >
    <div class="relative lg:col-span-1 px-4 md:px-8 lg:px-0 ml-0 lg:ml-8">
      <div
        class="navigation transition-all top-[7em] mb-6 lg:block overflow-y sticky"
      >
        <div class="lg:flex flex-col lg:gap-1 w-full group">
          <div class="font-medium text-xl">{{ $t("Details") }}</div>
        </div>
      </div>
    </div>
    <div class="lg:col-span-2 xl:col-span-3">
      <div
        class="min-h-max px-4 md:px-8 lg:px-0 lg:pr-8 w-full flex flex-col gap-10 mb-5"
      >
        <ArtworkDetails :query="query.Details"></ArtworkDetails>
      </div>
    </div>
  </TemplatingGrid3Cols>
</template>
<script setup>
const props = defineProps({
  query: Object,
  PageType: String,
});
</script>
