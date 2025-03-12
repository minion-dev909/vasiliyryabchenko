<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
});
</script>

<style>
.progress-container {
  width: 100%;
  background-color: #e0e0e0;
}

.progress-bar {
  height: 4px;
  background-color: #4caf50;
}
</style>
