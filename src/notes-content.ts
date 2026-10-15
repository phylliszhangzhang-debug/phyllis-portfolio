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
// Intentionally empty: only the owner supplies actual photographs and personal text.
export const gratitudeEntries: GratitudeEntry[] = [];
export function newestFirst<T extends { date: string }>(
  entries: readonly T[],
): T[] {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}
export const notesIntro: Pair = {
  en: "A place for unfinished thoughts, small observations, and whatever catches my attention.",
  zh: "放一些还没想明白的事、随手记下的观察，还有那些引起我注意的小东西。",
};
