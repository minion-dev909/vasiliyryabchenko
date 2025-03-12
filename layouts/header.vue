<template>
  <transition name="fade">
    <div
      class="transition-all header bg-white h-[4.5em] xl:h-[6em] w-full z-50 top-0 left-0 fixed"
    >
      <div
        class="grid grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 h-full w-full justify-between items-center"
      >
        <div
          class="col-span-3 sm:col-span-3 lg:col-span-1 px-4 md:px-8 lg:px-0 lg:pl-8 w-full font-medium z-30"
          id="site-name"
        >
          <div class="flex flex-row items-end">
            <NuxtLinkLocale class="text-2xl md:text-3xl" to="/">{{
              $t("Sitename")
            }}</NuxtLinkLocale>
          </div>
        </div>
        <div
          class="pt-2 col-span-1 lg:col-span-2 xl:col-span-3 pr-4 md:pr-8 flex flex-row justify-end lg:justify-between"
        >
          <div
            class="w-full pt-20 pb-5 lg:pb-0 lg:pt-0 top-0 left-0 fixed lg:static lg:flex bg-white h-full flex-col lg:flex-row justify-center lg:justify-between gap-10 xl:gap-16"
            :class="isMobActive ? 'flex' : 'hidden'"
          >
            <div
              class="flex flex-col lg:flex-row h-full gap-5 lg:items-center w-full lg:justify-between"
            >
              <div
                v-for="item in menuItems"
                :key="item.label"
                class="px-4 md:px-8 lg:px-0 pb-2 flex flex-row items-center gap-2 lg:pb-0 text-lg lg:text-base xl:text-lg font-medium transition-all hover:text-gray-500"
              >
                <NuxtLinkLocale :to="item.url">{{
                  $t(item.label)
                }}</NuxtLinkLocale>
                <ShopOrderCartItemsQuantity
                  :showOnNull="false"
                  v-if="item.label === 'Shop'"
                  class="bg-gray-200 border text-sm rounded-lg px-2"
                />
              </div>
            </div>
            <div
              v-if="isMobActive"
              class="lg:hidden flex flex-row gap-2 justify-between items-center px-4 md:px-8 lg:px-0"
            >
              <div
                class="flex flex-row gap-2 justify-center items-center [&>a]:transition-all [&>a]:text-gray-500 hover:[&>a]:text-gray-800"
              >
                <SocialNetworks />
              </div>
              <LangSwitcher class="lg:hidden"></LangSwitcher>
            </div>
          </div>
          <div
            class="relative flex items-end lg:hidden cursor-pointer select-none"
            @click="toggleMenu"
          >
            <div
              class="transition duration-400 font-medium text-lg"
              v-text="!isMobActive ? $t('Menu') : $t('Close')"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const isMobActive = ref(false);
const route = useRoute();

const toggleMenu = () => {
  isMobActive.value = !isMobActive.value;
};

const handleResize = () => {
  isMobActive.value = false;
};

const handleScroll = () => {
  const scrollPosition = window.scrollY || window.pageYOffset;

  if (scrollPosition > 0) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
};

watch(isMobActive, (newStatus) => {
  if (newStatus !== null) {
    newStatus
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }
});

watch(
  () => route.path,
  () => {
    isMobActive.value === true ? toggleMenu() : null;
  }
);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
});

// onUnmounted(() => {
//   window.removeEventListener("scroll", handleScroll);
//   window.removeEventListener("resize", handleResize);
// });

const menuItems = [
  { label: "About", url: "/about" },
  { label: "Artwork", url: "/artwork" },
  { label: "Exhibitions", url: "/exhibitions" },
  { label: "Projects", url: "/projects" },
  { label: "Library", url: "/library" },
  { label: "Contacts", url: "/contacts" },
  { label: "Shop", url: "/shop" },
];
</script>

<style>
.scrolled .header {
  height: 2.8em;
  border-bottom: 1px solid #f0f0f0;
}
</style>
