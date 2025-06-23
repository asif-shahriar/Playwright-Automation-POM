import { test as base } from '@playwright/test'
import { Login } from '../pages/login.js'
import { HomePage } from '../pages/homePage.js'

// Define file paths as constants for easier updates
const BASE_URL_PATH = 'data/baseurl.json'
const LOGIN_INFO_PATH = 'data/logininfo.json'

export const test = base.extend({

  /*

  1. This overrides Playwright’s page fixture.
  2. testInfo provides context about the current test (like the title)
  3. use(page) hands off the page to the actual test body once your setup code execution is done.

  */

  page: async ({ page }, use, testInfo) => {
    // Optional skip flag in title, if present, that test will skip this setup code
    if (testInfo.title.includes('[no-setup]')) {
      console.log('Skipping global setup for:', testInfo.title)

      /* 
        so the test can use the page as usual 
        as one file can contain multiple tests and all tests might not be skipped 
      */
      return await use(page)
    }

    try {
      const homePage = new HomePage(page)
      await homePage.loadUrlFromGlobalJson(BASE_URL_PATH)

      const loginPage = new Login(page)
      await loginPage.loginFromJson(LOGIN_INFO_PATH, 'username', 'password')
    } catch (error) {
      console.error(`Global setup failed for: ${testInfo.title}`, error)
      throw error
    }

    // Important: this lets the test actually run after this code
    await use(page)
  }
})
