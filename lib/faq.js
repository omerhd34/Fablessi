import { getDictionary } from "@/lib/i18n/get-dictionary";
import { defaultLocale } from "@/lib/i18n/config";

export const faqHeroImage = "/velar-salincak/01.jpeg";

const defaultFaq = getDictionary(defaultLocale).faq;

export const faqCategoryTabs = Object.entries(defaultFaq.tabs).map(
 ([id, label]) => ({ id, label })
);

export const faqIntro = defaultFaq.intro;
export const faqCategories = defaultFaq.categories;

export function getFaqContent(locale) {
 const faq = getDictionary(locale).faq;

 return {
  heroImage: faqHeroImage,
  categoryTabs: Object.entries(faq.tabs).map(([id, label]) => ({ id, label })),
  intro: faq.intro,
  categories: faq.categories,
 };
}
