export default defineEventHandler(async () => {
    const config = useRuntimeConfig();
    const apiBase = config.public.newApiBase;
  
    return await $fetch(`${apiBase}/items/TermAndConditions`, {
      query: {
        fields: "*,translations.*",
        deep: {
          translations: {
            _filter: {
              _and: [{ languages_code: { _eq: "en" } }]
            }
          }
        }
      }
    });
  });