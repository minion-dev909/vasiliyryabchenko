<template>
  <div
    class="bg-white z-10 fixed md:relative transition-all duration-500"
    :class="
      filtersBar
        ? 'h-full md:h-auto opacity-100 top-0 py-20 md:py-0 w-full md:w-4/12 xl:w-3/12 px-4 md:pr-3 md:pl-8 lg:px-0 lg:pr-8 lg:pl-8'
        : 'w-full opacity-0 md:w-0 overflow-hidden'
    "
  >
    <div
      :class="!filtersBar ? 'left-[-100%]' : 'left-0'"
      class="navigation absolute top-0 transition-all mb-6 sticky lg:block overflow-y"
    >
      <transition name="fadedelay">
        <div
          v-show="filtersBar && queryAmount > 0"
          class="lg:flex flex-col w-full h-full group justify-center"
        >
          <FiltersList
          :class="filters && filters.length > 0 ? 'pb-8' : 'h-0'"
            :filters="filters"
            :removeFilterItem="removeFilterItem"
          ></FiltersList>
          <div class="transition-all">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  filtersBar: Boolean,
  queryAmount: Number,
  filters: Array,
  removeFilterItem: Function,
});
</script>
