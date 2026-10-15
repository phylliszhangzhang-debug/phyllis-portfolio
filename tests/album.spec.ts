import { test, expect } from "@playwright/test";

test("unavailable source remains explicit and no PDF download is offered", async ({
  page,
}) => {
  await page.route("**/src/walking-album.ts*", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: 'export const walkingAlbum={title:{en:"Unavailable test album",zh:"测试"},expectedPageCount:17,pages:[]};',
    }),
  );
  await page.goto("/#/work/walking-with-anthropologists");
  await expect(page.locator(".album-viewer")).toContainText(
    "awaiting a readable upload",
  );
  await expect(page.locator(".album-viewer img")).toHaveCount(0);
  await expect(
    page.locator('a[download], a[href$=".pdf"], iframe, embed'),
  ).toHaveCount(0);
  await expect(page.locator(".project-heading")).toContainText(
    "Founder & Lead Organiser",
  );
});

test("complete album supports all 17 pages in order, boundary controls, zoom, and permission flags", async ({
  page,
}) => {
  // Synthetic numbered pages are browser-test fixtures only. They are never
  // written to public/ and never substitute for the owner's actual album.
  await page.route("**/src/walking-album.ts*", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `export const walkingAlbum = ${JSON.stringify({
        title: { en: "Test album", zh: "测试相册" },
        expectedPageCount: 17,
        pages: Array.from({ length: 17 }, (_, i) => ({
          pageNumber: i + 1,
          src: `/__album-test/page-${i + 1}.svg`,
          alt: `Test page ${i + 1}`,
          width: 600,
          height: 800,
          permissionReviewRequired: i === 1,
        })),
      })};`,
    }),
  );
  await page.route("**/__album-test/*.svg", (route) =>
    route.fulfill({
      contentType: "image/svg+xml",
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="600" height="800" fill="#eee"/><text x="40" y="60">BROWSER TEST FIXTURE</text></svg>',
    }),
  );
  await page.goto("/#/work/walking-with-anthropologists");
  const viewer = page.locator(".album-viewer");
  const previous = viewer.getByRole("button", { name: /Previous/ });
  const next = viewer.getByRole("button", { name: /Next/ });
  await expect(previous).toBeDisabled();
  for (let number = 1; number <= 17; number++) {
    await expect(viewer.locator("output")).toContainText(
      `Page ${number} of 17`,
    );
    await expect(viewer.locator("img")).toHaveAttribute(
      "src",
      `/__album-test/page-${number}.svg`,
    );
    await expect(viewer.locator("img")).toHaveAttribute(
      "alt",
      `Test page ${number}`,
    );
    await expect
      .poll(() =>
        viewer
          .locator("img")
          .evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
      )
      .toBe(true);
    await expect(viewer.locator(".album-permission")).toHaveCount(
      number === 2 ? 1 : 0,
    );
    if (number < 17) await next.click();
  }
  await expect(next).toBeDisabled();
  await previous.click();
  await expect(viewer.locator("output")).toContainText("Page 16 of 17");
  await viewer.getByRole("button", { name: "Read closer / 放大阅读" }).click();
  await expect(viewer.locator(".album-page")).toHaveClass(/zoomed/);
  expect(
    await viewer
      .locator(".album-page")
      .evaluate((element) => element.scrollWidth > element.clientWidth),
  ).toBe(true);
  await previous.click();
  await expect(viewer.locator(".album-page")).not.toHaveClass(/zoomed/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(
    page.locator('a[download], a[href$=".pdf"], iframe, embed'),
  ).toHaveCount(0);
});

test("real portrait, complete poster, and all original album pages load on desktop and mobile", async ({
  page,
}) => {
  await page.goto("/");
  const portrait = page.locator(".opening-photo>img");
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
  const walking = page.locator(
    '.home-projects a[href="#/work/walking-with-anthropologists"]',
  );
  await expect(walking.locator("img")).toHaveAttribute(
    "src",
    "/images/walking-album/page-10.jpg",
  );
  await expect(walking).toContainText("Founder & Lead Organiser");
  await page.goto("/#/work/south-asia-film-screening-series");
  const poster = page.locator(".image-space.large img");
  await expect(poster).toHaveAttribute(
    "src",
    "/images/south-asia/recap-poster.png",
  );
  await expect
    .poll(() =>
      poster.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
  const size = await poster.evaluate((img: HTMLImageElement) => ({
    natural: img.naturalWidth / img.naturalHeight,
    rendered:
      img.getBoundingClientRect().width / img.getBoundingClientRect().height,
    fit: getComputedStyle(img).objectFit,
  }));
  expect(size.fit).toBe("contain");
  expect(size.rendered).toBeCloseTo(size.natural, 2);
  await page.goto("/#/work/walking-with-anthropologists");
  const viewer = page.locator(".album-viewer");
  const flagged = [2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  for (let number = 1; number <= 17; number++) {
    const image = viewer.locator("img");
    await expect(viewer.locator("output")).toContainText(
      `Page ${number} of 17`,
    );
    await expect(image).toHaveAttribute(
      "src",
      `/images/walking-album/page-${String(number).padStart(2, "0")}.jpg`,
    );
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) =>
            img.complete &&
            img.naturalWidth === 1386 &&
            img.naturalHeight === 1071,
        ),
      )
      .toBe(true);
    await expect(viewer.locator(".album-permission")).toHaveCount(
      flagged.includes(number) ? 1 : 0,
    );
    if (number < 17) await viewer.getByRole("button", { name: /Next/ }).click();
  }
  await expect(page.locator('a[href$=".pdf"], a[download]')).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
