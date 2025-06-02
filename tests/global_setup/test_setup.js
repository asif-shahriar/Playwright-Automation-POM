// fixtures/my-test-setup.js
import { test as base, expect } from '@playwright/test';
import fs from 'fs';

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    // Optional skip flag in title
    if (testInfo.title.includes('[no-setup]')) {
      console.log('Skipping global setup for:', testInfo.title);
      return await use(page); // You still need to call use()
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
    console.log(`extracted username: '${userid}' and password: '${pw}'`);

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
