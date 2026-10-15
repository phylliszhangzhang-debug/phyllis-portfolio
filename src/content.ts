import type { Photo } from "./types";
export type { Pair, Photo, Project } from "./types";
export {
  projects,
  workCategories,
  selectedProjectSlugs,
  findProject,
} from "./projects";

export const identity = {
  name: "Phyllis Zhang",
  role: {
    en: "Researcher, Documentary Filmmaker & Creative Practitioner.",
    zh: "研究者、纪录片创作者与创意实践者。",
  },
  intro: {
    en: "People, ordinary life, and the ways we make sense of the world.",
    zh: "关注人、日常生活，以及我们理解世界的方式。",
  },
  about: {
    en: "I studied Film Production in Macau, then Social Anthropology at LSE and SOAS in London. My work brings documentary filmmaking, ethnographic fieldwork, writing, and photography into conversation with one another.",
    zh: "我在澳门学习影视制作，之后在伦敦的 LSE 与 SOAS 学习社会人类学。我的实践让纪录片创作、民族志田野调查、写作与摄影彼此对话。",
  },
  aboutCommunity: {
    en: "I also bring people together through community activities, including Walking With Anthropologists and the South Asia Film Screening Series, which I founded and organised. Across these practices, I am interested in encounters, social relationships, community, and how people imagine and navigate their lives.",
    zh: "我也通过社群活动连接人与人，包括我发起并组织的 Walking With Anthropologists 与南亚电影放映系列。在这些实践中，我关注相遇、社会关系、社群，以及人们如何想象未来、理解并应对自己的生活。",
  },
};
export const education = [
  {
    degree: { en: "MRes Social Anthropology", zh: "社会人类学研究型硕士" },
    school: "SOAS University of London",
    status: {
      en: "Research undertaken; award status not confirmed.",
      zh: "曾开展相关研究；学位授予状态尚未确认。",
    },
  },
  {
    degree: { en: "MSc Social Anthropology", zh: "社会人类学理学硕士" },
    school: "London School of Economics and Political Science",
  },
  {
    degree: { en: "BA · Film Production", zh: "电影制作学士" },
    school: "Macau University of Science and Technology",
  },
];
export const homePhoto: Photo | null = null;
export const portrait: Photo | null = null;
export const contact: { email?: string } = {};
// Add the actual PDF to public/files, then set e.g. '/files/phyllis-zhang-cv.pdf'.
export const cvPdf: string | null = null;
