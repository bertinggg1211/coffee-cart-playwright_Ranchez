import { Page, Locator, expect } from "@playwright/test";

type PromoChoice = "accept" | "skip";

export class MenuPage {
  readonly cartLink: Locator;
  readonly promoAccept: Locator;
  readonly promoSkip: Locator;

  constructor(private readonly page: Page) {
    this.cartLink = page
      .getByRole("listitem")
      .filter({ hasText: /cart \(\d+\)/i });
    this.promoAccept = page.getByRole("button", { name: "Yes, of course!" });
    this.promoSkip = page.getByRole("button", { name: "Nah, I'll skip." });
  }

  async goto() {
    await this.page.goto("/");
  }

  coffee(id: string): Locator {
    return this.page.getByTestId(id);
  }

  async cartCount(): Promise<number> {
    const text = await this.cartLink.innerText();
    const match = text.match(/cart \((\d+)\)/i);
    return match ? Number(match[1]) : 0;
  }

  /** Adds a coffee. If the cart count reaches a multiple of 3, the promo popup is handled. */
  async addCoffee(id: string, options: { promo?: PromoChoice } = {}) {
    const promo = options.promo ?? "skip";
    const expected = (await this.cartCount()) + 1;

    await this.coffee(id).click();
    await expect(this.cartLink).toContainText(`cart (${expected})`);

    if (expected % 3 === 0) {
      await expect(this.promoAccept).toBeVisible();
      await (promo === "accept" ? this.promoAccept : this.promoSkip).click();
      await expect(this.promoAccept).toBeHidden();
    }
  }
}
