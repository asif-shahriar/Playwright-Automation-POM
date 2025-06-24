import { test } from '../../global_setup/test_setup';
import { HomePage } from '../../pages/homePage';

// This test prints all item names on the home page
test('Print all item names', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.printAllItemNames();
});


