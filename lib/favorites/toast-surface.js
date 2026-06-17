function isRenderable(el) {
 if (!(el instanceof Element)) return false;

 const style = getComputedStyle(el);
 if (style.display === "none" || style.visibility === "hidden") return false;

 const rect = el.getBoundingClientRect();
 return rect.width > 0 && rect.height > 0;
}

function pointInRect(x, y, rect) {
 return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function isMediaCoveringPoint(node, x, y) {
 if (node.tagName === "IMG" || node.tagName === "PICTURE") {
  return pointInRect(x, y, node.getBoundingClientRect()) && isRenderable(node);
 }

 const style = getComputedStyle(node);
 if (style.backgroundImage.includes("url(")) {
  const rect = node.getBoundingClientRect();
  return pointInRect(x, y, rect) && isRenderable(node);
 }

 return false;
}

function hasCoveringImage(el, x, y) {
 let node = el;

 while (node && node !== document.documentElement) {
  if (isMediaCoveringPoint(node, x, y)) return true;

  for (const item of node.querySelectorAll("img, picture")) {
   if (isMediaCoveringPoint(item, x, y)) return true;
  }

  node = node.parentElement;
 }

 return false;
}

function getToastProbePoints(rect) {
 const visibleTop = Math.max(rect.top, 0);
 const visibleBottom = Math.min(rect.bottom, window.innerHeight);
 const y = (visibleTop + visibleBottom) / 2;

 return [
  { x: rect.left + rect.width * 0.25, y },
  { x: rect.left + rect.width * 0.5, y },
  { x: rect.left + rect.width * 0.75, y },
 ];
}

export function isToastOverImage(toastEl) {
 if (!toastEl) return false;

 const rect = toastEl.getBoundingClientRect();
 if (rect.width <= 0 || rect.height <= 0) return false;

 return getToastProbePoints(rect).some(({ x, y }) => {
  const elements = document.elementsFromPoint(x, y);
  const backgroundElements = elements.filter(
   (el) =>
    !el.closest("[data-sonner-toaster]") && !el.closest("[data-sonner-toast]")
  );

  return backgroundElements.some((el) => hasCoveringImage(el, x, y));
 });
}
