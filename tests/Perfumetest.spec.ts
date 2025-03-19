import {test,expect} from "@playwright/test";
import { POManager } from "../pages/POManager";

let dataSet = JSON.parse(JSON.stringify(require("../utils/PerfumePageData.json")));

test.describe("Perfume Page test suite",async()=>{
    test.beforeEach(async({page})=>{

    })
 

for(const data of dataSet)
{
    test(`@Perfume test perfume list display based on ${data.categoryName}`, async({page})=>{

        const poManager = new POManager(page, data.categoryName, data.categoryLabel);

        const perfumePage = poManager.getPerfumePage();
        await poManager.goTo();

         await perfumePage.selectCategory();
          expect(await perfumePage.verifyPerfumeListDisplay(), "Perfume List should be displayed").toBeTruthy();
          expect(await perfumePage.verifyPerfumeLabelDisplay(), `Product ${data.categoryLabel} should be displayed`).toBeTruthy();
    })
}

})

