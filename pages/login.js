import { expect } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators.js'
import { readJson } from '../utilities/jsonActions.js'

export class Login {

  /**
   * Reference "Page" from Playwright without actually importing it in the code
   * Helps with auto-suggestion/auto-completion
   * Add this JSDoc before class constructor and you're good to go
   * @param {import('@playwright/test').Page} page
  */
  constructor(page) {
    this.page = page;
  }

  async loginFromJson(filePath, usernameKey, passwordKey) {
    // Load saved username and password from given filepath
    // const { username: userid, password: pw } = readJson('data/signupinfo.json', 'username', 'password')
    const data = readJson(filePath)

    await this.page.waitForSelector(loginLocators.btnLogin)
    await this.page.click(loginLocators.btnLogin)
    await expect(this.page.locator(loginLocators.loginModalTitle)).toBeVisible();

    await this.page.locator(loginLocators.username).fill(data[usernameKey]);
    await this.page.locator(loginLocators.password).fill(data[passwordKey]);

    await this.page.click(loginLocators.btnSubmitLogin)

    // Assert that login was successful
    await expect(this.page.locator(loginLocators.nameOfLoggedInUser)).toContainText(`Welcome ${data[usernameKey]}`)
    console.log(`Login successful with username: '${data[usernameKey]}'`)

  }

  async login(username, password) {
    await this.page.waitForSelector(loginLocators.btnLogin)
    await this.page.click(loginLocators.btnLogin)
    await expect(this.page.locator(loginLocators.loginModalTitle)).toBeVisible();

    await this.page.fill(loginLocators.username, username)
    await this.page.fill(loginLocators.password, password)

    await this.page.click(loginLocators.btnSubmitLogin)

    // Assert that login was successful
    await expect(this.page.locator(loginLocators.nameOfLoggedInUser)).toContainText(`Welcome ${username}`)
    console.log(`Login successful with username: '${username}'`)
  }
}