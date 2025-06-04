import { test } from '../../global_setup/test_setup.js';
import { expect } from '@playwright/test';
import { readJson } from '../../utilities/jsonActions.js'
import { signUpLocators } from '../../locators/signUpLocators.js'
import { Login } from '../../pages/login.js'
import { SignUp } from '../../pages/signup.js'


test.beforeEach(async ({ page }) => {
    try {
        // Load saved url from baseurl.json 
        const { url } = readJson('data/baseurl.json')

        await page.goto(url, { waitUntil: 'load' }) // waits for full page load
        await page.waitForSelector(signUpLocators.pageLogo) // waiting for to load the page logo
        await expect.soft(page).toHaveTitle('STORE') // soft assert
        console.log('Page loaded and title verified')
    } catch (error) {
        console.error('Failed to load the page or match title:', error)
        throw error;
    }
});


test('Sign up and login with that user [no-setup]', async ({ page }) => {
    const signupPage = new SignUp(page)
    const loginPage = new Login(page)
    await signupPage.signUpwithFakeData('data/signupinfo.json')
    await loginPage.loginFromJson('data/signupinfo.json', 'username', 'password')
})