import {test,Locator,Page} from "@playwright/test";
import {Helpers} from "../utils/helpers";

export class PerfumePage extends Helpers
{
    perfumeMainMenu : Locator;
    categoryLink : Locator;
    perfumeList : Locator;
    perfumenListDisplay : Locator;
    page : Page;

    constructor(page:Page, categoryName:string, categoryLabel:string)
    {
        super(page);
        this.page = page;
        this.perfumeMainMenu = page.locator("[href*='/parfum/01']").first();
        this.categoryLink = page.locator(`//div[contains(@class,'subcategory-link')]//*[text()='${categoryName}']`);
        this.perfumenListDisplay = page.locator(`//div[contains(@class,'tile__label')] //*[text()='${categoryLabel}']`);
        this.perfumeList = page.locator("//div[contains(@class,'product-tile')]");
       

    }

    async selectCategory()
    {
       await this.hoverOnElement(this.perfumeMainMenu);
        await this.elementClick(this.categoryLink);
        //await this.scrollIntoView(this.perfumenListDisplay);
    }

    async verifyPerfumeListDisplay()
    {
        await this.page.waitForTimeout(2000);
        const perfumeList = this.perfumeList.all();
        
        if((await perfumeList).length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    async verifyPerfumeLabelDisplay()
    {
        const perfumeLabelList = this.perfumenListDisplay.all();
        
        if((await perfumeLabelList).length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

}