export const useGenerateId = () => {
  const generateId = (query, element) => {
    const isFirstOfYear = computed(
      () =>
        query.find(
          (item) => item.Year === element.Year
        )?.id === element.id
    ).value;

    return isFirstOfYear ? `y${element.Year}` : "";
  };

  return { generateId };
};
