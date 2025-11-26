import { test, expect } from "@playwright/test";

export class CatalogPage {
  constructor(page) {
    this.page = page;

    // === Locator ===
    this.catalogButton = page.getByTestId("store-tab-catalog");
  }

  // === Navigation ===
  async navigate() {
    await test.step("Navigate to the catalog page", async () => {
      await this.page.goto("/store");
      await this.catalogButton.click();
    });
  }

  // === Actions ===
  getAddToCartButton(productName) {
    return this.page
      .locator("li")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to Cart" });
  }

  async addItemToCart(productName) {
    await test.step(`Add ${productName} item to the cart`, async () => {
      const btn = await this.getAddToCartButton(productName);
      await expect(btn).toBeVisible({ timeout: 5000 });
      await btn.click();
    });
  }
}
