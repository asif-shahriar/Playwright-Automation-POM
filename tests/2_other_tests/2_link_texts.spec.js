import { test } from '../../global_setup/test_setup.js';
import { HomePage } from '../../pages/homePage.js'

test('Print all unique link texts', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.allUniqueLinkText()
})


