<template>
  <Swiper
    class="pagination-equal pagination-bottom-center control-pagination h-[calc(100vh-7.5em)] flex flex-col justify-center items-center bg-gray-50 w-full"
    :centered-slides="true"
    :modules="[
      SwiperFreeMode,
      SwiperNavigation,
      SwiperMousewheel,
      SwiperAutoplay,
      SwiperPagination,
    ]"
    :speed="1000"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    }"
    :pagination="{
      bulletClass: 'pagination-line',
      bulletActiveClass: 'pagination-line-active',
      clickable: true,
    }"
    :navigation="true"
    :slides-per-view="1"
    :direction="'horizontal'"
  >
    <SwiperSlide v-for="item in data.data" :key="item">
      <NuxtLinkLocale
        :to="(prefix ? `/${prefix}` : '') + `/${item.Slug}`"
        class="group flex flex-col lg:flex-row items-center justify-center h-full"
      >
        <div>
          <template v-if="item.Image">
            <picture
              class="flex justify-center items-center h-full lg:h-[50vh] w-full md:w-max"
            >
              <Image
                @loaded="handleInformation"
                :alt="`${item.Type} '${item.translations[0].Title}', ${$t('Sitename')}, ${
                  item.Year
                }`"
                :src="`${newApiBase}/assets/${item.Image}`"
                :classes="`h-full w-full transition-all duration-500 group-hover:scale-70 scale-90 max-h-[34em] lg:max-h-[40em]`"
                initClass="min-h-[33em]"
              />
            </picture>
          </template>
        </div>
        <HomepageShowcaseInfo v-if="loaded" :item="item" />
      </NuxtLinkLocale>
    </SwiperSlide>
  </Swiper>
</template>
<script setup>
const { newApiBase } = useRuntimeData();
const requestURL = `${newApiBase}/items/Artworks?fields=*,translations.*&deep={"translations":{"_filter":{"_and":[{"languages_code":{"_eq":"en"}}]}}}`;
let { data, execute, error, pending } = useFetch(
  requestURL,
  {
    method: "GET",
    lazy: true, // Ensure that the request is triggered manually by calling execute()
  }
);

console.log("@@@");
console.log(requestURL);
console.log(data);
</script>
