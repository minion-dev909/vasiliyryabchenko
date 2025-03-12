export const useRuntimeData = () => {
  const { t, locale } = useI18n();
  const runtimeConfig = useRuntimeConfig();
  const siteBase = runtimeConfig.public.siteBase;
  const hubBase = runtimeConfig.public.hubBase;
  const apiBase = runtimeConfig.public.apiBase;
  const newApiBase = runtimeConfig.public.newApiBase;
  const storageBase = runtimeConfig.public.storageBase;
  const storageTmp = runtimeConfig.public.storageTmp;
  const apiToken = runtimeConfig.public.apiToken;
  return { siteBase, hubBase, apiBase, apiToken, storageBase, storageTmp, locale, t, newApiBase };
};
