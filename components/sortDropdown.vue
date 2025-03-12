<template>
  <div class="relative x-max">
    <button
      class="flex items-center justify-start px-3 w-full"
      @click="isOptionsExpanded = !isOptionsExpanded"
      @blur="isOptionsExpanded = false"
    >
      <span v-html="$t(selectedOption)"></span>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-4 w-4 ml-2 transform transition-transform duration-200 ease-in-out"
        :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <transition
      enter-active-class="transform transition duration-500 ease-custom"
      enter-class="opacity-0"
      enter-to-class=" opacity-100"
      leave-active-class="transform transition duration-300 ease-custom"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-show="isOptionsExpanded"
        class="absolute left-0 w-max bottom-[2.3em] lg:bottom-auto right-0 pt-3 bg-white divide-y overflow-hidden"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          :class="
            option.title === selectedOption ? 'bg-gray-100' : 'hover:bg-gray-100'
          "
          class="px-3 py-2 w-full transition-colors duration-300"
          @mousedown.prevent="setOption(option.title, option.query)"
          v-text="$t(option.title)"
        ></li>
      </ul>
    </transition>
  </div>
</template>
<script setup>
const { t } = useI18n();
const props = defineProps({
  sort: String,
});
const emit = defineEmits(['sort']);
const isOptionsExpanded = ref(false);
const selectedOption = ref("Newest");
const options = ref([
  { title: "Newest", query: JSON.stringify({"Year":-1}) },
  { title: "Oldest", query: JSON.stringify({"Year":1}) },
  { title: "Alphabet: A-Z", query: JSON.stringify({"Title":1}) },
  { title: "Alphabet: Z-A", query: JSON.stringify({"Title":-1}) },
]);
const setOption = (option, query) => {
  selectedOption.value = option;
  isOptionsExpanded.value = false;
  emit("sort", query);
};
</script>

<style>
.ease-custom {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
