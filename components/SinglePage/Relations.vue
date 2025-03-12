<template>
  <NuxtLayout
    name="single-page-section"
    v-if="data.Exhibitions && data.Exhibitions.length > 0"
  >
    <template #sidecontent>
      <SinglePageSectionTitle Label="Exhibitions" />
    </template>
    <template #content>
      <SinglePageExhibitions
        v-if="data.Exhibitions && data.Exhibitions.length > 0"
        :data="data.Exhibitions"
      ></SinglePageExhibitions>
    </template>
  </NuxtLayout>
  <NuxtLayout
    name="single-page-section"
    v-if="data.Catalogues && data.Catalogues.length > 0"
  >
    <template #sidecontent>
      <SinglePageSectionTitle Label="Catalogues" />
    </template>
    <template #content>
      <SinglePageCatalogues
        v-if="data.Catalogues.length > 0"
        :data="data.Catalogues"
      />
    </template>
  </NuxtLayout>
  <NuxtLayout
    name="single-page-section"
    v-if="data.Articles && data.Articles.length > 0"
  >
    <template #sidecontent>
      <SinglePageSectionTitle Label="Articles" />
    </template>
    <template #content>
      <SinglePageArticles
        v-if="data.Articles && data.Articles.length > 0"
        :data="data.Articles"
      />
    </template>
  </NuxtLayout>
  <NuxtLayout
    name="single-page-section"
    v-if="data.Projects && data.Projects.length > 0"
  >
    <template #sidecontent>
      <SinglePageSectionTitle Label="Projects" />
    </template>
    <template #content>
      <SinglePageProjects
        v-if="data.Projects.length > 0"
        :data="data.Projects"
      />
    </template>
  </NuxtLayout>
  <NuxtLayout
    name="single-page-section"
    v-if="data.Interviews && data.Interviews.length > 0"
  >
    <template #sidecontent>
      <SinglePageSectionTitle Label="Interviews" />
    </template>
    <template #content>
      <SinglePageInterviews
        v-if="data.Interviews.length > 0"
        :data="data.Interviews"
      />
    </template>
  </NuxtLayout>
  <NuxtLayout
    name="single-page-section"
    v-if="data.Texts && data.Texts.length > 0"
  >
    <template #sidecontent>
      <SinglePageSectionTitle Label="Texts" />
    </template>
    <template #content>
      <SinglePageTexts v-if="data.Texts.length > 0" :data="data.Texts" />
    </template>
  </NuxtLayout>
  <NuxtLayout
    name="single-page-section-full"
    class="border-b"
    v-if="data.Products && data.Products.length > 0"
  >
    <template #header>
      <div class="w-full flex flex-row items-center justify-between">
        <SinglePageSectionTitle Label="Products" />
        <div>
          <NuxtLinkLocale
            to="/shop"
            class="text-gray-400 hover:text-black transition-all"
            >{{ $t("All Products") }}</NuxtLinkLocale
          >
        </div>
      </div>
    </template>
    <template #content>
      <GeneralRelatedProducts :products="data.Products" />
    </template>
  </NuxtLayout>
  <NuxtLayout
    name="single-page-section-full"
    v-if="data.Artwork && data.Artwork.length > 0"
  >
    <template #header>
      <div class="w-full flex flex-row items-center justify-between">
        <SinglePageSectionTitle Label="Related Artworks" />
        <div>
          <NuxtLinkLocale
            to="/artwork"
            class="text-gray-400 hover:text-black transition-all"
            >{{ $t("All Artworks") }}</NuxtLinkLocale
          >
        </div>
      </div>
    </template>
    <template #content>
      <GeneralRelatedArtworks :data="data.Artwork" prefix="artwork" />
    </template>
  </NuxtLayout>
</template>

<script setup>
const { apiBase, apiToken, locale } = useRuntimeData();
const props = defineProps({
  data: Object,
  model: String,
});
console.log("relations");
console.log(props.data);
const modelsToCheck = [
  "Exhibitions",
  "Projects",
  "Catalogues",
  "Articles",
  "Interviews",
  "Texts",
  "Products",
  "Artwork",
];

onMounted(async () => {
  // Проверяем каждую модель на наличие данных и делаем запрос при необходимости
  for (const modelName of modelsToCheck) {
    if (
      props.data &&
      (!props.data[modelName] || props.data[modelName].length === 0)
    ) {
      await checkAndFetchDataForModel(props.model, modelName, props.data._id);
    }
  }
});

// Функция для проверки и запроса данных для конкретной модели
async function checkAndFetchDataForModel(searchName, modelName, itemId) {
  if (modelName === searchName && modelName && modelName !== "Artwork") {
    return;
  }

  let requestURL;
  if (modelName === "Artwork" && searchName === "Artwork" && props.data.Tags) {
    const tagsArray = props.data.Tags.split(",").map((tag) => tag.trim()); // Преобразуем строку тегов в массив
    const filter = JSON.stringify({
      Tags: { $regex: tagsArray.join("|"), $options: "i" }, // Используем оператор $regex для поиска совпадений с любым из тегов
      _id: { $ne: itemId },
    });
    const encodedFilter = encodeURIComponent(filter);
    requestURL = `${apiBase}/content/items/${modelName}?locale=${locale.value}&filter=${encodedFilter}&populate=1`;
  } else {
    const filter = JSON.stringify({
      [`${searchName}._id`]: { $regex: itemId },
      _id: { $ne: itemId },
    });
    const encodedFilter = encodeURIComponent(filter);
    requestURL = `${apiBase}/content/items/${modelName}?locale=${locale.value}&filter=${encodedFilter}&populate=1`;
  }

  const response = await fetch(requestURL, {
    headers: {
      "api-key": apiToken,
    },
  });

  const responseData = await response.json();

  if (responseData && responseData.length > 0) {
    if (modelName === "Catalogues") {
      props.data[modelName] = { Catalogue: responseData, Page: null };
    } else {
      props.data[modelName] = responseData;
    }
  }
}
</script>
