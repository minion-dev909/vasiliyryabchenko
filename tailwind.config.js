export default {
  // Safelisting some classes to avoid content purge
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  safelist: [
    "safelisted", // Пример сохранения конкретного класса
    "h-[33em]", // Явно сохраняем класс h-[33em]
    {
      pattern: /h-\[/, // Сохраняем все классы, начинающиеся на h-[
      variants: ["lg", "xl", "2xl"], // Пример добавления вариантов для сохраняемых классов
    },
  ],
};
