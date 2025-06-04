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
    /* 
      Load saved username and password from the given filepath   
      and storing it in two new variables by mapping them with the json keys passed as the method parameter(s) 
    */

    // Load saved username and password from userinfo.json 
    // const { username: userid, password: pw } = readJson('data/signupinfo.json', 'username', 'password')
    const data = readJson(filePath)
    const userid = data[usernameKey]
    const pw = data[passwordKey]

    // console.log(`extracted username: '${userid}' and password: '${pw}'`)

    await this.page.waitForSelector(loginLocators.btnLogin)
    await this.page.click(loginLocators.btnLogin)
    await expect(this.page.locator(loginLocators.loginModalTitle)).toBeVisible();

    await this.page.fill(loginLocators.username, userid)
    await this.page.fill(loginLocators.password, pw)

    await this.page.click(loginLocators.btnSubmitLogin)

    // Assert that login was successful
    await expect(this.page.locator(loginLocators.nameOfLoggedInUser)).toContainText(`Welcome ${userid}`)
    console.log(`Login successful with username: '${userid}'`)

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