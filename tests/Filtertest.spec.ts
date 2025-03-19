import {test,expect} from "@playwright/test";
import { POManager } from "../pages/POManager";

let dataSet = JSON.parse(JSON.stringify(require("../utils/FiltersData.json")));


for(const data of dataSet)
{
    test(`@Filters Apply filter for the following ${data.filterName}`, async({page})=>{

        
        const index = Number(data.dropdownIndex);
       const poManager = new POManager(page, data.filterName);
        await poManager.goTo();
        const filterPage = poManager.getFilterPage();
        await filterPage.applyFilters(data.filterName,index);
        expect(await filterPage.verifyFilterApplied()).toBeTruthy();
        expect(await filterPage.verifyProductDisplay(data.filterType),`Product ${data.filterName} should be displayed`);

    })
}
