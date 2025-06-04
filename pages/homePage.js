import { expect } from '@playwright/test';
import { signUpLocators } from '../locators/signUpLocators.js'
import { readJson } from '../utilities/jsonActions.js'
import { homePageLocators } from '../locators/homePageLocators.js';

export class HomePage {

  /**
   * Reference "Page" from Playwright without actually importing it in the code
   * Helps with auto-suggestion/auto-completion
   * Add this JSDoc before class constructor and you're good to go
   * @param {import('@playwright/test').Page} page
  */
  constructor(page) {
    this.page = page;
  }

  async loadUrlFromGlobalJson(filePath) {
    try {
      // Load saved url from baseurl.json 
      const { url } = readJson(filePath)

      await this.page.goto(url, { waitUntil: 'load' }) // waits for full page load
      await this.page.waitForSelector(signUpLocators.pageLogo) // waiting for to load the page logo
      const pageTitle = await this.page.title()
      await expect.soft(this.page).toHaveTitle(pageTitle) // soft assert
      console.log('Page loaded and title verified')
    } catch (error) {
      console.error('Failed to load the page or match title:', error)
      throw error;
    }
  }

  async printAllItemNames() {
    await this.page.waitForSelector(homePageLocators.itemTitle)
    const productNames = await this.page.locator(homePageLocators.itemTitle).allTextContents()

    productNames.forEach((name, itemNo) =>
      console.log(`Product #${itemNo + 1} is: ${name}`)) //looping through all product names and printing them
  }

  async allUniqueLinkText() {
    const allTexts = await this.page.locator('a').allTextContents()

    // Remove empty/space-only strings and get unique texts from all links in the page
    const linkTexts = [...new Set(allTexts.map(text => text.trim()).filter(text => text !== ''))]

    for (const text of linkTexts) {
      console.log('Link name:', text)
    }
  }
}