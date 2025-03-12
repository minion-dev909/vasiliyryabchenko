<template>
  <div class="flex flex-col py-2 justify-center items-center">
    <div><span class="text-green-600 font-bold"
        >{{ totalPrices.totalSalePrice }} {{ $t("Currency") }}</span
      >
    </div>
    <div>
      <span class="text-gray-400 font-bold text-sm"> {{ totalPrices.totalOriginalPrice }} {{ $t("Currency") }} </span>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const totalPrices = computed(() => cartStore.totalPrices);
</script>
