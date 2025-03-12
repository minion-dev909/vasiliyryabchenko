<template>
  <IntersectionObserver
    class="w-full sm:max-h-[70vh] h-full lg:pr-8"
  >
    <Swiper
      class="transition-all duration-all pagination-stable pagination-bottom-center control-pagination pagination-equal h-full flex flex-col justify-center items-center w-full"
      :keyboard="{ enabled: true, onlyInViewport: true }"
      :modules="[
        SwiperKeyboard,
        SwiperParallax,
        SwiperAutoplay,
        SwiperPagination,
        SwiperNavigation,
      ]"
      :navigation="true"
      :parallax="true"
      :speed="1000"
      :loop="true"
      :autoplay="{ delay: 4000, pauseOnMouseEnter: true }"
      :pagination="{
        bulletClass: 'pagination-line',
        bulletActiveClass: 'pagination-line-active',
        clickable: true,
      }"
      :direction="'horizontal'"
    >
      <SwiperSlide
        v-for="slide in data.data"
        :key="slide"
        class="relative !flex gap-8 xl:gap-10  xl:flex-row justify-center sm:justify-end md:justify-start lg:justify-end xl:justify-center md:px-8 lg:px-16 md:pt-8 md:pb-16 items-center bg-gray-50"
      >
        <div
          class="w-full md:w-auto lg:w-full xl:w-auto h-full max-h-[91.3vh] md:max-h-[60vh]"
          v-if="slide.image"
        >
          <template v-if="slide.image">
            <div class="w-full h-full flex justify-center items-center">
              <Image @loaded="handleInformation"
                class="w-full h-full"
                :src="`${newApiBase}/assets/${slide.image}`"
                :classes="`md:w-auto h-full w-full object-cover sm:max-h-[60vh] object-center`"
              />
            </div>
          </template>
        </div>
        <HomepageGalleryText :data="slide.translations[0]" v-if="slide.translations[0]" class="xl:max-w-[50%]"></HomepageGalleryText>
      </SwiperSlide>
    </Swiper>
  </IntersectionObserver>
</template>

<script setup>
const { newApiBase } = useRuntimeData();
let { data, execute, error, pending } = useFetch(
  `${newApiBase}/items/Slider?fields=*,translations.*&deep={"translations":{"_filter":{"_and":[{"languages_code":{"_eq":"en"}}]}}}`,
  {
    method: "GET",
    lazy: true, // Ensure that the request is triggered manually by calling execute()
  }
);


console.log(data);

// const props = defineProps({
//   data: Object,
// });

// const loaded = ref(false);

// function handleInformation(newValue) {
//   loaded.value = newValue;
// }
</script>
