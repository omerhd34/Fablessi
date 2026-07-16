// Next.js 16 also ships legacy polyfills that its browser baseline does not need.
// Keep only URL.canParse, which is unavailable in part of that supported baseline.
if (!("canParse" in URL)) {
 URL.canParse = function canParse(url, base) {
  try {
   return Boolean(new URL(url, base));
  } catch {
   return false;
  }
 };
}
