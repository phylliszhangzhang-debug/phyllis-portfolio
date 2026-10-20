import type { Pair, Project } from "./types";
import { walkingAlbum } from "./walking-album";
import { quakerExcerpts } from "./quaker-excerpts";
import { networkingReport } from "./networking-report";
import { dumplingStory } from "./dumpling-story";
import { dumplingPosterPages } from "./dumpling-posters";
import {
  macauPhotos,
  quakerFieldworkPhotos,
  handmadePosterPhotos,
} from "./photo-collections";

// Canonical project records, using owner-supplied facts and approved copy.
export const projects: Project[] = [
  {
    slug: "walking-with-anthropologists",
    album: walkingAlbum,
    image: {
      src: "/images/walking-album/page-10.jpg",
      alt: "Walking With Anthropologists participants holding their banner, from original album page 10.",
      caption: {
        en: "From the original Walking With Anthropologists photo album, page 10.",
        zh: "选自 Walking With Anthropologists 原始相册第10页。",
      },
      fit: "contain",
    },
    group: "community",
    title: { en: "Walking With Anthropologists", zh: "与人类学家一起行走" },
    category: { en: "Community · Cultural organising", zh: "社群 · 文化组织" },
    motif: "walk",
    role: { en: "Founder & Lead Organiser", zh: "发起人及主要组织者" },
    intro: {
      en: "A community initiative I founded and primarily organised at SOAS, creating informal encounters beyond the classroom.",
      zh: "我在 SOAS 发起并主要负责组织的社群项目，为课堂之外的相遇创造机会。",
    },
    body: [
      {
        en: "I founded and primarily organised Walking With Anthropologists at SOAS to create informal opportunities for anthropology students and professors to meet outside conventional classrooms.",
        zh: "我在 SOAS 发起并主要负责组织 Walking With Anthropologists，为人类学学生与教授创造在传统课堂之外轻松交流的机会。",
      },
      {
        en: "Four walking events were organised, including a canal trip and a visit to Parliament. These walks and encounters helped students establish relationships with their peers, teachers, and department.",
        zh: "项目共组织了四次步行活动，包括一次运河之行和一次议会参访。这些行走与相遇帮助学生与同学、老师及院系建立联系。",
      },
    ],
    gallery: [],
    sections: [
      {
        id: "poster-making",
        title: { en: "Making posters by hand", zh: "活动海报手工制作" },
        paragraphs: [],
        photos: handmadePosterPhotos,
      },
    ],
    needed: {
      en: "Your reflections on informal encounters and community. Publication permissions for identifiable photographs are awaiting owner review.",
      zh: "待补充：你对非正式相遇与社群的思考。包含可识别人物的照片，发布权限待本人审核。",
    },
  },
  {
    slug: "silence-and-everyday-life",
    image: {
      src: "/images/quaker-research/cover.png",
      alt: "A collage of a meeting room with chairs arranged in a circle and a wooden display box.",
      caption: {
        en: "",
        zh: "",
      },
      fit: "contain",
    },
    group: "research",
    title: {
      en: "“We Always Fail”: Silence, Quakerism, and the Practice of Ethical Life in London",
      zh: "《我们总是失败：静默、贵格主义与伦敦伦理生活实践》",
    },
    cardTitle: {
      en: "“We Always Fail”",
      zh: "《我们总是失败：静默、贵格主义与伦敦伦理生活实践》",
    },
    category: {
      en: "Ethnography · Quaker research",
      zh: "民族志 · 贵格会研究",
    },
    motif: "silence",
    intro: {
      en: "Silence, ordinary ethics, and communal life among London Quakers.",
      zh: "伦敦贵格会群体中的沉默、日常伦理与共同生活。",
    },
    body: [
      {
        en: "My MRes dissertation examined silence and ethical practice among London Quakers. The research involved participant observation and interviews, with attention to everyday social life and community.",
        zh: "我的 MRes 学位论文探讨伦敦贵格会群体中的沉默与伦理实践。研究采用参与式观察与访谈，关注日常社会生活与社群。",
      },
    ],
    gallery: [],
    sections: [
      ...quakerExcerpts,
      {
        id: "fieldwork-photographs",
        title: { en: "Fieldwork photographs", zh: "田野照片" },
        paragraphs: [],
        photos: quakerFieldworkPhotos,
      },
    ],
  },
  {
    slug: "invisible-macau",
    image: {
      src: "/images/invisible-macau/poster.jpg",
      alt: "Original Invisible Macau poster with purple illustrations of Macau buildings and puppet characters.",
      caption: {
        en: "Original Invisible Macau film poster.",
        zh: "《隐形的小莲岛》原创海报。",
      },
      fit: "contain",
      naturalAspect: true,
      width: 1280,
      height: 1792,
    },
    trailer: {
      src: "/videos/invisible-macau/trailer.mp4",
      title: { en: "Trailer", zh: "预告片" },
    },
    aliases: ["invisible-little-lotus-island"],
    group: "visual",
    title: { en: "Invisible Macau", zh: "《隐形的小莲岛》" },
    category: { en: "Documentary Film", zh: "纪录片" },
    motif: "film",
    role: { en: "Director & Producer", zh: "导演、制片" },
    metadata: {
      en: "30 min · Filmed over two years",
      zh: "30分钟 · 历时两年拍摄",
    },
    intro: {
      en: "A 30-minute documentary filmed over two years, exploring the overlooked lives, histories, and connections of Macau beyond its tourism and gaming industries. Through a puppet-making couple and a century-old Portuguese restaurant, the film reveals another side of the city amid social change.",
      zh: "一部历时两年跟踪拍摄的30分钟纪录片。透过路环的戏偶艺术家夫妇与百年葡国餐厅，呈现澳门旅游博彩业之外，那些被忽视的人、记忆与情感联结，以及时代变迁中的另一种澳门生活。",
    },
    body: [],
    gallery: [],
    sections: [
      {
        id: "overview",
        title: { en: "Film Overview", zh: "影片概览" },
        paragraphs: [],
        facts: [
          {
            label: { en: "Runtime", zh: "片长" },
            value: { en: "30 minutes", zh: "30分钟" },
          },
          {
            label: { en: "Filming", zh: "拍摄" },
            value: { en: "Two years of filming", zh: "历时两年拍摄" },
          },
        ],
      },
      {
        id: "synopsis",
        title: { en: "Synopsis", zh: "影片简介" },
        paragraphs: [
          {
            en: `What remains unseen in a city known to the world for its tourism and gaming industries?

Invisible Macau explores the lives, memories, and relationships that often go unnoticed amid the city's transformation.

In Coloane, a young artist couple uses puppetry to recover forgotten stories from the local community, connecting its past with the present. Elsewhere, Kwan Kee, a century-old Portuguese restaurant, brings people together through food and the memories and emotions it carries.

Through two years of filming, the documentary follows these two spaces and the people who sustain them. Each, in their own way, creates connections between people, places, and generations.

As Macau continues to change, the film invites viewers to look beyond the city's familiar image and rediscover the people, histories, and everyday moments that have long remained invisible.`,
            zh: `被什么隐形？又如何被“隐形”？

在旅游与博彩业塑造的城市形象背后，还有怎样一个澳门？

《隐形的小莲岛》是一部历时两年跟踪拍摄的30分钟纪录片，聚焦时代新旧交替之下，澳门那些容易被忽视的人、故事与情感联结。

在路环，一对年轻的艺术家夫妇以戏偶拾起社区中逐渐被遗忘的故事，连接历史与当下；在百年葡国餐厅坤记，食物成为连接食客、记忆与情感的媒介。

影片以这两处空间为线索，记录其中的人们如何以自己的方式维系人与人、人与地方之间的联系。

在不断变化的澳门，影片希望让那些被旅游城市的主流叙事遮蔽的日常生活重新显形，邀请观众看见一个或许曾经擦肩而过，却未曾真正认识的澳门。`,
          },
        ],
      },
      {
        id: "lse-screening-2025",
        title: {
          en: "LSE Screening · 2025",
          zh: "2025 年 LSE 展映",
        },
        paragraphs: [],
        photos: [
          {
            src: "/images/invisible-macau/lse-2025/e1af9b07710bcdf82e7c9cb9c3b84e9a.JPG",
            alt: "Audience seated around a table with the Invisible Macau title on the screening room display.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/lse-2025/30cdac514b3e9ce348018cdc2d274ba2.JPG",
            alt: "A discussion among attendees seated around the screening room table.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/lse-2025/11270ca9d3135867d32df9515b06af18.JPG",
            alt: "A speaker addressing the attendees around a long table.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/lse-2025/71a0901589d999799581917009d8691f.JPG",
            alt: "Audience members watching a scene from the documentary on a screen beside bookshelves.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/lse-2025/69037ba4358ff81facec9560fc0a2aa2.JPG",
            alt: "Two people standing together, one holding a bouquet of flowers.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/lse-2025/bf8cadbd822eaba6b45fd0c28bc24f70.JPG",
            alt: "A group photograph of attendees in the screening room.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/lse-2025/a7e596a4f3a1a7b99acd365b0b155e0d.jpg",
            alt: "Attendees watching the film credits on the screening room display.",
            caption: {
              en: "",
              zh: "",
            },
          },
        ],
      },
      {
        id: "film-stills",
        title: {
          en: "Film Stills",
          zh: "剧照",
        },
        paragraphs: [],
        photos: [
          {
            src: "/images/invisible-macau/stills/still-1.JPG",
            alt: "Two people standing outdoors as another person films them with a camera.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/stills/still-2.JPG",
            alt: "Four people posing together behind a restaurant counter.",
            caption: {
              en: "",
              zh: "",
            },
          },
        ],
      },
      {
        id: "behind-the-film",
        title: {
          en: "Behind the Film",
          zh: "幕后创作",
        },
        paragraphs: [],
        photos: [
          {
            src: "/images/invisible-macau/behind-the-film/behind-3.JPG",
            alt: "A camera operator filming people beside a yellow building.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/behind-the-film/behind-4.JPG",
            alt: "People gathered on an outdoor stage while a photographer takes a picture.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/behind-the-film/behind-5.JPG",
            alt: "A person standing beside a large blue puppet outdoors.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/behind-the-film/behind-6.JPG",
            alt: "A group taking a photograph together beneath hanging puppets indoors.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/behind-the-film/behind-7.JPG",
            alt: "A group sharing pizza around a table.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/behind-the-film/behind-8.JPG",
            alt: "A group posing together with large puppet heads.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/behind-the-film/behind-9.JPG",
            alt: "Two people standing together in a workshop, one holding a camera.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/invisible-macau/behind-the-film/behind-10.jpg",
            alt: "A group standing around a dining table after a shared meal.",
            caption: {
              en: "",
              zh: "",
            },
          },
        ],
        annotation: "behind the frame",
      },
      {
        id: "credits",
        title: { en: "Credits", zh: "主创名单" },
        paragraphs: [],
        facts: [
          {
            label: { en: "My role", zh: "我的职责" },
            value: { en: "Director & Producer", zh: "导演、制片" },
          },
          {
            label: { en: "Creative team", zh: "创作团队" },
            value: {
              en: "张艺锦莹、但恒祎、黄显婷、骆佳瑜",
              zh: "张艺锦莹、但恒祎、黄显婷、骆佳瑜",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "the-entrepreneur-in-time",
    image: {
      src: "/images/nio/gpt-generated.png",
      alt: "GPT-generated illustration of a NIO-themed electric vehicle and battery-swapping station beneath a clock and sunset cityscape.",
      caption: { en: "Image generated by GPT", zh: "图片由 GPT 生成" },
      fit: "contain",
      showCaptionOnCards: true,
    },
    group: "research",
    title: {
      en: "The Entrepreneur in Time",
      zh: "《时间中的企业家：叙述未来，划分当下——以蔚来汽车为例》",
    },
    category: {
      en: "Anthropology · LSE dissertation",
      zh: "人类学 · LSE 学位论文",
    },
    motif: "time",
    intro: {
      en: "The Entrepreneur in Time: Narrating the Future, Dividing the Present at NIO.",
      zh: "《时间中的企业家：叙述未来，划分当下——以蔚来汽车为例》",
    },
    body: [
      {
        en: "My LSE anthropology dissertation explored future-making, hope, corporate narratives, battery-swapping infrastructure, and user communities at NIO, the Chinese electric vehicle company.",
        zh: "我的 LSE 人类学学位论文围绕中国电动汽车企业蔚来，探讨未来建构、希望、企业叙事、换电基础设施与用户社群。",
      },
    ],
    gallery: [],
    needed: {
      en: "An approved research summary and additional materials suitable for publication.",
      zh: "待补充：经确认的研究摘要，以及适合公开的补充材料。",
    },
  },
  {
    slug: "photography",
    group: "visual",
    title: { en: "Photography / Photo Album", zh: "摄影 / 相册" },
    category: { en: "Photography", zh: "摄影" },
    motif: "photo",
    intro: {
      en: "A space for photographs and the stories around them.",
      zh: "为照片与照片周围的故事留下一处空间。",
    },
    body: [],
    image: { ...macauPhotos[0], fit: "contain", naturalAspect: true },
    gallery: [],
    sections: [
      {
        id: "macau-photo-album",
        title: { en: "Macau", zh: "澳门" },
        paragraphs: [],
        photos: macauPhotos.slice(1),
      },
    ],
  },
  {
    slug: "anthro-documentary-series",
    image: {
      src: "/images/anthro-documentary/cover.png",
      alt: "A noticeboard with handmade posters beside an office door.",
      caption: {
        en: "Original image supplied for the Anthro Documentary Series.",
        zh: "人类学纪录片系列原始配图。",
      },
      fit: "contain",
    },
    group: "visual",
    title: { en: "Anthro Documentary Series", zh: "人类学纪录片系列（暂译）" },
    category: { en: "Documentary · Ongoing", zh: "纪录片 · 进行中" },
    motif: "series",
    intro: {
      en: "An ongoing anthropological documentary series. More to share when the work is ready.",
      zh: "一个进行中的人类学纪录片系列。待作品准备就绪，再与大家分享。",
    },
    body: [],
    gallery: [],
    needed: {
      en: "Further details will be shared when ready for public release.",
      zh: "更多内容将在适合公开时发布。",
    },
  },
  {
    slug: "you-never-know",
    image: {
      src: "/images/you-never-know/cover.png",
      alt: "People seated in a red-lit venue during a networking discussion; some faces are obscured in the supplied image.",
      caption: { en: "", zh: "" },
      fit: "contain",
    },
    group: "research",
    title: { en: "“You Never Know”", zh: "伦敦商业社交研究" },
    subtitle: {
      en: "Business Networking, Social Rituals & Hope in London",
      zh: "伦敦商业社交活动中的互动仪式与希望",
    },
    category: {
      en: "Independent Ethnographic Research · LSE Coursework",
      zh: "独立民族志研究 · LSE 课程作业",
    },
    motif: "walk",
    metadata: {
      en: "Two months · Nine networking events · London",
      zh: "两个月 · 九场商业社交活动 · 伦敦",
    },
    intro: {
      en: "Over two months, I conducted ethnographic fieldwork at nine business networking events in London, exploring how strangers navigate professional relationships, present themselves, and imagine future opportunities.",
      zh: "在为期两个月的田野调查中，我参与观察了伦敦的九场商业社交活动，探索陌生人如何建立职业关系、展示自我，并想象未来的合作机会。",
    },
    body: [],
    gallery: [],
    sections: [
      {
        id: "overview",
        title: { en: "Research Overview", zh: "研究概览" },
        paragraphs: [
          {
            en: "Through participant observation, I examined the unspoken rules and social rituals of networking, asking how hope and the possibility of future connections emerge through seemingly ordinary interactions.",
            zh: "通过参与式观察，我关注商业社交中的潜在规则与互动仪式，思考人们如何在看似日常的交流中，创造对未来关系与机会的期待。",
          },
        ],
        facts: [
          {
            label: { en: "Classification", zh: "项目性质" },
            value: {
              en: "Independently conducted LSE coursework research",
              zh: "在 LSE 学习期间独立开展的课程研究",
            },
          },
          {
            label: { en: "Methods", zh: "方法" },
            value: {
              en: "Ethnographic fieldwork and participant observation",
              zh: "民族志田野调查与参与式观察",
            },
          },
        ],
      },
      {
        id: "field",
        title: { en: "The Field", zh: "田野现场" },
        paragraphs: [],
        pending: {
          en: "Read the full original report below.",
          zh: "请阅读下方原始报告全文。",
        },
      },
      {
        id: "questions",
        title: { en: "Key Questions & Analysis", zh: "研究问题与分析" },
        paragraphs: [
          {
            en: "Research themes include self-presentation, professional identity, unspoken social rules, the exchange of contact information, social interactions and rituals, networking and future possibilities, and hope amid uncertainty.",
            zh: "研究主题包括自我呈现、职业身份、潜在社交规则、联系方式的交换、社会互动与仪式、社交与未来可能性，以及不确定性中的希望。",
          },
        ],
        pending: {
          en: "Read the full original report below.",
          zh: "请阅读下方原始报告全文。",
        },
      },
      {
        id: "materials",
        title: { en: "Original report", zh: "原始报告" },
        paragraphs: [],
        report: networkingReport,
      },
    ],
  },
  {
    slug: "south-asia-film-screening-series",
    image: {
      src: "/images/south-asia/recap-poster.png",
      alt: "South Asia Screening Night recap poster with four group photographs, film posters for My Beautiful Laundrette, Eeb Allay Ooo!, Fandry and Joyland, and SOAS Anthropology 2026.02–04.",
      caption: {
        en: "Original South Asia Screening Night recap poster.",
        zh: "南亚电影放映系列原创回顾海报。",
      },
      fit: "contain",
    },
    group: "community",
    title: { en: "South Asia Film Screening Series", zh: "南亚电影放映系列" },
    category: { en: "Community & Cultural Projects", zh: "社群与文化项目" },
    motif: "film",
    role: { en: "Founder & Lead Organiser", zh: "独立发起人及主要组织者" },
    metadata: {
      en: "SOAS University of London · 2026 · Four screenings",
      zh: "SOAS 伦敦大学亚非学院 · 2026年 · 四场放映",
    },
    intro: {
      en: "A student-led film screening initiative at SOAS, bringing together students and academics through South Asian cinema.",
      zh: "在 SOAS 发起并组织的南亚电影放映系列，通过电影与映后讨论，搭建学生与学者之间的交流空间。",
    },
    body: [],
    gallery: [],
    sections: [
      {
        id: "about-series",
        title: { en: "About the Series", zh: "关于放映系列" },
        paragraphs: [
          {
            en: "I organised four screenings, coordinating film selections, event promotion, and post-screening discussions. The series created an informal space for exploring South Asian societies, cultures, and everyday experiences through film and conversation.",
            zh: "我独立发起并主要负责组织四场放映活动，协调影片选题、活动宣传及映后讨论，希望让电影成为认识南亚社会、文化与日常生活的另一种方式。",
          },
        ],
      },
      {
        id: "programme",
        title: { en: "Screening Programme", zh: "放映片单" },
        paragraphs: [{ en: "Film release years", zh: "影片出品年份" }],
        items: [
          "My Beautiful Laundrette (1985)",
          "Eeb Allay Ooo! (2019)",
          "Fandry (2013)",
          "Joyland (2022)",
        ],
      },
      {
        id: "moments",
        title: { en: "Moments & Conversations", zh: "现场记录" },
        paragraphs: [],
        useGallery: true,
        pending: {
          en: "Original event photographs and approved discussion records will be added when available.",
          zh: "原创活动照片与经确认的讨论记录将在提供后加入。",
        },
      },
    ],
  },
  {
    slug: "dumpling-night",
    group: "community",
    title: { en: "Anthro Dumpling Night", zh: "人类学系饺子之夜" },
    homeCardIntro: {
      en: "Bringing a little Spring Festival spirit to our anthropology department in London — one dumpling at a time. An evening of cooking, sharing food, and getting to know each other beyond the classroom.",
      zh: "把中国年的热闹带进伦敦的人类学系，从一起包饺子开始。大家围坐在一起，动手做饭、分享食物，也在课堂之外认识彼此。",
    },
    category: { en: "Community & Cultural Projects", zh: "社群与文化项目" },
    motif: "walk",
    image: dumplingPosterPages[1],
    detailImage: dumplingPosterPages[0],
    intro: {
      en: "The department’s first Chinese New Year celebration, bringing the whole department together to make dumplings, share food, and connect across cultures.",
      zh: "调动整个系共同参与的首个华人春节活动，以包饺子、分享食物，连接不同文化背景的师生。",
    },
    body: [],
    gallery: [],
    sections: [
      {
        id: "dumpling-posters",
        title: { en: "Event Recap", zh: "活动回顾" },
        paragraphs: [],
        photos: [
          ...dumplingPosterPages.slice(1),
          {
            src: "/images/dumpling-night/programme.png",
            alt: "Original Anthro Dumpling Night 2026 programme with red lanterns and a schedule of the shared activities.",
            caption: {
              en: "",
              zh: "",
            },
            fit: "contain",
          },
        ],
      },
      {
        id: "spring-festival-story",
        title: { en: "Spring Festival in Dumplings", zh: "饺子里的春节" },
        paragraphs: [],
        report: { ...dumplingStory, byline: "Phyllis,Chase,Denis" },
      },
      {
        id: "dumpling-event-photos",
        title: { en: "Around the table", zh: "活动影像" },
        paragraphs: [],
        photos: [
          {
            src: "/images/dumpling-night/events/anthro-dumpling-1.JPG",
            alt: "Participants seated in a circle during a presentation at Anthro Dumpling Night.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/dumpling-night/events/anthro-dumpling-2.JPG",
            alt: "Participants standing around a table and making dumplings together.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/dumpling-night/events/anthro-dumpling-3.JPG",
            alt: "A presenter addressing attendees with a Welcome to Dumpling Night slide.",
            caption: {
              en: "",
              zh: "",
            },
          },
          {
            src: "/images/dumpling-night/events/anthro-dumpling-4.JPG",
            alt: "A presenter explaining a slide about the meaning of the Spring Festival.",
            caption: {
              en: "",
              zh: "",
            },
          },
        ],
      },
    ],
  },
];

export const workCategories: { id: Project["group"]; title: Pair }[] = [
  { id: "research", title: { en: "Research", zh: "研究" } },
  {
    id: "visual",
    title: { en: "Film & Visual Storytelling", zh: "影像与视觉叙事" },
  },
  {
    id: "community",
    title: { en: "Community & Cultural Projects", zh: "社群与文化项目" },
  },
];
// Homepage order is explicit so new projects never displace the approved selection.
export const selectedProjectSlugs = [
  "walking-with-anthropologists",
  "silence-and-everyday-life",
  "invisible-macau",
  "the-entrepreneur-in-time",
  "dumpling-night",
  "photography",
];
export function findProject(slug: string) {
  return projects.find(
    (project) => project.slug === slug || project.aliases?.includes(slug),
  );
}
