import { test } from '../../global_setup/test_setup';
import { HomePage } from '../../pages/homePage';

// This test prints all unique link texts on the home page
test('Print all unique link texts', { tag: '@regression' }, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.allUniqueLinkText()
})


