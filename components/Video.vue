<template>
  <div class="relative">
    <div
      v-if="!loaded"
      class="absolute top-0 left-0 flex w-full h-full justify-center items-center"
    >
      <div class="animate-spin">
        <Icon name="ri:loader-4-fill" size="2em" />
      </div>
    </div>
    <video
      ref="nuxtImgRef"
      @loadedmetadata="onLoad"
      :controls="videoControls"
      loop
      autoplay
      muted
      class="transition-all duration-1000 h-full w-full"
      :class="`${props.classes} ${
        loaded ? 'opacity-100' : initClass + ' opacity-0'
      }`"
    >
      <source :src="src" :type="mime" />
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  videoControls: Boolean,
  src: String,
  alt: String,
  classes: String,
  initClass: String,
  thumb: String,
  mime: String,
  calculateSize: Function,
});

const loaded = ref(false);
const nuxtImgRef = ref(null);

const onLoad = () => {
  loaded.value = true;
  nextTick(() => {
    if (props.calculateSize) {
      console.log("!");
      props.calculateSize();
    }
  });
};

onMounted(() => {
  // Убедитесь, что nuxtImgRef.value существует и является элементом видео.
  if (nuxtImgRef.value && nuxtImgRef.value.complete) {
    onLoad();
  } else {
    // Если видео еще не загружено, добавляем обработчик события 'loadeddata',
    // который будет вызывать onLoad при завершении загрузки видео.
    nuxtImgRef.value.addEventListener("loadeddata", onLoad);
  }
});
</script>
