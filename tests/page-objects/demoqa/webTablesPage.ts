import { BasePage } from "../base-page";
import { Page } from "@playwright/test";
import {base_url} from "../../constants/demoqa-constants";

export class WebTablesPage extends BasePage {
    baseURL: string;
    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    async goto() {
        await this.page.goto(`${base_url}/webtables`);
    }
}
