import { expect, test } from "@playwright/test";

test.describe("TC-04: About page trust content and CTAs", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("positioning, trust figures, narrative, and CTAs", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    await expect(page.getByText("Юлия Медведева").first()).toBeVisible();
    await expect(page.getByTestId("portrait-frame")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Международный медико-бизнес эксперт", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("CEO / управляющий партнёр, 10+ лет")).toBeVisible();
    await expect(page.getByText("ВРТ / ЭКО")).toBeVisible();

    const figuresBlock = page.getByTestId("trust-figures-block");
    await expect(figuresBlock).toBeVisible();
    const figures = figuresBlock.getByTestId("trust-figure");
    await expect(figures).toHaveCount(4);

    const blockBox = await figuresBlock.boundingBox();
    expect(blockBox).not.toBeNull();
    for (let i = 0; i < 4; i++) {
      const figureBox = await figures.nth(i).boundingBox();
      expect(figureBox).not.toBeNull();
      expect(figureBox!.y).toBeGreaterThanOrEqual(blockBox!.y);
      expect(figureBox!.y + figureBox!.height).toBeLessThanOrEqual(blockBox!.y + blockBox!.height + 1);
    }

    await expect(page.getByText(/P&L/)).toBeVisible();
    await expect(page.getByText(/EBITDA/)).toBeVisible();
    await expect(page.getByText(/ROI/)).toBeVisible();
    await expect(page.getByText(/врача/i)).toBeVisible();

    await expect(page.getByRole("heading", { name: "Миссия", level: 2 })).toBeVisible();
    await expect(page.getByText(/высокомаржинальный бизнес/i)).toBeVisible();

    await expect(page.getByText(/России/)).toBeVisible();
    await expect(page.getByText(/Казахстане/)).toBeVisible();
    await expect(page.getByText(/Узбекистане/)).toBeVisible();
    await expect(page.getByText(/европейск/i)).toBeVisible();

    const ctaSection = page.locator('section[aria-labelledby="about-ctas-heading"]');
    await ctaSection.getByRole("link", { name: "Услуги" }).click();
    await expect(page).toHaveURL("/services");

    await page.goto("/about");
    await ctaSection.getByRole("link", { name: "Связаться" }).click();
    await expect(page).toHaveURL("/contact");

    await page.goto("/about");
    await expect(page.getByTestId("portrait-frame")).toBeVisible();
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
  });
});
