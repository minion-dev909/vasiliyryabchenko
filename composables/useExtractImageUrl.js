export const useExtractImageUrl = () => {
  const extractImageUrl = (htmlText) => {
    const match = htmlText.match(/https?:\/\/[^"]+/);
    return match ? match[0] : null; // Возвращает найденный URL или null, если URL не найден
  };
  return { extractImageUrl };
};
