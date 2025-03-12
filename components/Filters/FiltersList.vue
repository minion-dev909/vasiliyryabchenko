<template>
  <div
    class="w-full flex flex-wrap gap-2 h-fit transition-all text-md [&>div]:transition-all [&>div]:cursor-pointer hover:[&>div]:border-gray-600 [&>div]:text-gray-600 hover:[&>div]:text-gray-500"
  >
    <template v-for="(filter, index) in filters" :key="index">
      <transition name="fadedelay">
        <div
          @click="removeFilterItem(index)"
          class="border px-2 py-1 overflow-scroll max-w-full flex-none flex flex-row justify-center font-medium gap-2"
        >
          <span>×</span>
          <span v-text="filter.label"></span>
        </div>
      </transition>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({ filters: Array, removeFilterItem: Function });
</script>
