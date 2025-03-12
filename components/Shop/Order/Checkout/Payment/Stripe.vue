<template>
  <div class="flex flex-col gap-4" v-show="loaded">
    <div if="shippingCostData">{{ shippingCostData }}</div>
    <div class="flex flex-col gap-6">
      <div id="express-checkout-element">
        <!-- Express Checkout Element will be inserted here -->
      </div>
      <div id="payment-element" class="border p-5"></div>
      <!-- Обновленный ID для монтирования -->
      <div class="w-full flex flex-col">
        <button
          @click="handleSubmit"
          class="text-lime-700 bg-gradient-to-r hover:scale-105 transition-all from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-lg flex justify-center items-center flex-row gap-2 px-5 py-2.5 text-center mb-2"
        >
          <Icon name="material-symbols:payments-outline" size="1.5em" />
          {{ $t("Proceed") }}
        </button>
      </div>
    </div>
    <div id="address-element"></div>
  </div>
  <Teleport to="body">
    <ShopOrderCheckoutPaymentStatus
      v-if="paymentStatus !== null"
      :status="paymentStatus"
    />
  </Teleport>
</template>

<script setup>
import { loadStripe } from "@stripe/stripe-js";
const props = defineProps({
  cartStore: Object,
});

const shippingCostData = ref(null);
const { t } = useI18n();
const loaded = ref(false)
const clientSecret = ref(null);
const stripePromise = loadStripe(
  "pk_test_51OyS2mDpLD099KRx7gjq4XpSeUws9zEFMykcCJCQCzghzjs19hu8nH5EiITl1xZGlJLtwRJCPyb8R7obzuxCHLux00H9B9bD4a"
);
const paymentStatus = ref(null); // 'init', 'processing', 'success', 'error'

// Получаем clientSecret из вашего сервера
async function fetchClientSecret() {
  console.log(props.cartStore.totalPrices.totalSalePrice.toString());
  const response = await fetch("/.netlify/functions/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: props.cartStore.totalPrices.totalSalePrice.toString(),
    }),
  });
  const data = await response.json();
  props.cartStore.saveIntent(data.id);
  console.log(data);
  clientSecret.value = data.clientSecret;
}

let elements;

onMounted(async () => {
  // Этот геттер должен быть определен в вашем store

  await fetchClientSecret();
  const stripe = await stripePromise;

  if (!stripe) return;

  // Подождите, пока clientSecret будет установлен
  if (!clientSecret.value) {
    console.log("Client secret is not set.");
    return;
  }

  const appearance = {
    // здесь можно настроить внешний вид
  };

  const options = {
    clientSecret: clientSecret.value,
    appearance,
  };

  elements = stripe.elements(options);

  const adressOptions = {
    mode: "shipping",
    fields: {
      phone: "always",
    },
    display: {
      name: "split",
    },
    validation: {
      phone: {
        required: "always",
      },
    },
  };

  const addressElement = elements.create("address", adressOptions);
  addressElement.mount("#address-element");

  // Внутри вашего onMounted или другого подходящего места
  addressElement.on("change", async (event) => {
    console.log("Change");
    // Проверяем, что адрес полностью заполнен
    if (event.complete) {
      // Формируем объект адреса из данных события
      const addressTo = {
        first_name: "Oleg",
        last_name: "Oleg",
        email: "example@msn.com",
        phone: "0574 69 21 90",
        country: event.value.country,
        region: event.value.region,
        city: event.value.city,
        address1: event.value.addressLine1,
        address2: event.value.addressLine2,
        zip: event.value.postalCode,
      };

      // Вызов сервера для расчёта стоимости доставки
      try {
        const shippingCostResponse = await fetch(
          "/.netlify/functions/calculateShipping",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // Передайте необходимые данные для расчёта доставки
              line_items: [
                {
                  product_id: "6603b2c0b6455c2349045bce",
                  sku: "19684184418055035252",
                  quantity: 1,
                  print_provider_id: 39,
                },
              ],
              address_to: addressTo,
            }),
          }
        );

        shippingCostData.value = await shippingCostResponse.json();
        // Обновляем UI с новой стоимостью доставки
        // Например, обновляем переменную стоимости доставки в вашем компоненте
        // this.shippingCost = shippingCostData;
      } catch (error) {
        console.error("Ошибка при расчёте стоимости доставки:", error);
        // Обрабатываем ошибку, возможно показываем сообщение пользователю
      }
    }
  });

  const optionsPayment = {
    fields: {
      billingDetails: {
        name: "auto",
        email: "auto",
        phone: "auto",
      },
    },
  };

  const paymentElement = elements.create("payment", optionsPayment);
  paymentElement.mount("#payment-element");

  const expressCheckoutElement = elements.create("expressCheckout");
  expressCheckoutElement.mount("#express-checkout-element");

  loaded.value = true
});

const paymentStatusNull = () => {
  console.log("closed");
  paymentStatus.value = null;
};

watch(paymentStatus, (newStatus) => {
  if (newStatus === "payment_failed") {
    setTimeout(() => {
      paymentStatusNull(); // Добавлены круглые скобки для вызова функции
    }, 2000);
  }
});
async function handleSubmit() {
  paymentStatus.value = "processing"; // Начало процесса
  const stripe = await stripePromise;
  if (!stripe || !clientSecret.value) return;
  const result = await stripe.confirmPayment({
    elements,
    redirect: "if_required",
  });
  if (result.error) {
    if (result.error.type !== "validation_error") {
      paymentStatus.value = "payment_failed";
    } else {
      paymentStatus.value = null;
    }
    console.error("Payment error:", result.error.message);
  } else if (
    result.paymentIntent &&
    result.paymentIntent.status === "succeeded"
  ) {
    console.log("Payment succeeded:", result.paymentIntent);
    paymentStatus.value = "succeeded";
    // Отправляем данные о заказе на сервер
    const response = await fetch("/.netlify/functions/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentIntentId: result.paymentIntent.id,
        items: props.cartStore.items, // предполагается, что у вас есть доступ к cartStore
      }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      console.log("Order created successfully:", responseData.orderId);
      paymentStatus.value = null;
      props.cartStore.successScreen(responseData.orderId);
      // Здесь можно очистить корзину и обновить UI
    } else {
      paymentStatus.value = null;
      console.error("Order creation failed:", responseData.error);
    }
  }
}
</script>
