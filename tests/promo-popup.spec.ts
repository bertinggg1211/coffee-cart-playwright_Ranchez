import { test, expect } from "../fixtures/test-fixtures";
import { products } from "../test-data/products";

test("promo popup appears on every 3rd item added to the cart", async ({ menuPage }) => {
  const coffees = Object.values(products);

  for (let count = 1; count <= 9; count++) {
    await test.step(`add item ${count}`, async () => {
      await menuPage.coffee(coffees[count - 1]).click();
      await expect(menuPage.cartLink).toContainText(`cart (${count})`);

      if (count % 3 === 0) {
        await expect(menuPage.promoSkip).toBeVisible();
        await menuPage.promoSkip.click();
        await expect(menuPage.promoSkip).toBeHidden();
      } else {
        await expect(menuPage.promoSkip).toBeHidden();
      }
    });
  }
});
