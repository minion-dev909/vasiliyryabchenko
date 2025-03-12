<template>
  <NuxtLoadingIndicator color="black" />
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>

</template>

<script setup lang="ts">
const { t, locale } = useI18n();
watchEffect(() => {
  const i18nHead = useLocaleHead({
    addSeoAttributes: {
      canonicalQueries: ["foo"],
    },
  });
  useHead({
    htmlAttrs: {
      lang: i18nHead.value.htmlAttrs!.lang,
    },
    link: [...(i18nHead.value.link || [])],
    meta: [...(i18nHead.value.meta || [])],
    titleTemplate: (page) =>
      page ? `${t("Sitename")} - ${page}` : `${t("Sitename")}`,
  });
});
</script>
