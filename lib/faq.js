import { getDictionary } from "@/lib/i18n/get-dictionary";
import { defaultLocale } from "@/lib/i18n/config";

export const faqHeroImage = "https://res.cloudinary.com/dbo6puh1c/image/upload/v1781205909/fablessi/velar-salincak/01.jpg";

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
