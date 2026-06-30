import { expect, test } from "@playwright/test";

test.describe("TC-03: Home landing page content and CTAs", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("hero, segment teasers, CTAs, and portrait placeholder", async ({ page }) => {
    await page.goto("/");

    const header = page.getByRole("banner");
    const footer = page.getByRole("contentinfo");
    await expect(header).toBeVisible();
    await expect(footer).toBeVisible();

    await expect(page.getByText("Юлия Медведева").first()).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Медико-бизнес эксперт", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("ВРТ / ЭКО и клиники под ключ")).toBeVisible();

    const heroBox = await page
      .getByRole("heading", { name: "Медико-бизнес эксперт", level: 1 })
      .boundingBox();
    expect(heroBox).not.toBeNull();
    expect(heroBox!.y).toBeLessThan(900);

    await expect(page.getByText("Россия, Казахстан, Узбекистан")).toBeVisible();

    const investorCard = page.getByRole("article").filter({ hasText: "Инвестор" });
    const clinicOwnerCard = page.getByRole("article").filter({ hasText: "Владелец клиники" });
    await expect(investorCard).toBeVisible();
    await expect(clinicOwnerCard).toBeVisible();

    const investorBox = await investorCard.boundingBox();
    const clinicOwnerBox = await clinicOwnerCard.boundingBox();
    expect(investorBox).not.toBeNull();
    expect(clinicOwnerBox).not.toBeNull();
    expect(Math.abs(investorBox!.width - clinicOwnerBox!.width)).toBeLessThan(40);

    await page.getByRole("link", { name: "Связаться" }).click();
    await expect(page).toHaveURL("/contact");
    await expect(page.getByRole("heading", { name: "Контакты", level: 1 })).toBeVisible();

    const hero = page.locator('section[aria-labelledby="home-headline"]');

    await page.goto("/");
    await hero.getByRole("link", { name: "Обо мне" }).click();
    await expect(page).toHaveURL("/about");

    await page.goto("/");
    await hero.getByRole("link", { name: "Услуги" }).click();
    await expect(page).toHaveURL("/services");

    await page.goto("/");
    const portraitFrame = page.getByTestId("portrait-frame");
    await expect(portraitFrame).toBeVisible();
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
  });
});
