import { expect, test } from "@playwright/test";

const navItems = [
  { label: "Главная", path: "/", heading: "Медико-бизнес эксперт" },
  { label: "Обо мне", path: "/about", heading: "Международный медико-бизнес эксперт" },
  { label: "Услуги", path: "/services", heading: "Услуги" },
  { label: "Контакты", path: "/contact", heading: "Контакты" },
] as const;

test.describe("TC-01: Site shell layout and navigation", () => {
  test("header, footer, active route, and not-found", async ({ page }) => {
    await page.goto("/");

    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: "Юлия Медведева" })).toBeVisible();

    const headerNav = header.getByRole("navigation", { name: "Основная навигация" });
    for (const item of navItems) {
      await expect(headerNav.getByRole("link", { name: item.label })).toBeVisible();
    }

    for (const item of navItems) {
      await headerNav.getByRole("link", { name: item.label }).click();
      await expect(page).toHaveURL(new RegExp(`${item.path === "/" ? "/$" : item.path}$`));
      await expect(page.getByRole("heading", { name: item.heading, level: 1 })).toBeVisible();
      await expect(header).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
    }

    await page.goto("/about");
    const aboutLink = headerNav.getByRole("link", { name: "Обо мне" });
    await expect(aboutLink).toHaveAttribute("aria-current", "page");
    await expect(aboutLink).toHaveClass(/text-primary/);

    const footer = page.getByRole("contentinfo");
    for (const item of navItems) {
      await footer.getByRole("link", { name: item.label }).click();
      await expect(page).toHaveURL(new RegExp(`${item.path === "/" ? "/$" : item.path}$`));
      await expect(page.getByRole("heading", { name: item.heading, level: 1 })).toBeVisible();
    }

    await header.getByRole("link", { name: "Юлия Медведева" }).click();
    await expect(page).toHaveURL("/");

    await page.goto("/nonexistent-path");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Страница не найдена")).toBeVisible();
    await expect(page.getByRole("link", { name: "На главную" })).toBeVisible();
    await expect(header).toBeVisible();
    await expect(footer).toBeVisible();
  });
});
