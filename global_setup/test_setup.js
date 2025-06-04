import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import { signUpLocators } from '../locators/signUpLocators.js';
import { loginLocators } from '../locators/loginLocators.js';

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
      // Load saved url from baseurl.json 
      const { url } = JSON.parse(fs.readFileSync('data/baseurl.json', 'utf-8'));

      await page.goto(url, { waitUntil: 'load' }); // waits for full page load
      await page.waitForSelector(signUpLocators.pageLogo);
      await expect.soft(page).toHaveTitle('STORE') // soft assert
      console.log('Page loaded and title verified');
    } catch (error) {
      console.error('Failed to load the page or match title:', error);
      throw error;
    }

    // Load credentials from logininfo.json
    const { username: userid, password: pw } = JSON.parse(
      fs.readFileSync('data/logininfo.json', 'utf-8')
    );
  

    await page.click(loginLocators.btnLogin);
    await expect(page.locator(loginLocators.loginModalTitle)).toBeVisible();

    await page.fill(loginLocators.username, userid);
    await page.fill(loginLocators.password, pw);

    await page.click(loginLocators.btnSubmitLogin);

    // Assert that login was successful
    await expect(page.locator(loginLocators.nameOfLoggedInUser)).toContainText(`Welcome ${userid}`)
    console.log(`Login successful with username: '${userid}' and password: '${pw}'`)

    // Important: this lets the test actually run after this code
    await use(page);
  }
});
