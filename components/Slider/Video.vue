<template>
  <video
    :controls="videoControls"
    loop
    autoplay
    muted
    ref="videoObj"
    @loadedmetadata="onLoad"
  >
    <source :src="src" :type="mime" />
  </video>
</template>

<script setup>
const props = defineProps({
  videoControls: Boolean,
  src: String,
  initClass: String,
  mime: String,
  calculateSize: Function,
});

const loaded = ref(false);
const videoObj = ref(null);

const onLoad = () => {
  loaded.value = true;
  nextTick(() => {
    if (props.calculateSize) {
      props.calculateSize();
    }
  });
};

onMounted(() => {
  // Проверка, если видео уже загружено до момента монтирования компонента
  if (videoObj.value && videoObj.value.readyState >= 2) { // readyState 2 означает, что метаданные загружены
    onLoad();
  }
});
</script>
