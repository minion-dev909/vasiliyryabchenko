<template>
  <div
    v-if="showLoadingScreen"
    :class="{ 'fade-out': fadeOut }"
    class="fixed inset-0 flex flex-col items-center justify-center gap-5 bg-white z-[999999] transition-opacity duration-1000 opacity-100"
  >
    <div class="relative flex items-center justify-center">
      <NuxtImg
        src="triad-loader.gif"
        :preload="true"
        class="origin-center object-cover opacity-0 transition-all duration-2000 max-w-48"
        @load="imageLoaded($el)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const showLoadingScreen = ref(true);
const progress = ref(0);
const fadeOut = ref(false); // Добавленный флаг для начала исчезновения

const imageLoaded = (image) => {
  setTimeout(() => {
    image.querySelector("img").classList.add("animateFadeIn");
  }, 200);
};

watch(progress, (newProgress) => {
  if (newProgress >= 100) {
    fadeOut.value = true; // Активируем исчезновение
    setTimeout(() => {
      showLoadingScreen.value = false;
      localStorage.setItem("visited", "true");
    }, 2000); // Дождитесь завершения анимации исчезновения, прежде чем полностью убрать экран
  }
});

onMounted(() => {
  if (localStorage.getItem("visited")) {
    showLoadingScreen.value = false;
  } else {
    const interval = setInterval(() => {
      if (progress.value < 100) {
        progress.value += 10;
      }
    }, 200);
  }
});
</script>

<style>
.fade-out {
  opacity: 0 !important; /* Используйте !important для переопределения других стилей */
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style scoped>
.animateFadeIn {
  animation: fadeIn 2s ease-out forwards;
}
</style>