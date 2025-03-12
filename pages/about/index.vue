<template>
  <div>
    <NuxtLayout name="page-sidebar-page-about">
      <template #sidecontent v-if="currentFragment && dynamicComponent">
        <MenusAbout :active="currentFragment"></MenusAbout>
      </template>
      <template #content v-if="currentFragment && dynamicComponent">
        <transition name="fade" mode="out-in">
          <component :is="dynamicComponent" key="dynamicComponent" 
          :data="aboutData"
          />
        </transition>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { data: aboutData, error1 } = await useFetch("/api/about");
console.log("index");
console.log(aboutData);
const AboutIntroduction = resolveComponent("AboutIntroduction");
const AboutBiography = resolveComponent("AboutBiography");
const AboutPhotos = resolveComponent("AboutPhotos");

const dynamicComponent = shallowRef(null); // Инициализируем пустым
const route = useRoute();
const currentFragment = ref("");

// Функция для установки компонента на основе фрагмента
function setDynamicComponent(fragment) {
  switch (fragment) {
    case "biography":
      dynamicComponent.value = AboutBiography;
      break;
    case "photos":
      dynamicComponent.value = AboutPhotos;
      break;
    case "introduction":
    default:
      dynamicComponent.value = AboutIntroduction;
      break;
  }
}

onMounted(async () => {
  const hash = route.hash.replace("#", "") || "introduction";
  currentFragment.value = hash;
  await nextTick(); // Убедитесь, что DOM обновлен
  setDynamicComponent(currentFragment.value);
});

watch(() => route.hash, async (newHash) => {
  const hashValue = newHash.replace("#", "") || "introduction";
  // Затем устанавливаем динамический компонент на основе обновленного fragment
  currentFragment.value = hashValue;
  setDynamicComponent(hashValue);
  // Дожидаемся следующего "тика" Vue, чтобы убедиться, что DOM обновлен
  await nextTick();
});

</script>
