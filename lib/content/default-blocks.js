import tr from "../i18n/dictionaries/tr.js";
import en from "../i18n/dictionaries/en.js";

export function getDefaultContentBlocks() {
 return {
  about: {
   contentTr: tr.about,
   contentEn: en.about,
  },
  missionVision: {
   contentTr: tr.missionVision,
   contentEn: en.missionVision,
  },
  faq: {
   contentTr: { heroImage: "" },
   contentEn: { heroImage: "" },
  },
 };
}

export function getDefaultFaqCategories() {
 return tr.faq.categories.map((category, index) => {
  const enCategory = en.faq.categories.find((item) => item.id === category.id);

  return {
   slug: category.id,
   titleTr: category.title,
   titleEn: enCategory?.title ?? category.title,
   sortOrder: index,
   initialVisible: category.initialVisible,
   items: category.items.map((item, itemIndex) => {
    const enItem = enCategory?.items[itemIndex];

    return {
     questionTr: item.question,
     questionEn: enItem?.question ?? item.question,
     answerTr: item.answer,
     answerEn: enItem?.answer ?? item.answer,
     sortOrder: itemIndex,
    };
   }),
  };
 });
}
