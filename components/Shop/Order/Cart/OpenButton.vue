<template>
  <button
    @click="toggle"
    class="flex justify-center items-center gap-2 opacity-60 hover:opacity-100 group transition-all"
  >
    <Icon
      class="group-hover:animate-[wiggle_1s_ease-in-out_infinite] transition-all"
      name="solar:cart-large-minimalistic-linear"
      size="1.5em"
    />
    <div class="font-bold">
      <ShopOrderCartItemsQuantity/>
    </div>
  </button>
</template>
<script setup>
const { t } = useI18n();
const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};
</script>
