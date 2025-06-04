import { test as base, expect } from '@playwright/test';
import { Login } from '../pages/login.js'
import { HomePage } from '../pages/homePage.js'

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

      /* 
        so the test can use the page as usual 
        as one file can contain multiple tests and all tests might not be skipped 
      */
      return await use(page);
    }

    const homePage = new HomePage(page)
    await homePage.loadUrlFromGlobalJson('data/baseurl.json')

    const loginPage = new Login(page)
    await loginPage.loginFromJson('data/logininfo.json', 'username', 'password')

    // Important: this lets the test actually run after this code
    await use(page);
  }
});
