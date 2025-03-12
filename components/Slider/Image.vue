<template>
  <Image
    classes="h-full w-full"
    @click="SetFullscreen"
    :calculateSize="calculateSize"
    :alt="alt"
    :initClass="initClass"
    :classes="classes"
    :src="src"
  />
</template>

<script setup>
const props = defineProps({
  src: String,
  alt: String,
  fullscreenOption: Boolean,
  toggleFullscreen: Function,
  calculateSize: Function,
  classes: String,
  initClass: String,
});

const SetFullscreen = () => {
  props.fullscreenOption ? props.toggleFullscreen() : null;
};
</script>
