export const usePageRefresh = () => {
  const router = useRouter();
  const refreshed = router.options.history.state.replaced;
  const refreshParameters = () => {
    if (refreshed) {
      router.replace({
        query: null,
      });
    }
  };
  return { refreshed, refreshParameters };
};
