<template>
  <div
    v-if="data"
    class="w-full flex flex-row gap-3 items-center justify-between"
  >
    <div class="flex flex-col">
      <div>{{ $t("Order") }}</div>
      <div class="text-2xl lg:text-3xl">{{ data.ID }}</div>
    </div>
    <div class="flex flex-row justify-end gap-8">
      <ShopOrderStatus :Label="$t('Status')" :Value="$t(data.Status)" />
      <ShopOrderStatus
        :Label="$t('Payment')"
        :Icon="data.Payment.Icon"
        :Value="$t(data.Payment.Status)"
      />
      <ShopOrderTrackScreenButtonClose />
    </div>
  </div>
</template>
<script setup>
const { t } = useRuntimeData();
const props = defineProps({
  data: Object,
});
</script>
