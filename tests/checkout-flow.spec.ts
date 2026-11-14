import { test, expect } from "../fixtures/test-fixtures";
import { products } from "../test-data/products";
import { customer } from "../test-data/customers";

test("customer can buy coffee and see the purchase confirmation", async ({
  menuPage,
  checkoutPage,
}) => {
  await menuPage.addCoffee(products.espresso);
  await menuPage.addCoffee(products.cappuccino);
  // The third item in the cart triggers the promo popup
  await menuPage.addCoffee(products.mocha, { promo: "accept" });
  await checkoutPage.open();
  await checkoutPage.pay(customer);

  await expect(checkoutPage.successMessage).toBeVisible();
});
