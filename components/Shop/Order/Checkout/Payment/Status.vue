<template>
  <NuxtLayout name="screen" class="transition-all duration-1000 opacity-100" :class="status === 'payment_failed' ? '!opacity-0' : 'opacity-100'">
    <div
      class="p-4 md:p-8 flex flex-col justify-center items-center w-full h-full gap-3"
    >
      <div class="payment-loader">
        <div
          class="pad w-20 border-2 p-1.5 py-3"
          :class="{
            'border-black': status === 'processing',
            'border-red-800': status === 'payment_failed',
            'border-green-800': status === 'succeeded',
          }"
        >
          <div
            class="chip h-2 w-3 ml-1"
            :class="{
              'bg-black': status === 'processing',
              'bg-red-800': status === 'payment_failed',
              'bg-green-800': status === 'succeeded',
            }"
          ></div>
          <!-- Стили для line и line2 требуют собственного CSS -->
          <div
            :class="{
              'line bg-black opacity-0': status === 'processing',
              'bg-red-600': status === 'payment_failed',
              'bg-green-600': status === 'succeeded',
            }"
            class="line1 mt-1.5 w-[3rem] ml-1 h-1"
          ></div>
          <div
            :class="{
              'line bg-black opacity-0': status === 'processing',
              'bg-red-300': status === 'payment_failed',
              'bg-green-300': status === 'succeeded',
            }"
            class="line2 mt-1.5 w-[2rem] ml-1 h-1"
          ></div>
        </div>
      </div>
      <div
        class="loader-text font-bold text-center"
        :class="{
          'text-black': status === 'processing',
          'text-red-700': status === 'payment_failed',
          'text-green-800': status === 'succeeded',
        }"
      >
        {{ $t(status) }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  status: String,
});

const { t } = useRuntimeData();

onMounted(() => {
  console.log(props.status);
  document.body.classList.add("overflow-hidden");
});

onUnmounted(() => {
  document.body.classList.remove("overflow-hidden");
});
</script>

<style scoped>
.payment-loader .line.line1 {
  animation: writeline 3s infinite ease-in;
}

.payment-loader .line.line2 {
  animation: writeline2 3s infinite ease-in;
}

.payment-loader .line.line1 {
  animation-delay: 0s;
}

.payment-loader .line.line2 {
  animation-delay: 0.5s;
}

@keyframes writeline {
  0% {
    width: 0px;
    opacity: 0;
  }
  33% {
    width: 3rem; /* Соответствует ширине в Tailwind */
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes writeline2 {
  0% {
    width: 0px;
    opacity: 0;
  }
  33% {
    width: 2rem; /* Соответствует ширине в Tailwind */
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
