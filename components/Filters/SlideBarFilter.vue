<template>
  <div
    class="relative mt-6 lg:mt-8"
    v-if="filterQuery.data && sliderValue !== null && filterQuery.data.length > 1"
  >
    <input
      ref="sliderElement"
      type="range"
      :min="filterQuery.data[filterQuery.data.length - 1]"
      :max="filterQuery.data[0]"
      v-model="sliderValue"
      @input="handleSliderInput"
      @mouseup="handleSliderMouseUp"
    />
    <div class="flex flex-row justify-between items-center text-gray-500">
      <div>{{ filterQuery.data[filterQuery.data.length - 1] }}</div>
      <div>{{ filterQuery.data[0] }}</div>
    </div>
    <Transition name="fadedelay">
      <div
        v-show="thumbPosition !== null && thumbPosition !== -50"
        class="value-indicator"
        :style="{ left: thumbPosition + 'px' }"
        v-if="sliderValue !== null && filterQuery.data.length > 1"
      >
        <span v-text="sliderValue"></span>
      </div>
    </Transition>
  </div>
</template>

<script setup>

const props = defineProps({
  query: Object,
  filtersBar: Boolean,
  filterQuery: Object,
  isFilterActive: Function,
  addFilterItem: Function,
});

const emit = defineEmits(['input']);

const sliderElement = ref(null);
const sliderValue = ref(null);
const thumbPosition = ref(null);

watch(() => props.filterQuery.data, (newValue) => {
  sliderValue.value = newValue[0];
  thumbPosition.value = null;
  clearTimeout(resizeTimer.value);
  resizeTimer.value = setTimeout(updateThumbPosition, 1000);
});

watch(() => sliderValue.value, (newValue) => {
  updateThumbPosition();
});

const handleSliderInput = (event) => {
  const value = parseInt(event.target.value);
  const nearest = props.filterQuery.data.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );

  sliderValue.value = props.filterQuery.data.includes(value) ? value : nearest;
  updateThumbPosition();
  emit("input", sliderValue.value);
};

const handleSliderMouseUp = () => {
  scrollToYear(sliderValue.value);
};

const calculateThumbPosition = () => {
  if (sliderElement.value) {
    const min = parseInt(sliderElement.value.min, 10);
    const max = parseInt(sliderElement.value.max, 10);
    const thumbOffset =
      ((sliderValue.value - min) / (max - min)) * (sliderElement.value.offsetWidth - 50);
    thumbPosition.value = thumbOffset;
  }
};

const updateThumbPosition = () => {
  calculateThumbPosition();
};

const scrollToYear = (year) => {
  const element = document.getElementById(`y${year}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const handleResize = () => {
  thumbPosition.value = null;
  clearTimeout(resizeTimer.value);
  resizeTimer.value = setTimeout(updateThumbPosition, 1000);
};

const resizeTimer = ref(null);

const ChangeOnScroll = () => {
  const scrollPosition = window.scrollY + 100;
  for (let i = props.query.length - 1; i >= 0; i--) {
    const item = props.query[i];
    const element = document.getElementById(`y${item.Year}`);
    if (element && element.offsetTop <= scrollPosition) {
      sliderValue.value = parseInt(item.Year);
      break;
    }
  }
};
const handleScroll = () => {
  ChangeOnScroll();
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
});

// onBeforeUnmount(() => {
//   window.removeEventListener("scroll", handleScroll);
//   window.removeEventListener("resize", handleResize);
// });
</script>


<style>
input[type="range"] {
  border: 0;
  appearance: none;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #50555c;
  background: #ededed;
  border-radius: 0px;
  border: 0px solid #000000;
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000;
  height: 3px;
  width: 50px;
  border-radius: 0px;
  background: #000000;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: 0px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #ededed;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #50555c;
  background: #ededed;
  border-radius: 0px;
  border: 0px solid #000000;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000;
  height: 3px;
  width: 50px;
  border-radius: 0px;
  background: #000000;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #ededed;
  border: 0px solid #000000;
  border-radius: 30px;
  box-shadow: 0px 0px 0px #50555c;
}
input[type="range"]::-ms-fill-upper {
  background: #ededed;
  border: 0px solid #000000;
  border-radius: 30px;
  box-shadow: 0px 0px 0px #50555c;
}
input[type="range"]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000;
  height: 3px;
  width: 50px;
  border-radius: 0px;
  background: #000000;
  cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #ededed;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #ededed;
}

/* Добавьте стили для позиционирования индикатора значения */
.relative {
  position: relative;
}

.value-indicator {
  position: absolute;
  top: -20px; /* Регулируйте отступ над thumb'ом */
  width: 50px;
  text-align: center;
}
</style>
