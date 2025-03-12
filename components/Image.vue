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
    <NuxtImg
      ref="nuxtImgRef"
      @load="onLoad"
      :src="src"
      :alt="alt"
      loading="lazy"
      class="transition-all duration-1000"
      :class="`${props.classes} ${
        loaded ? 'opacity-100' : initClass + ' opacity-0'
      }`"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
  alt: String,
  classes: String,
  initClass: String,
  thumb: String,
  calculateSize: Function,
});

const loaded = ref(false);
const nuxtImgRef = ref(null);

const onLoad = () => {
  loaded.value = true;
  nextTick(() => {
    if (props.calculateSize) {
      props.calculateSize();
    }
    sendValueToParent(loaded.value);
  });
};

const emit = defineEmits(["loaded"]);

function sendValueToParent(newValue) {
  emit("loaded", newValue);
}

onMounted(() => {
  if (nuxtImgRef.value && nuxtImgRef.value.$el.complete) {
    onLoad();
  }
});
</script>
