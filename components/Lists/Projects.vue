<template>
  <div v-if="query" :class="!filtersBar ? 'px-4 md:px-8' : 'px-4 md:px-0 md:pr-8'">
    <div class="flex flex-col [&>div>div]:duration-500 [&>div]:scroll-mt-[5em]">
    <NuxtLinkLocale
      :to="query.translations[0].Slug ? `/projects/${query.translations[0].Slug}` : null"
      class="h-fit flex flex-col sm:flex-row justify-start text-md md:text-base font-medium gap-6"
    >
      <div>
        <div class="text-gray-500 mb-2">
          {{ query.translations[0].Category }}
        </div>
        <div
          class="before:transition-all before:text-sm before:text-gray-500 text-xl sm:text-lg md:text-xl"
        >
          {{ query.translations[0].Title }}
        </div>
        <div class="flex flex-col gap-2 mt-3">
          <div class="text-gray-500">
            {{ $t("Year") }}: <span>{{ query.translations[0].Year }}</span>
          </div>
          <div class="text-gray-500" v-if="query.translations[0].Type">
            {{ $t("Type") }}: <span>{{ query.translations[0].Type }}</span>
          </div>
          <div class="text-gray-500" v-if="query.translations[0].WorkMode">
            {{ $t("Work Mode") }}: <span>{{ query.translations[0].WorkMode }}</span>
          </div>
          <div class="text-gray-500" v-if="query.translations[0].Status">
            {{ $t("Status") }}: <span>{{ query.translations[0].Status }}</span>
          </div>
        </div>
      </div>
    </NuxtLinkLocale>
    </div>
  </div>
</template>
<!-- <template>
  <div v-if="query" :class="!filtersBar ? 'px-4 md:px-8' : 'px-4 md:px-0 md:pr-8'">
    <div class="flex flex-col [&>div>div]:duration-500 [&>div]:scroll-mt-[5em]">
      <ListsItemProject
        v-if="query && queryAmount > 0"
        v-for="(item, index) in query"
        :key="index"
        :data="item"
        :id="generateId(query, item)"
        class="last:border-b-0 border-b"
      />
    </div>
  </div>
</template> -->
<script setup>
// Получаем свойства компонента
const props = defineProps({
  query: Object,
  queryAmount: Number,
  filtersBar: Boolean,
});
console.log("listprojects");
console.log(props.query);
// Для использования props в Composition API, преобразуем их в реактивные ссылки
const { query, queryAmount, filtersBar } = toRefs(props);

const { generateId } = useGenerateId();
</script>

