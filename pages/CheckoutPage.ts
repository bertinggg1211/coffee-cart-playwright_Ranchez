import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly checkoutButton: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly promotionCheckbox: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.checkoutButton = page.getByTestId("checkout");
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.promotionCheckbox = page.getByRole("checkbox", {
      name: "Promotion checkbox",
    });
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.successMessage = page.getByRole("button", {
      name: "Thanks for your purchase.",
    });
    this.closeButton = page.getByRole("button", { name: "×" });
  }

  async open() {
    await this.checkoutButton.click();
  }

  async pay(details: {
    name: string;
    email: string;
    subscribeToPromotions?: boolean;
  }) {
    await this.nameInput.fill(details.name);
    await this.emailInput.fill(details.email);
    if (details.subscribeToPromotions) {
      await this.promotionCheckbox.check();
    }
    await this.submitButton.click();
  }
}
