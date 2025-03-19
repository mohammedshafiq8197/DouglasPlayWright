import {test,Locator,Page} from "@playwright/test";
import {Helpers} from "../utils/helpers";

export class FilterPage extends Helpers
{
   
    perfumeMainMenu : Locator;
    searchField : Locator;
    filterDropDown : Locator;
    filterCloseButton : Locator;
    elementToScroll : string;
    itemToSelect : Locator;
    productType : Locator;
    products: Locator;
    filterTags : Locator;
    page : Page;


    constructor(page: Page, filterName: string)
    {
        super(page);
        this.page = page;
        this.perfumeMainMenu = page.locator("[href*='/parfum/01']").first();
        this.searchField = page.locator("(//input[@class=\"input__input\"])[1]");
        this.elementToScroll = "//div[@class='facet__title']";
        this.filterDropDown = page.locator("//div[@class='facet__title']");
        this.filterCloseButton = page.locator("[class*=facet__close-button]");
        this.productType = page.locator("//div[@class='text category']");
        this.products = page.locator("//div[@class='text top-brand']");
        this.filterTags = page.locator("//button[@class='selected-facets__value']");
        this.itemToSelect = page.locator(`//div[@class='rc-scrollbars-view']//*[contains(text(),'${filterName}')]`);

        //this.browserActions = new Helpers(page);
    }

    async applyFilters(searchItem: string, index: number)
    {
        await this.elementClick(this.perfumeMainMenu);
       // await this.scrollIntoView(this.filterDropDown);
        const filterToSelect = this.filterDropDown.nth(index);
        await this.elementClick(filterToSelect);
        await this.enterValue(this.searchField,searchItem);
        await this.itemToSelect.waitFor({state:"visible",timeout:2000});
        await this.elementClick(this.itemToSelect);
        
        const isCloseButtonPresent = await this.waitForElementVisibility(this.filterCloseButton);

         if(isCloseButtonPresent)
         {
            await this.elementClick(this.filterCloseButton);
         }

    
    }

    async verifyFilterApplied()
    {
        await this.page.waitForTimeout(2000);
        let filterCount = await this.filterTags.count();
          console.log(filterCount);

        if(filterCount > 0)
        {
            return true;
        }
        else
        {
           return false;
        }
    }

    async verifyProductDisplay(filterType:string)
    {
        let prodList = await this.getProductListCount(filterType);
        
        if(prodList > 0)
        {
           return true;
        }
        else
        {
            return false;
        }

    }

    async getProductListCount(filterType:string)
    {
        let productResults
         if(filterType === "brand")
         {
            productResults = this.productType.count();

         }
         else
         {
            productResults = this.products.count();
         }

         return productResults;
    }
    



}
