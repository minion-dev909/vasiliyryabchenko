<template>
  <NuxtLayout name="screen">
    <div class="p-4 md:p-8 w-full h-full" v-if="cartItems">
      <ShopOrderCheckoutHeader :close="close" />
      <div class="py-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5" v-if="cartStore">
          <div class="flex flex-col gap-10">
            <div>
              <div class="flex flex-col gap-2">
                <div class="text-gray-500">Total Price</div>
                <div class="font-bold text-3xl">
                  {{ cartStore.totalPrices.totalSalePrice.toString() }}
                  {{ $t("Currency") }}
                </div>
              </div>
              <div v-if="cartStore.totalPrices.savings>0" class="text-gray-500">You are saving <span class="text-green-600">{{ $t("CurrencySign") }}{{ cartStore.totalPrices.savings }}</span> with all discounts!</div>
            </div>
            <ShopOrderCartProducts :Products="cartItems" :editable="editable" />
          </div>
          <ShopOrderCheckoutPaymentStripe :cartStore="cartStore" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { useCartStore } from "@/stores/cart";
const { t } = useI18n();
const props = defineProps({
  close: Function,
});

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const editable = ref(true);

onMounted(() => {
  document.body.classList.add("overflow-hidden");
});

onUnmounted(() => {
  document.body.classList.remove("overflow-hidden");
});
</script>
