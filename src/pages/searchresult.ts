import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class SearchPage extends BasePage{
    private readonly searchResults:Locator;

    constructor(page:Page){
        super(page);
        this.searchResults=page.locator('div.product-layout')
    }

    async getProductSearchresultCount():Promise<number>{
        return this.searchResults.count();
    }
    async selectProduct(productName:string):Promise<void>{
        await this.page.getByRole('link',{name:productName,exact:true}).first().click()
    }
}