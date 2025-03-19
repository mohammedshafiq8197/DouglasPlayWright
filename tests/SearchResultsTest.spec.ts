import {test,expect} from "@playwright/test";
import { POManager } from "../pages/POManager";

let dataSet = JSON.parse(JSON.stringify(require("../utils/SearchPageData.json")));

for(const data of dataSet)
{
    test(`@Search test searchResults display ${data.resultItem}`, async({page})=>{

        const poManager = new POManager(page,data.searchItem,data.resultItem);
        await poManager.goTo();
        const searchResultsPage = poManager.getSearchResultsPage();
        await searchResultsPage.selectSearchItem(data.searchItem);
        expect(await searchResultsPage.isResultsDisplayed(),`Following item ${data.resultItem} should be displayed`).toBeTruthy();
    })
}