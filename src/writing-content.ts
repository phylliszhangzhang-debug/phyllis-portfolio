import type { Pair, Photo } from "./types";
import { southAsiaEssay } from "./south-asia-essay";

export const writingCategories = [
  {
    id: "academic",
    title: { en: "Academic Essays", zh: "学术文章" },
    intro: {
      en: "Course Essays",
      zh: "课程论文",
    },
  },
  {
    id: "everyday",
    title: { en: "Looking Again", zh: "换个角度看看" },
    intro: {
      en: "Starting with small moments in everyday life, I use an anthropological lens to reconsider things we often take for granted.",
      zh: "从生活中的小事出发，试着用人类学的视角，重新看看那些我们早已习以为常的事情。",
    },
  },
  {
    id: "books-films",
    title: { en: "Books & Films", zh: "书与电影" },
    intro: {
      en: "Thoughts and reflections on the books I read and the films I watch.",
      zh: "关于读过的书、看过的电影，以及它们带给我的思考。",
    },
  },
] as const;
export type WritingCategory = (typeof writingCategories)[number]["id"];
export type EssaySection = { heading?: string; paragraphs: string[] };
type ArticleBase = {
  title: Pair;
  date?: string;
  intro: Pair;
  category: WritingCategory;
  classification: Pair;
};
export type LocalArticle = ArticleBase & {
  kind: "local";
  slug: string;
  openingImage: Photo | null;
  sourceFile: string;
  // Set true only after comparing the complete English text to the source.
  fullTextChecked: boolean;
  sections: EssaySection[];
  references: string[];
  referencesHeading?: string;
};
export type ExternalArticle = ArticleBase & { kind: "external"; url: string };
export type Article = LocalArticle | ExternalArticle;
export const articles: Article[] = [
  {
    kind: "local",
    slug: "multiple-lives-of-religion-in-south-asia",
    title: {
      en: "The Multiple Lives of Religion in South Asia",
      zh: "南亚宗教的多重生活",
    },
    category: "academic",
    classification: { en: "SOAS Course Essay", zh: "SOAS 课程论文" },
    intro: {
      en: `How does religion continue to shape social life in South Asia?

Drawing on anthropological scholarship from India, Pakistan, and Bangladesh, this essay explores how religion moves across everyday practices, intimate relationships, urban spaces, and political imaginaries.

From women's religious dress and marriage to temples and popular visual media, it examines how religious life shapes questions of gender, belonging, public visibility, and national identity.`,
      zh: `宗教如何持续影响南亚社会的生活？

本文通过印度、巴基斯坦与孟加拉国的人类学研究，探讨宗教如何穿行于日常实践、亲密关系、城市空间与政治想象之间。

从女性的宗教服饰、婚姻生活，到寺庙与大众视觉媒介，文章关注宗教如何参与塑造性别关系、社会归属、公共可见性与国家认同。`,
    },
    openingImage: {
      src: "/images/writing/south-asia/plant-between-bricks.png",
      alt: "A green plant growing in a crack between red bricks.",
      caption: {
        en: "Opening image from the original course essay.",
        zh: "原始课程论文中的开篇图片。",
      },
    },
    sourceFile: "South Asia-AS2.docx",
    fullTextChecked: true,
    sections: southAsiaEssay.sections,
    references: southAsiaEssay.references,
    referencesHeading: southAsiaEssay.referencesHeading,
  },
];
export function canReadFullEssay(article: LocalArticle) {
  return (
    article.fullTextChecked &&
    article.sections.some((section) => section.paragraphs.length > 0) &&
    article.references.length > 0
  );
}
export function articleHref(article: Article) {
  return article.kind === "external"
    ? article.url
    : `#/writing/${article.slug}`;
}
