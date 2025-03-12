<template>
  <NuxtLayout name="screen">
    <div
      class="p-4 md:p-8 flex justify-center flex-col items-center w-full h-full"
    >
      <div class="flex flex-col gap-3 justify-center items-center">
        <h1 class="text-3xl font-bold text-green-500">{{ $t("Completed") }}</h1>
        <h2 class="text-2xl text-gray-500">
          {{ $t("Thank you for the order!") }}
        </h2>
        <NuxtLinkLocale :to="orderUrl">
          <qrcode-vue
            render-as="svg"
            :value="orderUrl"
            level="L"
            :size="150"
            class="my-6"
          ></qrcode-vue>
        </NuxtLinkLocale>
        <p class="text-gray-500">Your order number:</p>
        <div
          :class="{
            'border-green-300 scale-105': isCopied && copyAnimation,
            'border-red-300 scale-105': !isCopied && copyAnimation,
          }"
          class="text-2xl font-bold py-2 px-4 transition-all border-2 flex flex-row justify-center items-center gap-2"
        >
          <div>{{ orderId }}</div>
          <div>
            <button @click="copyorderId">
              <Icon
                class="hover:scale-110 transition-all pb-1"
                :name="isCopied ? 'tabler:copy-check' : 'tabler:copy'"
                size="1.2em"
              />
            </button>
          </div>
        </div>
        <div class="flex flex-row justify-center items-center gap-2 pt-10">
          <ShopOrderSuccessButtonTrack :orderId="orderId" />
          <ShopOrderSuccessButtonConfirm />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { gsap } from "gsap";
import QrcodeVue from "qrcode.vue";

const props = defineProps({
  orderId: String
});
const { t } = useRuntimeData();

const orderUrl = computed(() => {
  return `${window.location.origin}/shop?order=${props.orderId}`;
});

const Confetti = () => {
  var amount = 120,
    between = (min, max) => min + Math.random() * (max - min),
    colors = ["#275EFE", "#5C86FF", "#362A89", "#6D58FF", "#F04949", "#16BF78"],
    current = 0;

  let interval = setInterval(() => {
    if (current < amount) {
      animate(createConfetti());
    }
  }, 50);

  setTimeout(() => clearInterval(interval), 4000);

  function createConfetti() {
    let div = document.createElement("div");
    gsap.set(div, {
      attr: {
        class: "confetti",
        style: "--color: " + colors[Math.floor(Math.random() * colors.length)],
      },
      x: between(0, window.innerWidth),
      y: -window.innerHeight / 4,
      z: between(-80, 80),
    });
    current++;
    document.body.appendChild(div);
    return div;
  }

  function animate(element) {
    gsap.to(element, {
      y: window.innerHeight + 40,
      ease: "power1.out",
      delay: between(0, 0.25),
      duration: between(2, 5),
      onComplete() {
        if (element instanceof Element || element instanceof HTMLDocument) {
          current--;
          element.remove();
        }
      },
    });
    gsap.to(element, {
      rotationZ: between(90, 180),
      repeat: -1,
      yoyo: true,
      duration: between(3, 6),
    });
    gsap.to(element, {
      rotationX: between(0, 360),
      rotationY: between(0, 360),
      repeat: -1,
      yoyo: true,
      duration: between(3, 6),
    });
  }
};

// Референс для отслеживания состояния копирования
const copyAnimation = ref(false);
const isCopied = ref(false);

const copyorderId = () => {
  navigator.clipboard
    .writeText(props.orderId)
    .then(() => {
      copyAnimation.value = true;
      isCopied.value = true;
      setTimeout(() => {
        copyAnimation.value = false;
      }, 200);
    })
    .catch((err) => {
      console.error("Ошибка при копировании: ", err);
      copyAnimation.value = true;
      isCopied.value = false;
      setTimeout(() => {
        copyAnimation.value = false;
      }, 200);
    });
};
const intervalConfetti = setInterval(Confetti, 7000);
onMounted(() => {
  document.body.classList.add("overflow-hidden");
  Confetti();
});

onUnmounted(() => {
  clearInterval(intervalConfetti);
  document.body.classList.remove("overflow-hidden");
});
</script>
