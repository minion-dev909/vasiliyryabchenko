<template>
  <IntersectionObserver
    v-if="Text"
    class="md:py-2 text-justify flex flex-col gap-4"
    :class="!filtersBar ? 'px-4 md:px-8' : 'px-4 md:px-0 md:pr-8'"
  >
    <h2 v-text="Title" class="text-2xl"></h2>
    <div class="md:text-lg" v-if="Text">
      <div v-html="limitedDescription"></div>
      <button
        class="mt-2"
        v-if="limited && Text.length > 600"
        @click="DescriptionOpen = !DescriptionOpen"
      >
        {{ DescriptionOpen ? $t("Hide text") : $t("Read more") }}
      </button>
    </div>
  </IntersectionObserver>
</template>

<script setup>
const props = defineProps({
  limited: Boolean,
  filtersBar: Boolean,
  Text: String,
  Title: String
});

const DescriptionOpen = ref(false);

const limitedDescription = computed(() => {
  if (props.Text) {
    return !DescriptionOpen.value && !props.limited
      ? props.Text
      : props.Text.slice(0, 600) + "...";
  }
  return "";
});
</script>
