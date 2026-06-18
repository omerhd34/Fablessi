/** Görsel dosya adında renk prefix'i yoksa ürün slug'ına göre varsayılan renk. */
export const PRODUCT_DEFAULT_COLOR_PREFIX = {
 "tesla-masa": "antrasit",
 "tesla-oturma": "antrasit",
 "tesla-salincak": "antrasit",
 "velar-masa": "cappuccino",
 "velar-oturma": "cappuccino",
 "velar-salincak": "cappuccino",
 "velar-sezlong": "cappuccino",
 "trend-sandalye": "cappuccino",
};

export function getProductDefaultColorPrefix(slug) {
 if (!slug) return null;

 return PRODUCT_DEFAULT_COLOR_PREFIX[slug] ?? null;
}
