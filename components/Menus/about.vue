<template>
  <div v-if="active && menuItems"
    v-for="(item, index) in menuItems"
    :key="index"
    class="text-xl transition-all [&>div.active]:text-gray-900 [&>div]:text-gray-500 group-hover:[&>div]:text-gray-500 [&>div]:font-medium hover:[&>div]:!text-gray-900 [&>div]:transition-all cursor-pointer"
  >
   <div :class="item.active ? 'active' : ''">
      <NuxtLinkLocale :to="item.url">{{ $t(item.label) }}</NuxtLinkLocale>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  active: String
});

const menuItems = ref([
  {
    label: "Introduction",
    id: "introduction",
    url: "/about#introduction",
    active: false
  },
  {
    label: "Biography",
    id: "biography",
    url: "/about#biography",
    active: false
  },
  {
    label: "Photos",
    id: "photos",
    url: "/about#photos",
    active: false
  },
]);

watch(() => props.active, (newActive) => {
  // Обновляем активное состояние пунктов меню
  menuItems.value.forEach(item => {
    item.active = item.id === newActive;
  });
}, { immediate: true });

onMounted(() => {
  // Это вызовет watcher немедленно после монтирования компонента
  menuItems.value.forEach(item => {
    item.active = item.id === props.active;
  });
});
</script>
