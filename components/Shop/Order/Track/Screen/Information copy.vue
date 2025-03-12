<template>
  <div v-if="Order" class="flex flex-col gap-5">
    <div class="text-xl text-gray-500">{{ $t("Information") }}</div>
    <div>sd</div>
  </div>
</template>
<script setup>
const { t } = useRuntimeData();
const props = defineProps({
  Order: Object,
});
</script>
