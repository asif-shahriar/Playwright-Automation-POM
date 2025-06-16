import { test } from '../../global_setup/test_setup.js';
import { HomePage } from '../../pages/homePage.js'

test('Print all item names', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.printAllItemNames()
})


