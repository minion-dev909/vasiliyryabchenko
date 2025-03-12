<template>
  <button
    @click="click"
    class="flex justify-center items-center gap-2 opacity-60 hover:opacity-100 group transition-all"
  >
    <Icon
      class="group-hover:animate-[wiggle_1s_ease-in-out_infinite] transition-all"
      name="streamline:travel-airport-departure-time-travel-plane-trip-airplane-time-off-adventure-timer-take-clock"
      size="1.5em"
    />
    {{ $t("My Order") }}
  </button>
</template>
<script setup>
const { t } = useI18n();
const cartStore = useCartStore();
const click = () => {
  cartStore.openTrackModal();
};
</script>
