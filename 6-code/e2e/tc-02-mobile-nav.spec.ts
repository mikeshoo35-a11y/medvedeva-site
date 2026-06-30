import { expect, test } from "@playwright/test";

const navItems = [
  { label: "Главная", path: "/", heading: "Медико-бизнес эксперт" },
  { label: "Обо мне", path: "/about", heading: "Международный медико-бизнес эксперт" },
  { label: "Услуги", path: "/services", heading: "Услуги" },
  { label: "Контакты", path: "/contact", heading: "Контакты" },
] as const;

async function assertNoHorizontalScroll(page: import("@playwright/test").Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
}

test.describe("TC-02: Mobile navigation drawer", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("drawer exposes all destinations without horizontal scroll", async ({ page }) => {
    await page.goto("/");

    const header = page.getByRole("banner");
    const desktopNav = header.getByRole("navigation", { name: "Основная навигация" });
    await expect(desktopNav).toBeHidden();

    const menuButton = header.getByRole("button", { name: "Меню навигации" });
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const drawerNav = page.getByRole("dialog", { name: "Мобильная навигация" });
    await expect(drawerNav).toBeVisible();

    for (const item of navItems) {
      await drawerNav.getByRole("link", { name: item.label }).click();
      await expect(page).toHaveURL(new RegExp(`${item.path === "/" ? "/$" : item.path}$`));
      await expect(page.getByRole("heading", { name: item.heading, level: 1 })).toBeVisible();
      await assertNoHorizontalScroll(page);
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(drawerNav).toBeHidden();

      if (item !== navItems[navItems.length - 1]) {
        await menuButton.click();
        await expect(drawerNav).toBeVisible();
      }
    }
  });
});
