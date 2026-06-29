import { test, expect } from '../src/fixtures/pageFixture';
import { LoginPage } from '../src/pages/LoginPage';
import { CsvHelper } from '../src/utils/csvutil';
import {excelHelper} from '../src/utils/excelhelper';
import { JsonHelper } from '../src/utils/jsonutils';
test.beforeEach(async ({ loginP }) => {
    await loginP.gotoLoginPage();
})
test('login Page title test', async ({ loginP }) => {
    const pagetitlte = await loginP.getLoginPageTitle();
    console.log('login Page', pagetitlte)
    expect(pagetitlte).toBe('Account Login')
})

test('forgot Passwrd', async ({ loginP }) => {
    expect(await loginP.isForgotPassExit()).toBeTruthy()
})

test('Perform Login operation', async ({ loginP, homeP }) => {
    await loginP.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!)
    expect(await homeP.isLogoutLinkExists()).toBeTruthy()
})

//DD_1 approach 1 sequence mode using fixture
test('login to app using wrong cred with data driven test', async ({ loginP, testData }) => {
    for (let row of testData) {
        await loginP.doLogin(row.useremail, row.password)
        expect(await loginP.isInvalidLoginError()).toBeTruthy();
    }
})

//DD_2 without using fixture
let testData = CsvHelper.readCsv('data/logindata.csv')
for (let row of testData) {
    test(`invalid cred1 -${row.useremail} - ${row.password}`, async ({ loginP }) => {
        console.log('printing in col',row.useremail)
        await loginP.doLogin(row.useremail, row.password)
        expect(await loginP.isInvalidLoginError()).toBeTruthy();
    });
}  
//excel data
let testData2 = excelHelper.readExcel('data/cred.xlsx','login')
for (let row of testData2) {
    test(`invalid login test with excel -${row.useremail} - ${row.password}`, async ({ loginP }) => {
        console.log('printing in col',row.useremail)
        await loginP.doLogin(row.useremail, row.password)
        expect(await loginP.isInvalidLoginError()).toBeTruthy();
    });
}

let loginJSONData=JsonHelper.readJson("data/logindata.json")
for (let row of loginJSONData) {
    test(`invalid login test with json -${row.appuserName} - ${row.password}`, async ({ loginP }) => {
        console.log('printing in col',row.appuserName)
        await loginP.doLogin(row.appuserName, row.password)
        expect(await loginP.isInvalidLoginError()).toBeTruthy();
    });
}