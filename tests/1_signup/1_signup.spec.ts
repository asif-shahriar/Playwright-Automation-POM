import { test } from '../../global_setup/test_setup';
import { Login } from '../../pages/login';
import { SignUp } from '../../pages/signup';
import { HomePage } from '../../pages/homePage';


test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.loadUrlFromGlobalJson('data/baseurl.json');
});

test.describe('Sign up', () => {
    test('Sign up with a fake user and login with that same fake user [no-setup]', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
        const signupPage = new SignUp(page);
        const loginPage = new Login(page);
        await signupPage.signUpWithFakeUserData('data/signupinfo.json');
        await loginPage.loginFromJson('data/signupinfo.json', 'username', 'password');
    })
})
