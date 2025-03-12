<template>
  <div v-if="swiper" @click="toggleMute">
    <Icon
      class="transition-all cursor-pointer hover:scale-105 hover:text-gray-900 text-gray-500"
      :name="!isMuted ? 'solar:headphones-round-sound-linear' : 'solar:headphones-round-sound-line-duotone'"
      size="1.5em"
    />
  </div>
</template>

<script setup>

const { swiper } = defineProps({
  swiper: Object,
});

const isMuted = ref(false);

const updateMuteState = () => {
  if (swiper && swiper.slides) {
    const activeSlide = swiper.slides.find(slide =>
      slide.classList.contains("swiper-slide-active")
    );
    const video = activeSlide?.querySelector("video");
    if (video) {
      isMuted.value = video.muted;
    }
  }
};

// Обновляем состояние звука при изменении активного слайда или его состояния звука
watchEffect(() => {
  updateMuteState();
});

const toggleMute = () => {
  swiper.slides.forEach((slide) => {
    const video = slide.querySelector("video");
    if (video) {
      video.muted = !video.muted;
      // После переключения звука обновляем реактивное состояние, чтобы отразить текущее состояние
      isMuted.value = video.muted;
    }
  });
};
</script>
