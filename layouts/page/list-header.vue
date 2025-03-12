<template>
  <div
    :class="!filtersBar ? 'px-4 lg:px-8' : 'px-4 lg:pr-8 lg:px-0 '"
    class="query-bar fixed lg:sticky w-full border-t lg:border-b lg:border-0 z-30 bottom-0 bg-white py-3 lg:top-11 left-0 flex transition-all flex-row justify-between right-0 font-medium text-gray-500"
  >
    <div class="flex gap-4 items-center flex-row w-3/12 lg:w-full">
      <transition name="fade">
        <slot v-if="queryAmount" name="left" />
      </transition>
      <FiltersList
        v-if="!filtersBar"
        class="hidden pb-0 lg:flex w-fit"
        :filters="filters"
        :removeFilterItem="removeFilterItem"
      ></FiltersList>
    </div>
    <div
      class="justify-end gap-6 flex-row items-center flex w-full"
    >
      <transition name="fadedelay">
        <slot v-if="queryAmount" name="rightAddition"></slot>
      </transition>
      <transition name="fadedelay">
        <SortDropdown
          v-if="queryAmount"
          :query="query"
          :sort="sort"
          @sort="handleSort"
        ></SortDropdown>
      </transition>
      <div>
        <transition name="fade">
          <span v-show="queryAmount">{{ queryAmount }}</span></transition
        >
        {{ $t("Results") }}
      </div>
      <div class="px-2 block lg:hidden" @click="toggleSearch()">
        <Icon
          class="transition-all cursor-pointer hover:scale-105 hover:text-gray-900 text-gray-500"
          name="la:search"
          size="1.5em"
        />
      </div>
    </div>
  </div>
  <div class="[&>div.active]:bottom-12 [&>div]:bottom-[-100%]">
    <div
      :class="searchShow ? 'active' : ''"
      class="transition-all duration-500 fixed lg:block py-3 px-4 w-full bg-white border-t z-20"
    >
      <input
        :value="searchRequest ? searchRequest : ''"
        :placeholder="$t('Search')"
        type="email"
        class="lg:text-lg w-full xl:w-1/2 lg:col-span-2 bg-transparent focus:ring-0 focus:outline-0"
        @input="searchQuery($event)"
      />
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  query: Object,
  filters: Array,
  sort: String,
  filtersBar: Boolean,
  queryAmount: Number,
  removeFilterItem: Function,
  searchRequest: String,
  searchQuery: Function,
});
const emit = defineEmits(["sort"]);

const handleSort = (query) => {
  emit("sort", query); // Поднимаем событие еще выше
};

// Реактивное состояние для управления видимостью поиска
const searchShow = ref(false);

// Методы
const handleResize = () => {
  searchShow.value = false;
};

const toggleSearch = () => {
  searchShow.value = !searchShow.value;
};

// Жизненный цикл компонента
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

// onUnmounted(() => {
//   window.removeEventListener("resize", handleResize);
// });
</script>
