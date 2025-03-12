<template>
  <div>
    <NuxtLayout
      name="page-grid"
      class="lg:pt-3 last:[&>div>div]:border-b-0"
      v-if="data"
    >
      <NuxtLayout
        name="single-page-section"
        class="first:[&>div]:pt-5 lg:first:[&>div]:pt-0 last:[&>div>div]:px-0 first:[&>div]:order-last lg:first:[&>div]:order-first"
      >
        <template #sidecontent>
          <BackToLink
            class="text-gray-500 pb-5"
            :label="$t(`All ${model}`)"
            :prefix="prefix"
          ></BackToLink>
          <SinglePageTitle :Label="data.Title" />
          <NuxtLayout name="single-page-information">
            <slot name="information" />
          </NuxtLayout>
        </template>
        <template #content>
          <SinglePageMedia
            v-if="data.Media && data.Media.length > 0"
            :type="data.Media[0].data ? 'Captioned' : 'Simple'"
            :slides="data.Media"
            :query="data"
            :videoControls="false"
          ></SinglePageMedia>
          <SinglePageDetailsDescription
            v-if="!data.Media && !data.Media?.length > 0 && data.Description"
            :data="data.Description"
          />
        </template>
      </NuxtLayout>
      <NuxtLayout
        name="single-page-section"
        v-if="
          data.Media &&
          data.Media?.length > 0 &&
          (data.Details || data.Description)
        "
        class="pb-6"
      >
        <template #sidecontent>
          <SinglePageSectionTitle Label="Details" />
        </template>
        <template #content>
          <SinglePageDetailsDescription
            v-if="data.Description"
            :data="data.Description"
          />
          <ArtworkDetails v-if="data.Details" :data="data"></ArtworkDetails>
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
});

const emit = defineEmits(['valueChanged']);

function sendValueToParent(newValue) {
  emit('valueChanged', newValue);
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
  sendValueToParent(data.value)
  console.log(data.value);
}
</script>
