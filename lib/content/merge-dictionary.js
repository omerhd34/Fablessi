function pickLocaleContent(block, locale) {
 if (!block) return null;
 return locale === "en" ? block.contentEn : block.contentTr;
}

function buildFaqFromCategories(baseFaq, faqCategories, locale) {
 if (!faqCategories?.length) {
  return baseFaq;
 }

 const isEn = locale === "en";

 return {
  ...baseFaq,
  categories: faqCategories.map((category) => ({
   id: category.slug,
   title: isEn ? category.titleEn || category.titleTr : category.titleTr,
   initialVisible: category.initialVisible,
   items: category.items.map((item) => ({
    question: isEn ? item.questionEn || item.questionTr : item.questionTr,
    answer: isEn ? item.answerEn || item.answerTr : item.answerTr,
   })),
  })),
  tabs: Object.fromEntries(
   faqCategories.map((category) => [
    category.slug,
    isEn ? category.titleEn || category.titleTr : category.titleTr,
   ])
  ),
 };
}

export function mergeDictionaryWithCms(baseDictionary, locale, { blocks, faqCategories }) {
 const merged = { ...baseDictionary };
 const blockMap = blocks ?? {};

 const about = pickLocaleContent(blockMap.about, locale);
 if (about) {
  merged.about = {
   ...about,
   heroEyebrow: baseDictionary.about.heroEyebrow,
   pageTitle: baseDictionary.about.pageTitle,
  };
 }

 const missionVision = pickLocaleContent(blockMap.missionVision, locale);
 if (missionVision) {
  merged.missionVision = {
   ...missionVision,
   heroEyebrow: baseDictionary.missionVision.heroEyebrow,
   pageTitle: baseDictionary.missionVision.pageTitle,
   missionTitle: baseDictionary.missionVision.missionTitle,
   visionTitle: baseDictionary.missionVision.visionTitle,
   valuesTitle: baseDictionary.missionVision.valuesTitle,
   commitmentsTitle: baseDictionary.missionVision.commitmentsTitle,
   ctaTitle: baseDictionary.missionVision.ctaTitle,
   ctaDescription: baseDictionary.missionVision.ctaDescription,
   ctaProducts: baseDictionary.missionVision.ctaProducts,
   ctaContact: baseDictionary.missionVision.ctaContact,
  };
 }

 merged.faq = buildFaqFromCategories(merged.faq, faqCategories, locale);
 merged.faq.pageTitle = baseDictionary.faq.pageTitle;
 merged.faq.intro = baseDictionary.faq.intro;
 merged.faq.categoriesAria = baseDictionary.faq.categoriesAria;
 merged.faq.showMore = baseDictionary.faq.showMore;

 return merged;
}
