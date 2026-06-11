export function parseDimensionItems(items) {
 if (!Array.isArray(items)) return null;
 return items.map((item, index) => ({
  name: item.name?.trim() || null,
  nameEn: item.nameEn?.trim() || null,
  widthCm: item.widthCm != null && item.widthCm !== "" ? Number(item.widthCm) : null,
  depthCm: item.depthCm != null && item.depthCm !== "" ? Number(item.depthCm) : null,
  heightCm: item.heightCm != null && item.heightCm !== "" ? Number(item.heightCm) : null,
  amount: item.amount != null && item.amount !== "" ? Number(item.amount) : null,
  quantity:
   item.quantity != null && item.quantity !== "" && Number(item.quantity) > 0
    ? Number(item.quantity)
    : 1,
  sortOrder: index,
 }));
}

export function parseProductImages(images, productName, productNameEn) {
 if (!Array.isArray(images)) return [];
 return images
  .map((image, index) => ({
   url: image.url?.trim(),
   alt:
    image.alt?.trim() ||
    (index === 0 ? productName : `${productName} — görsel ${index + 1}`),
   altEn:
    image.altEn?.trim() ||
    (index === 0
     ? productNameEn || productName
     : `${productNameEn || productName} — image ${index + 1}`),
   sortOrder: index,
   isPrimary: Boolean(image.isPrimary) || index === 0,
  }))
  .filter((image) => image.url);
}

export function parseProductMedia(body, productSlug, productName, productNameEn) {
 const images = parseProductImages(body.images, productName, productNameEn);

 return {
  material: body.material?.trim() || null,
  materialEn: body.materialEn?.trim() || null,
  sku: body.sku?.trim() || productSlug.toUpperCase().replace(/-/g, ""),
  images: images.length ? { create: images } : undefined,
 };
}
