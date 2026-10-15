export type Pair = { en: string; zh: string };
export type Photo = {
  src: string;
  alt: string;
  caption: Pair;
  fit?: "cover" | "contain";
};
export type Fact = { label: Pair; value: Pair };
export type ProjectSection = {
  id: string;
  title: Pair;
  paragraphs: Pair[];
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
  body: Pair[];
  motif: "walk" | "silence" | "film" | "time" | "photo" | "series";
  image?: Photo;
  album?: PhotoAlbum;
  gallery: Photo[];
  sections?: ProjectSection[];
  needed: Pair;
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
