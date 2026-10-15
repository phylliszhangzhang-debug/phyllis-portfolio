import { test, expect } from '@playwright/test';
const slugs = ['walking-with-anthropologists','silence-and-everyday-life','invisible-little-lotus-island','the-entrepreneur-in-time','photography','anthro-documentary-series'];
test('navigation, project links, and all routes render without runtime errors or overflow', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Hi, I’m Phyllis.');
  if (testInfo.project.name === 'mobile') await page.getByRole('button', {name:'Menu / 菜单'}).click();
  await page.getByRole('navigation').getByRole('link', {name:'Work 作品',exact:true}).click();
  await expect(page.getByRole('heading', {level:1})).toContainText('Across practices.');
  await expect(page.locator('.project-card')).toHaveCount(6);
  for (const slug of slugs) {
    await page.locator(`.project-card[href="#/work/${slug}"]`).click();
    await expect(page.locator('.project-page')).toBeVisible();
    await expect(page.locator('.editorial-note')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole('link', {name:'← All work 全部作品'}).click();
  }
  for (const route of ['/', '/writing', '/notes', '/about', '/cv', '/missing']) {
    await page.goto(`/#${route}`);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('[lang="zh-Hans"]').first()).toBeAttached();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});
test('empty states preserve content integrity and CV has no fabricated download', async ({page}) => {
  await page.goto('/#/writing');
  await expect(page.locator('.empty-state')).toContainText('No articles have been added yet.');
  await expect(page.locator('.article-list a')).toHaveCount(0);
  await page.goto('/#/notes');
  await expect(page.locator('.empty-state')).toContainText('waiting for its first entry');
  await page.goto('/#/cv');
  await expect(page.locator('a[download]')).toHaveCount(0);
  await expect(page.locator('.education-list>div')).toHaveCount(3);
  await page.goto('/#/work/anthro-documentary-series');
  await expect(page.locator('article')).toContainText('More to share when the work is ready.');
});
test('keyboard skip link and mobile menu are usable', async ({page},testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', {level: 1})).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  if(testInfo.project.name === 'mobile') {
    const menu = page.locator('.menu-toggle');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded','true');
    await page.getByRole('navigation').getByRole('link',{name:'Notes 札记',exact:true}).click();
    await expect(menu).toHaveAttribute('aria-expanded','false');
  }
});

test('homepage refinements use approved copy, a local font, and isolated film metadata', async ({ page }) => {
  const { homepageIntro, homepageFilm } = await import('../src/home-content');
  const remoteRequests: string[] = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4173/')) remoteRequests.push(request.url()); });
  await page.goto('/');
  await expect(page.locator('.brand-chinese')).toHaveText('张艺锦莹');
  await expect(page.locator('.brand-positioning')).toHaveText('RESEARCH · VISUAL STORYTELLING · CREATIVE PRACTICE');
  await expect(page.locator('.brand-positioning-zh')).toHaveText('研究 · 视觉叙事 · 创意实践');
  await expect(page.locator('.opening-intro>p>span').first()).toHaveText(homepageIntro.en);
  await expect(page.locator('.opening-intro>p .zh')).toHaveText(homepageIntro.zh);
  await expect(page.locator('.hero-annotation')).toContainText("that's me!");
  await expect(page.locator('.selection-note')).toContainText("things I've made & explored");
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('23px Caveat'))).toBe(true);
  const annotation = await page.locator('.hero-annotation').boundingBox();
  const heading = await page.locator('.intro-heading h1').boundingBox();
  expect(annotation!.y + annotation!.height).toBeLessThanOrEqual(heading!.y + 2);
  const film = page.locator(`.home-projects a[href="#/work/${homepageFilm.slug}"]`);
  await expect(film.locator('h3>span').first()).toHaveText('Invisible Macau');
  await expect(film.locator('.film-credits')).toContainText('Director & Producer');
  await expect(film.locator('.film-credits')).toContainText('30 min · Filmed over two years');
  await expect(film.locator('.card-intro>span').first()).toHaveText(homepageFilm.intro.en);
  await expect(film.locator('.card-intro .zh')).toHaveText(homepageFilm.intro.zh);
  await film.click();
  await expect(page.locator('main h1')).toContainText('Invisible Little Lotus Island');
  await expect(page.locator('.film-credits')).toHaveCount(0);
  expect(remoteRequests).toEqual([]);
});
