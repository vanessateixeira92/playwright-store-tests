import { test, expect } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;

    // === Locators ===
    this.inventoryButton = page.getByTestId("store-tab-inventory");
    this.nameInput = page.getByTestId("inventory-input-name");
    this.priceInput = page.getByTestId("inventory-input-price");
    this.quantityInput = page.getByTestId("inventory-input-quantity");
    this.addButton = page.getByTestId("inventory-submit-button");
  }

  // === Navigation ===
  async navigate() {
    await test.step("Navigate to the Inventory Page", async () => {});
    await this.page.goto("/store");
    await this.inventoryButton.click();
  }

  // === Actions ===
  async addProduct(name, price, quantity) {
    await test.step("Add product", async () => {
      await this.nameInput.fill(name);
      await this.priceInput.fill(String(price));
      await this.quantityInput.fill(String(quantity));
      await this.addButton.click();
    });
  }

  getProductRow(productName) {
    return this.page.locator("li").filter({ hasText: productName }).first();
  }

  // === Increase quantity ===
  async increaseQuantity(productName) {
    await test.step(`Increase quantity for ${productName}`, async () => {
      const row = this.getProductRow(productName);
      const button = row.locator("button").last();
      await button.click();
    });
  }

  // === Decrease quantity ===
  async decreaseQuantity(productName) {
    await test.step(`Decrease quantity for ${productName}`, async () => {
      const row = this.getProductRow(productName);
      const button = row.locator("button").first();
      await button.click();
    });
  }
}
