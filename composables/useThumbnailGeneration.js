export const useThumbnailGeneration = () => {
  const { apiBase, apiToken } = useRuntimeData();
  const { extractImageUrl } = useExtractImageUrl();
  const generateThumbnail = async (item, imageId, m, size) => {
    const requestURL = `${apiBase}/assets/image/${imageId}?m=${m}&w=${size}`;
    try {
      const response = await fetch(requestURL, {
        headers: {
          "api-key": apiToken,
        },
      })
        .then((response) => response.text())
        .then((text) => {
          const imageUrl = extractImageUrl(text); 
          if (imageUrl) {
            item.thumbnail = imageUrl;
          } else {
            console.error("Не удалось извлечь URL изображения");
          }
        });
    } catch (error) {
      console.error("Ошибка загрузки thumbnail", error);
    }
  };
  return { generateThumbnail };
};
