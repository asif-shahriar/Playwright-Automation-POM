import { expect, Page } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';
import { readJson } from '../utilities/jsonActions';

export class Login {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginFromJson(
    filePath: string,
    usernameKey: string,
    passwordKey: string
  ): Promise<void> {
    // Load saved username and password from given filepath
    // const { username: userid, password: pw } = readJson('data/signupinfo.json', 'username', 'password')
    const data = readJson(filePath) as Record<string, string>;

    await this.page.waitForSelector(loginLocators.btnLogin);
    await this.page.click(loginLocators.btnLogin);
    await expect(this.page.locator(loginLocators.loginModalTitle)).toBeVisible();

    await this.page.locator(loginLocators.username).fill(data[usernameKey]);
    await this.page.locator(loginLocators.password).fill(data[passwordKey]);

    await this.page.click(loginLocators.btnSubmitLogin);

    // Assert that login was successful
    await expect(this.page.locator(loginLocators.nameOfLoggedInUser)).toContainText(`Welcome ${data[usernameKey]}`);
    console.log(`Login successful with username: '${data[usernameKey]}'`);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.waitForSelector(loginLocators.btnLogin);
    await this.page.click(loginLocators.btnLogin);
    await expect(this.page.locator(loginLocators.loginModalTitle)).toBeVisible();

    await this.page.fill(loginLocators.username, username);
    await this.page.fill(loginLocators.password, password);

    await this.page.click(loginLocators.btnSubmitLogin);

    // Assert that login was successful
    await expect(this.page.locator(loginLocators.nameOfLoggedInUser)).toContainText(`Welcome ${username}`);
    console.log(`Login successful with username: '${username}'`)
  }
}