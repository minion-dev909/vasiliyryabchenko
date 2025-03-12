<template>
  <div
    v-show="view"
    class="flex flex-row items-center gap-1 hover:[&>div]:text-black hover:[&>div]:cursor-pointer [&>div.active]:text-gray-600 lg:[&>div.active]:text-black [&>div]:text-gray-300 lg:[&>div]:text-gray-500"
  >
    <div
      :class="view === 'Slide' ? 'active' : ''"
      @click="setView('Slide')"
    >
      <div class="hidden lg:block">{{ $t("Slide") }}</div>
      <div class="hidden sm:block lg:hidden">
        <Icon
          class="transition-all cursor-pointer m-0 p-0 hover:scale-105 hover:text-gray-600"
          name="material-symbols-light:transition-slide-sharp"
          size="1.8em"
        />
      </div>
    </div>
    <span class="hidden lg:block">|</span>
    <div :class="view === 'Grid' ? 'active' : ''" @click="setView('Grid')">
      <div class="hidden lg:block">{{ $t("Grid") }}</div>
      <div class="hidden sm:block lg:hidden">
        <Icon
          class="transition-all cursor-pointer hover:scale-105 hover:text-gray-600"
          name="material-symbols-light:grid-view"
          size="1.8em"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps ({
    view: String,
    setView: Function
})
console.log("viewswitcher");
console.log(props);
</script>