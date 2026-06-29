import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class HomePage extends BasePage{
    private readonly logOut:Locator;
    private readonly search:Locator;
    private readonly searchIcon:Locator;
    private readonly userName:Locator;
    constructor(page:Page){
        super(page)
        this.logOut=page.getByText('Logout').nth(1)
        this.search=page.getByRole('textbox',{name:'Search'});
        this.searchIcon=page.locator('div#search button');
        this.userName=page.getByRole('button', {name:'username'})
    }

    async isLogoutLinkExists():Promise<boolean>{
        await this.logOut.highlight()
        return await this.logOut.isVisible()
    }
    async doSearch(searchkey:string):Promise<void>{
        console.log(`search key is : ${searchkey}`)
        await this.search.fill(searchkey);
        await this.searchIcon.click();
    }
}

