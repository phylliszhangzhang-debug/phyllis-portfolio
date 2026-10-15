import { test, expect } from "@playwright/test";

test("unavailable source remains explicit and no PDF download is offered", async ({
  page,
}) => {
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
