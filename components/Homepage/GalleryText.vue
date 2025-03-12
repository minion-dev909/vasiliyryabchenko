<template>
  <NuxtLinkLocale
    :to="data.Link"
    class="text-section text-center md:text-left group w-full px-8 sm:px-12 md:px-0 lg:px-20 xl:px-0 md:w-4/12 lg:w-auto absolute md:static lg:absolute xl:static z-99 top-0 left-0 h-full justify-end xl:justify-center py-10 lg:py-20 flex flex-col gap-2 lg:gap-4"
  >
    <div
      v-if="data.Label"
      data-swiper-parallax="100"
      data-swiper-parallax-opacity="0"
      class="lg:text-sm xl:text-sm flex flex-row gap-4 items-center justify-center md:justify-start lg:justify-start xl:justify-start w-full"
    >
      <TriviaStatus v-if="data.hasOnline"></TriviaStatus
      ><span class="text-white md:text-black lg:text-white xl:text-gray-800">{{ data.Label }}</span>
    </div>
    <h2
      v-if="data.Head"
      data-swiper-parallax="200"
      data-swiper-parallax-opacity="0"
      class="font-medium text-3xl lg:text-4xl text-white md:text-black lg:text-white xl:text-black"
    >
      {{ data.Head }}
    </h2>
    <div
      data-swiper-parallax="100"
      data-swiper-parallax-opacity="0"
      v-html="data.Description"
      class="lg:text-md font-medium xl:text-base text-white md:text-black lg:text-white xl:text-gray-500"
    ></div>
    <div
      class="group-hover:before:mr-4 before:transition-all before:content-['•'] before:text-sm before:mr-2 font-medium text-white md:text-black lg:text-white xl:text-black"
    >
      {{ ButtonText(data.Button) }}
    </div>
  </NuxtLinkLocale>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
  data: Object,
});

const ButtonText = (text) => {
  if (text !== null || "") {
    return text;
  } else {
    return `${t("Learn More")}`;
  }
};
</script>
