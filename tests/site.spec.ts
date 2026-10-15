import { test, expect } from "@playwright/test";
const slugs = [
  "walking-with-anthropologists",
  "silence-and-everyday-life",
  "invisible-macau",
  "the-entrepreneur-in-time",
  "photography",
  "anthro-documentary-series",
  "you-never-know",
  "south-asia-film-screening-series",
];
test("navigation, project links, and all routes render without runtime errors or overflow", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Hi, I’m Phyllis.",
  );
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Menu / 菜单" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Work 作品", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Across practices.",
  );
  await expect(page.locator(".project-card")).toHaveCount(8);
  for (const slug of slugs) {
    await page.locator(`.project-card[href="#/work/${slug}"]`).click();
    await expect(page.locator(".project-page")).toBeVisible();
    await expect(page.locator(".editorial-note")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("link", { name: "← All work 全部作品" }).click();
  }
  for (const route of [
    "/",
    "/writing",
    "/notes",
    "/about",
    "/cv",
    "/missing",
  ]) {
    await page.goto(`/#${route}`);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator('[lang="zh-Hans"]').first()).toBeAttached();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test("empty states preserve content integrity and former CV resolves to About", async ({
  page,
}) => {
  await page.goto("/#/writing");
  await expect(page.locator(".writing-category")).toHaveCount(3);
  await expect(page.locator(".writing-category").last()).toContainText(
    "No essays have been added",
  );
  await expect(page.locator(".article-list a")).toHaveCount(1);
  await page.goto("/#/notes");
  await expect(page.locator(".empty-state")).toContainText(
    "waiting for its first entry",
  );
  await page.goto("/#/cv");
  await expect(page).toHaveURL(/#\/about$/);
  await expect(page.locator("a[download]")).toHaveCount(0);
  await expect(page.locator(".education-list>div")).toHaveCount(3);
  await page.goto("/#/work/anthro-documentary-series");
  await expect(page.locator("article")).toContainText(
    "More to share when the work is ready.",
  );
});
test("keyboard skip link and mobile menu are usable", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  if (testInfo.project.name === "mobile") {
    const menu = page.locator(".menu-toggle");
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Notes 边边角角", exact: true })
      .click();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  }
});

test("homepage refinements use approved copy, a local font, and isolated film metadata", async ({
  page,
}) => {
  const { homepageIntro } = await import("../src/home-content");
  const { findProject } = await import("../src/projects");
  const homepageFilm = findProject("invisible-macau")!;
  const remoteRequests: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4173/"))
      remoteRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.locator(".brand-chinese")).toHaveText("张艺锦莹");
  await expect(page.locator(".brand-positioning")).toHaveText(
    "RESEARCH · VISUAL STORYTELLING · COMMUNITY BUILDING",
  );
  await expect(page.locator(".brand-positioning-zh")).toHaveText(
    "研究 · 视觉叙事 · 社群营造",
  );
  await expect(page.locator(".opening-intro>p>span").first()).toHaveText(
    homepageIntro.en,
  );
  await expect(page.locator(".opening-intro>p .zh")).toHaveText(
    homepageIntro.zh,
  );
  await expect(page.locator(".hero-annotation")).toContainText("that's me!");
  await expect(page.locator(".selection-note")).toContainText(
    "things I've made & explored",
  );
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check("23px Caveat"))).toBe(
    true,
  );
  const annotation = await page.locator(".hero-annotation").boundingBox();
  const heading = await page.locator(".intro-heading h1").boundingBox();
  expect(annotation!.y + annotation!.height).toBeLessThanOrEqual(
    heading!.y + 2,
  );
  const film = page.locator(
    `.home-projects a[href="#/work/${homepageFilm.slug}"]`,
  );
  await expect(film.locator("h3>span").first()).toHaveText("Invisible Macau");
  await expect(film.locator(".film-credits")).toContainText(
    "Director & Producer",
  );
  await expect(film.locator(".film-credits")).toContainText(
    "30 min · Filmed over two years",
  );
  await expect(film.locator(".card-intro>span").first()).toHaveText(
    homepageFilm.intro.en,
  );
  await expect(film.locator(".card-intro .zh")).toHaveText(
    homepageFilm.intro.zh,
  );
  await film.click();
  await expect(page.locator("main h1")).toContainText("Invisible Macau");
  await expect(page.locator(".film-credits")).toContainText(
    "Director & Producer",
  );
  expect(remoteRequests).toEqual([]);
});

test("V2 canonical project titles, legacy film alias, credits, and verified scope", async ({
  page,
}) => {
  await page.goto("/#/work/invisible-little-lotus-island");
  await expect(page).toHaveURL(/#\/work\/invisible-macau$/);
  await expect(page).toHaveTitle("Invisible Macau — Phyllis Zhang");
  await expect(page.locator("#credits")).toContainText(
    "张艺锦莹、但恒祎、黄显婷、骆佳瑜",
  );
  for (const id of [
    "overview",
    "synopsis",
    "stills",
    "behind-the-film",
    "credits",
  ])
    await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.locator("#synopsis")).toContainText("Kwan Kee");
  await expect(
    page.locator("#behind-the-film .pending-material"),
  ).toBeVisible();
  await page.goto("/#/work/silence-and-everyday-life");
  const title =
    "“We Always Fail”: Silence, Quakerism, and the Practice of Ethical Life in London";
  await expect(page.locator("h1>span").first()).toHaveText(title);
  await expect(page).toHaveTitle(`${title} — Phyllis Zhang`);
  await page.goto("/#/work/you-never-know");
  await expect(page.locator(".project-heading")).toContainText(
    "LSE Coursework",
  );
  await expect(page.locator(".project-heading")).toContainText(
    "Nine networking events",
  );
  await expect(page.locator("#observations")).toContainText("original report");
  await page.goto("/#/work/south-asia-film-screening-series");
  await expect(page.locator(".project-heading")).toContainText(
    "2026 · Four screenings",
  );
  await expect(page.locator(".project-heading")).toContainText(
    "Founder & Lead Organiser",
  );
  await expect(page.locator("#programme li")).toHaveText([
    "My Beautiful Laundrette (1985)",
    "Eeb Allay Ooo! (2019)",
    "Fandry (2013)",
    "Joyland (2022)",
  ]);
  await expect(page.locator("#programme .pending-material")).toHaveCount(0);
  await expect(page.locator("#programme time")).toHaveCount(0);
  await expect(page.locator("#programme")).toContainText("Film release years");
});

test("essay summary is readable while unverified full text remains unpublished", async ({
  page,
}) => {
  await page.goto("/#/writing");
  await page
    .getByRole("link")
    .filter({ hasText: "The Multiple Lives of Religion in South Asia" })
    .click();
  await expect(page.locator("h1")).toContainText(
    "The Multiple Lives of Religion in South Asia",
  );
  await expect(page.locator(".eyebrow")).toContainText("SOAS Course Essay");
  await expect(page.locator(".essay-intro")).toContainText(
    "India, Pakistan, and Bangladesh",
  );
  await expect(page.locator(".source-pending")).toContainText(
    "South Asia-AS2.pdf",
  );
  await expect(page.locator(".essay-body")).toHaveCount(0);
  await expect(page.locator(".essay-image-placeholder")).toContainText(
    "a plant growing between bricks",
  );
  await expect(page.locator("main img")).toHaveCount(0);
  await expect(page.locator('nav a[aria-current="page"]')).toContainText(
    "Writing",
  );
  const { articles, canReadFullEssay } = await import("../src/writing-content");
  const essay = articles.find((article) => article.kind === "local")!;
  if (essay.kind !== "local") throw Error("Expected local essay");
  expect(canReadFullEssay(essay)).toBe(false);
  expect(canReadFullEssay({ ...essay, fullTextChecked: true })).toBe(false);
});

test("Notes identity, empty gratitude, and automatic ordering do not publish invented entries", async ({
  page,
}) => {
  await page.goto("/#/notes");
  await expect(page).toHaveTitle("Notes / 边边角角 — Phyllis Zhang");
  await expect(page.locator("h1")).toContainText("In the Margins.");
  await expect(page.locator(".gratitude-section")).toContainText(
    "Daily Gratitude",
  );
  await expect(page.locator(".gratitude-section")).toContainText("每日感谢");
  await expect(page.locator(".gratitude-card")).toHaveCount(0);
  const { newestFirst, gratitudeEntries } =
    await import("../src/notes-content");
  expect(gratitudeEntries).toHaveLength(0);
  const dates = [
    { date: "2025-01-01" },
    { date: "2026-01-02" },
    { date: "2026-01-01" },
  ];
  expect(newestFirst(dates).map((item) => item.date)).toEqual([
    "2026-01-02",
    "2026-01-01",
    "2025-01-01",
  ]);
  expect(dates[0].date).toBe("2025-01-01");
});

test("all visible internal links resolve, updated labels persist, and tablet layouts fit", async ({
  page,
}) => {
  const targets = new Set<string>();
  const routes = [
    "/",
    "/work",
    "/writing",
    "/notes",
    "/about",
    "/cv",
    ...slugs.map((slug) => `/work/${slug}`),
    "/writing/multiple-lives-of-religion-in-south-asia",
  ];
  for (const route of routes) {
    await page.goto(`/#${route}`);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("body")).not.toContainText("札记");
    await expect(page.locator("body")).not.toContainText(
      "Invisible Little Lotus Island",
    );
    await expect(page.locator("footer")).toContainText(
      "Researching, filming, making things happen.",
    );
    const hrefs = await page
      .locator('a[href^="#/"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
    hrefs.forEach((href) => targets.add(href));
  }
  for (const href of targets) {
    await page.goto(`/${href}`);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("main")).not.toContainText(
      "A page not yet written.",
    );
  }
  await page.goto("/#/about");
  await expect(page.locator("h1>span").first()).toHaveText("你好，我是锦莹。");
  await expect(page.locator(".lead")).toContainText(
    "Working across research, documentary filmmaking, and community projects.",
  );
  await expect(page.locator(".education-status")).toHaveCount(0);
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/work",
      "/work/silence-and-everyday-life",
      "/writing/multiple-lives-of-religion-in-south-asia",
      "/notes",
      "/about",
    ]) {
      await page.goto(`/#${route}`);
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
  }
});

test("final approved copy, five-item navigation, and CV redirects stay consistent", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".site-header nav a")).toHaveCount(5);
  await expect(page.locator(".site-header nav")).not.toContainText("CV");
  await expect(page.locator(".opening-intro h1 .zh")).toHaveText(
    "你好，我是锦莹。",
  );
  await expect(page.locator(".about-strip h2 .zh")).toHaveText(
    "你好，我是锦莹。",
  );
  await expect(page.locator(".reading-section h2>span").first()).toHaveText(
    "How We Live, Connect & Imagine.",
  );
  await expect(page.locator(".reading-section h2 .zh")).toHaveText(
    "我们如何生活、联结与想象。",
  );
  await expect(
    page.locator(".reading-section>div").nth(1).locator("p>span").first(),
  ).toHaveText(
    "Some thoughts take the shape of essays. Others remain questions, observations, or notes along the way.",
  );
  await expect(
    page.locator(".reading-section>div").nth(1).locator("p .zh"),
  ).toHaveText("有些想法写成了文章，有些还只是问题、观察，或随手记下的片段。");
  await expect(page.locator(".reading-section .margin-note")).toHaveText(
    /look closely,\s*leave room\s*for questions\./,
  );
  await expect(
    page.locator('.reading-section a[href="#/notes"]'),
  ).toContainText("边边角角");
  await expect(page.locator("footer")).toContainText(
    "做研究，拍片子，让事情发生。",
  );
  await page.goto("/#/work");
  await expect(page.locator(".page-intro>span").first()).toHaveText(
    "Ethnographic research, documentary filmmaking, photography, and cultural event organising.",
  );
  await expect(page.locator(".page-intro .zh")).toHaveText(
    "民族志研究、纪录片创作、摄影与文化活动策划。",
  );
  const chineseTitle = "《我们总是失败：静默、贵格主义与伦敦伦理生活实践》";
  await expect(
    page.locator('a[href="#/work/silence-and-everyday-life"] h3 .zh'),
  ).toHaveText(chineseTitle);
  await page.locator('a[href="#/work/silence-and-everyday-life"]').click();
  await expect(page.locator("h1 .zh")).toHaveText(chineseTitle);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    new RegExp(chineseTitle),
  );
  await page.goto("/#/writing");
  const lookingAgain = page.locator(".writing-category").nth(1);
  await expect(lookingAgain.locator("h2>span").first()).toHaveText(
    "Looking Again",
  );
  await expect(lookingAgain.locator("h2 .zh")).toHaveText("换个角度看看");
  await expect(lookingAgain.locator(".category-intro>span").first()).toHaveText(
    "Starting with small moments in everyday life, I use an anthropological lens to reconsider things we often take for granted.",
  );
  await expect(lookingAgain.locator(".article-list")).toHaveCount(0);
  await page.goto("/#/notes");
  await expect(page.locator("h1 .zh")).toHaveText("想到什么，记点什么。");
  await expect(page.locator(".page-intro .zh")).toHaveText(
    "放一些还没想明白的事、随手记下的观察，还有那些引起我注意的小东西。",
  );
  for (const route of ["/#/cv", "/cv", "/cv/"]) {
    await page.goto(route);
    await expect(page).toHaveURL(/\/#\/about$/);
    await expect(page.locator(".about-page")).toBeVisible();
    await expect(page.locator(".contact-section h2>span").first()).toHaveText(
      "Let's talk.",
    );
    await expect(page.locator(".contact-section h2 .zh")).toHaveText(
      "联系方式",
    );
    await expect(page.locator(".contact-section p")).toHaveCount(0);
    await expect(page.locator(".contact-section a")).toHaveCount(2);
    await expect(page.locator(".education-list>div")).toHaveCount(3);
    await expect(page.locator("body")).not.toContainText(
      "award status not confirmed",
    );
    await expect(page.locator('a[href="#/cv"]')).toHaveCount(0);
  }
  // Reusing an old bookmark while already on About must also normalise the URL.
  await page.evaluate(() => {
    window.location.hash = "/cv";
  });
  await expect(page).toHaveURL(/\/#\/about$/);
});

test("approved homepage copy, founder credit, Writing categories, and real contacts render", async ({
  page,
}) => {
  await page.goto("/");
  const walking = page.locator(
    '.home-projects a[href="#/work/walking-with-anthropologists"]',
  );
  await expect(walking.locator(".film-credits")).toContainText(
    "Founder & Lead Organiser",
  );
  await expect(walking.locator(".film-credits")).toContainText(
    "发起人及主要组织者",
  );
  await expect(walking.locator(".card-intro")).toContainText(
    "founded and primarily organised at SOAS",
  );
  await expect(page.locator(".about-strip p>span").first()).toHaveText(
    "I studied film production in Macau and later social anthropology in London. Along the way, I've made documentaries, conducted ethnographic research, and initiated projects that bring people from different cultural backgrounds together. I enjoy exploring different ways of working, and hope to bring what I observe and learn into real-world business contexts.",
  );
  await expect(page.locator(".about-strip p .zh")).toHaveText(
    "我在澳门学习影视制作，后来到伦敦学习社会人类学。这一路上，我拍纪录片、做田野调查，发起了一些让不同文化背景的人们相遇和交流的活动。我喜欢在不同的实践中探索，希望将自己的观察与所学带入真实的商业场景。",
  );
  await page.goto("/#/work");
  await expect(
    page.locator('a[href="#/work/walking-with-anthropologists"] .film-credits'),
  ).toContainText("Founder & Lead Organiser");
  const nioTitle = "《时间中的企业家：叙述未来，划分当下——以蔚来汽车为例》";
  await expect(
    page.locator('a[href="#/work/the-entrepreneur-in-time"] h3 .zh'),
  ).toHaveText(nioTitle);
  await page.goto("/#/work/the-entrepreneur-in-time");
  await expect(page.locator("h1 .zh")).toHaveText(nioTitle);
  await expect(page.locator("body")).not.toContainText("中文论文全名待确认");
  await page.goto("/#/writing");
  await expect(
    page
      .locator(".writing-category")
      .first()
      .locator(".category-intro>span")
      .first(),
  ).toHaveText("Course Essays");
  const books = page.locator(".writing-category").nth(2);
  await expect(books.locator("h2>span").first()).toHaveText("Books & Films");
  await expect(books.locator("h2 .zh")).toHaveText("书与电影");
  await expect(books.locator(".category-intro>span").first()).toHaveText(
    "Thoughts and reflections on the books I read and the films I watch.",
  );
  await expect(books.locator(".article-list")).toHaveCount(0);
  await page.goto("/#/about");
  await expect(
    page.locator('a[href="mailto:jinying_zhang2024@163.com"]'),
  ).toContainText("jinying_zhang2024@163.com");
  const instagram = page
    .locator(".contact-links a")
    .filter({ hasText: "@phylliszhangzhang" });
  await expect(instagram).toHaveAttribute(
    "href",
    "https://www.instagram.com/phylliszhangzhang/",
  );
  await expect(instagram).toHaveAttribute("rel", "noreferrer");
  await expect(page.locator(".wechat-contact")).toContainText(
    "流星蝴蝶无情剑 · phylliszhangzhang",
  );
  await expect(page.locator(".wechat-contact a")).toHaveCount(0);
});
