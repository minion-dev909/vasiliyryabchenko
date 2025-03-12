<template>
  <IntersectionObserver
    class="group [&>div]:cursor-pointer transition-all flex flex-col gap-5 relative py-5"
  >
    <NuxtLinkLocale
      :to="data.Slug && data._state == 1 ? `/exhibitions/${data.Slug}` : null"
      class="h-fit flex text-md md:text-base flex-col font-medium"
    >
      <div class="flex flex-row gap-3 mb-3 items-center">
        <div class="text-gray-500" v-if="data.information_type">
          {{ $t(data.information_type)}}
        </div>
        <div
          class="flex flex-row text-sm justify-start items-center gap-3 border px-2 py-1 rounded-lg"
          v-if="data.information_status && data.information_status !== 'Past'"
        >
          <TriviaStatus
            v-if="data.information_status === 'Active'"
            class="ml-1"
          ></TriviaStatus>
          <div
            class="text-md"
            :class="{
              'text-green-500': data.information_status === 'Active',
              'text-gray-500':
                data.information_status !== 'Active' &&
                data.information_status !== 'Upcoming',
              'text-violet-500': data.information_status === 'Upcoming',
            }"
          >
            {{ $t(data.information_status) }}
          </div>
        </div>
      </div>

      <div
        :class="
          data.Slug && data._state == 1
            ? `before:content-['•'] group-hover:before:mr-4 before:mr-2`
            : null
        "
        class="before:transition-all before:text-sm before:text-gray-500 text-lg md:text-xl"
      >
        {{ data.translations[0].title }}
      </div>
      <div class="text-gray-500 mt-3"></div>
      <div class="text-gray-500" v-if="data.translations[0].information_location">
        {{ data.translations[0].information_location }}
      </div>
      <div class="text-gray-500">
        <template
          v-if="data.Dates_start && data.Dates_end"
          >"adsf"</template
        >
        <template v-else>{{ data.information_year }}</template>
      </div>
    </NuxtLinkLocale>
  </IntersectionObserver>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
  data: Object,
});
console.log("item/exhibitions");
console.log(props.data);
const { getDates } = useDatesConverter();
</script>
