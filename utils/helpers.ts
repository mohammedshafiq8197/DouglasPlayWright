import { Page,Locator } from "@playwright/test";

export class Helpers
{
    page: Page;
    constructor(page: Page)
    {
       this.page = page;
    }
  
    async elementClick(locator: Locator)
    {
        await locator.click();
    }

    async selectItemFromDropDown(locator: Locator, itemToSelect: string)
    {
        await locator.selectOption(itemToSelect);
    }

    async enterValue(locator: Locator, valueToEnter: string)
    {
        await locator.fill(valueToEnter);
    }

    async enterSequentially(locator: Locator, textToEnter: string)
    {
        await locator.pressSequentially(textToEnter);
    }

    async scrollIntoView(locator: Locator)
    {
        await locator.scrollIntoViewIfNeeded();
    }

    async hoverOnElement(locator: Locator)
    {
        await locator.hover();
    }

    async getText(locator: Locator)
    {
       return await locator.textContent();
    }

    async getMultipleText(locator: Locator)
    {
        return await locator.allTextContents();
    }

    async waitForElementVisibility(locator:Locator)
    {
       return await locator.isVisible();
    }
}