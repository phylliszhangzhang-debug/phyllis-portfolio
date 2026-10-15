import type { Pair, Photo } from "./types";

export const writingCategories = [
  {
    id: "academic",
    title: { en: "Academic Essays", zh: "学术文章" },
    intro: {
      en: "Coursework and research-based analytical writing.",
      zh: "课程论文与基于研究的分析性写作。",
    },
  },
  {
    id: "everyday",
    title: { en: "Everyday Questions", zh: "生活里的问题" },
    intro: {
      en: "Shorter essays exploring contemporary social and cultural questions through an anthropological perspective.",
      zh: "以人类学视角探索当代社会与文化问题的短篇文章。",
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
    openingImage: null,
    sourceFile: "South Asia-AS2.pdf",
    fullTextChecked: false,
    sections: [],
    references: [],
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
