import {test,Locator,Page} from "@playwright/test";
import { Helpers} from "../utils/helpers";

export class SearchResultsPage extends Helpers
{
    searchInput: Locator;
    searchResultItem: Locator;
    resultsContainer: Locator;
    page: Page;


    constructor(page: Page, searchItem: string, resultItem: string)
    {
        super(page);
        this.page = page;
        this.searchInput = page.locator("#typeAhead-input");
        this.searchResultItem = page.locator(`(//div[contains(@data-testid,'text-suggest')]//*[contains(text(),'${searchItem}')])[1]`);
        this.resultsContainer =  page.locator(`(//*[contains(text(),'${resultItem}')])[1]`);
    }

    async selectSearchItem(valueToEnter: string)
    {
       // await this.elementClick(this.searchInput);
        await this.enterSequentially(this.searchInput,valueToEnter);

       await this.searchResultItem.waitFor({state:"visible",timeout:5000});
       await  this.elementClick(this.searchResultItem);

    }

    async isResultsDisplayed()
    {
        await this.page.waitForTimeout(2000);
        return await this.resultsContainer.isVisible();
    }
}