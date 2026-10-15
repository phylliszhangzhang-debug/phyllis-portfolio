import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  projects,
  workCategories,
  selectedProjectSlugs,
  findProject,
  identity,
  education,
  homePhoto,
  portrait,
  contact,
} from "./content";
import type { Pair, Project, Photo, Fact } from "./types";
import {
  articles,
  writingCategories,
  articleHref,
  canReadFullEssay,
} from "./writing-content";
import type { LocalArticle } from "./writing-content";
import {
  notes,
  gratitudeEntries,
  newestFirst,
  notesIntro,
} from "./notes-content";
import "./styles.css";
import {
  homepageIntro,
  wordsHeading,
  wordsIntro,
  homeAbout,
} from "./home-content";

function Bilingual({
  text,
  as = "p",
  className = "",
}: {
  text: Pair;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  className?: string;
}) {
  const Tag = as;
  return (
    <Tag className={`bilingual ${className}`}>
      <span>{text.en}</span>
      <span className="zh" lang="zh-Hans">
        {text.zh}
      </span>
    </Tag>
  );
}
function Sketch({
  kind = "walk",
  className = "",
}: {
  kind?: Project["motif"];
  className?: string;
}) {
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 300 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "walk" ? (
        <>
          <path d="M35 168Q130 147 263 171M67 160l14-48 22-7 19 49m-40-43-17 22-18-6m55-21 21 20 19-12M84 111l2-25m-10-12c-4-15 19-20 20-4 2 14-17 18-20 4M168 164l9-47 20-6 21 48m-39-40-17 19-15-4m48-20 16 18 20-13m-49-5-2-24m-9-15c-5-17 19-21 21-5 2 13-17 18-21 5" />
          <path d="m125 60 18-13 21 8m-23-8-3 19M241 93l3-15m-10 6 19 1" />
        </>
      ) : kind === "silence" ? (
        <>
          <path d="M69 161h165M85 159V87h127v72M75 88l74-45 75 45M110 160v-48h25v48m29-1v-47h25v47M145 70h12m-6-6v12M49 113q-12-12 0-25m193 28q14-15 1-29" />
          <path d="M118 184q36 4 66-1" />
        </>
      ) : kind === "film" || kind === "series" ? (
        <>
          <path d="m68 82 138-7 5 89-139 5zM76 66l127-22 4 23-134 23zM91 64l15 16m18-23 16 17m19-22 16 16m12-21 15 15M129 108l1 36 31-19z" />
          <path d="m226 62 6-14m-1 30 17-2M45 148l-9 8" />
        </>
      ) : kind === "time" ? (
        <>
          <circle cx="150" cy="104" r="58" />
          <path d="M151 57v9m47 38h-9m-39 48v-8m-48-40h9m39-29 1 31 24 15M121 36q26-13 50-2m-7-7 10 7-10 6M93 168h117" />
        </>
      ) : (
        <>
          <path d="m66 66 154 6-5 100-151-5zM80 82l125 5-4 63-123-4zM80 134l33-28 26 20 20-15 43 34" />
          <circle cx="175" cy="103" r="7" />
          <path d="m92 57 125-11 12 108m-128 21 96 3" />
        </>
      )}
    </svg>
  );
}
function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}
const navigation = [
  ["/", "Home", "首页"],
  ["/work", "Work", "作品"],
  ["/writing", "Writing", "写作"],
  ["/notes", "Notes", "边边角角"],
  ["/about", "About", "关于"],
];
// Preserve old CV bookmarks without exposing a standalone CV page.
function currentPath() {
  const route =
    window.location.hash.slice(1) ||
    (/^\/cv\/?$/.test(window.location.pathname) ? "/cv" : "/");
  if (/^\/cv\/?$/.test(route)) {
    const base = /^\/cv\/?$/.test(window.location.pathname)
      ? "/"
      : window.location.pathname;
    window.history.replaceState(
      null,
      "",
      `${base}${window.location.search}#/about`,
    );
    return "/about";
  }
  return route;
}
function App() {
  const [path, setPath] = useState(currentPath);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const change = () => {
      setPath(currentPath());
      setMenu(false);
      window.scrollTo(0, 0);
      requestAnimationFrame(() =>
        document.getElementById("main")?.focus({ preventScroll: true }),
      );
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  const project = path.startsWith("/work/")
    ? findProject(path.slice("/work/".length))
    : undefined;
  const article = articles.find(
    (item): item is LocalArticle =>
      item.kind === "local" && path === `/writing/${item.slug}`,
  );
  const pageTitle =
    article?.title.en ??
    project?.title.en ??
    navigation.find((n) => n[0] === path)?.[1] ??
    "Page not found";
  useEffect(() => {
    document.title = `${path === "/notes" ? "Notes / 边边角角" : pageTitle === "Home" ? "An Anthropologist’s Sketchbook" : pageTitle} — Phyllis Zhang`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        project
          ? `${project.title.en} / ${project.title.zh} — ${project.intro.en}`
          : article
            ? `${article.title.en} — ${article.classification.en}. ${canReadFullEssay(article) ? "Source-checked English essay." : "Approved summary; full text pending source verification."}`
            : "Phyllis Zhang / 张艺锦莹 — Research, visual storytelling, and community building.",
      );
  }, [pageTitle, project, article, path]);
  useEffect(() => {
    if (project && path !== `/work/${project.slug}`) {
      window.history.replaceState(null, "", `#/work/${project.slug}`);
      setPath(`/work/${project.slug}`);
    }
  }, [path, project]);
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#/" aria-label="Phyllis Zhang 张艺锦莹 home">
          Phyllis Zhang
          <span className="brand-chinese" lang="zh-Hans">
            张艺锦莹
          </span>
          <span className="brand-positioning">
            RESEARCH · VISUAL STORYTELLING · COMMUNITY BUILDING
          </span>
          <span className="brand-positioning-zh" lang="zh-Hans">
            研究 · 视觉叙事 · 社群营造
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close / 关闭" : "Menu / 菜单"}
        </button>
        <nav
          id="navigation"
          className={menu ? "open" : ""}
          aria-label="Main navigation"
        >
          {navigation.map(([url, en, zh]) => (
            <a
              key={url}
              href={`#${url}`}
              aria-current={
                path === url ||
                (url === "/work" && !!project) ||
                (url === "/writing" && !!article)
                  ? "page"
                  : undefined
              }
            >
              {en}
              <span lang="zh-Hans">{zh}</span>
            </a>
          ))}
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        {article ? (
          <ArticlePage article={article} />
        ) : project ? (
          <ProjectPage project={project} />
        ) : path === "/" ? (
          <Home />
        ) : path === "/work" ? (
          <Work />
        ) : path === "/writing" ? (
          <Writing />
        ) : path === "/notes" ? (
          <Notes />
        ) : path === "/about" ? (
          <About />
        ) : (
          <section className="page">
            <Bilingual
              as="h1"
              text={{ en: "A page not yet written.", zh: "这一页尚未写下。" }}
            />
            <a className="text-link" href="#/">
              Return home ↗
            </a>
          </section>
        )}
      </main>
      <footer className="site-footer">
        <div>
          <a href="#/" className="footer-name">
            Phyllis Zhang
          </a>
          <Bilingual
            text={{
              en: "Researching, filming, making things happen.",
              zh: "做研究，拍片子，让事情发生。",
            }}
          />
        </div>
        <a className="text-link" href="#/about">
          A little about me <Arrow />
          <span className="zh" lang="zh-Hans">
            关于我
          </span>
        </a>
        <span className="footer-note">
          Always something to be curious about.
          <br />
          <span lang="zh-Hans">总有些值得好奇的事。</span>
        </span>
      </footer>
    </>
  );
}
function PageHeading({
  number,
  label,
  title,
  intro,
}: {
  number: string;
  label: Pair;
  title: Pair;
  intro?: Pair;
}) {
  return (
    <div className="page-heading">
      <Bilingual
        className="eyebrow"
        text={{ en: `${number} / ${label.en}`, zh: label.zh }}
      />
      <Bilingual as="h1" text={title} />
      {intro && <Bilingual className="page-intro" text={intro} />}
    </div>
  );
}
function ImageSpace({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div className={`image-space ${project.motif} ${large ? "large" : ""}`}>
      {project.image ? (
        <img src={project.image.src} alt={project.image.alt} loading="lazy" />
      ) : (
        <>
          <Sketch kind={project.motif} />
          <span className="image-label">
            {project.motif === "series"
              ? "A work in progress / 持续创作中"
              : "Original image to come / 原创影像待补充"}
          </span>
        </>
      )}
    </div>
  );
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <a className="project-card group" href={`#/work/${project.slug}`}>
      <div className="card-image">
        <ImageSpace project={project} />
        <span className="card-index">0{index + 1}</span>
        <span className="card-open" aria-hidden="true">
          <Arrow />
        </span>
      </div>
      <Bilingual className="category" text={project.category} />
      <Bilingual as="h3" text={project.cardTitle ?? project.title} />
      {(project.role || project.metadata) && (
        <div className="film-credits">
          {project.role && <Bilingual text={project.role} />}{" "}
          {project.metadata && <Bilingual text={project.metadata} />}
        </div>
      )}
      <Bilingual className="card-intro" text={project.intro} />
    </a>
  );
}
function Home() {
  return (
    <>
      <section className="editorial-hero">
        <figure className="opening-photo">
          {homePhoto ? (
            <img src={homePhoto.src} alt={homePhoto.alt} />
          ) : (
            <div>
              <span className="placeholder-hand">
                A photograph from my everyday world
              </span>
              <span className="eyebrow">Photograph placeholder</span>
            </div>
          )}
          <figcaption>
            {homePhoto ? (
              <Bilingual text={homePhoto.caption} />
            ) : (
              <>
                01 / A space for my own photography{" "}
                <span lang="zh-Hans">日常影像，待补充</span>
              </>
            )}
          </figcaption>
        </figure>
        <div className="opening-intro">
          <div className="intro-heading">
            <Bilingual
              as="h1"
              text={{ en: "Hi, I’m Phyllis.", zh: "你好，我是锦莹。" }}
            />
            <span className="hero-annotation" aria-hidden="true">
              that's me!
              <svg
                viewBox="0 0 78 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M72 6Q50 36 8 20m7-7-9 7 9 8" />
              </svg>
            </span>
          </div>
          <Bilingual
            as="h2"
            text={{
              en: "An anthropology researcher and documentary filmmaker.",
              zh: "人类学研究者 / 纪录片创作者",
            }}
          />
          <Bilingual text={homepageIntro} />
          <a className="text-link" href="#/about">
            More about me <Arrow />
            <span className="zh" lang="zh-Hans">
              更多关于我
            </span>
          </a>
        </div>
      </section>
      <section className="section selected-section">
        <div className="section-heading">
          <div>
            <Bilingual
              as="h2"
              text={{ en: "Selected Work", zh: "作品与项目" }}
            />
          </div>
          <span className="selection-note" aria-hidden="true">
            things I've made &amp; explored
            <svg
              viewBox="0 0 230 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            >
              <path d="M3 8Q96 1 226 6M18 11q98-6 190-1" />
            </svg>
          </span>
        </div>
        <div className="home-projects">
          {selectedProjectSlugs.map((slug, i) => {
            const p = findProject(slug)!;
            return <ProjectCard key={p.slug} project={p} index={i} />;
          })}
        </div>
        <a className="text-link all-work" href="#/work">
          Explore all work <Arrow />
          <span className="zh" lang="zh-Hans">
            浏览全部作品
          </span>
        </a>
      </section>
      <section className="reading-section">
        <div className="reading-mark" aria-hidden="true">
          “
        </div>
        <div>
          <span className="eyebrow">02 / Words & observations</span>
          <Bilingual as="h2" text={wordsHeading} />
          <Bilingual text={wordsIntro} />
          <div className="inline-links">
            <a className="text-link" href="#/writing">
              Writing <Arrow />
              <span className="zh" lang="zh-Hans">
                写作
              </span>
            </a>
            <a className="text-link" href="#/notes">
              Notes <Arrow />
              <span className="zh" lang="zh-Hans">
                边边角角
              </span>
            </a>
          </div>
        </div>
        <div className="margin-note">
          look closely,
          <br />
          leave room
          <br />
          for questions.
          <span aria-hidden="true">
            <svg
              viewBox="0 0 60 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <path d="M15 5q34 6 28 36m-9-8 8 11 10-9" />
            </svg>
          </span>
        </div>
      </section>
      <section className="about-strip">
        <span className="eyebrow">A note of introduction / 自我介绍</span>
        <Bilingual
          as="h2"
          text={{ en: "Hello, I'm Phyllis.", zh: "你好，我是锦莹。" }}
        />
        <Bilingual text={homeAbout} />
        <a className="text-link" href="#/about">
          More about me <Arrow />
          <span className="zh" lang="zh-Hans">
            更多关于我
          </span>
        </a>
      </section>
    </>
  );
}
function Work() {
  return (
    <section className="page">
      <PageHeading
        number="01"
        label={{ en: "Work", zh: "作品" }}
        title={{ en: "Across practices.", zh: "在不同实践之间。" }}
        intro={{
          en: "Ethnographic research, documentary filmmaking, photography, and cultural event organising.",
          zh: "民族志研究、纪录片创作、摄影与文化活动策划。",
        }}
      />
      <div className="category-links" aria-label="Work categories">
        {workCategories.map((category) => (
          <button
            type="button"
            className="text-link"
            key={category.id}
            onClick={() =>
              document.getElementById(`work-${category.id}`)?.scrollIntoView()
            }
          >
            <Bilingual as="span" text={category.title} />
          </button>
        ))}
      </div>
      {workCategories.map((category) => (
        <section
          className="work-category"
          id={`work-${category.id}`}
          key={category.id}
        >
          <Bilingual as="h2" text={category.title} />
          <div className="project-grid work-grid">
            {projects
              .filter((p) => p.group === category.id)
              .map((p) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  index={projects.indexOf(p)}
                />
              ))}
          </div>
        </section>
      ))}
    </section>
  );
}
function PhotoGallery({ photos }: { photos: Photo[] }) {
  return photos.length > 0 ? (
    <div className="gallery">
      {photos.map((photo) => (
        <figure key={photo.src}>
          <img src={photo.src} alt={photo.alt} loading="lazy" />
          {(photo.caption.en || photo.caption.zh) && (
            <figcaption>
              <Bilingual text={photo.caption} />
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  ) : null;
}
function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="project-facts">
      {facts.map((fact, index) => (
        <div key={index}>
          <dt>
            <Bilingual as="span" text={fact.label} />
          </dt>
          <dd>
            <Bilingual as="span" text={fact.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
function ProjectPage({ project: p }: { project: Project }) {
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <article className="page project-page">
      <a className="back-link" href="#/work">
        ← All work <span lang="zh-Hans">全部作品</span>
      </a>
      <div className="project-heading">
        <Bilingual className="eyebrow" text={p.category} />
        <Bilingual as="h1" text={p.title} />
        {p.subtitle && (
          <Bilingual className="project-subtitle" text={p.subtitle} />
        )}
        {(p.role || p.metadata) && (
          <div className="film-credits">
            {p.role && <Bilingual text={p.role} />}{" "}
            {p.metadata && <Bilingual text={p.metadata} />}
          </div>
        )}
        <Bilingual className="page-intro" text={p.intro} />
      </div>
      <figure>
        <ImageSpace project={p} large />
        {p.image && (
          <figcaption>
            <Bilingual text={p.image.caption} />
          </figcaption>
        )}
      </figure>
      {p.sections ? (
        p.sections.map((section) => {
          const photos = section.useGallery
            ? p.gallery
            : (section.photos ?? []);
          return (
            <section
              className="project-body project-section"
              id={section.id}
              key={section.id}
            >
              <Bilingual as="h2" text={section.title} />
              <div>
                {section.annotation && (
                  <span className="section-annotation" aria-hidden="true">
                    {section.annotation}
                  </span>
                )}
                {section.paragraphs.map((paragraph, index) => (
                  <Bilingual
                    className="preserve-paragraphs"
                    text={paragraph}
                    key={index}
                  />
                ))}
                {section.facts && <Facts facts={section.facts} />}
                <PhotoGallery photos={photos} />
                {section.pending && photos.length === 0 && (
                  <Bilingual
                    className="pending-material"
                    text={section.pending}
                  />
                )}
              </div>
            </section>
          );
        })
      ) : (
        <div className="project-body">
          <div className="eyebrow">
            About the project
            <br />
            <span lang="zh-Hans">关于项目</span>
          </div>
          <div>
            {p.body.map((b, i) => (
              <Bilingual key={i} text={b} />
            ))}
          </div>
        </div>
      )}
      <div className="editorial-note">
        <Bilingual
          className="eyebrow"
          text={{
            en:
              p.motif === "series"
                ? "Still unfolding"
                : "Materials to be added",
            zh: p.motif === "series" ? "持续创作中" : "待补充材料",
          }}
        />
        <Bilingual text={p.needed} />
      </div>
      {p.links?.map((link) => (
        <a
          key={link.url}
          className="text-link"
          href={link.url}
          target="_blank"
          rel="noreferrer"
        >
          {link.label} ↗
        </a>
      ))}
      {!p.sections?.some((section) => section.useGallery) && (
        <PhotoGallery photos={p.gallery} />
      )}
      <div className="next-project">
        <span className="eyebrow">Keep exploring / 继续翻阅</span>
        <a href={`#/work/${next.slug}`}>
          <Bilingual as="h2" text={next.title} />
          <Arrow />
        </a>
      </div>
    </article>
  );
}
function Writing() {
  return (
    <section className="page">
      <PageHeading
        number="02"
        label={{ en: "Writing", zh: "写作" }}
        title={{ en: "Words, considered.", zh: "文字与思考。" }}
        intro={{
          en: "Questions about people, culture, relationships, and the worlds we live in.",
          zh: "关于人、文化、关系，以及我们所生活的世界。",
        }}
      />
      {writingCategories.map((category) => (
        <section className="writing-category" key={category.id}>
          <Bilingual as="h2" text={category.title} />
          <Bilingual className="category-intro" text={category.intro} />
          {articles.some((article) => article.category === category.id) ? (
            <div className="article-list">
              {articles
                .filter((article) => article.category === category.id)
                .map((article) => (
                  <a
                    key={articleHref(article)}
                    href={articleHref(article)}
                    {...(article.kind === "external"
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <div className="article-meta">
                      <Bilingual text={article.classification} />
                      {article.date && (
                        <time dateTime={article.date}>{article.date}</time>
                      )}
                    </div>
                    <Bilingual as="h3" text={article.title} />
                    <Bilingual
                      className="preserve-paragraphs"
                      text={article.intro}
                    />
                    <span className="text-link">
                      {article.kind === "external"
                        ? "Read original / 阅读原文 ↗"
                        : canReadFullEssay(article)
                          ? "Read essay / 阅读全文 ↗"
                          : "Read introduction / 阅读简介 ↗"}
                    </span>
                  </a>
                ))}
            </div>
          ) : (
            <Bilingual
              className="pending-material"
              text={{
                en: "No essays have been added to this section yet.",
                zh: "此栏目暂未添加文章。",
              }}
            />
          )}
        </section>
      ))}
    </section>
  );
}
function ArticlePage({ article }: { article: LocalArticle }) {
  const verified = canReadFullEssay(article);
  return (
    <article className="page essay-page">
      <a className="back-link" href="#/writing">
        ← Writing / 写作
      </a>
      <div className="page-heading">
        <Bilingual className="eyebrow" text={article.classification} />
        <Bilingual as="h1" text={article.title} />
        {article.date && <time dateTime={article.date}>{article.date}</time>}
      </div>
      <div className="essay-column">
        <Bilingual
          className="essay-intro preserve-paragraphs"
          text={article.intro}
        />
        {article.openingImage ? (
          <figure>
            <img
              src={article.openingImage.src}
              alt={article.openingImage.alt}
            />
            <figcaption>
              <Bilingual text={article.openingImage.caption} />
            </figcaption>
          </figure>
        ) : (
          <div className="essay-image-placeholder">
            <Bilingual
              text={{
                en: "Original opening image awaiting upload: a plant growing between bricks.",
                zh: "原始开篇图片待提供：砖缝中生长的植物。",
              }}
            />
            <Bilingual
              text={{
                en: "The visual metaphor connects religious life across different domains of social life.",
                zh: "这一视觉隐喻连接宗教在社会生活不同领域中的存在。",
              }}
            />
          </div>
        )}
        {verified ? (
          <div className="essay-body" lang="en">
            {article.sections.map((section, index) => (
              <section key={index}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </section>
            ))}
            <section className="essay-references">
              <h2>References</h2>
              <ul>
                {article.references.map((reference, index) => (
                  <li key={index}>{reference}</li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <section className="editorial-note source-pending">
            <Bilingual
              as="h2"
              text={{
                en: "Full essay awaiting source verification",
                zh: "全文待核对原始文件",
              }}
            />
            <Bilingual
              text={{
                en: `The approved introduction is available above. The complete English essay, original section headings, in-text citations, and reference list will be added after ${article.sourceFile} is supplied and checked.`,
                zh: `以上为经确认的简介。完整英文正文、原有章节标题、文内引用与参考文献，将在提供并核对 ${article.sourceFile} 后加入。`,
              }}
            />
          </section>
        )}
      </div>
    </article>
  );
}
function Notes() {
  return (
    <section className="page notes-page">
      <PageHeading
        number="03"
        label={{ en: "Notes", zh: "边边角角" }}
        title={{ en: "In the Margins.", zh: "想到什么，记点什么。" }}
        intro={notesIntro}
      />
      {notes.length ? (
        <div className="notes-list">
          {notes.map((note, index) => (
            <article key={index}>
              {note.date && <time dateTime={note.date}>{note.date}</time>}
              <Bilingual as="h2" text={note.title} />
              <Bilingual text={note.text} />
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state notebook">
          <span className="notebook-annotation" aria-hidden="true">
            room to notice
          </span>
          <Bilingual
            as="h2"
            text={{
              en: "Room for the small things.",
              zh: "为细小的事物，留一点空间。",
            }}
          />
          <Bilingual
            text={{
              en: "This notebook is waiting for its first entry. Observations, fragments, and reflections will be added here when ready.",
              zh: "边边角角正等待第一篇内容。观察、片段与思考将在准备好后陆续加入。",
            }}
          />
        </div>
      )}
      <section className="gratitude-section">
        <div className="section-heading">
          <Bilingual as="h2" text={{ en: "Daily Gratitude", zh: "每日感谢" }} />
          <svg
            className="gratitude-sketch"
            viewBox="0 0 50 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <path d="M25 52V25m0 16q-13 0-15-11 14-2 15 11m0-6q12-2 14-12-13 1-14 12" />
            <path d="M25 23c-15 4-17-12-6-12-7-13 11-18 12-5 13-8 19 9 6 12 9 10-8 19-12 5Z" />
          </svg>
        </div>
        {gratitudeEntries.length ? (
          <div className="gratitude-grid">
            {newestFirst(gratitudeEntries).map((entry) => (
              <article className="gratitude-card" key={entry.id}>
                <time dateTime={entry.date}>{entry.date}</time>
                <figure>
                  <img
                    src={entry.photo.src}
                    alt={entry.photo.alt}
                    loading="lazy"
                  />
                  {(entry.photo.caption.en || entry.photo.caption.zh) && (
                    <figcaption>
                      <Bilingual text={entry.photo.caption} />
                    </figcaption>
                  )}
                </figure>
                {entry.title && <Bilingual as="h3" text={entry.title} />}
                <Bilingual className="preserve-paragraphs" text={entry.text} />
              </article>
            ))}
          </div>
        ) : (
          <div className="gratitude-empty">
            <Bilingual
              text={{
                en: "A small photo diary for things I feel grateful for. The first photograph and words will be added here when ready.",
                zh: "用照片与几句话，记录值得感谢的小事。第一张照片与文字将在准备好后加入。",
              }}
            />
          </div>
        )}
      </section>
    </section>
  );
}
function Education() {
  return (
    <div className="education-list">
      {education.map((e) => (
        <div key={e.school}>
          <Bilingual as="h3" text={e.degree} />
          <p>{e.school}</p>
        </div>
      ))}
    </div>
  );
}
function About() {
  return (
    <section className="page about-page">
      <div className="page-heading">
        <Bilingual
          className="eyebrow"
          text={{ en: "04 / About", zh: "关于" }}
        />
        <h1 className="chinese-first">
          <span lang="zh-Hans">你好，我是锦莹。</span>
          <span className="english-secondary" lang="en">
            Hi, I'm Phyllis.
          </span>
        </h1>
      </div>
      <div className="about-grid">
        <figure className="portrait">
          {portrait ? (
            <>
              <img src={portrait.src} alt={portrait.alt} />
              <figcaption>
                <Bilingual text={portrait.caption} />
              </figcaption>
            </>
          ) : (
            <>
              <Sketch kind="walk" />
              <Bilingual
                text={{
                  en: "A portrait will live here.",
                  zh: "这里留给一张个人肖像。",
                }}
              />
              <span className="eyebrow">Original photograph to come</span>
            </>
          )}
        </figure>
        <div className="about-copy">
          <Bilingual className="lead" text={identity.role} />
          <Bilingual text={identity.about} />
          <Bilingual text={identity.aboutCommunity} />
          <a href="#/work/walking-with-anthropologists" className="text-link">
            Walking With Anthropologists <Arrow />
            <span className="zh" lang="zh-Hans">
              了解同行项目
            </span>
          </a>
          <a
            href="#/work/south-asia-film-screening-series"
            className="text-link"
          >
            South Asia Film Screening Series <Arrow />
            <span className="zh" lang="zh-Hans">
              了解南亚电影放映系列
            </span>
          </a>
        </div>
      </div>
      <div className="detail-section">
        <Bilingual as="h2" text={{ en: "Education", zh: "教育背景" }} />
        <Education />
      </div>
      <div className="contact-section">
        <Bilingual as="h2" text={{ en: "Let's talk.", zh: "联系方式" }} />
        <address className="contact-links">
          {contact.email && (
            <a className="text-link" href={`mailto:${contact.email}`}>
              {contact.email} <Arrow />
            </a>
          )}
          {contact.instagram && (
            <a
              className="text-link"
              href={contact.instagram.url}
              target="_blank"
              rel="noreferrer"
            >
              Instagram · {contact.instagram.handle} <Arrow />
            </a>
          )}
          {contact.wechatOfficialAccount && (
            <div className="wechat-contact">
              <Bilingual
                as="span"
                text={{ en: "WeChat Official Account", zh: "微信公众号" }}
              />
              <span lang="zh-Hans">{contact.wechatOfficialAccount}</span>
            </div>
          )}
        </address>
      </div>
    </section>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
