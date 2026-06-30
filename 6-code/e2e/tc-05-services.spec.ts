import { expect, test } from "@playwright/test";

test.describe("TC-05: Services pillars, segments, and CTA", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("intro, pillars, segments, and contact CTA", async ({ page }) => {
    await page.goto("/services");

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Услуги", level: 1 })).toBeVisible();

    await expect(page.getByText(/безопасность инвестиций/i)).toBeVisible();
    await expect(page.getByText(/скорость запуска/i)).toBeVisible();
    await expect(page.getByText(/опытное сопровождение/i)).toBeVisible();

    await expect(page.getByTestId("pillar-turnkey")).toBeVisible();
    await expect(page.getByTestId("pillar-ivf-launch")).toBeVisible();
    await expect(page.getByTestId("pillar-audit")).toBeVisible();
    await expect(page.getByText(/Клиника под ключ/i).first()).toBeVisible();
    await expect(page.getByText(/ЭКО\/ВРТ/i).first()).toBeVisible();
    await expect(page.getByText(/эмбриологическ/i).first()).toBeVisible();
    await expect(page.getByText(/чистые зоны/i).first()).toBeVisible();
    await expect(page.getByText(/Аудит и сопровождение/i).first()).toBeVisible();
    await expect(page.getByText(/прейскурант/i).first()).toBeVisible();

    const investorBlock = page.getByTestId("segment-investor");
    const clinicOwnerBlock = page.getByTestId("segment-clinic-owner");
    const starDoctorBlock = page.getByTestId("segment-star-doctor");

    await expect(investorBlock).toBeVisible();
    await expect(clinicOwnerBlock).toBeVisible();
    await expect(starDoctorBlock).toBeVisible();

    await expect(investorBlock.getByText(/СанПиН/i)).toBeVisible();
    await expect(investorBlock.getByRole("link", { name: "Клиника под ключ" })).toBeVisible();
    await expect(investorBlock.getByRole("link", { name: "Аудит и сопровождение" })).toBeVisible();

    await expect(clinicOwnerBlock.getByText(/прейскурант/i)).toBeVisible();
    await expect(clinicOwnerBlock.getByText(/Потолок выручки без направления ЭКО\/ВРТ/i)).toBeVisible();
    await expect(
      clinicOwnerBlock.getByRole("link", { name: "Запуск направления ЭКО/ВРТ" }),
    ).toBeVisible();

    await expect(starDoctorBlock).toHaveAttribute("data-prominence", "supporting");
    await expect(investorBlock).toHaveAttribute("data-prominence", "primary");
    await expect(clinicOwnerBlock).toHaveAttribute("data-prominence", "primary");

    const investorBox = await investorBlock.boundingBox();
    const clinicOwnerBox = await clinicOwnerBlock.boundingBox();
    expect(investorBox).not.toBeNull();
    expect(clinicOwnerBox).not.toBeNull();
    expect(Math.abs(investorBox!.width - clinicOwnerBox!.width)).toBeLessThan(40);
    expect(Math.abs(investorBox!.y - clinicOwnerBox!.y)).toBeLessThan(40);

    const investorHeading = investorBlock.getByRole("heading", { level: 2 });
    const starDoctorHeading = starDoctorBlock.getByRole("heading", { level: 2 });
    const investorFontSize = await investorHeading.evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize),
    );
    const starDoctorFontSize = await starDoctorHeading.evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize),
    );
    expect(starDoctorFontSize).toBeLessThan(investorFontSize);

    await page
      .locator('section[aria-labelledby="services-cta-heading"]')
      .getByRole("link", { name: "Связаться" })
      .click();
    await expect(page).toHaveURL("/contact");
    await expect(page.getByRole("heading", { name: "Контакты", level: 1 })).toBeVisible();
  });
});
