import { LoginPage } from '../src/pages/LoginPage'
import { test, expect } from '@playwright/test';

let lpobje : LoginPage
test.beforeEach(async ({ page }) => {
    lpobje = new LoginPage(page);
    await lpobje.gotoLoginPage();
})
test('login Page title test', async ({}) => {
    const pagetitlte = await lpobje.getLoginPageTitle();
    console.log('login Page', pagetitlte)
    expect(pagetitlte).toBe('Account Login')
})

test('forgot Passwrd',async()=>{
    // expect(await loginPage.isForgotPassExit()).toBeTruthly
})