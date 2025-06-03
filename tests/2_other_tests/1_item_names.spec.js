import { test } from '../../global_setup/test_setup.js';
import { homePageLocators } from '../../locators/homePageLocators.js';

test('Print all item names', async ({ page }) => {
    await page.waitForSelector(homePageLocators.itemTitle)
    const productNames = await page.locator(homePageLocators.itemTitle).allTextContents()

    productNames.forEach((name, itemNo) =>
        console.log(`Product #${itemNo + 1} is: ${name}`)) //looping through all product names and printing them
})


