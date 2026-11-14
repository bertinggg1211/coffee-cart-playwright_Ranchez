import { test as base } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type Fixtures = {
  menuPage: MenuPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Fixtures>({
  menuPage: async ({ page }, use) => {
    const menu = new MenuPage(page);
    await menu.goto(); // every test starts on a fresh page with an empty cart
    await use(menu);
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect } from "@playwright/test";
