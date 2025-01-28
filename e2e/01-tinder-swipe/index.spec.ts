import { expect, test } from "@playwright/test";
import { mouseHelper } from "../utils/mouse-helper";

test("01-tinder-swipe", async ({ page }) => {
  await mouseHelper(page);

  await page.goto("./01-tinder-swipe/index.html");

  await expect(page).toHaveScreenshot();

  await test.step("Swipe right", async () => {
    const element = page.getByRole("heading", { name: "Leila" });

    const box = await element.boundingBox();
    if (!box) {
      throw new Error("Elemento no encontrado");
    }

    const centroX = box.x + box.width / 2;
    const centroY = box.y + box.height / 2;
    await page.mouse.move(centroX, centroY);
    await page.mouse.down();

    for (let i = 0; i < 400; i++) {
      await page.mouse.move(centroX + i, centroY);
      if (i % 15 === 0) {
        await expect(page).toHaveScreenshot(`swipe-right-${i / 15}.png`);
      }
    }
    await page.mouse.up();

    await element.waitFor({ state: "detached" });
  });

  await test.step("Swipe left", async () => {
    const element = page.getByRole("heading", { name: /Álex|Ãlex/ });

    if (!element) {
      throw new Error("Elemento no encontrado");
    }

    const box = await element.boundingBox();
    if (!box) {
      throw new Error("Elemento no encontrado");
    }

    const centroX = box.x + box.width / 2;
    const centroY = box.y + box.height / 2;
    await page.mouse.move(centroX, centroY);
    await page.mouse.down();

    for (let i = 0; i < 400; i++) {
      await page.mouse.move(centroX - i, centroY);
      if (i % 15 === 0) {
        await expect(page).toHaveScreenshot(`swipe-left-${i / 15}.png`);
      }
    }
    await page.mouse.up();

    await element.waitFor({ state: "detached" });
  });

  await expect(page).toHaveScreenshot();

  await page.close()
});
