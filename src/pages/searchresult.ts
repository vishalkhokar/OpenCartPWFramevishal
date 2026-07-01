import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class SearchPage extends BasePage{
    private readonly searchResults:Locator;
    private readonly xyLoc:Locator;
    constructor(page:Page){
        super(page);
        this.searchResults=page.locator('div.product-layout')
        this.xyLoc=page.getByRole('button',{name:'xxx'})
    }

    async getProductSearchresultCount():Promise<number>{
        return this.searchResults.count();
    }
    async selectProduct(productName:string):Promise<void>{
        await this.page.getByRole('link',{name:productName,exact:true}).first().click()
    }
}