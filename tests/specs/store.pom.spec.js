import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory.page.js";
import { StoreFlow } from "../pages/store.flow.js";
import { PRODUCTS } from "../data/stock.data.js";

test.describe("Store flow testes", () => {
  let inventoryPage;
  let store;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    store = new StoreFlow(page);
  });

  // Inventory Page
  test("Add product and increase quantity", async () => {
    const product = PRODUCTS[0];

    await inventoryPage.navigate();
    await inventoryPage.addProduct(
      product.name,
      product.price,
      product.quantity
    );
    await inventoryPage.increaseQuantity(product.name);
  });

  // Store Flow: Catalog and Cart Pages
  test("Add product from catalog to cart", async ({ page }) => {
    const productName = "Lightsaber (Star Wars)";
    await store.addProductFromCatalogToCart(productName);
  });
});
