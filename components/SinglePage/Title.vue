<template>
  <div v-if="Label" class="mb-5 flex-col flex">
    <div class="text-gray-500 text-lg">{{ $t("Title") }}</div>
    <h1 class="text-2xl font-medium">
      <span v-text="Label"></span>
    </h1>
  </div>
</template>

<script setup>
const props = defineProps({
  Label: String,
});

</script>
