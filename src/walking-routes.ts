import type { Pair, Photo } from "./types";

export type WalkingRoute = {
  id: string;
  title: Pair;
  description: Pair;
  photos: Photo[];
};

// Add only the owner's actual routes and original photographs when supplied.
export const walkingRoutes: WalkingRoute[] = [
  {
    id: "walking-photographs",
    title: {
      en: "Along the way",
      zh: "沿途影像",
    },
    description: {
      en: "",
      zh: "",
    },
    photos: [
      {
        src: "/images/walking/walking-12.jpg",
        alt: "A hiker wearing a blue hat and backpack, standing in front of a historic stone building.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/walking/walking-01.jpg",
        alt: "A person posing inside a large red square frame beside the sea.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/walking/walking-02.jpg",
        alt: "Painted stones surrounding a blue-and-yellow shell waymarker near the coast.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/walking/walking-03.jpg",
        alt: "A hiker wearing a sun hat and backpack beside a collection of painted stones.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/walking/walking-04.jpg",
        alt: "A walker wearing a green rain poncho on a street beside a café.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/walking/walking-05.jpg",
        alt: "A sloping road running between buildings toward distant hills and water.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/walking/walking-06.jpg",
        alt: "A shell waymarker beside a grassy path overlooking a coastal town.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/walking/walking-08.jpg",
        alt: "Two walkers with backpacks following a shaded lane beneath trees.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/walking/walking-09.jpg",
        alt: "A close view of a stone waymarker with a yellow shell and arrow.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/walking/walking-10.jpg",
        alt: "A person sitting beside a backpack in a busy square in front of a cathedral.",
        caption: {
          en: "",
          zh: "",
        },
      },
      {
        src: "/images/walking/walking-11.jpg",
        alt: "A person with arms outstretched in a broad square in front of a cathedral.",
        caption: {
          en: "",
          zh: "",
        },
      },
    ],
  },
];
