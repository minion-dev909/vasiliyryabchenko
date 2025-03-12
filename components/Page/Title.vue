<template>
  <IntersectionObserver>
    <h1 class="text-3xl lg:text-4xl font-medium">
      <span v-text="$t(Label)"></span>
    </h1>
  </IntersectionObserver>
</template>

<script setup>
const props = defineProps({
  Label: String,
});
</script>
