import { test, expect } from "@playwright/test";

export class OrderPage {
  constructor(page) {
    this.page = page;

    // === Locators ===
    this.ordersButton = page.getByTestId("store-tab-orders");
  }

  // === Navigation ===
  async navigate() {
    await test.step("Navigate to Orders page", async () => {
      await this.ordersButton.click();
    });
  }

  // === Get latest order details ===
  async getLatestOrderDetails() {
    return await test.step("Get latest order details", async () => {
      const orderItem = this.page.locator("li").first(); // pega o pedido mais recente

      return {
        container: orderItem,
        quantityDisplay: orderItem.getByText(/\d+ x/), // regex para quantidade
        subtotalDisplay: orderItem.getByText(/€\d+\.\d+/).last(), // regex para preço
      };
    });
  }

  // === Assert that the latest order contains the expected product and quantity ===
  async assertLatestOrderContains(productName, quantity = 1) {
    await test.step(`Assert latest order contains ${productName}`, async () => {
      const orderDetails = await this.getLatestOrderDetails();
      const text = await orderDetails.container.innerText();

      expect(text, "Order does not contain the expected product").toContain(
        productName
      );

      const qtyText = await orderDetails.quantityDisplay.innerText();
      const match = qtyText.match(/(\d+)\s*x/);
      expect(match, "Could not extract quantity from order").not.toBeNull();

      const extractedQty = Number(match[1]);
      expect(extractedQty).toBe(quantity);
    });
  }
}
