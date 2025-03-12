<template>
  <div id="paypal-button-container"></div>
</template>

<script setup>
const props = defineProps({
  cartStore: Object,
});
onMounted(() => {
  // Динамическая загрузка PayPal SDK
  const script = document.createElement("script");
  script.src =
    "https://www.paypal.com/sdk/js?client-id=ASwgjVuUShMSNZzyrVIh1vfW7udq5fDDlegmy8wJIVlbVVwfpzEAanzGCIG3pOqbKu1iuYWiki2cXd1m";
  script.onload = () => {
    // Инициализация кнопки PayPal после загрузки SDK
    nextTick(() => {
      if (window.paypal && document.getElementById("paypal-button-container")) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: props.cartStore.totalPrices.totalSalePrice.toString(),
                    },
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                console.log(details);
                props.cartStore.createOrder(details);
              });
            },
          })
          .render("#paypal-button-container");
      } else {
        console.error("Element #paypal-button-container does not exist!");
      }
    });
  };
  document.head.appendChild(script);
});
</script>
