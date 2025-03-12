<template>
  <div class="flex items-center gap-2">
    <button
      class="font-bold px-2 border border-gray-200 text-gray-400 hover:border-gray-300"
      @click="decrement"
      :disabled="!editable || innerValue <= min"
    >
      -
    </button>
    <input
      type="text"
      class="w-16 text-center focus:ring-0 focus:outline-none bg-white border border-gray-200"
      v-model="innerValue"
      @blur="formatValue"
    />
    <button
      class="font-bold px-2 border border-gray-200 text-gray-400 hover:border-gray-300"
      @click="increment"
      :disabled="!editable || innerValue >= max"
    >
      +
    </button>
  </div>
</template>

<script setup>
const cart = useCartStore();
const props = defineProps({
  productId: {
    type: String,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: Infinity,
  },
});


const innerValue = ref(props.modelValue);

const increment = () => {
  if (innerValue.value < props.max) {
    innerValue.value++;
  }
};

const decrement = () => {
  if (innerValue.value > props.min) {
    innerValue.value--;
  }
};

const formatValue = () => {
  const num = parseInt(innerValue.value, 10);
  innerValue.value = isNaN(num)
    ? props.min
    : Math.max(props.min, Math.min(num, props.max));
};

watch(innerValue, (newValue) => {
  cart.updateQuantity(props.productId, newValue);
});
</script>
