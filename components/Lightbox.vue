<template>
  <ClientOnly>
    <IntersectionObserver
      class="w-full h-full z-[9999] bg-white fixed left-0 top-0"
    >
      <Slider
        v-if="type"
        :slides="slides"
        :type="type"
        :videoControls="videoControls"
        :fullscreenOption="false"
        :preactiveSlide="activeSlide"
      >
        <template #controls>
          <SliderControlsClose
            :toggleFullscreen="toggleFullscreen"
          />
        </template
      ></Slider>
    </IntersectionObserver>
  </ClientOnly>
</template>

<script setup>

const props = defineProps({
  type: String,
  activeSlide: Number,
  slides: Array,
  videoControls: Boolean,
  toggleFullscreen: Function,
});
</script>
