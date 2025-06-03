import { test } from '../../global_setup/test_setup.js';

test('Print all unique link texts', async ({ page }) => {
    const allTexts = await page.locator('a').allTextContents()
    
    // Remove empty/space-only strings and get unique texts from all links in the page
    const linkTexts = [...new Set(allTexts.map(text => text.trim()).filter(text => text !== ''))]

    for (const text of linkTexts) {
        console.log('Link name:', text)
    }
})


