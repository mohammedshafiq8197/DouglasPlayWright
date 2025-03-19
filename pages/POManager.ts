import {Page} from "@playwright/test";
import { FilterPage } from "./FilterPage";
import { PerfumePage } from "./PerfumePage";
import { SearchResultsPage } from "./SearchResultsPage";

export class POManager
{
    filterPage: FilterPage;
    perfumePage: PerfumePage;
    searchResultsPage: SearchResultsPage;
    page: Page;

    constructor(page:Page,paramOne:string = "",paramTwo:string = "")
    {
        this.page = page;
        this.filterPage = new FilterPage(this.page,paramOne);
        this.perfumePage = new PerfumePage(this.page,paramOne,paramTwo);
        this.searchResultsPage = new SearchResultsPage(this.page,paramOne,paramTwo);
     
    }

    async goTo()
    {
        await this.page.goto("https://www.douglas.de/de");
        await this.page.waitForTimeout(2000);
        await this.page.locator("button[data-testid*='accept-all']").click();
    }

    getFilterPage()
    {
        return this.filterPage;
    }

    getPerfumePage()
    {
        return this.perfumePage;
    }

    getSearchResultsPage()
    {
        return this.searchResultsPage;
    }

}