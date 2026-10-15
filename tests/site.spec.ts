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
