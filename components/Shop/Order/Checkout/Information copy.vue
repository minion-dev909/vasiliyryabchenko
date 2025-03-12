<template>
  <div v-if="Order" class="flex flex-col gap-5">
    <div class="text-xl text-gray-500">{{ $t("Information") }}</div>
    <ShopOrderAdress/>
  </div>
</template>
<script setup>
const { storageBase, t } = useRuntimeData();
const props = defineProps({
  editable: Boolean,
  Order: Object,
});
</script>
