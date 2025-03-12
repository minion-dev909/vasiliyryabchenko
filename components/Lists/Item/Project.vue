<template>
  <IntersectionObserver
    v-if="data"
    class="group [&>div]:cursor-pointer transition-all flex flex-col gap-5 relative py-5"
  >
    <NuxtLinkLocale
      :to="data.Slug ? `/projects/${data.Slug}` : null"
      class="h-fit flex flex-col sm:flex-row justify-start text-md md:text-base font-medium gap-6"
    >
      <div
        v-if="data.Cover && data.Cover.thumbnail"
        class="flex justify-start items-start"
      >
        <Image
          loading="lazy"
          :classes="`w-full sm:min-w-[15em] lg:min-w-[18em] xl:min-w-[25em] sm:max-w-[15em] lg:max-w-[18em] xl:max-w-[25em] object-contain`"
          :src="data.Cover.thumbnail"
          :alt="data.Title"
        />
      </div>
      <div>
        <div class="text-gray-500 mb-2">
          {{ data.Category }}
        </div>
        <div
        :class="
            data.Slug && data._state == 1
              ? `before:content-['•'] group-hover:before:mr-4 before:mr-[-0.5em] group-hover:before:opacity-100 before:opacity-0`
              : null
          "
          class="before:transition-all before:text-sm before:text-gray-500 text-xl sm:text-lg md:text-xl"
        >
          {{ data.Title }}
        </div>
        <div class="flex flex-col gap-2 mt-3">
          <div class="text-gray-500">
            {{ $t("Year") }}: <span>{{ data.Year }}</span>
          </div>
          <div class="text-gray-500" v-if="data.Type">
            {{ $t("Type") }}: <span>{{ data.Type }}</span>
          </div>
          <div class="text-gray-500" v-if="data.WorkMode">
            {{ $t("Work Mode") }}: <span>{{ data.WorkMode }}</span>
          </div>
          <div class="text-gray-500" v-if="data.Status">
            {{ $t("Status") }}: <span>{{ data.Status }}</span>
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
  thumbs: Boolean
});
console.log("//\\")
console.log(props.data);
console.log(props.thumbs);
</script>
