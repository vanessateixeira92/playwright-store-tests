import { test, expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;

    // === Locator ===
    this.cartButton = page.getByTestId("store-tab-cart");
  }

  // === Navigation ===
  async navigate() {
    await test.step("Navigate to cart page", async () => {
      await this.cartButton.click();
    });
  }

  // Helper for cart row
  cartRow(productName) {
    return this.page.locator("li").filter({ hasText: productName });
  }

  // === Assertions ===
  async assertProductInCart(productName, quantity = 1) {
    await test.step(`Assert ${productName} is in cart`, async () => {
      const row = this.cartRow(productName);

      await expect(row).toBeVisible({ timeout: 5000 });

      const text = await row.innerText();

      // Extract quantity → "1 x €"
      const match = text.match(/(\d+)\s*x\s*€/);

      expect(match, "Could not extract quantity from cart row").not.toBeNull();

      const extractedQty = parseFloat(match[1].replace(",", ""));

      expect(extractedQty).toBe(quantity);
    });
  }

  // === Get cart total ===
  async getCartTotal() {
    const text = await this.page.getByTestId("cart-total").innerText();
    return text.replace(/[^\d.]/g, "");
  }
}
