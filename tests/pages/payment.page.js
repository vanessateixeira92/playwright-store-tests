import { test, expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;

    // === Locators ===
    this.paymentsButton = page.getByTestId("store-tab-payments");

    this.paymentMethods = {
      MBWay: page.getByTestId("payment-method-input-MBWay"),
      Klarna: page.getByTestId("payment-method-input-Klarna"),
      Multibanco: page.getByTestId("payment-method-input-Multibanco"),
      PayPal: page.getByTestId("payment-method-input-PayPal"),
      Visa: page.getByTestId("payment-method-input-Visa"),
    };

    this.confirmPaymentButton = page.getByTestId("payment-confirm-button");
  }

  // === Navigation ===
  async navigate() {
    await test.step("Navigate to Payment page", async () => {
      await this.paymentsButton.click();
    });
  }

  // === Select and confirm payment ===
  async methodPayment(methodName) {
    await test.step(`Confirm payment using ${methodName}`, async () => {
      const locator = this.paymentMethods[methodName];
      expect(locator, `Payment method "${methodName}" not found`).toBeDefined();

      await locator.click();
      await this.confirmPaymentButton.click();
    });
  }
}
