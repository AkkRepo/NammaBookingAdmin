export const Capitalize = (str) => {
  if (typeof str !== "string" || str.length === 0) {
    return "";
  }
  let words = str.split(" ");
  let capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};
export const reverseDateFormat = (inputDate) => {
  const parts = inputDate.split("-");
  const yyyy_mm_dd = parts[2] + "-" + parts[1] + "-" + parts[0];
  return yyyy_mm_dd;
};
