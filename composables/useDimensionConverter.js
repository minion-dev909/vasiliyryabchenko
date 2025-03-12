export const useDimensionConverter = () => {
  const { t } = useI18n();

  const DimensionConverter = (Dimension, separator) => {
    const Height = Dimension.Height || "";
    const Width = Dimension.Width || "";
    const Length = Dimension.Length || "";
    const Amount = Dimension.Amount || 1;  // Default to 1 if Amount is null or ""

    const HeightIn = Height ? parseInt(Height / 2.54) : 0;
    const WidthIn = Width ? parseInt(Width / 2.54) : 0;
    const LengthIn = Length ? parseInt(Length / 2.54) : 0;

    const totalHeight = parseInt(Height * Amount);
    const totalWidth = parseInt(Width * Amount);
    const totalLength = parseInt(Length * Amount);

    const totalHeightIn = parseInt(totalHeight / 2.54) || "";
    const totalWidthIn = parseInt(totalWidth / 2.54) || "";
    const totalLengthIn = parseInt(totalLength / 2.54) || "";

    let result = "";

    // Condition to handle cases where Amount is effectively 1
    if (Amount === 1) {
      if (Height && Width && Length) {
        result = `${Height} x ${Width} x ${Length} ${t("cm")} / ${HeightIn} x ${WidthIn} x ${LengthIn} ${t("in")}`;
      } else if (Height && Width) {
        result = `${Height} x ${Width} ${t("cm")} / ${HeightIn} x ${WidthIn} ${t("in")}`;
      } else {
        result = `${t("size varies")}`;
      }
    } else {
      const compositionType =
        Amount === 2
          ? t("diptych")
          : Amount === 3
          ? t("triptych")
          : Amount > 3
          ? `${Amount}-part`
          : "";

      if (Height && Width && Length) {
        result = `${totalHeight} x ${totalWidth} x ${totalLength} ${t("cm")} / ${totalHeightIn} x ${totalWidthIn} x ${totalLengthIn} ${t("in")} (${compositionType})\n`;
        result += `<br> ${Height} x ${Width} x ${Length} ${t("cm")} / ${HeightIn} x ${WidthIn} x ${LengthIn} ${t("in")} (${t("each piece")})`;
      } else if (Height && Width) {
        result = `${totalHeight} x ${totalWidth} ${t("cm")} / ${totalHeightIn} x ${totalWidthIn} ${t("in")} (${compositionType})\n`;
        result += `<br> ${Height} x ${Width} ${t("cm")} / ${HeightIn} x ${WidthIn} ${t("in")} (${t("each piece")})`;
      } else {
        result = `${t("size varies")}`;
      }
    }

    return result;
  };

  return { DimensionConverter };
};
