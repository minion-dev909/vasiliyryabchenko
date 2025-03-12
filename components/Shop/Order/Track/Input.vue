<template>
  <div class="flex flex-col gap-1 justify-start">
    <div class="flex flex-row justify-center">
      <input
        v-if="!isCorrect"
        v-for="index in Array.from({ length: inputs }, (_, i) => i)"
        :key="index"
        class="w-10 h-10 uppercase bg-white transition-all text-center text-lg border first:border-l border-l-0 focus:ring-0 focus:outline-0"
        :class="{ 'shake error-border': isError }"
        type="text"
        maxlength="1"
        :ref="setInputRef"
        @input="handleInput(index, $event)"
        @keydown.backspace="handleBackspace(index, $event)"
        @paste="handlePaste"
      />
    </div>
    <div v-if="isCorrect" class="checkmark-container">
      <svg
        class="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path
          class="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      <Icon
        class="absolute"
        name="icon-park-solid:success"
        size="1.5em"
        color="white"
      />
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const inputs = 6;
const otp = ref(Array(inputs).fill(""));
const enteredOtp = ref("");
const inputRefs = ref([]);
const isError = ref(false);
const isCorrect = ref(false);

const { apiBase, apiToken, locale } = useRuntimeData();

const setInputRef = (el) => {
  if (el) {
    inputRefs.value.push(el);
  }
};

const focusInput = (index) => {
  if (index >= 0 && index < inputs) {
    inputRefs.value[index].focus();
  }
};

const handleInput = (index, event) => {
  // Разрешаем ввод только букв и цифр, преобразуем в верхний регистр
  let value = event.target.value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 1);
  otp.value[index] = value;
  event.target.value = value;

  // Обновляем enteredOtp после каждого изменения
  enteredOtp.value = otp.value.join("");

  // Перемещаем фокус только если текущий инпут заполнен и следующий пуст
  if (value && index < inputs - 1 && !otp.value[index + 1]) {
    focusInput(index + 1);
  } else if (!value && index > 0) {
    // Если значение текущего инпута удалено, фокусируемся на предыдущем
    focusInput(index - 1);
  }
};

watch(enteredOtp, (newOtp) => {
  if (newOtp.length === inputs) {
    console.log(newOtp);
    const filter = encodeURIComponent(JSON.stringify({ ID: newOtp }));
    const requestURL = `${apiBase}/content/items/Orders?locale=${locale.value}&filter=${filter}&populate=2`;
    fetch(requestURL, {
      method: "GET",
      headers: {
        "api-key": apiToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Предположим, что API возвращает некоторый объект, если OTP верный, и пустой ответ или ошибку, если нет
        if (data && Object.keys(data).length > 0) {
          isCorrect.value = true;
          setTimeout(() => {
            cartStore.track(newOtp);
          }, 1000);
        } else {
          throw new Error("OTP is incorrect");
        }
      })
      .catch((error) => {
        console.error(error.message);
        otp.value = Array(inputs).fill("");
        inputRefs.value.forEach((input) => (input.value = ""));
        isError.value = true;
        focusInput(0);
        setTimeout(() => {
          isError.value = false;
          isCorrect.value = false;
        }, 1000);
      });
  }
});

const handleBackspace = (index, event) => {
  setTimeout(() => {
    if (!otp.value[index] && index > 0) {
      focusInput(index - 1);
      otp.value[index - 1] = "";
    }
  }, 0);
};

const handlePaste = (event) => {
  const paste = event.clipboardData
    .getData("text")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, inputs);

  let indexToFocus = -1;
  paste.split("").forEach((char, idx) => {
    if (!otp.value[idx]) {
      // Вставляем только если инпут пуст
      otp.value[idx] = char;
      if (inputRefs.value[idx]) {
        inputRefs.value[idx].value = char;
        indexToFocus = idx;
      }
    }
  });
  focusInput(indexToFocus); // Фокус на последний измененный инпут
};
onMounted(() => {
  focusInput(0);
});
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="text"] {
  -moz-appearance: textfield;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.error-border {
  border-color: red;
}

.checkmark-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.checkmark {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #4bb543;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #4bb543;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #4bb543;
  }
}
</style>
