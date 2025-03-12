<template>
  <div @click="toggleFullscreen()">
    <Icon
      class="transition-all cursor-pointer hover:scale-105 hover:text-gray-900 text-gray-500"
      name="solar:magnifer-zoom-in-linear"
      size="1.5em"
    />
    <Teleport to="body">
      <Lightbox
        v-if="swiper && fullscreen"
        :type="type"
        :activeSlide="activeSlide"
        :toggleFullscreen="toggleFullscreen"
        :slides="slides"
        :videoControls="videoControls"
      ></Lightbox>
    </Teleport>
  </div>
</template>

<script setup>
const props = defineProps({
  type: String,
  activeSlide: Number,
  swiper: Object,
  slides: Array,
  videoControls: Boolean,
  fullscreen: Boolean,
  toggleFullscreen: Function
});

</script>
