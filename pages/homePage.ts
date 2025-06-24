import { expect, Page } from '@playwright/test';
import { signUpLocators } from '../locators/signUpLocators';
import { readJson } from '../utilities/jsonActions';
import { homePageLocators } from '../locators/homePageLocators';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loadUrlFromGlobalJson(filePath: string): Promise<void> {
    try {
      // Load saved url from baseurl.json 
      const { url } = readJson<{ url: string }>(filePath);

      if (!url) {
        throw new Error('URL is undefined in the provided JSON file.');
      }
      await this.page.goto(url, { waitUntil: 'load' }); // waits for full page load
      await this.page.waitForSelector(signUpLocators.pageLogo); // waiting for to load the page logo
      const pageTitle = await this.page.title();
      await expect.soft(this.page).toHaveTitle(pageTitle); // soft assert
      console.log('Page loaded and title verified');
    } catch (error) {
      console.error('Failed to load the page or match title:', error);
      throw error;
    }
  }

  async printAllItemNames(): Promise<void> {
    await this.page.waitForSelector(homePageLocators.itemTitle);
    const productNames = await this.page.locator(homePageLocators.itemTitle).allTextContents();

    productNames.forEach((name, itemNo) =>
      console.log(`Product #${itemNo + 1} is: ${name}`)); //looping through all product names and printing them
  }

  async allUniqueLinkText(): Promise<void> {
    const allTexts = await this.page.locator('a').allTextContents();

    // Remove empty/space-only strings and get unique texts from all links in the page
    const linkTexts = [...new Set(allTexts.map(text => text.trim()).filter(text => text !== ''))];

    for (const text of linkTexts) {
      console.log('Link name:', text);
    }
  }
}