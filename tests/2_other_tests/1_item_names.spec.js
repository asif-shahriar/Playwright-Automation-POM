import { test } from '../global_setup/test_setup.js';

test('Print all item names', async ({ page }) => {
    await page.waitForSelector('.card-title')
    const productNames = await page.locator('.card-title').allTextContents()

    productNames.forEach((name, itemNo) =>
        console.log(`Product #${itemNo + 1} is: ${name}`)) //looping through all product names and printing them
})


