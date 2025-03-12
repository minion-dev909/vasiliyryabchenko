<template>
<div v-if="Label" class="font-medium text-xl">{{ $t(Label) }}</div>
</template>

<script setup>
const props = defineProps({
  Label: String,
});
</script>
