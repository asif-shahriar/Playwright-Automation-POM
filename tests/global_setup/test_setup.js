import { test as base, expect } from '@playwright/test';
import fs from 'fs';

export const test = base.extend({

  /*

  1. This overrides Playwright’s page fixture.
  2. testInfo provides context about the current test (like the title)
  3. use(page) hands off the page to the actual test body once your setup code execution is done.

  */

  page: async ({ page }, use, testInfo) => {
    // Optional skip flag in title, if present, that test will skip this setup code
    if (testInfo.title.includes('[no-setup]')) {
      console.log('Skipping global setup for:', testInfo.title);

      /* so the test can use the page as usual 
      as one file can contain multiple tests and all tests might not be skipped */
      return await use(page);
    }

    try {
      await page.goto('https://demoblaze.com', { waitUntil: 'load' });
      await page.waitForSelector('#nava');
      await expect(page).toHaveTitle('STORE');
      console.log('Page loaded and title verified');
    } catch (error) {
      console.error('Failed to load the page or match title:', error);
      throw error;
    }

    // Load credentials from logininfo.json
    const { username: userid, password: pw } = JSON.parse(
      fs.readFileSync('Data/logininfo.json', 'utf-8')
    );

    await page.click('#login2');
    await expect(page.locator('#logInModal')).toBeVisible();

    await page.fill('#loginusername', userid);
    await page.fill('#loginpassword', pw);
    await page.click("button[onclick='logIn()']");

    await expect(page.locator('#nameofuser')).toContainText(`Welcome ${userid}`);
    console.log(`Login successful with username: '${userid}' and password: '${pw}'`);

    // Important: this lets the test actually run after this code
    await use(page);
  }
});
