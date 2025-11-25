import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory.page.js";
import { PRODUCTS } from "../data/stock.data.js";

test.describe("Store flow testes", () => {
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
  });

  // Inventory Page
  test("Add product and increase quantity", async () => {
    const product = PRODUCTS[0];
    await inventoryPage.addProduct(
      product.name,
      product.price,
      product.quantity
    );
    await inventoryPage.increaseQuantity(product.name);
  });
});
