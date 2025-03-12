<template>
  <IntersectionObserver
    class="transition-all flex flex-col gap-7 relative py-5 last:border-b-0 border-b"
  >
    <div
      class="text before:transition-all relative text-lg font-medium transition-all overflow-hidden"
      :class="opened ? 'opened' : ''"
      ref="sectionRef"
      :style="{ height: sectionH }"
      v-html="query.Text"
    ></div>
    <div class="flex flex-row justify-between items-center">
      <div class="font-light" v-html="query.Sign"></div>
      <div
        class="font-light before:transition-all hover:before:opacity-100 before:opacity-0 before:content-['•'] before:mr-2 before:text-gray-500"
      >
        <button v-if="showToggleButton" @click="toggleSection">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </IntersectionObserver>
</template>

<script setup>
const props = defineProps({
  query: Object,
  opened: Boolean,
});

const emit = defineEmits(["open-text"]);
const sectionRef = ref(null);
const opened = ref(props.opened);
const sectionH = ref("0px"); // Инициализируем с начальным значением

const setSectionHeight = () => {
  nextTick(() => {
    console.log(sectionRef.value)
    if (!sectionRef.value) {
      sectionH.value = "0px";
      return;
    }
    const isContentOverflowing = sectionRef.value.scrollHeight > 12 * 20;
    sectionH.value = opened.value
      ? `${sectionRef.value.scrollHeight}px`
      : isContentOverflowing
      ? "12em"
      : `${sectionRef.value.scrollHeight}px`;
  });
};

const showToggleButton = computed(() => {
  return sectionRef.value && sectionRef.value.scrollHeight > 12 * 20;
});

const buttonText = computed(() => {
  return !opened.value ? "Read More" : "Hide"; // Используйте $t для интернационализации, если необходимо
});

const toggleSection = () => {
  opened.value = !opened.value;
  setSectionHeight();
};

watch(
  () => [props.query, opened.value],
  () => {
    setSectionHeight();
  },
  { deep: true }
);

onMounted(() => {
  setSectionHeight();
  window.addEventListener("resize", setSectionHeight);
});

// onUnmounted(() => {
//   window.removeEventListener("resize", setSectionHeight);
// });
</script>

<style scoped>
.text:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.text:before {
  background: linear-gradient(transparent 150px, white);
}
.text.opened:before {
  background: transparent;
}
</style>
