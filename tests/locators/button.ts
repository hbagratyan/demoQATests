import { Locator, test } from '@playwright/test';
import { BaseElement } from './base-element';

export class Button extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async click(): Promise<void> {
        await test.step(
            `Нажать на кнопку [${this.name}]`,
            async () => {
                await this.locator.click();
            },
            { box: true },
        );
    }
}
