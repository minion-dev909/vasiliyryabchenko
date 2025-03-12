<template>
  <div>
    <NuxtLayout
      name="page-grid"
      class="lg:pt-3 last:[&>div>div]:border-b-0 pb-10"
      v-if="data"
    >
      <NuxtLayout
        name="single-page-section"
        class="first:[&>div]:pt-5 lg:first:[&>div]:pt-0 last:[&>div>div]:px-0"
      >
        <template #sidecontent>
          <BackToLink
            class="text-gray-500 pb-5"
            :label="$t(`All ${model}`)"
            :prefix="prefix"
          ></BackToLink>
          <NuxtLayout name="single-page-information">
            <slot name="information" />
          </NuxtLayout>
        </template>
        <template #content>
          <SinglePageTitle :Label="data.Title" class="text-justify pb-8" />
          <component :is="component" :data="data" />
        </template>
      </NuxtLayout>
      <SinglePageRelations :data="data" :model="model"/>
    </NuxtLayout>
  </div>
</template>

<script setup>
const { apiBase, apiToken, locale } = useRuntimeData();
const props = defineProps({
  prefix: String,
  slug: String,
  model: String,
  component: Object,
});

const emit = defineEmits(["valueChanged"]);

function sendValueToParent(newValue) {
  emit("valueChanged", newValue);
}

const data = ref(null);

onMounted(async () => {
  await fetchData();
  document.body.classList.remove("overflow-hidden");
});

async function fetchData() {
  const filter = JSON.stringify({ Slug: props.slug });
  const modifiedFilter = filter.replace(/"/g, "'");
  const filterRequest = `&filter=${encodeURIComponent(modifiedFilter)}`;
  const requestURL = `${apiBase}/content/item/${props.model}?locale=${locale.value}&${filterRequest}&populate=1`;

  // Запрашиваем основные данные
  const { data: responseData, execute } = useFetch(requestURL, {
    headers: {
      "api-key": apiToken,
    },
    lazy: true,
  });
  await execute();
  data.value = responseData.value;
  sendValueToParent(data.value);
}
</script>
