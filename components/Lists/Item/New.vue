<template>
  <IntersectionObserver
    v-if="data"
    class="group [&>div]:cursor-pointer transition-all flex flex-col gap-5 relative py-5"
  >
    <NuxtLinkLocale
      :to="data.Slug && data._state == 1 ? `/news/${data.Slug}` : null"
      class="h-fit flex flex-row justify-start text-md md:text-base font-medium gap-6"
    >
      <div
        v-if="data.Cover && data.Cover.thumbnail"
        class="hidden sm:flex md:hidden lg:flex justify-start items-start"
      >
        <Image
          loading="lazy"
          classes="min-w-[10em] xl:min-w-[12em] max-w-[10em] xl:max-w-[12em] object-contain"
          :src="data.Cover.thumbnail"
          :alt="data.Title"
        />
      </div>
      <div>
        <div class="text-gray-500 mb-2">
          {{ $t(data.Information.Type) }}
        </div>
        <div
        :class="
            data.Slug && data._state == 1
              ? `before:content-['•'] group-hover:before:mr-4 before:mr-[-0.5em] group-hover:before:opacity-100 before:opacity-0`
              : null
          "
          class="before:transition-all before:text-sm before:text-gray-500 text-lg md:text-xl"
        >
          {{ data.Title }}
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
//   if (props.data && props.data.Cover) {
//     const imageId = props.data.Cover._id;
//     // Убедитесь, что generateThumbnail правильно обрабатывает асинхронный результат
//     // Если generateThumbnail - асинхронная функция, вам нужно будет использовать await
//     await generateThumbnail(props.data.Cover, imageId, "bestFit", 400);
//   }
// });
</script>
