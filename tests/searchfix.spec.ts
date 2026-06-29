import { test, expect } from '../src/fixtures/pageFixture';
import { CsvHelper } from '../src/utils/csvutil';

test.beforeEach(async ({ loginP }) => {
    await loginP.gotoLoginPage();
    await loginP.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!)
})

const proddata=CsvHelper.readCsv('data/product.csv')
for(const row of proddata){
    test(`Verify search with product with josn -${row.searchKey} -${row.productName}`,async({homeP,searchR})=>{
    await homeP.doSearch(row.searchKey)
    expect (await searchR.getProductSearchresultCount()).toBe(Number(row.resultcount))
})
}


// test('Verify search with product',async({homeP,searchR})=>{
//     await homeP.doSearch('macbook')
//     expect (await searchR.getProductSearchresultCount()).toBe(3)
// })
for(const row of proddata){
test(`verify user is able to land on product page -${row.searchKey} -${row.productName} `,async({homeP,searchR,page})=>{
     await homeP.doSearch(row.searchKey)
     await searchR.selectProduct(row.productName)
     expect (await page.title()).toBe(row.productName)
})
}
