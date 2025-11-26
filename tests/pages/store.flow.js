import { test, expect } from "@playwright/test";
import { CatalogPage } from "./catalog.page.js";
import { CartPage } from "./cart.page.js";

export class StoreFlow {
  constructor(page) {
    this.page = page;
    this.catalog = new CatalogPage(page);
    this.cart = new CartPage(page);
  }

  async addProductFromCatalogToCart(productName) {
    // Navigate to the catalog and add the item
    await this.catalog.navigate();
    await this.catalog.addItemToCart(productName);

    // Navigate to the cart and assert the product is present
    await this.cart.navigate();
    await this.cart.assertProductInCart(productName);

    // Validate that the cart total is greater than zero
    const total = await this.cart.getCartTotal();
    expect(total).toBeGreaterThan(0);
  }
}
