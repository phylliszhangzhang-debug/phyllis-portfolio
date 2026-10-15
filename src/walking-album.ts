import type { PhotoAlbum } from "./types";

// The owner supplied a 17-page PDF, but the download tool rejected it (>32 MiB).
// Leave pages empty until the actual source can be opened and every page checked.
// Never fill this list with reconstructed pages or substitute photographs.
export const walkingAlbum: PhotoAlbum = {
  title: {
    en: "Walking With Anthropologists — Photo Album",
    zh: "与人类学家一起行走 — 相册",
  },
  expectedPageCount: 17,
  pages: [],
};
