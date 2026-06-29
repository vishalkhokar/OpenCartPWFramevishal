import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class ProductInfoPage extends BasePage {
    private readonly header: Locator;
    constructor(page: Page) {
        super(page) 
        this.header = page.getByRole('heading', { level: 1 })
    }
}