import type { Pair, Project } from "./types";

// Canonical project records, using owner-supplied facts and approved copy.
export const projects: Project[] = [
  {
    slug: "walking-with-anthropologists",
    group: "community",
    title: { en: "Walking With Anthropologists", zh: "与人类学家一起行走" },
    category: { en: "Community · Cultural organising", zh: "社群 · 文化组织" },
    motif: "walk",
    intro: {
      en: "Making room for encounters beyond the classroom.",
      zh: "为课堂之外的相遇创造空间。",
    },
    body: [
      {
        en: "I founded Walking With Anthropologists at SOAS to create informal opportunities for anthropology students and professors to meet outside conventional classrooms.",
        zh: "我在 SOAS 发起了 Walking With Anthropologists，为人类学学生与教授创造在传统课堂之外轻松交流的机会。",
      },
      {
        en: "Four walking events were organised, including a canal trip and a visit to Parliament. These walks and encounters helped students establish relationships with their peers, teachers, and department.",
        zh: "项目共组织了四次步行活动，包括一次运河之行和一次议会参访。这些行走与相遇帮助学生与同学、老师及院系建立联系。",
      },
    ],
    gallery: [],
    needed: {
      en: "Event photographs, album captions, and your reflections on informal encounters and community.",
      zh: "待补充：活动照片、相册说明，以及你对非正式相遇与社群的思考。",
    },
  },
  {
    slug: "silence-and-everyday-life",
    group: "research",
    title: {
      en: "“We Always Fail”: Silence, Quakerism, and the Practice of Ethical Life in London",
      zh: "贵格会研究（中文标题待确认）",
    },
    cardTitle: { en: "“We Always Fail”", zh: "贵格会研究" },
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
    needed: {
      en: "An approved research summary and any materials cleared for public sharing. Participant identities will remain private.",
      zh: "待补充：经确认的研究摘要，以及获准公开的材料。研究参与者身份将予以保密。",
    },
  },
  {
    slug: "invisible-macau",
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
    needed: {
      en: "Original film stills, approved behind-the-scenes reflections and photographs, and any confirmed screening information.",
      zh: "待补充：原创剧照、经确认的幕后创作思考与照片，以及已确认的放映信息。",
    },
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
        id: "stills",
        title: { en: "Film Stills", zh: "影片剧照" },
        paragraphs: [],
        useGallery: true,
        pending: {
          en: "Original film stills will be added here when supplied.",
          zh: "原创影片剧照将在提供后加入。",
        },
      },
      {
        id: "behind-the-film",
        title: { en: "Behind the Film", zh: "幕后创作" },
        paragraphs: [],
        photos: [],
        annotation: "behind the frame",
        pending: {
          en: "Reflections and original behind-the-scenes photographs will be shared when ready.",
          zh: "创作思考与原创幕后照片将在准备好后分享。",
        },
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
    group: "research",
    title: { en: "The Entrepreneur in Time", zh: "《时间中的企业家》" },
    category: {
      en: "Anthropology · LSE dissertation",
      zh: "人类学 · LSE 学位论文",
    },
    motif: "time",
    intro: {
      en: "The Entrepreneur in Time: Narrating the Future, Dividing the Present at NIO.",
      zh: "中文论文全名待确认",
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
    gallery: [],
    needed: {
      en: "Your original photographs, album groupings, image descriptions, and captions. No stock photography is used here.",
      zh: "待补充：你的原创照片、相册分类、图像描述与图注。此处未使用图库照片。",
    },
  },
  {
    slug: "anthro-documentary-series",
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
    needed: {
      en: "The original observational report and any photographs approved for public sharing. Identifiable participants and organiser-provided images require appropriate permissions.",
      zh: "待补充：原始观察报告，以及获准公开的照片。涉及可识别参与者或主办方提供的图片，需先确认使用权限。",
    },
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
          en: "Original field documentation and permission-cleared photographs are awaiting review.",
          zh: "原始田野记录与获准公开的照片待审核后补充。",
        },
      },
      {
        id: "observations",
        title: { en: "What I Observed", zh: "我的观察" },
        paragraphs: [],
        pending: {
          en: "Observations will be drawn from the original report after it has been supplied and checked.",
          zh: "观察内容将在提供并核对原始报告后整理。",
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
          en: "The original analysis will be added only after the report is available and checked.",
          zh: "原始分析将在报告提供并核对后补充。",
        },
      },
      {
        id: "materials",
        title: { en: "Research Materials", zh: "研究材料" },
        paragraphs: [
          {
            en: "Original report title: “‘You Never Know’: How Hope is fostering in ritualized Business Networking Events in London”",
            zh: "原始报告及相关材料待提供。报告原题保留原文措辞。",
          },
        ],
        pending: {
          en: "Report text and download are not yet available.",
          zh: "报告正文与下载文件暂未提供。",
        },
      },
    ],
  },
  {
    slug: "south-asia-film-screening-series",
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
    needed: {
      en: "The original recap poster, confirmed screening programme, and permission-cleared event photographs.",
      zh: "待补充：原创回顾海报、经确认的放映片单，以及获准公开的活动照片。",
    },
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
        paragraphs: [],
        pending: {
          en: "The programme will be added after checking the original recap poster. Film titles and screening dates are not yet displayed.",
          zh: "放映片单将在核对原始回顾海报后补充。影片名称与放映日期暂不展示。",
        },
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
];
export function findProject(slug: string) {
  return projects.find(
    (project) => project.slug === slug || project.aliases?.includes(slug),
  );
}
