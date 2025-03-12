<template>
  <IntersectionObserver
    v-if="data"
    class="group [&>div]:cursor-pointer transition-all flex flex-col gap-5 relative py-5"
  >
    <NuxtLinkLocale
      :to="
        data.Slug && data._state == 1
          ? `/library/interviews/${data.Slug}`
          : null
      "
      class="text-md md:text-base font-medium"
    >
      <div class="text-gray-500 mb-2">
        {{ $t(data.Type) }}
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
      <div class="flex flex-col gap-2 mt-3">
        <div class="text-gray-500" v-if="data.Year">
          {{ $t("Year") }}: <span>{{ data.Year }}</span>
        </div>
        <div class="text-gray-500" v-if="data.Interviewer">
          {{ $t("Interviewer") }}:
          <span>{{ data.Interviewer }}</span>
        </div>
      </div>
    </NuxtLinkLocale>
  </IntersectionObserver>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
  data: Object,
});
</script>
