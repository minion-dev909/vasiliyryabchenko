<template>
  <div class="w-full">
    <NuxtLayout name="section-element-header">
      <template #left>{{ $t("Exhibitions & Shows") }}</template>
      <template #right
        ><NuxtLinkLocale to="/exhibitions">{{
          $t("All Exhibitions")
        }}</NuxtLinkLocale></template
      >
    </NuxtLayout>
    <Swiper
      class="transition-all !mb-8 duration-all control-pagination w-full"
      :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
      :speed="1000"
      :autoplay="{ delay: 6000, pauseOnMouseEnter: true }"
      :navigation="true"
      :pagination="{
        bulletClass: 'pagination-line',
        bulletActiveClass: 'pagination-line-active',
        clickable: true,
      }"
      :breakpoints="{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }"
      :slides-per-view="1"
      :direction="'horizontal'"
    >
    <SwiperSlide
        v-for="item in data.data"
        :key="item"
        class="py-8 pb-16 px-4 md:px-8"
      >
      <ListsItemExhibition :data="item" class="text-center [&>a>div.flex]:justify-center sm:text-left sm:[&>a>div.flex]:justify-start"></ListsItemExhibition>    
    </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
const { newApiBase } = useRuntimeData();
const requestURL = `${newApiBase}/items/Exhibitions?fields=*,translations.*&deep={"translations":{"_filter":{"_and":[{"languages_code":{"_eq":"en"}}]}}}`;
let { data, execute, error, pending } = useFetch(
  requestURL,
  {
    method: "GET",
    lazy: true, // Ensure that the request is triggered manually by calling execute()
  }
);
console.log("----------Exhivitions and shows---------");
console.log(requestURL);
console.log(data);

onActivated(() => {
  execute();
});
</script>
