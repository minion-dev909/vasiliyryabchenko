<template>
  <IntersectionObserver>
    <div class="footer bg-white h-[calc(100vh-2.8em)] w-full lg:pb-0">
      <NuxtLayout name="section-footer">
        <template #sidecontent>
          <div
            class="lg:px-8 lg:pb-6 lg:flex flex-row gap-5 justify-center items-left [&>div>a]:uppercase [&>div>a]:transition-all [&>div>a]:text-gray-500 hover:[&>div>a]:text-gray-900"
          >
            <div class="text-md text-white font-medium">
              Copyright 2023, {{ $t("Sitename") }}
              <div class="block xl:hidden text-center lg:text-left">
                Made by
                <NuxtLink
                  to="https://sergius.art"
                  target="_blank"
                  class="underline text-white font-bold"
                  >SERGIUS</NuxtLink
                >
                x
                <NuxtLink
                  to="https://awegust.art"
                  target="_blank"
                  class="underline text-white font-bold"
                  >AWEGUST</NuxtLink
                >
              </div>
            </div>
          </div>
        </template>
        <template #content>
          <div class="flex flex-col justify-between h-full gap-10">
            <div class="grid grid-cols-2 md:grid-cols-3 py-6 gap-12 lg:gap-20">
              <div
                v-for="(menu, index) in menus"
                :key="index"
                class="flex flex-col gap-5 lg:text-lg"
              >
                <template v-for="(item, itemKey) in menu" :key="itemKey">
                  <NuxtLinkLocale
                    :to="item.url"
                    class="font-medium uppercase"
                    >{{ $t(item.label) }}</NuxtLinkLocale
                  >
                  <div
                    v-if="item.subnav && item.subnav.length > 0"
                    class="flex flex-col gap-1 [&>a]:text-gray-500 hover:[&>a]:text-gray-800"
                  >
                    <NuxtLinkLocale
                      v-for="(subitem, subitemKey) in item.subnav"
                      :key="subitemKey"
                      :to="subitem.url"
                      >{{ $t(subitem.label) }}</NuxtLinkLocale
                    >
                  </div>
                </template>
              </div>
            </div>
            <div class="grid grid-cols-2 xl:grid-cols-3 py-6 gap-12 lg:gap-20">
              <div class="hidden xl:block">
                Made by
                <NuxtLink
                  to="https://sergius.art"
                  target="_blank"
                  class="text-gray-500 hover:text-gray-800 font-bold"
                  >SERGIUS</NuxtLink
                >
                x
                <NuxtLink
                  to="https://awegust.art"
                  target="_blank"
                  class="text-gray-500 hover:text-gray-800 font-bold"
                  >AWEGUST</NuxtLink
                >
              </div>
              <LangSwitcher
                class="opacity-50 hover:opacity-100 cursor-pointer"
              />
              <div
                class="flex w-auto flex-row gap-4 justify-between items-center [&>a]:transition-all [&>a]:fill-gray-400 hover:[&>a]:fill-gray-800"
              >
                <SubscribeInput class="hidden sm:block" />
                <div
                  class="hidden md:flex flex-row gap-2 items-center [&>a]:transition-all [&>a]:text-gray-500 hover:[&>a]:text-gray-800"
                >
                  <SocialNetworks />
                </div>
              </div>
            </div>
          </div>
        </template>
      </NuxtLayout>
    </div>
  </IntersectionObserver>
</template>
<script setup>
const menus = ref([
  [
    {
      label: "About",
      url: "/about",
      subnav: [
        {
          label: "Introduction",
          url: "/about#introduction",
        },
        {
          label: "Biography",
          url: "/about#biography",
        },
        {
          label: "Photos",
          url: "/about#photos",
        },
      ],
    },
  ],
  [
    {
      label: "Artwork",
      url: "/artwork",
      subnav: [
        {
          label: "Painting",
          url: `/artwork?filters=[{"query":"%26filters[Type]=1","label":"Painting"}]`,
        },
        {
          label: "Collage",
          url: `/artwork?filters=[{"query":"%26filters[Type]=3","label":"Collage"}]`,
        },
        {
          label: "Installations",
          url: `/artwork?filters=[{"query":"%26filters[Type]=4","label":"Installations"}]`,
        },
        {
          label: "Graphics",
          url: `/artwork?filters=[{"query":"%26filters[Type]=2","label":"Graphics"}]`,
        },
      ],
    },
  ],
  [
    {
      label: "Exhibitions",
      url: "/exhibitions",
      subnav: [],
    },
  ],
  [
    {
      label: "Library",
      url: "/library",
      subnav: [
        {
          label: "Publications",
          url: "/library/publications",
        },
        {
          label: "Interviews",
          url: "/library/texts",
        },
        {
          label: "Texts",
          url: "/library/texts",
        },
      ],
    },
  ],
  [
    {
      label: "Projects",
      url: "/projects",
      subnav: [
        {
          label: "Architecture & Design",
          url: `/projects?filters=[{"query":"%26filters[Category][$containsi]=Architecture+%26+Design","label":"Architecture+%26+Design"}]`,
        },
        {
          label: "NFT",
          url: `/projects?filters=[{"query":"%26filters[Category][$containsi]=NFT","label":"NFT"}]`,
        },
      ],
    },
  ],
  [
    {
      label: "Contacts",
      url: "/contacts",
      subnav: [],
    },
    {
      label: "Shop",
      url: "/shop",
      subnav: [],
    },
    {
      label: "Terms and Conditions",
      url: "/terms-and-conditions",
      subnav: [],
    },
  ],
]);
</script>
