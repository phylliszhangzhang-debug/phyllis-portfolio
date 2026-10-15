// English biographical and project facts come from the supplied brief.
// Chinese UI/biographical text is an editorial translation for owner review.
// Do not add research findings or quotations without approved source copy.
export type Pair = { en: string; zh: string };
export type Photo = { src: string; alt: string; caption: Pair };
export type Project = {
  slug: string; title: Pair; category: Pair; intro: Pair; body: Pair[];
  motif: 'walk' | 'silence' | 'film' | 'time' | 'photo' | 'series';
  image?: Photo; gallery: Photo[]; needed: Pair; links?: { label: string; url: string }[];
};
export const identity = {
  name: 'Phyllis Zhang',
  role: { en: 'Social anthropologist, documentary filmmaker & creative practitioner.', zh: '社会人类学研究者、纪录片创作者与创意实践者。' },
  intro: { en: 'People, ordinary life, and the ways we make sense of the world.', zh: '关注人、日常生活，以及我们理解世界的方式。' },
  about: { en: 'My practice brings together documentary filmmaking, ethnographic research, photography, writing, and community-based cultural projects. I am interested in encounters: how people relate to one another, and how they understand and navigate the world.', zh: '我的实践连接纪录片创作、民族志研究、摄影、写作与社区文化项目。我关注人与人的相遇、彼此的联系，以及人们理解世界、置身其中的方式。' },
};
export const projects: Project[] = [
  { slug: 'walking-with-anthropologists', title: { en: 'Walking With Anthropologists', zh: '与人类学家一起行走' }, category: { en: 'Community · Cultural organising', zh: '社群 · 文化组织' }, motif: 'walk',
    intro: { en: 'Making room for encounters beyond the classroom.', zh: '为课堂之外的相遇创造空间。' },
    body: [{ en: 'I founded Walking With Anthropologists at SOAS to create informal opportunities for anthropology students and professors to meet outside conventional classrooms.', zh: '我在 SOAS 发起了 Walking With Anthropologists，为人类学学生与教授创造在传统课堂之外轻松交流的机会。' }, { en: 'Four walking events were organised, including a canal trip and a visit to Parliament. These walks and encounters helped students establish relationships with their peers, teachers, and department.', zh: '项目共组织了四次步行活动，包括一次运河之行和一次议会参访。这些行走与相遇帮助学生与同学、老师及院系建立联系。' }], gallery: [], needed: { en: 'Event photographs, album captions, and your reflections on informal encounters and community.', zh: '待补充：活动照片、相册说明，以及你对非正式相遇与社群的思考。' } },
  { slug: 'silence-and-everyday-life', title: { en: 'Silence and Everyday Life', zh: '沉默与日常生活' }, category: { en: 'Ethnography · Quaker research', zh: '民族志 · 贵格会研究' }, motif: 'silence',
    intro: { en: 'Silence, ordinary ethics, and communal life among London Quakers.', zh: '伦敦贵格会群体中的沉默、日常伦理与共同生活。' },
    body: [{ en: 'My MRes dissertation examined silence and ethical practice among London Quakers. The research involved participant observation and interviews, with attention to everyday social life and community.', zh: '我的 MRes 学位论文探讨伦敦贵格会群体中的沉默与伦理实践。研究采用参与式观察与访谈，关注日常社会生活与社群。' }], gallery: [], needed: { en: 'An approved research summary and any materials cleared for public sharing. Participant identities will remain private.', zh: '待补充：经确认的研究摘要，以及获准公开的材料。研究参与者身份将予以保密。' } },
  { slug: 'invisible-little-lotus-island', title: { en: 'Invisible Little Lotus Island', zh: '《隐形的小莲岛》' }, category: { en: 'Documentary · Visual storytelling', zh: '纪录片 · 视觉叙事' }, motif: 'film',
    intro: { en: 'A documentary and visual storytelling project.', zh: '一项纪录片与视觉叙事实践。' }, body: [], gallery: [], needed: { en: 'Original film stills, an approved synopsis, production credits, personal reflections, and any confirmed screening information.', zh: '待补充：影片剧照、经确认的简介、制作信息、个人创作思考，以及已确认的放映信息。' } },
  { slug: 'the-entrepreneur-in-time', title: { en: 'The Entrepreneur in Time', zh: '《时间中的企业家》' }, category: { en: 'Anthropology · LSE dissertation', zh: '人类学 · LSE 学位论文' }, motif: 'time',
    intro: { en: 'The Entrepreneur in Time: Narrating the Future, Dividing the Present at NIO.', zh: '中文论文全名待确认' },
    body: [{ en: 'My LSE anthropology dissertation explored future-making, hope, corporate narratives, battery-swapping infrastructure, and user communities at NIO, the Chinese electric vehicle company.', zh: '我的 LSE 人类学学位论文围绕中国电动汽车企业蔚来，探讨未来建构、希望、企业叙事、换电基础设施与用户社群。' }], gallery: [], needed: { en: 'An approved research summary and additional materials suitable for publication.', zh: '待补充：经确认的研究摘要，以及适合公开的补充材料。' } },
  { slug: 'photography', title: { en: 'Photography / Photo Album', zh: '摄影 / 相册' }, category: { en: 'Photography', zh: '摄影' }, motif: 'photo',
    intro: { en: 'A space for photographs and the stories around them.', zh: '为照片与照片周围的故事留下一处空间。' }, body: [], gallery: [], needed: { en: 'Your original photographs, album groupings, image descriptions, and captions. No stock photography is used here.', zh: '待补充：你的原创照片、相册分类、图像描述与图注。此处未使用图库照片。' } },
  { slug: 'anthro-documentary-series', title: { en: 'Anthro Documentary Series', zh: '人类学纪录片系列（暂译）' }, category: { en: 'Documentary · Ongoing', zh: '纪录片 · 进行中' }, motif: 'series',
    intro: { en: 'An ongoing anthropological documentary series. More to share when the work is ready.', zh: '一个进行中的人类学纪录片系列。待作品准备就绪，再与大家分享。' }, body: [], gallery: [], needed: { en: 'Further details will be shared when ready for public release.', zh: '更多内容将在适合公开时发布。' } },
];
export type Article = { title: Pair; date: string; intro: Pair; category: Pair; url: string };
// Add only actual published articles, with real dates and URLs (including WeChat).
export const articles: Article[] = [];
export type Note = { title: Pair; date?: string; text: Pair };
export const notes: Note[] = [];
export const education = [
  { degree: { en: 'MRes research · Social Anthropology', zh: '社会人类学 MRes 研究' }, school: 'SOAS University of London' },
  { degree: { en: 'MSc · Social Anthropology', zh: '社会人类学理学硕士' }, school: 'London School of Economics and Political Science' },
  { degree: { en: 'BA · Film Production', zh: '电影制作学士' }, school: 'Macau University of Science and Technology' },
];
export const homePhoto: Photo | null = null;
export const portrait: Photo | null = null;
export const contact: { email?: string } = {};
// Add the actual PDF to public/files, then set e.g. '/files/phyllis-zhang-cv.pdf'.
export const cvPdf: string | null = null;
