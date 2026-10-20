import type { Pair, Photo } from "./types";
export type Note = { title: Pair; date?: string; text: Pair };
export const notes: Note[] = [];

export type GratitudeEntry = {
  id: string;
  date: string; // Actual diary date, YYYY-MM-DD; required for automatic ordering.
  title?: Pair;
  gallery?: Photo[];
  photo: Photo; // Original photo with accurate alt text and an optional empty caption pair.
  text: Pair;
};
// Only owner-supplied photographs, dates and personal text belong here.
export const gratitudeEntries: GratitudeEntry[] = [
  {
    id: "2026-10-17-appreciate-everything",
    date: "2026-10-17",
    title: { en: "Appreciate everything", zh: "心怀感恩" },
    photo: {
      src: "/images/gratitude/2026-10-17/IMG_5261.jpg",
      alt: "Hands holding two instant photographs of two people together.",
      caption: { en: "", zh: "" },
    },
    text: {
      en: `Today I am grateful for hanging out with my friend who I met in Macau. She joked that “when she first met me, I had no hair, but now it's grown so long."

I'm also grateful for the lunch I made, which took me three hours. That's why I seldom cook, and when I do, it's only for someone I care about.

And grateful for the ethnography I got about Chinese wet markets.`,
      zh: `感谢今天和大学朋友的见面，她惊讶地说：我们首次见面的时候你还没有头发，看你现在的头发！”

感谢我费时三小时做的饭，所以这是我不常做饭的原因。

感谢我读到的关于中国菜市场的民族志。`,
    },
    gallery: [
      {
        src: "/images/gratitude/2026-10-17/IMG_5248.jpg",
        alt: "A handwritten bilingual menu listing soup and main courses.",
        caption: { en: "", zh: "" },
      },
      {
        src: "/images/gratitude/2026-10-17/IMG_5254.jpg",
        alt: "A bowl of soup with meatballs and greens.",
        caption: { en: "", zh: "" },
      },
      {
        src: "/images/gratitude/2026-10-17/IMG_5255.jpg",
        alt: "Prepared dishes including a whole fish, greens, taro and minced meat on a dining table.",
        caption: { en: "", zh: "" },
      },
    ],
  },
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
