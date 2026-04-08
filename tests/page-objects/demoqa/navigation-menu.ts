import {Page} from '@playwright/test';
import {BasePage} from '../base-page';
import {Button} from "../../locators/button";

export class NavigationMenu extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get webTablesButton(): Button{
        return new Button(this.page.locator('[href="/webtables"]'), "Кнопка Webtables в боковом меню выбора типа элемента");
    }
}
