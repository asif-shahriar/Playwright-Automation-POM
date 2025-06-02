import { test } from '../global_setup/test_setup.js';
import { expect } from '@playwright/test';

import fs from 'fs';


// test.beforeEach(async ({ page }) => {
//     try {
//         await page.goto('https://demoblaze.com', { waitUntil: 'load' }); // waits for full page load
//         await page.waitForSelector('#nava') // waiting for to load the page logo
//         await expect(page).toHaveTitle('STORE')
//         console.log('Page loaded and title verified')
//     } catch (error) {
//         console.error('Failed to load the page or match title:', error)
//         throw error;
//     }

//     /*
//         Logging in with the fake generated username and password
//     */

//     // Load saved username and password from userinfo.json 
//     const { username: userid, password: pw } = JSON.parse(fs.readFileSync('Data/userinfo.json', 'utf-8'));

//     console.log(`extracted username: '${userid}' and password: '${pw}'`)

//     await page.click('#login2');
//     await expect(page.locator('#logInModal')).toBeVisible();

//     await page.fill('#loginusername', userid);
//     await page.fill('#loginpassword', pw);

//     await page.click("button[onclick='logIn()']");

//     // Assert that login was successful
//     await expect(page.locator('#nameofuser')).toContainText(`Welcome ${userid}`)
//     console.log(`Login successful with username: '${userid}' and password: '${pw}'`)
// })


test('Print all unique link texts', async ({ page }) => {
    const allTexts = await page.locator('a').allTextContents()
    
    // Remove empty/space-only strings and get unique texts from all links in the page
    const linkTexts = [...new Set(allTexts.map(text => text.trim()).filter(text => text !== ''))]

    for (const text of linkTexts) {
        console.log('Link name:', text)
    }
})


