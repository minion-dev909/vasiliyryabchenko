<template>
  <Swiper
    class="pagination-fixed-bottom pagination-equal pagination-flex pagination-full-w h-[78vh] md:h-full flex flex-col justify-center items-center w-full"
  >
    <!-- <SwiperSlide
      v-if="Artcycle && Artcycle.Description"
      class="!flex flex-col md:py-16 md:!w-[36em] justify-center text-justify gap-4 px-4 md:px-8 lg:px-10"
    >
      <h2 v-text="Artcycle.Title" class="text-2xl"></h2>
      <Swiper
        class="pagination-full-h"
        :mousewheel="true"
        :free-mode="true"
        :modules="[SwiperFreeMode, SwiperMousewheel, SwiperPagination]"
      >
        <SwiperSlide
          class="h-[50vh]"
          v-html="Artcycle.Description"
        ></SwiperSlide>
      </Swiper>
      <div class="w-full flex flex-row mt-6">
        <div class="text-md text-gray-500 after:ml-2 after:content-['→']">
          {{ $t("Scroll") }}
        </div>
      </div>
    </SwiperSlide> -->
    <SwiperSlide
      v-for="(slide, sl_index) in artworksData.data"
      :key="sl_index"
      class="md:py-16 !w-fit"
    >
      <NuxtLinkLocale
        :to="'/artwork/' + slide.translations[0].Slug"
        class="group flex flex-col items-center justify-center h-full gap-5"
      >
        <div>
          <IntersectionObserver>
              <picture
                class="flex justify-center items-center h-full md:h-[50vh] w-full md:w-max"
              >
                <Image
                  :src="`${config.public.newApiBase}${slide.translations[0].MediaPath}`"
                  :alt="`${slide.translations[0].Type} '${slide.translations[0].Title}', ${$t('Sitename')}, ${slide.translations[0].Year}`"
                  :classes="'max-h-[55vh] h-full w-auto transition-all duration-500 group-hover:scale-90 scale-[.85]'"
                />
              </picture>
            </IntersectionObserver>
        </div>
        <ArtworkItemInfo :item="slide" class="text-center" />
      </NuxtLinkLocale>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
const emit = defineEmits(["statusChange"]);
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();

const props = defineProps({
  query: Object,
  queryAmount: Number,
  Artcycle: Object,
});
console.log("ArtworksSliderView");
console.log(props);
const { data: artworksData, error1 } = await useFetch("/api/artworks");
console.log("---grid---");
console.log(artworksData);
// Use props.query directly since it's not a ref
// const slides = computed(() => {
//   return Array.isArray(props.query) ? props.query : [];
// });

// const refreshParameters = () => {
//   const refreshed = route.fullPath.includes("replaced"); // Adjust logic as needed
//   if (refreshed) {
//     router.replace({ query: {} });
//   }
// };

// onMounted(() => {
//   document.body.classList.add("overflow-y-hidden");
//   refreshParameters();
// });

// onUnmounted(() => {
//   document.body.classList.remove("overflow-y-hidden");
// });

// let scrollTimeout = null;

// const handleScroll = (progress) => {
//   clearTimeout(scrollTimeout);

//   scrollTimeout = setTimeout(() => {
//     const currentQuery = { ...route.query };
//     const swiperProgress = progress;
//     const queryParameters = { ...currentQuery, prgrss: swiperProgress };

//     router.replace({ query: queryParameters });
//   }, 300);
// };

// const sliderFirstMove = (event) => {
//   if (window.innerWidth > 768) {
//     let newValue = event.progress !== 0 ? false : true;
//     emit("statusChange", newValue);
//   }
// };

// const loadProgress = (swiper) => {
//   const progress = route.query.prgrss || 0;
//   swiper.setProgress(progress, 0);
// };

// const onSlideChange = (event) => {
//   handleScroll(Math.round(parseFloat(event.progress) * 10000) / 10000);
// };

// const swiperSetup = (event) => {
//   loadProgress(event);
// };

// const update = (event) => {
//   event.setProgress(0, 1000);
// };
</script>