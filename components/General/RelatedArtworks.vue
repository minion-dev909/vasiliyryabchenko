<template>
  <Swiper
    v-if="breakpoints"
    class="pagination-equal h-[calc(100vh-7.5em)] flex flex-col justify-center items-center bg-gray-50 w-full"
    :class="data.length < 3 ? 'swiper-auto-slides' : ''"
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
    :auto-height="true"
    :slides-per-view="'auto'"
    :direction="'horizontal'"
  >
    <SwiperSlide
      v-for="(item, key) in data"
      :key="key"
      class="flex flex-col justify-center items-center py-20 sm:!w-fit"
    >
      <NuxtLinkLocale
        :to="(prefix ? `/${prefix}` : '') + `/${item.Slug}`"
        class="group flex flex-col items-center justify-center h-full gap-5"
      >
        <div class="group-hover:scale-95 transition-all">
          <template
            v-if="
              item.Media[0].mime.includes('image')
            "
          >
            <picture
              class="flex justify-center items-center h-full md:max-h-[50vh] w-full md:w-max"
            >
              <Image
                :alt="`${item.Type} '${item.Title}', ${$t(
                  'Sitename'
                )}, ${item.Year}`"
                :src="`${storageBase}${item.Media[0].path}`"
                initClass="min-h-[33em]"
                :classes="`h-full w-full transition-all duration-500 group-hover:scale-70 scale-90 max-h-[33em]`"
              />
            </picture>
          </template>
          <template
            v-if="
              item.Media[0].mime.includes('video')
            "
          >
            <div class="flex justify-center items-center">
              <video loop autoplay muted class="w-auto">
                <source
                  :src="`${storageBase}${item.Media[0].path}`"
                  :type="slitemide.Media[0].mime"
                />
              </video>
            </div>
          </template>
        </div>
        <ArtworkItemInfo :item="item" class="text-center" />
      </NuxtLinkLocale>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>

const {storageBase} = useRuntimeData();
// Симулирование получения props через defineProps
const props = defineProps({
  data: Array,
  prefix: String
});

const breakpoints = ref(null);

// Адаптированный метод для использования в Composition API
const setBreakpoints = () => {
  if (props.data.length > 0) {
    breakpoints.value = {
      1280: { slidesPerView: slidesPerView("xl") },
      1024: { slidesPerView: slidesPerView("lg") },
      768: { slidesPerView: slidesPerView("md") },
      640: { slidesPerView: slidesPerView("sm") },
    };
  }
};

// Переписанный helper метод
const slidesPerView = (screenSize) => {
  const slidesAmount = props.data.length;
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
