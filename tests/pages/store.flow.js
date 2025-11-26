import { test, expect } from "@playwright/test";
import { CatalogPage } from "./catalog.page.js";
import { CartPage } from "./cart.page.js";
import { PaymentPage } from "../pages/payment.page.js";
import { OrderPage } from "../pages/order.page.js";

export class StoreFlow {
  constructor(page) {
    this.page = page;
    this.catalog = new CatalogPage(page);
    this.cart = new CartPage(page);
    this.payment = new PaymentPage(page);
    this.orders = new OrderPage(page);
  }

  async addProductFromCatalogToCart(productName) {
    // Navigate to the catalog and add the item
    await this.catalog.navigate();
    await this.catalog.addItemToCart(productName);

    // Navigate to the cart and assert the product is present
    await this.cart.navigate();
    await this.cart.assertProductInCart(productName);

    // Validate that the cart total is greater than zero
    const totalText = await this.cart.getCartTotal();
    const total = parseFloat(totalText.replace(/[^\d.]/g, ""));
    expect(total, "Cart total should be greater than 0").toBeGreaterThan(0);
  }

  // Complete payment and create order
  async completePaymentAndCreateOrder(productName, paymentMethod) {
    // Navigate to Payment page
    await this.payment.navigate();
    await this.payment.methodPayment(paymentMethod);

    // Navigate to Orders tab/page
    await this.orders.navigate();
    await this.orders.assertLatestOrderContains(productName, 1);
  }

  // Full flow: add product -> cart -> payment -> order
  async addProductPayAndOrder(productName, paymentMethod) {
    await this.addProductFromCatalogToCart(productName);
    await this.completePaymentAndCreateOrder(productName, paymentMethod);
    await this.orders.assertLatestOrderContains(productName, 1);
  }
}
