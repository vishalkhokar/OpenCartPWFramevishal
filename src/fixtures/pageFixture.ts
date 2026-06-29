import {test as bastest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CsvHelper } from '../utils/csvutil';
import { SearchPage } from '../pages/searchresult';
// define type of page fixtures

type pageFixtures={
    loginP:LoginPage,
    homeP:HomePage 
    searchR:SearchPage
    testData:Record<string, string>[]
}
//extend playwright base test
export let test=bastest.extend<pageFixtures>({
     loginP: async ({page},use)=>{
        let loginPage = new LoginPage(page)
        await use(loginPage);
     },
     homeP:async ({page},use)=>{
        let homeP=new HomePage(page)
        await use(homeP)
     },
     searchR:async({page},use)=>{
      let searchR=new SearchPage(page);
      await use(searchR)
     },
     testData:async ({ },use)=>{
      let testData=CsvHelper.readCsv('data/logindata.csv')
      await use(testData);
     }
})

export {expect} from '@playwright/test';