<template>
  <button
    @click="openCheckout"
    class="flex justify-center font-bold text-lime-800 hover:text-yellow-900 bg-lime-300 hover:bg-yellow-300 items-center gap-2 group transition-all"
  >
    <Icon
      class="group-hover:animate-[wiggle_1s_ease-in-out_infinite] transition-all"
      name="material-symbols:shopping-cart-checkout-outline-rounded"
      size="1.5em"
    />
    {{ $t("Checkout") }}
  </button>
  <Teleport to="body">
    <div v-if="open">
      <ShopOrderCheckoutScreen :close="closeCheckout" />
    </div>
  </Teleport>
</template>
<script setup>
import { useCartStore } from "@/stores/cart";
const { t } = useI18n();
const open = ref(false);
async function cancelPaymentIntent() {
  const cartStore = useCartStore();
  if (!cartStore.order.intentId) return;

  // Извлекаем ID платежного намерения из clientSecret
  const paymentIntentId = cartStore.order.intentId;

  const response = await fetch("/.netlify/functions/cancel-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paymentIntentId,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    console.log("PaymentIntent was canceled successfully", data.canceledIntent);
    cartStore.cancelIntent()
    // Обработка успешной отмены (например, обновление UI)
  } else {
    console.error("Failed to cancel PaymentIntent", data.error);
    // Обработка ошибки
  }
}
const openCheckout = () => {
  open.value = true;
};

const closeCheckout = () => {
  cancelPaymentIntent();
  open.value = false;
};
</script>
