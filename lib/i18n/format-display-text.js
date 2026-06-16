export function formatMissionValueTitle(title, locale) {
 if (locale !== "tr") return title;

 return title
  .replace(/\bpremium\b/gi, "PREMIUM")
  .split(" ")
  .map((word) => (word === "PREMIUM" ? word : word.toLocaleUpperCase("tr-TR")))
  .join(" ");
}
