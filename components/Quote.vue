<template>
  <div v-if="data" class="font-light lg:text-start">
    <IntersectionObserver v-if="data.QuoteText">
      <blockquote
        class="text-justify text-xl md:text-2xl xl:text-3xl mb-6 font-medium"
        v-html="data.QuoteText"
      ></blockquote>
    </IntersectionObserver>
    <IntersectionObserver v-html="data.QuoteSign"></IntersectionObserver>
  </div>
</template>
<script setup>
const props = defineProps({
  data: Object,
});
</script>
