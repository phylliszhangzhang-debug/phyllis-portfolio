export type Pair = { en: string; zh: string };
export type Photo = {
  src: string;
  alt: string;
  caption: Pair;
  fit?: "cover" | "contain";
  naturalAspect?: boolean;
  width?: number;
  height?: number;
  showCaptionOnCards?: boolean;
};
export type Fact = { label: Pair; value: Pair };
export type OutlineItem = { title: string; children?: OutlineItem[] };
export type ProjectSection = {
  id: string;
  title: Pair;
  paragraphs: Pair[];
  sourceParagraphs?: string[];
  outline?: OutlineItem[];
  items?: string[];
  facts?: Fact[];
  photos?: Photo[];
  useGallery?: boolean;
  annotation?: string;
  pending?: Pair;
};
export type Project = {
  slug: string;
  aliases?: string[];
  group: "research" | "visual" | "community";
  title: Pair;
  cardTitle?: Pair;
  subtitle?: Pair;
  category: Pair;
  role?: Pair;
  metadata?: Pair;
  intro: Pair;
  homeCardIntro?: Pair;
  body: Pair[];
  motif: "walk" | "silence" | "film" | "time" | "photo" | "series";
  image?: Photo;
  album?: PhotoAlbum;
  trailer?: { src: string; title: Pair };
  gallery: Photo[];
  sections?: ProjectSection[];
  needed?: Pair;
  links?: { label: string; url: string }[];
};

export type AlbumPage = {
  pageNumber: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  permissionReviewRequired: boolean;
};
export type PhotoAlbum = {
  title: Pair;
  expectedPageCount: number;
  pages: AlbumPage[];
};
