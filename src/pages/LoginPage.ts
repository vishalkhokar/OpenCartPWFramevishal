import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class LoginPage extends BasePage{
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;
    private readonly forgotPasswordLink:Locator;
    private readonly logo:Locator;
    private readonly loginErrorMessage:Locator;
    constructor(page:Page){
        super(page);
        this.emailId=page.getByRole('textbox',{name:'E-Mail Address'});
        this.password=page.getByRole('textbox',{name:'Password'});
        this.loginBtn=page.getByRole('button',{name:'Login'});
        this.forgotPasswordLink=page.getByRole('link',{name:'Forgotten Password'}).first()    
        this.logo=page.getByAltText('naveenopencart')
        this.loginErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
    }

    async gotoLoginPage() : Promise<void>{
       await this.page.goto('opencart/index.php?route=account/login')
    }

    async getLoginPageTitle(): Promise<string>{
        return this.page.title()
    }

    async isForgotPassExit(): Promise<boolean>{
     return this.forgotPasswordLink.isVisible()
    }

    async doLogin(username:string,password:string):Promise<void>{
        console.log(`user creds ${username}: ${password}`)  
        await this.emailId.fill(username);
        await this.password.fill(password)
        await this.loginBtn.click();
    }
     async isInvalidLoginError(): Promise<boolean>{
     return this.loginErrorMessage.isVisible()
    }
}