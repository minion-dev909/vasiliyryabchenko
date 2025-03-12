<template>
  <Slider
    v-if="type"
    :slides="slides"
    :type="type"
    :videoControls="videoControls"
    :fullscreenOption="true"
    mediaHeight="33em"
    class="bg-gray-50"
  ></Slider>
</template>

<script setup>
const props = defineProps({
  type: String,
  slides: Array,
  videoControls: Boolean,
});

onMounted(()=>{
  console.log('Gallery')
})
</script>
