<template>
  <Swiper
    v-if="breakpoints"
    class="pagination-equal h-[calc(100vh-7.5em)] flex flex-col justify-center items-center w-full"
    :class="products.length < 3 ? 'swiper-auto-slides' : ''"
    :keyboard="{ enabled: true }"
    :centered-slides="true"
    :modules="[
      SwiperKeyboard,
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
    :space-between="70"
    :navigation="true"
    :slides-per-view="'auto'"
    :direction="'horizontal'"
  >
    <SwiperSlide
      v-for="(product, productId) in products"
      :key="productId"
      class="flex flex-col justify-center items-center px-4 md:px-8 py-5 md:py-10 lg:py-20 sm:!w-fit"
    >
      <ListsItemProduct :data="product" class="md:[&_img]:h-[50vh]" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
// Симулирование получения props через defineProps
const props = defineProps({
  products: Array,
});

const breakpoints = ref(null);

// Адаптированный метод для использования в Composition API
const setBreakpoints = () => {
  if (props.products.length > 0) {
    breakpoints.value = {
      1280: { slidesPerView: slidesPerView("xl") },
      1024: { slidesPerView: slidesPerView("lg") },
      768: { slidesPerView: slidesPerView("md") },
      640: { slidesPerView: slidesPerView("sm") },
    };
    console.log(breakpoints.value);
  }
};

// Переписанный helper метод
const slidesPerView = (screenSize) => {
  const slidesAmount = props.products.length;
  if (screenSize === "xl") {
    return Math.min(4, slidesAmount);
  } else if (screenSize === "lg") {
    return Math.min(3, slidesAmount);
  } else if (screenSize === "md") {
    return Math.min(2, slidesAmount);
  } else if (screenSize === "sm") {
    return Math.min(1, slidesAmount);
  }
  return 1;
};

// Жизненный цикл beforeMount, использующий onBeforeMount
onBeforeMount(async () => {
  nextTick(() => {
    setBreakpoints(); // Устанавливаем breakpoints после получения slides
  });
});
</script>
