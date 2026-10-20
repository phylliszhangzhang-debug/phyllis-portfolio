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
  "dumpling-night",
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
  await expect(page.locator(".project-card")).toHaveCount(9);
  for (const slug of slugs) {
    await page.locator(`.project-card[href="#/work/${slug}"]`).click();
    await expect(page.locator(".project-page")).toBeVisible();
    if (
      [
        "silence-and-everyday-life",
        "invisible-macau",
        "you-never-know",
        "south-asia-film-screening-series",
        "dumpling-night",
        "photography",
      ].includes(slug)
    )
      await expect(page.locator(".editorial-note")).toHaveCount(0);
    else await expect(page.locator(".editorial-note")).toBeVisible();
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
  const { homepageIntro, careerNote } = await import("../src/home-content");
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
  await expect(page.locator(".homepage-intro .zh")).toHaveText(
    homepageIntro.zh,
  );
  await expect(
    page.locator(".homepage-intro + .career-note > span").first(),
  ).toHaveText(careerNote.en);
  await expect(page.locator(".homepage-intro + .career-note .zh")).toHaveText(
    careerNote.zh,
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
  for (const id of ["overview", "synopsis", "behind-the-film", "credits"])
    await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.locator("#synopsis")).toContainText("Kwan Kee");
  await expect(page.locator("#behind-the-film .pending-material")).toHaveCount(
    0,
  );
  await expect(page.locator("#behind-the-film img")).toHaveCount(8);
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
  await expect(page.locator("#observations")).toHaveCount(0);
  await expect(page.locator(".report-article")).toContainText(
    "Imagine yourself, on weekday evenings after work",
  );
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

test("source-checked complete English essay is readable online", async ({
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
  await expect(
    page.locator(".source-pending, .essay-image-placeholder"),
  ).toHaveCount(0);
  await expect(page.locator(".essay-body p")).toHaveCount(13);
  await expect(page.locator(".essay-references li")).toHaveCount(9);
  await expect(page.locator(".essay-body")).toContainText(
    "Religion in South Asia has multiple lives because it grows through the gaps",
  );
  await expect(page.locator(".essay-references")).toContainText(
    "10.14318/hau5.2.005",
  );
  const opening = page.locator(".essay-column>figure img");
  await opening.scrollIntoViewIfNeeded();
  await expect(opening).toHaveAttribute(
    "src",
    "/images/writing/south-asia/plant-between-bricks.png",
  );
  await expect
    .poll(() =>
      opening.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(page.locator('nav a[aria-current="page"]')).toContainText(
    "Writing",
  );
  const { articles, canReadFullEssay } = await import("../src/writing-content");
  const essay = articles.find((article) => article.kind === "local")!;
  if (essay.kind !== "local") throw Error("Expected local essay");
  expect(canReadFullEssay(essay)).toBe(true);
  expect(canReadFullEssay({ ...essay, fullTextChecked: false })).toBe(false);
  expect(canReadFullEssay({ ...essay, references: [] })).toBe(false);
  const { southAsiaEssay } = await import("../src/south-asia-essay");
  await expect(page.locator(".essay-body p")).toHaveText(
    southAsiaEssay.sections.flatMap((section) => section.paragraphs),
  );
  await expect(page.locator(".essay-references li")).toHaveText(
    southAsiaEssay.references,
  );
  await expect(page.locator(".essay-references h2")).toHaveText("Reference:");
});

test("Notes identity, owner-supplied gratitude, and automatic ordering remain correct", async ({
  page,
}) => {
  await page.goto("/#/notes");
  await expect(page).toHaveTitle("Notes / 边边角角 — Phyllis Zhang");
  await expect(page.locator("h1")).toContainText("In the Margins.");
  await expect(page.locator(".gratitude-section")).toContainText(
    "Daily Gratitude",
  );
  await expect(page.locator(".gratitude-section")).toContainText("每日感谢");
  await expect(page.locator(".gratitude-card")).toHaveCount(4);
  const entry = page.locator(
    '[data-entry-id="2026-10-16-appreciate-everything"]',
  );
  await expect(entry.locator("time")).toHaveAttribute("datetime", "2026-10-16");
  await expect(entry.locator("h3>span").first()).toHaveText(
    "Appreciate everything",
  );
  await expect(entry.locator("h3 .zh")).toHaveText("心怀感恩");
  await expect(entry.locator("p>span").first()).toHaveText(
    "I’m grateful for tonight’s unexpected dinner with a whole table of strangers, the stories I heard from different people, and a phone call I had with my friend during afternoon",
  );
  await expect(entry.locator("p .zh")).toHaveText(
    "感恩今夜意想不到的晚餐，故事，以及下午和朋友的电话。",
  );
  await entry.scrollIntoViewIfNeeded();
  await expect(entry.locator("img")).toHaveAttribute(
    "src",
    "/images/gratitude/2026-10-16-appreciate-everything.jpg",
  );
  await expect
    .poll(() =>
      entry
        .locator("img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  const { newestFirst, gratitudeEntries } =
    await import("../src/notes-content");
  expect(gratitudeEntries).toHaveLength(4);
  const fifteenth = page.locator(
    '[data-entry-id="2026-10-15-appreciate-everything"]',
  );
  await expect(fifteenth).toContainText("This series was inspired by Kate");
  await expect(fifteenth).toContainText("将近40年了，我一直记得这句话");
  await expect(fifteenth.locator("img")).toHaveAttribute(
    "src",
    "/images/gratitude/2026-10-15/appreciate-01.jpg",
  );
  const eighteenth = page.locator(
    '[data-entry-id="2026-10-18-appreciate-everything"]',
  );
  await expect(eighteenth).toContainText("过滤气泡工作室");
  await expect(eighteenth.locator("img")).toHaveCount(8);
  for (const [index, number] of [2, 3, 4, 5, 6, 7, 8, 9].entries()) {
    const image = eighteenth.locator("img").nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute(
      "src",
      `/images/gratitude/2026-10-18/appreciate-${String(number).padStart(2, "0")}.jpg`,
    );
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await fifteenth.locator("img").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      fifteenth
        .locator("img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);

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

test("About reuses the portrait and uploaded project covers appear in the requested places", async ({
  page,
}) => {
  await page.goto("/#/about");
  const portrait = page.locator(".portrait img");
  await expect(portrait).toHaveAttribute(
    "src",
    "/images/portrait/phyllis-zhang.JPG",
  );
  await expect
    .poll(() =>
      portrait.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(page.locator("main")).not.toContainText(
    "A portrait will live here.",
  );
  await page.goto("/");
  await expect(
    page.locator(
      '.home-projects a[href="#/work/silence-and-everyday-life"] img',
    ),
  ).toHaveAttribute("src", "/images/quaker-research/cover.png");
  await page.goto("/#/work");
  await expect(page.locator("#work-community .project-card")).toHaveCount(3);
  await expect(
    page.locator('#work-community a[href="#/work/dumpling-night"]'),
  ).toBeVisible();
  for (const [slug, source, detailSource = source] of [
    [
      "dumpling-night",
      "/images/dumpling-night/posters/page-02.png",
      "/images/dumpling-night/posters/page-01.png",
    ],
    ["anthro-documentary-series", "/images/anthro-documentary/cover.png"],
    ["silence-and-everyday-life", "/images/quaker-research/cover.png"],
  ]) {
    await expect(
      page.locator(`.project-card[href="#/work/${slug}"] img`),
    ).toHaveAttribute("src", source);
    await page.locator(`.project-card[href="#/work/${slug}"]`).click();
    const cover = page.locator(".image-space.large img");
    await expect(cover).toHaveAttribute("src", detailSource);
    await expect
      .poll(() =>
        cover.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const ratios = await cover.evaluate((img: HTMLImageElement) => ({
      actual: img.width / img.height,
      original: img.naturalWidth / img.naturalHeight,
    }));
    expect(ratios.actual).toBeCloseTo(ratios.original, 2);
    await page.getByRole("link", { name: "← All work 全部作品" }).click();
  }
});

test("Invisible Macau uses its uncropped poster and plays the uploaded trailer", async ({
  page,
}) => {
  await page.goto("/");
  const card = page.locator('.home-projects a[href="#/work/invisible-macau"]');
  const poster = card.locator("img");
  await poster.scrollIntoViewIfNeeded();
  await expect(poster).toHaveAttribute(
    "src",
    "/images/invisible-macau/poster.jpg",
  );
  await expect
    .poll(() =>
      poster.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
  const box = await card.locator(".image-space").evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    ratio:
      element.getBoundingClientRect().width /
      element.getBoundingClientRect().height,
  }));
  const ratio = await poster.evaluate(
    (img: HTMLImageElement) => img.naturalWidth / img.naturalHeight,
  );
  expect(box.background).toBe("rgba(0, 0, 0, 0)");
  expect(box.ratio).toBeCloseTo(ratio, 2);
  await card.click();
  const video = page.locator(".project-trailer video");
  await expect(video).toHaveJSProperty("controls", true);
  await expect(video).toHaveJSProperty("autoplay", false);
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video.locator("source")).toHaveAttribute(
    "src",
    "/videos/invisible-macau/trailer.mp4",
  );
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) =>
        Number.isFinite(element.duration),
      ),
    )
    .toBe(true);
  expect(
    await video.evaluate((element: HTMLVideoElement) => element.duration),
  ).toBeGreaterThan(60);
  await video.evaluate(async (element: HTMLVideoElement) => {
    element.muted = true;
    await element.play();
  });
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.3);
  expect(
    await video.evaluate((element: HTMLVideoElement) => element.error),
  ).toBeNull();
  await video.evaluate((element: HTMLVideoElement) => element.pause());
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("new owner assets, diary gallery, research excerpts and essay typography", async ({
  page,
}) => {
  await page.goto("/");
  const nio = page.locator(
    '.project-card[href="#/work/the-entrepreneur-in-time"]',
  );
  await expect(nio.locator("img")).toHaveAttribute(
    "src",
    "/images/nio/gpt-generated.png",
  );
  await expect(nio.locator(".image-credit .zh")).toHaveText("图片由 GPT 生成");
  await page.goto("/#/work/silence-and-everyday-life");
  await expect(
    page.locator("#table-of-contents > div > .research-outline > li"),
  ).toHaveCount(6);
  const { quakerExcerpts } = await import("../src/quaker-excerpts");
  for (const section of quakerExcerpts.filter(
    (section) => section.sourceParagraphs,
  )) {
    await expect(page.locator(`#${section.id} .research-source`)).toHaveText(
      section.sourceParagraphs!,
    );
  }
  await expect(page.locator("#afterword a")).toHaveAttribute(
    "href",
    "https://youtu.be/FWCvv9t0xKM?si=BK9g7DaSjyh_NVf8",
  );
  await expect(page.locator(".editorial-note")).toHaveCount(0);
  await page.goto("/#/notes");
  await expect(page.locator(".gratitude-card time")).toHaveText([
    "2026-10-18",
    "2026-10-17",
    "2026-10-16",
    "2026-10-15",
  ]);
  const entry = page.locator(
    '[data-entry-id="2026-10-17-appreciate-everything"]',
  );
  const { gratitudeEntries } = await import("../src/notes-content");
  await expect(
    entry.locator("p.preserve-paragraphs > span").first(),
  ).toHaveText(
    gratitudeEntries.find((item) => item.date === "2026-10-17")!.text.en,
  );
  await expect(entry.locator("p.preserve-paragraphs .zh")).toHaveText(
    gratitudeEntries.find((item) => item.date === "2026-10-17")!.text.zh,
  );
  await expect(entry.locator("img")).toHaveCount(4);
  for (const [index, name] of [
    "IMG_5261",
    "IMG_5248",
    "IMG_5254",
    "IMG_5255",
  ].entries()) {
    const image = entry.locator("img").nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute(
      "src",
      `/images/gratitude/2026-10-17/${name}.jpg`,
    );
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.goto("/#/writing/multiple-lives-of-religion-in-south-asia");
  await expect(page.locator(".essay-column > figure figcaption")).toHaveCount(
    0,
  );
  const sizes = await page.locator(".essay-body").evaluate((body) => {
    const size = (element: Element) =>
      parseFloat(getComputedStyle(element).fontSize);
    return {
      note: size(body.querySelector(".essay-image-note p")!),
      heading: size(body.querySelector(".essay-image-note h2")!),
      body: size(body.querySelector("section:not(.essay-image-note) p")!),
    };
  });
  expect(sizes.note).toBeLessThan(sizes.body);
  expect(sizes.heading).toBeLessThan(sizes.body);
});

test("requested film cleanup, explicit image credit, Anthro event and walking entry", async ({
  page,
}) => {
  await page.goto("/#/work/invisible-macau");
  await expect(page.locator("#stills, .editorial-note")).toHaveCount(0);
  await expect(page.locator("#behind-the-film")).toBeVisible();
  await page.goto("/#/work/silence-and-everyday-life");
  await expect(page.locator(".project-page > figure figcaption")).toHaveCount(
    0,
  );
  await expect(page.locator("#abstract")).toBeVisible();
  await page.goto("/");
  const event = page.locator('.home-projects a[href="#/work/dumpling-night"]');
  await expect(event.locator("h3")).toContainText("Anthro Dumpling Night");
  await expect(event).toContainText(
    "把中国年的热闹带进伦敦的人类学系，从一起包饺子开始。",
  );
  await event.click();
  await expect(page.locator("h1")).toContainText("Anthro Dumpling Night");
  await page.goto("/#/work/the-entrepreneur-in-time");
  await expect(page.locator(".project-page > figure figcaption")).toContainText(
    "Image generated by GPT",
  );
  await expect(page.locator(".project-page > figure figcaption")).toContainText(
    "图片由 GPT 生成",
  );
  await page.goto("/#/about");
  const sections = page.locator(".about-page > .detail-section");
  await expect(sections.nth(0)).toContainText("Education");
  await expect(sections.nth(1)).toContainText("爱好");
  await page.locator('.interests-section a[href="#/about/walking"]').click();
  await expect(page.locator(".walking-page h1")).toContainText("走路");
  await expect(page).toHaveTitle("Walking / 走路 — Phyllis Zhang");
  await expect(page.locator(".walking-page img")).toHaveCount(11);
  await expect(page.locator('nav a[aria-current="page"]')).toContainText(
    "About",
  );
  await page.getByRole("link", { name: "← About 关于我" }).click();
  await expect(page.locator(".about-page")).toBeVisible();
});

test("uploaded LSE screening gallery preserves lead, proportions and homepage-only copy", async ({
  page,
}) => {
  await page.goto("/#/work/invisible-macau");
  const gallery = page.locator("#lse-screening-2025 .gallery");
  const { projects } = await import("../src/projects");
  const film = projects.find((project) => project.slug === "invisible-macau")!;
  const photos = film.sections!.find(
    (section) => section.id === "lse-screening-2025",
  )!.photos!;
  await expect(gallery.locator("img")).toHaveCount(7);
  await expect(gallery.locator("img").first()).toHaveAttribute(
    "src",
    /e1af9b07710bcdf82e7c9cb9c3b84e9a.JPG$/,
  );
  for (const [index, photo] of photos.entries()) {
    const image = gallery.locator("img").nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute("src", photo.src);
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const ratios = await image.evaluate((img: HTMLImageElement) => ({
      displayed: img.width / img.height,
      original: img.naturalWidth / img.naturalHeight,
    }));
    expect(ratios.displayed).toBeCloseTo(ratios.original, 2);
  }
  await page.goto("/#/work");
  const card = page.locator('.project-card[href="#/work/you-never-know"]');
  await expect(card.locator("img")).toHaveAttribute(
    "src",
    "/images/you-never-know/cover.png",
  );
  await card.click();
  const cover = page.locator(".image-space.large img");
  await expect
    .poll(() =>
      cover.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await page.goto("/");
  const event = projects.find((project) => project.slug === "dumpling-night")!;
  const intro = page.locator(
    '.home-projects a[href="#/work/dumpling-night"] .card-intro',
  );
  await expect(intro.locator("span").first()).toHaveText(
    event.homeCardIntro!.en,
  );
  await expect(intro.locator(".zh")).toHaveText(event.homeCardIntro!.zh);
  await page.goto("/#/work/dumpling-night");
  await expect(page.locator(".page-intro span").first()).toHaveText(
    event.intro.en,
  );
});

test("Walking photographs and the original networking PDF are accessible", async ({
  page,
  request,
}) => {
  await page.goto("/#/about/walking");
  const images = page.locator(".walking-route img");
  const numbers = [12, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11];
  await expect(images).toHaveCount(numbers.length);
  for (const [index, number] of numbers.entries()) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute(
      "src",
      `/images/walking/walking-${String(number).padStart(2, "0")}.jpg`,
    );
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const ratios = await image.evaluate((img: HTMLImageElement) => ({
      displayed: img.width / img.height,
      original: img.naturalWidth / img.naturalHeight,
    }));
    expect(ratios.displayed).toBeCloseTo(ratios.original, 2);
  }
  await expect(page.locator(".walking-page")).not.toContainText(
    "Routes and photographs will be shared here.",
  );
  await page.goto("/#/work/you-never-know");
  const pdf = "/documents/you-never-know/observational-report-phyllis.pdf";
  await expect(page.locator("#materials iframe")).toHaveCount(0);
  const { networkingReport } = await import("../src/networking-report");
  await expect(page.locator(".report-article > header h2")).toHaveText(
    networkingReport.title,
  );
  await expect(page.locator(".report-subtitle")).toHaveText(
    networkingReport.subtitle,
  );
  await expect(page.locator(".report-paragraph")).toHaveText(
    networkingReport.blocks
      .filter((block) => block.kind === "paragraph")
      .map((block) => block.text),
  );
  await expect(page.locator(".report-article img")).toHaveCount(10);
  for (const image of await page.locator(".report-article img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await expect(page.locator("#observations")).toHaveCount(0);
  await expect(page.locator("#materials")).not.toContainText(
    "Original report title:",
  );
  await expect(page.locator(".report-article")).toContainText(
    "Whitehouse, H. (2021).",
  );
  await expect(page.locator(".editorial-note")).toHaveCount(0);
  await expect(page.locator("#materials")).not.toContainText(
    "not yet available",
  );
  const response = await request.get(pdf);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.goto("/#/work/south-asia-film-screening-series");
  await expect(page.locator(".editorial-note")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("Dumpling Word story preserves original text and inline-image order", async ({
  page,
}) => {
  await page.goto("/#/work/dumpling-night");
  const story = page.locator("#spring-festival-story .report-article");
  await expect(story).toHaveAttribute("lang", "zh-Hans");
  const { dumplingStory } = await import("../src/dumpling-story");
  await expect(story.locator("h2")).toHaveText(dumplingStory.title);
  await expect(story.locator(".report-subtitle")).toHaveText(
    dumplingStory.subtitle,
  );
  await expect(story.locator(".report-paragraph")).toHaveText(
    dumplingStory.blocks
      .filter((block) => block.kind === "paragraph")
      .map((block) => block.text),
  );
  const types = await story
    .locator(".essay-body > *")
    .evaluateAll((elements) =>
      elements.map((element) =>
        element.tagName === "FIGURE" ? "image" : "paragraph",
      ),
    );
  expect(types).toEqual(dumplingStory.blocks.map((block) => block.kind));
  await expect(story.locator("img")).toHaveCount(6);
  const gallery = page.locator("#dumpling-event-photos");
  await expect(gallery.locator("img")).toHaveCount(4);
  for (const image of await page
    .locator("#spring-festival-story img, #dumpling-event-photos img")
    .all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const dimensions = await image.evaluate((img: HTMLImageElement) => ({
      width: img.getBoundingClientRect().width,
      height: img.getBoundingClientRect().height,
      ratio: img.naturalWidth / img.naturalHeight,
    }));
    expect(
      Math.abs(dimensions.height - dimensions.width / dimensions.ratio),
    ).toBeLessThanOrEqual(1);
  }
  await expect(page.locator(".editorial-note")).toHaveCount(0);
});

test("new poster cover, complete PDF pages, retained programme and Macau images", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator('.home-projects a[href="#/work/dumpling-night"] img'),
  ).toHaveAttribute("src", "/images/dumpling-night/posters/page-02.png");
  await page.goto("/#/work/dumpling-night");
  await expect(page.locator(".project-page > figure img")).toHaveAttribute(
    "src",
    "/images/dumpling-night/posters/page-01.png",
  );
  const posters = page.locator("#dumpling-posters img");
  await expect(posters).toHaveCount(4);
  const sources = await posters.evaluateAll((images) =>
    images.map((image) => image.getAttribute("src")),
  );
  expect(sources).toEqual([
    "/images/dumpling-night/posters/page-02.png",
    "/images/dumpling-night/posters/page-03.png",
    "/images/dumpling-night/posters/page-04.png",
    "/images/dumpling-night/programme.png",
  ]);
  const sections = await page
    .locator(".project-section")
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(sections).toEqual([
    "dumpling-posters",
    "spring-festival-story",
    "dumpling-event-photos",
  ]);
  for (const image of await posters.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const ratios = await image.evaluate((img: HTMLImageElement) => ({
      actual: img.width / img.height,
      original: img.naturalWidth / img.naturalHeight,
    }));
    expect(ratios.actual).toBeCloseTo(ratios.original, 2);
  }
  await page.goto("/#/work/invisible-macau");
  const stills = page.locator("#film-stills img");
  await expect(stills).toHaveCount(2);
  for (const [index, number] of [1, 2].entries()) {
    const image = stills.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute(
      "src",
      `/images/invisible-macau/stills/still-${number}.JPG`,
    );
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await expect(page.locator("#lse-screening-2025 img")).toHaveCount(7);
});

test("project galleries are categorised and the Dumpling byline follows its location", async ({
  page,
}) => {
  await page.goto("/#/work/invisible-macau");
  await expect(page.locator("#film-stills h2")).toContainText("剧照");
  const behind = page.locator("#behind-the-film img");
  await expect(behind).toHaveCount(8);
  const sources = await behind.evaluateAll((images) =>
    images.map((image) => image.getAttribute("src")),
  );
  expect(sources).toEqual(
    [3, 4, 5, 6, 7, 8, 9, 10].map(
      (number) =>
        `/images/invisible-macau/behind-the-film/behind-${number}.${number === 10 ? "jpg" : "JPG"}`,
    ),
  );
  expect(new Set(sources).size).toBe(8);
  for (const image of await behind.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.goto("/#/work/dumpling-night");
  await expect(page.locator("#dumpling-posters h2")).toContainText(
    "Event Recap",
  );
  await expect(page.locator("#dumpling-posters h2")).toContainText("活动回顾");
  await expect(page.locator("#dumpling-posters figcaption")).toHaveCount(0);
  const header = page.locator(
    "#spring-festival-story .report-article > header",
  );
  await expect(header.locator(".report-byline")).toHaveText(
    "Phyllis,Chase,Denis",
  );
  const order = await header
    .locator(":scope > *")
    .evaluateAll((elements) =>
      elements.map((element) => element.className || element.tagName),
    );
  expect(order).toEqual(["H2", "report-subtitle", "report-byline"]);
  await page.goto("/#/work/walking-with-anthropologists");
  await expect(page.locator("#poster-making h2")).toContainText(
    "活动海报手工制作",
  );
  const poster = page.locator("#poster-making img").first();
  await poster.scrollIntoViewIfNeeded();
  await expect(poster).toHaveAttribute(
    "src",
    "/images/walking-with-anthropologists/poster-making.JPG",
  );
  await expect
    .poll(() =>
      poster.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(page.locator(".album-viewer")).toBeVisible();
});

test("Macau, handmade-poster and Quaker fieldwork photo collections are complete", async ({
  page,
}) => {
  await page.goto("/");
  const entry = page.locator('.home-projects a[href="#/work/photography"]');
  await expect(entry).toBeVisible();
  await expect(entry.locator("img")).toHaveAttribute(
    "src",
    "/images/photography/macau/macau-01.JPG",
  );
  await entry.click();
  const macauImages = page.locator(
    ".project-page > figure img, #macau-photo-album img",
  );
  await expect(macauImages).toHaveCount(12);
  const macauSources = await macauImages.evaluateAll((images) =>
    images.map((image) => image.getAttribute("src")),
  );
  expect(macauSources).toEqual(
    Array.from(
      { length: 12 },
      (_, i) =>
        `/images/photography/macau/macau-${String(i + 1).padStart(2, "0")}.JPG`,
    ),
  );
  for (const image of await macauImages.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.goto("/#/work/walking-with-anthropologists");
  await expect(page.locator("#poster-making img")).toHaveCount(5);
  for (const image of await page.locator("#poster-making img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.goto("/#/work/silence-and-everyday-life");
  await expect(page.locator("#fieldwork-photographs h2")).toContainText(
    "田野照片",
  );
  await expect(page.locator("#fieldwork-photographs img")).toHaveCount(6);
  for (const image of await page.locator("#fieldwork-photographs img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await expect(page.locator("#abstract .research-source")).toHaveCount(2);
  await expect(page.locator("#afterword .research-source")).toHaveCount(7);
});
