<template>
  <Swiper
    v-if="slides"
    @init="swiperSetup"
    @slideChangeTransitionStart="onSlideChange"
    class="wrapper-flex pagination-full-w pagination-bottom-center h-full flex flex-col justify-center items-center w-full"
    :keyboard="keyboardConfig"
    :navigation="true"
    :modules="[
      SwiperKeyboard,
      SwiperAutoplay,
      SwiperPagination,
      SwiperNavigation,
    ]"
    :autoplay="autoplayConfig"
    :speed="1000"
    :centeredSlides="true"
    :pagination="paginationConfig"
    :slides-per-view="1"
    :direction="'horizontal'"
  >
    <SwiperSlide
      v-for="(slide, index) in slides"
      :key="index"
      class="px-4 md:px-20 pb-24 pt-10"
    >
      <template v-if="slide">
        <div
          class="wrapper w-full flex flex-col justify-center items-center"
          :class="{
            'media-33': mediaHeight,
            'h-full': !mediaHeight,
            'cursor-zoom': fullscreenOption,
          }"
        >
          <component
            class="media-object h-full w-auto"
            :fullscreen="fullscreen"
            :is="mediaComponent(slide)"
            :calculateSize="calculateMediaProportions"
            :src="mediaSource(slide)"
            :mime="
              type === 'Captioned' ? slide.data.MediaObject.mime : slide.mime
            "
            :videoControls="videoControls"
            :alt="
              type === 'Captioned'
                ? slide.data.AlternativeText
                : query
                ? `${$t(query.Type)} '${query.Title}', ${$t(
                    'Sitename'
                  )}, ${query.Year}`
                : ''
            "
            :toggleFullscreen="toggleFullscreen"
            :fullscreenOption="fullscreenOption"
          />
          <SliderCaption
            v-if="type === 'Captioned' && slide.data.Caption"
            v-html="slide.data.Caption"
          />
        </div>
      </template>
    </SwiperSlide>
    <div
      class="h-16 z-10 absolute bottom-0 mb-5 px-8 w-full flex flex-row items-center justify-center gap-5"
    >
      <slot name="controls" />
      <SliderControlsFullscreen
        v-if="swiper && fullscreenOption"
        :type="type"
        :slides="slides"
        :videoControls="videoControls"
        :swiper="swiper"
        :activeSlide="swiper.activeIndex"
        :fullscreen="fullscreen"
        :toggleFullscreen="toggleFullscreen"
      />
      <SliderControlsSound v-if="videoSlideActive" :swiper="swiper" />
    </div>
  </Swiper>
</template>

<script setup>
const { storageBase } = useRuntimeData();
import SliderImage from "@/components/Slider/Image.vue";
import SliderVideo from "@/components/Video.vue";

// Остальной код (props, imports, computed properties, methods, lifecycle hooks) остается без изменений
const props = defineProps({
  type: String, // Добавлен новый prop для определения типа
  slides: Array,
  query: Object, // Только для второго типа, но можно оставить как опциональный
  videoControls: Boolean,
  fullscreenOption: Boolean,
  preactiveSlide: Number,
  mediaHeight: String,
  autoplay: Boolean,
});
const swiper = ref(null);
const videoSlideActive = ref(false);

const autoplayConfig = computed(() => ({
  delay: 5000,
  pauseOnMouseEnter: true,
}));

const paginationConfig = computed(() => ({
  bulletClass: "pagination-line",
  bulletActiveClass: "pagination-line-active",
  clickable: true,
}));

const keyboardConfig = computed(() => ({
  enabled: true,
  onlyInViewport: true,
}));

// Функции для определения компонента медиа и источника медиа
const mediaComponent = (slide) => {
  // console.log(slide);
  return props.type === "Captioned"
    ? slide.data.MediaObject.mime.includes("image")
      ? SliderImage
      : SliderVideo
    : slide.mime.includes("image")
    ? SliderImage
    : SliderVideo;
};

const mediaSource = (slide) => {
  return props.type === "Captioned"
    ? `${storageBase}${slide.data.MediaObject.path}`
    : `${storageBase}${slide.path}`;
};

// Инициализация Swiper и обновление состояния активного видеослайда
const swiperSetup = (event) => {
  swiper.value = event;
  swiper.value.slideTo(props.preactiveSlide, 0);
  nextTick(() => {
    updateVideoSlideActive();
    calculateMediaProportions();
  });
};

const updateVideoSlideActive = () => {
  videoSlideActive.value =
    swiper.value?.slides[swiper.value.activeIndex]?.querySelector("video") !==
    null;
};

// Обработчики событий
const handleResize = () => {
  calculateMediaProportions();
};

const onSlideChange = () => {
  calculateMediaProportions();
  updateVideoSlideActive();
  MuteSound();
};

const toggleFullscreen = () => {
  fullscreen.value = !fullscreen.value;
};

const fullscreen = ref(false);

watch(fullscreen, (newState) => {
  document.body.classList.toggle("overflow-hidden", newState);
  newState === true
    ? swiper.value.autoplay.stop()
    : swiper.value.autoplay.start();
  calculateMediaProportions();
});

// Оптимизация обработчиков масштабирования и звука
const calculateMediaProportions = () => {
  // console.log('Calculate')
  swiper.value.slides.forEach((slide) => {
    const mediaObject = slide.querySelector(".media-object");
    if (mediaObject) {
      adjustMediaSize(mediaObject, slide.querySelector(".wrapper"));
    }
  });
};

const adjustMediaSize = (mediaObject, sliderWrapper) => {
  const ratio = mediaObject.offsetHeight / mediaObject.offsetWidth;
  const wrapperRatio = sliderWrapper.offsetHeight / sliderWrapper.offsetWidth;
  mediaObject.className =
    ratio <= wrapperRatio
      ? `media-object h-auto w-full`
      : `media-object w-auto h-full`;
};

const MuteSound = () => {
  swiper.value?.slides.forEach((slide) => {
    const video = slide.querySelector("video");
    if (video) {
      video.muted = true;
      if (slide.classList.contains("swiper-slide-active")) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  });
};

onActivated(() => {
  calculateMediaProportions();
});

onMounted(() => {
  window.addEventListener("resize", handleResize);
  screen.orientation.addEventListener("change", handleResize);
});

// onUnmounted(() => {
//   window.removeEventListener("resize", handleResize);
//   screen.orientation.removeEventListener("change", handleResize);
// });
</script>
