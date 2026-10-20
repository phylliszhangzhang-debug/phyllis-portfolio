import type { Pair, Photo } from "./types";
export type Note = { title: Pair; date?: string; text: Pair };
export const notes: Note[] = [];

export type GratitudeEntry = {
  id: string;
  date: string; // Actual diary date, YYYY-MM-DD; required for automatic ordering.
  title?: Pair;
  photo: Photo; // Original photo with accurate alt text and an optional empty caption pair.
  text: Pair;
};
// Only owner-supplied photographs, dates and personal text belong here.
export const gratitudeEntries: GratitudeEntry[] = [
  {
    id: "2026-10-16-appreciate-everything",
    date: "2026-10-16",
    title: { en: "Appreciate everything", zh: "心怀感恩" },
    photo: {
      src: "/images/gratitude/2026-10-16-appreciate-everything.jpg",
      alt: "A projected slide with the word AGENCY and a collage of photographs in a lecture room.",
      caption: { en: "", zh: "" },
    },
    text: {
      en: "I’m grateful for tonight’s unexpected dinner with a whole table of strangers, the stories I heard from different people, and a phone call I had with my friend during afternoon",
      zh: "感恩今夜意想不到的晚餐，故事，以及下午和朋友的电话。",
    },
  },
];
export function newestFirst<T extends { date: string }>(
  entries: readonly T[],
): T[] {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}
export const notesIntro: Pair = {
  en: "A place for unfinished thoughts, small observations, and whatever catches my attention.",
  zh: "放一些还没想明白的事、随手记下的观察，还有那些引起我注意的小东西。",
};
