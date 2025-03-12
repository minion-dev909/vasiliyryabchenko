<template>
  <!-- <div>
    <NuxtLayout
      name="page-grid"
      class="lg:pt-3 last:[&>div>div]:border-b-0"
      v-if="query"
    >
      <NuxtLayout
        name="single-page-section"
        class="first:[&>div]:pt-5 lg:first:[&>div]:pt-0 last:[&>div>div]:px-0"
      >
        <template #sidecontent>
          <BackToLink
            class="text-gray-500 pb-5"
            :label="$t('All Publications')"
            prefix="library/publications"
          ></BackToLink>
          <SinglePageTitle :Label="query.Title" />
          <NuxtLayout name="single-page-information" v-if="query">
            <SinglePageInformationTextSection
              v-if="query.Date"
              label="Year"
              :value="query.Date"
            />
            <SinglePageInformationTextSection
              v-if="query.Type"
              label="Type"
              :value="query.Type"
            />
            <SinglePageInformationTextSection
              v-if="query.Author"
              label="Author"
              :value="query.Author"
            />
            <SinglePageInformationTextSection
              v-if="query.Publisher"
              label="Publisher"
              :value="query.Publisher"
            />
            <SinglePageInformationTextSection
              v-if="query.Languages"
              label="Languages"
              :value="query.Languages"
            />
            <SinglePageInformationTextSection
              v-if="query.ISBN"
              label="ISBN"
              :value="query.ISBN"
            />
            <SinglePageInformationExternalLinkSection
              v-if="query.ExternalLink"
              label="Link"
              :linkTitle="query.ExternalLink.title"
              :link="query.ExternalLink.url"
            />
          </NuxtLayout>
        </template>
        <template #content>
          <SinglePageMedia
            v-if="query.RelatedMedia.length > 0"
            type="Captioned"
            :slides="query.RelatedMedia"
            :videoControls="true"
          ></SinglePageMedia>
          <PublicationDetails class="px-4 md:px-8 lg:pl-0 md:pr-8 pb-8" v-if="!query.RelatedMedia.length > 0" :query="query"></PublicationDetails>
        </template>
      </NuxtLayout>
      <NuxtLayout
        name="single-page-content"
        v-if="query.RelatedMedia.length > 0 && query.About"
      >
        <template #content>
          <PublicationDetails class="pb-8" :query="query"></PublicationDetails>
        </template>
      </NuxtLayout>
      <NuxtLayout
        name="single-page-section"
        v-if="relatedExhibitions && relatedExhibitions.data.length > 0"
      >
        <template #sidecontent>
          <SinglePageSectionTitle Label="Related Exhibitions" />
        </template>
        <template #content>
          <SinglePageExhibitions
            v-if="relatedExhibitions && relatedExhibitions.data.length > 0"
            :query="relatedExhibitions"
          ></SinglePageExhibitions>
        </template>
      </NuxtLayout>
      <NuxtLayout
        v-if="relatedWorks && relatedWorks.length > 0"
        name="single-page-section-full"
      >
        <template #header>
          <SinglePageSectionTitle Label="Related Artworks" />
        </template>
        <template #content>
          <GeneralRelatedMediaSlider
            prefix="artwork"
            :promise="relatedWorks"
          ></GeneralRelatedMediaSlider>
        </template>
      </NuxtLayout>
    </NuxtLayout>
  </div> -->
</template>

<script setup>
// const locale = useI18n().locale;
// const route = useRoute();
// const runtimeConfig = useRuntimeConfig();

// const query = ref(null);
// const relatedWorks = ref(null);
// const relatedExhibitions = ref(null);

// const fetchRequest = async (request) => {
//   try {
//     const response = await fetch(request, {
//       headers: {
//         Authorization: `Bearer ${runtimeConfig.public.apiToken}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     return response.json();
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// };

// const queryRelatedExhibitions = async (request) => {
//   const data = await fetchRequest(request);
//   if (data) relatedExhibitions.value = data;
//   console.log(data);
// };

// const qetRelatedExhibitions = async () => {
//   const request = `${runtimeConfig.public.apiBase}/exhibitions?filters[publications][publication][slug][$eq]=${route.params.slug}&locale=${locale.value}`;
//   await queryRelatedExhibitions(request);
// };

// const queryRelatedWorks = async (request) => {
//   const data = await fetchRequest(request);
//   if (data) relatedWorks.value = data.data;
// };
// const qetRelatedWorks = async () => {
//   const request = `${runtimeConfig.public.apiBase}/artworks?filters[publications][publication][slug][$eq]=${route.params.slug}&populate=*&locale=${locale.value}`;
//   await queryRelatedWorks(request);
// };

// const getQuery = async (request) => {
//   const data = await fetchRequest(request);
//   if (data) {
//     query.value = data.data[0].attributes;
//     await qetRelatedWorks();
//     await qetRelatedExhibitions();
//     console.log(query.value);
//   }
// };

// const getSingleQuery = async () => {
//   const request = `${runtimeConfig.public.apiBase}/publications?filters[slug][$eq]=${route.params.slug}&populate[ExternalLink]=*&populate[RelatedMedia][populate]=*&locale=${locale.value}`;
//   await getQuery(request);
// };

// onBeforeMount(async () => {
//   document.body.classList.remove("overflow-hidden");
//   await getSingleQuery();
// });
</script>
