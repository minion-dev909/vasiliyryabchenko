<template>
  <div v-if="artworksData.data">
    <div
      class="py-10 grid grid-cols-1 md:grid-cols-2 md:text-lg gap-4 md:gap-8 lg:gap-16 [&>div>a>div>img]:transition-all [&>div>a>div>picture>img]:duration-500"
      :class="!filtersBar ? 'px-4 md:px-8' : 'px-4 md:px-0 md:pr-8'"
    >
      <div
        v-for="(item, index) in artworksData.data"
        :key="index"
        :id="generateId(artworksData.data, item)"
        class="group flex flex-col gap-5 h-full max-h-[75vh] justify-between"
      >
        <NuxtLinkLocale
          :to="'/artwork/' + item.translations[0].Slug"
          class="flex flex-col gap-5 h-full justify-between"
        >
          <div class="bg-gray-50 flex h-full justify-center items-center">
            <div class="flex h-full justify-center items-center">
              <IntersectionObserver>
                <Image
                 initClass="min-h-[55vh]"
                  :alt="
                    item.translations[0].MediaAltText
                  "
                  :src="`${runtimeConfig.public.newApiBase}${item.translations[0].MediaPath}`"
                  :classes="`lg:max-h-[55vh] h-full w-full transition-all duration-500 group-hover:scale-90 scale-[.85]`"
                />
              </IntersectionObserver>
            </div>
          </div>
          <ArtworkItemInfo :item="item" />
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup>


const { generateId } = useGenerateId();

// Использование useRuntimeConfig для получения конфигурации в Nuxt 3
const runtimeConfig = useRuntimeConfig();

// Реактивное свойство для управления состоянием открытого/закрытого описания
const DescriptionOpen = ref(false);

// Props определяются с помощью defineProps в Composition API
const props = defineProps({
  filtersBar: Boolean,
  query: Object,
  queryAmount: Number,
});
const { data: artworksData, error1 } = await useFetch("/api/artworks");
console.log("---grid---");
console.log(artworksData);
console.log("ArtworkGridView");
console.log(props);
</script>
