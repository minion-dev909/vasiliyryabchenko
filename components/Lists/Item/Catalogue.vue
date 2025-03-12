<template>
  <IntersectionObserver
    v-if="data"
    class="group [&>div]:cursor-pointer transition-all flex flex-col gap-5 relative py-5"
  >
    <NuxtLinkLocale
      :to="
        data.translations[0].Slug && data._state == 1
          ? `/library/publications/catalogues/${data.translations[0].Slug}`
          : null
      "
      class="h-fit flex flex-row justify-start text-md md:text-base font-medium gap-6"
    >
      <div
        v-if="data.thumbnail"
        class="hidden sm:flex justify-start items-start"
      >
        <Image
          loading="lazy"
          classes="min-w-[10em] xl:min-w-[12em] max-w-[10em] xl:max-w-[12em] object-contain"
          initClass="min-h-[10em]"
          :src="data.thumbnail"
          :alt="data.translations[0].Title"
        />
      </div>
      <div>
        <div class="text-gray-500 mb-2">
          {{ $t(data.translations[0].Type) }}
        </div>
        <div
        :class="
            data.translations[0].Slug && data._state == 1
              ? `before:content-['•'] group-hover:before:mr-4 before:mr-[-0.5em] group-hover:before:opacity-100 before:opacity-0`
              : null
          "
          class="before:transition-all before:text-sm before:text-gray-500 text-lg md:text-xl"
        >
          {{ data.translations[0].Title }}
        </div>
        <div class="flex flex-col gap-2 mt-3">
          <div class="text-gray-500" v-if="data.translations[0].Year">
            {{ $t("Year") }}: <span>{{ data.translations[0].Year }}</span>
          </div>
          <div class="text-gray-500" v-if="data.Author">
            {{ $t("Authors") }}: <span>{{ data.Author }}</span>
          </div>
          <div class="text-gray-500" v-if="data.translations[0].Publisher">
            {{ $t("Publisher") }}:
            <span>{{ data.translations[0].Publisher }}</span>
          </div>
          <div class="text-gray-500" v-if="data.translations[0].Languages">
            {{ $t("Languages") }}:
            <span>{{ data.translations[0].Languages }}</span>
          </div>
          <div class="text-gray-500" v-if="data.ISBN">
            {{ $t("ISBN") }}: <span>{{ data.translations[0].ISBN }}</span>
          </div>
          <div class="text-gray-500" v-if="page">
            {{ $t("Pages") }}: <span>{{ page }}</span>
          </div>
        </div>
      </div>
    </NuxtLinkLocale>
  </IntersectionObserver>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
  data: Object,
  page: String,
});

// const { generateThumbnail } = useThumbnailGeneration();

// onMounted(async () => {
//   // Проверяем, существует ли props.data и props.data.Cover перед тем, как пытаться использовать imageId
//   if (props.data) {
//     const imageId = props.data.id;
//     // Убедитесь, что generateThumbnail правильно обрабатывает асинхронный результат
//     // Если generateThumbnail - асинхронная функция, вам нужно будет использовать await
//     await generateThumbnail(props.data.Cover, imageId, "bestFit", 400);
//   }
// });
</script>
