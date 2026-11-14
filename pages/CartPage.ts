import { Page, Locator } from "@playwright/test";

export class CartPage {
  constructor(private readonly page: Page) {}

  addOneButton(displayName: string): Locator {
    return this.page.getByRole("button", { name: `Add one ${displayName}` });
  }

  removeOneButton(displayName: string): Locator {
    return this.page.getByRole("button", { name: `Remove one ${displayName}` });
  }
}
