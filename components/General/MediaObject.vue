<template>
  <template v-if="MediaObject">
    <IntersectionObserver
      class="flex flex-col gap-6 justify-center items-center"
    >
      <div
        class="h-full flex flex-col justify-center items-center p-5 md:p-10 bg-gray-50 w-full"
      >
        <component
          :class="{
            'cursor-zoom': fullscreenOption,
          }"
          v-if="MediaObject"
          class="media-object"
          classes="max-h-[23em]"
          initClass="min-h-[33em]"
          :fullscreen="fullscreen"
          :is="mediaComponent(MediaObject)"
          :src="`${storageBase}${MediaObject.MediaObjPath}`"
          :mime="MediaObject.MediaObjMime"
          :videoControls="true"
          :alt="MediaObject.AlternativeText"
          :toggleFullscreen="toggleFullscreen"
          :fullscreenOption="fullscreenOption"
        />
      </div>
      <figcaption v-html="MediaObject.Caption"></figcaption>
      <SliderControlsFullscreen
        v-show="fullscreenOption && fullscreenButton"
        type="Captioned"
        :slides="swiper"
        :videoControls="true"
        :activeSlide="activeSlide"
        :swiper="swiper"
        :fullscreen="fullscreen"
        :toggleFullscreen="toggleFullscreen"
      />
    </IntersectionObserver>
  </template>
</template>

<script setup>
const { storageBase } = useRuntimeData();
onMounted(()=>{
  console.log("MediaObject");
  console.log(props.MediaObject)
})
const props = defineProps({
  quality: String,
  fullscreenButton: Boolean,
  fullscreenOption: Boolean,
  activeSlide: Number,
  MediaObject: Object,
  fullscreen: Boolean,
  swiper: Object,
});

import Image from "@/components/Slider/Image.vue";
import Video from "@/components/Slider/Video.vue";

function mediaComponent(MediaObject) {
  return MediaObject.MediaObjMime.includes("image")
    ? Image
    : Video;
}

const fullscreen = ref(false);

const toggleFullscreen = () => {
  fullscreen.value = !fullscreen.value;
};

watch(fullscreen, (newState) => {
  document.body.classList.toggle("overflow-hidden", newState);
});
</script>
