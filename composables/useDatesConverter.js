export const useDatesConverter = () => {
  const { t } = useI18n();

  const formatDateComponents = (dateStr) => {
    if (!dateStr) return {};

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const [year, month, day] = dateStr.split("-");
    const monthIndex = parseInt(month) - 1;
    let localMonth = t(months[monthIndex]);

    // Обрезать названия месяцев более 4 символов до 3 символов
    if (localMonth.length > 4) {
      localMonth = localMonth.substring(0, 3);
    }

    return {
      day: parseInt(day),
      month: localMonth,
      monthIndex,
      year: parseInt(year),
    };
  };

  const formatDate = ({ day, month, year }) => `${day} ${month} ${year}`;

  const getDates = (dates) => {
    const startComponents = formatDateComponents(dates.Start.trim());
    const endComponents = formatDateComponents(dates.End.trim());

    if (startComponents.year === endComponents.year) {
      if (startComponents.monthIndex === endComponents.monthIndex) {
        // Одинаковые месяц и год
        return `${startComponents.day} - ${endComponents.day} ${endComponents.month} ${endComponents.year}`;
      } else {
        // Одинаковый год, но разные месяцы
        return `${startComponents.day} ${startComponents.month} - ${endComponents.day} ${endComponents.month} ${endComponents.year}`;
      }
    } else {
      // Разные года
      return `${formatDate(startComponents)} - ${formatDate(endComponents)}`;
    }
  };

  return { formatDate: (dateStr) => formatDate(formatDateComponents(dateStr)), getDates };
};
