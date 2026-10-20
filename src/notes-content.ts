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
    id: "2026-10-18-appreciate-everything",
    date: "2026-10-18",
    title: {
      en: "Appreciate Everything",
      zh: "心怀感恩",
    },
    photo: {
      src: "/images/gratitude/2026-10-18/appreciate-02.jpg",
      alt: "People walking past produce stalls at the corner of a busy street.",
      caption: {
        en: "",
        zh: "",
      },
    },
    text: {
      en: "Today I am grateful for the wet market, a new cultural space in Hong Kong, and for my little brother's company.",
      zh: "今天我想感恩香港油麻地的街市；过滤气泡工作室；我弟的陪伴。",
    },
    gallery: [
      {
        src: "/images/gratitude/2026-10-18/appreciate-03.jpg",
        alt: "Carrots, bananas, limes and other produce displayed at a market stall.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/gratitude/2026-10-18/appreciate-04.jpg",
        alt: "Fruit displayed beside handwritten price signs at a market stall.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/gratitude/2026-10-18/appreciate-05.jpg",
        alt: "Vegetables and root crops displayed in baskets with price signs.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/gratitude/2026-10-18/appreciate-06.jpg",
        alt: "A tiled market stall with a counter, hanging bags and a cloth.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/gratitude/2026-10-18/appreciate-07.jpg",
        alt: "Colourful hanging decorations above a small shrine inside a market stall.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/gratitude/2026-10-18/appreciate-08.jpg",
        alt: "Spring onions and other produce displayed in baskets at a market stall.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/gratitude/2026-10-18/appreciate-09.jpg",
        alt: "A blue toy giraffe beside a business card on a shelf.",
        caption: {
          en: "",
          zh: "",
        },
      },
    ],
  },
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
  {
    id: "2026-10-15-appreciate-everything",
    date: "2026-10-15",
    title: {
      en: "Appreciate everything",
      zh: "心怀感恩",
    },
    photo: {
      src: "/images/gratitude/2026-10-15/appreciate-01.jpg",
      alt: "A meal with several dishes, bread and a bowl of soup arranged on a wooden table.",
      caption: {
        en: "",
        zh: "",
      },
    },
    text: {
      en: "This series was inspired by Kate, a 74 years old woman I interviewed in London. After she injured her arm last year, she spent two excruciating weeks recovering from surgery. So she began posting three things she was grateful for on Facebook every day———a reminder that life still holds so much worth cherishing.\n\nToday I'm grateful for an old song, It Never Rains in Southern California, my dad's tomato omelet, and a beautiful line from a WeChat article: \"Regret is the most sublime emotion in life.\"",
      zh: "这个系列受到来自于我在伦敦的一位74岁采访对象的启发，她叫Kate。去年她的手臂受伤，手术恢复的两个星期里都疼到丢魂。于是她开始在自己的Facebook上每天更新三样自己感恩的事物，以此提醒自己生活中还有许多值得珍惜的东西。\n\n今天我想感恩一首老歌《南加州从不下雨》，我爸给做的西红柿炒蛋，一篇公众号文章《我哥说遗憾是人生最壮丽的情感，将近40年了，我一直记得这句话》",
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
