import { expect, Locator, test } from '@playwright/test';
import { BaseElement } from './base-element';

export class BlockArray extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async waitUntilAllElementsAreVisible(): Promise<void> {
        await test.step(
            `проверить: все блоки видимы`,
            async () => {
                const count = await this.locator.count();
                for (let i = 0; i < count; i++) {
                    await expect(this.locator.nth(i)).toBeVisible();
                }
            },
            { box: true },
        );
    }

    async waitUntilAllElementsAreNotVisible(): Promise<void> {
        await test.step(
            `проверить: все блоки невидимы`,
            async () => {
                const count = await this.locator.count();
                for (let i = 0; i < count; i++) {
                    await expect(this.locator.nth(i)).toBeHidden();
                }
            },
            { box: true },
        );
    }

    async checkAllElementsAreEnabled(): Promise<void> {
        await test.step(
            `проверить: все блоки активны и кликабельны`,
            async () => {
                const count = await this.locator.count();
                for (let i = 0; i < count; i++) {
                    expect(this.locator.nth(i).isEnabled()).toBeTruthy();
                }
            },
            { box: true },
        );
    }

    async checkNotEmpty(): Promise<void> {
        await test.step(
            `проверить: количество блоков больше 0(или существуют в структуре-DOM)`,
            async () => {
                const count = await this.locator.count();
                expect(count).toBeGreaterThan(0);
            },
            { box: true },
        );
    }

    async checkEmpty(): Promise<void> {
        await test.step(
            `проверить: количество блоков 0(отсутствуют в текущей структуре-DOM)`,
            async () => {
                const count = await this.locator.count();
                expect(count).toEqual(0);
            },
            { box: true },
        );
    }
}