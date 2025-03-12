<template>
  <div class="flex flex-col gap-16 h-full">
    <GeneralMediaGallery
      v-if="type"
      :query="query"
      :type="type"
      :videoControls="videoControls"
      :autoplay="true"
      :slides="slides"
    ></GeneralMediaGallery>
  </div>
</template>

<script setup>
const props = defineProps({
  type: String,
  query: Object,
  slides: Object,
  videoControls: Boolean,
});
onMounted(()=>{
  console.log('sdsd')
})
</script>
