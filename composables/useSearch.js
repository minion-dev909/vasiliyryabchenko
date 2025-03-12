export function useSearch() {
  const searchQuery = ref('');

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  return { searchQuery, setSearchQuery };
}