<template>
  <button
    class="button transition-all"
    @click="toggleLoading"
    :class="{ loading: isLoading }"
  >
    <span class="text-base uppercase text-green-600"
      >+ {{ $t("Add to cart") }}</span
    >
    <div class="cart">
      <svg viewBox="0 0 36 26">
        <polyline
          points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"
        ></polyline>
        <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
      </svg>
    </div>
  </button>
</template>
<script setup>
import { useCartStore } from "@/stores/cart"; // Импортируйте созданный store
const { t } = useI18n();
const props = defineProps({
  product: Object,
  cartShow: Boolean,
});
const emit = defineEmits(["update:cartShow"]);
const isLoading = ref(props.cartShow);

const cart = useCartStore(); // Используйте store

watch(isLoading, (newValue) => {
  emit("update:cartShow", newValue);
});

function toggleLoading() {
  isLoading.value = !isLoading.value;
  // Добавление продукта в корзину
  if (isLoading.value) {
    cart.addToCart(props.product);
    // Reset loading state after animation
    setTimeout(() => {
      isLoading.value = false;
    }, 3700); // Duration of the loading animation
  }
}
</script>

<style>
.button {
  --text: #000;
  --cart: #000;
  --tick: var(--background);
  background: var(--background);
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  color: var(--text);
  transform: scale(var(--scale, 1));
}

.button:active {
  --scale: 0.95;
}

.button span {
  font-weight: 500;
  display: block;
  position: relative;
  margin-left: -8px;
  line-height: 26px;
  transform: translateY(var(--span-y, 0));
  transition: transform 0.7s ease;
}
.button .cart {
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -13px 0 0 -18px;
  transform-origin: 12px 23px;
  transform: translateX(-120px) rotate(-18deg);
}

.button .cart:before,
.button .cart:after {
  content: "";
  position: absolute;
}

.button .cart:before {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px var(--cart);
  bottom: 0;
  left: 9px;
  background: white;
  filter: drop-shadow(11px 0 0 var(--cart));
}

.button .cart:after {
  width: 16px;
  height: 9px;
  background: var(--cart);
  left: 9px;
  bottom: 7px;
  transform-origin: 50% 100%;
  transform: perspective(4px) rotateX(-6deg) scaleY(var(--fill, 0));
  transition: transform 1.2s ease var(--fill-d);
}

.button .cart svg {
  z-index: 1;
  width: 36px;
  height: 26px;
  display: block;
  position: relative;
  fill: none;
  stroke: var(--cart);
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.button .cart svg polyline:last-child {
  stroke: white;
  stroke-dasharray: 10px;
  stroke-dashoffset: var(--offset, 10px);
  transition: stroke-dashoffset 0.4s ease var(--offset-d);
}

.button.loading {
  --scale: 0.95;
  --span-y: -32px;
  --icon-r: 180deg;
  --fill: 1;
  --fill-d: 0.8s;
  --offset: 0;
  --offset-d: 1.73s;
  background: white;
}
.button.loading {
  animation: button 3s linear forwards 0.2s;
}

.button.loading .cart {
  animation: cart 3s linear forwards 0.2s;
}
@keyframes button {
  0% {
    background-color: rgb(255, 255, 255);
  }
  87.5% {
    background-color: rgb(255, 255, 255);
  }
  100% {
    background-color: rgba(255, 255, 255, 0);
  }
}
@keyframes cart {
  12.5% {
    opacity: 1;
    transform: translateX(-60px) rotate(-18deg);
  }
  25%,
  45%,
  55%,
  75% {
    transform: none;
  }
  50% {
    transform: scale(0.9);
  }
  44%,
  56% {
    transform-origin: 12px 23px;
  }
  45%,
  55% {
    transform-origin: 50% 50%;
  }
  87.5% {
    opacity: 1;
    transform: translateX(70px) rotate(-18deg);
  }
  100% {
    opacity: 0;
    transform: translateX(140px) rotate(-18deg);
  }
}
</style>
