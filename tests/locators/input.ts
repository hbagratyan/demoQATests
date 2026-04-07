import { Locator, test } from '@playwright/test';
import { BaseElement } from './base-element';

export class Input extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async fill(text: string): Promise<void> {
        await test.step(
            `Заполнить поле [${this.name}] текстом "${text}"`,
            async () => {
                await this.locator.fill(text);
            },
            { box: true },
        );
    }

    async type(text: string): Promise<void> {
        await test.step(
            `Заполнить поле [${this.name}] текстом "${text}" эмулируя нажатия клавиш клавиатуры`,
            async () => {
                await this.locator.pressSequentially(text);
            },
            { box: true },
        );
    }

    // В случае, если метод «clearValue» в «fill» отрабатывает некорректно
    async manualFill(text: string): Promise<void> {
        await test.step(
            `Заполнить поле [${this.name}] текстом "${text}"`,
            async () => {
                await this.locator.click();
                await this.locator.page().keyboard.press('Meta+A');
                await this.locator.page().keyboard.press('Backspace');
                await this.locator.page().keyboard.press('Control+A');
                await this.locator.page().keyboard.press('Backspace');
                await this.locator.page().keyboard.press('Home');
                await this.locator.pressSequentially(text);
            },
            { box: true },
        );
    }

    async fillHighlighted(text: string): Promise<void> {
        await test.step(
            `Выделить и заполнить поле [${this.name}] текстом "${text}"`,
            async () => {
                await this.locator.click();
                await this.locator.page().keyboard.press('Control+A');
                await this.locator.page().keyboard.press('Meta+A');
                await this.locator.pressSequentially(text);
            },
            { box: true },
        );
    }

    // Для ввода пути до файла, в инпут загрузки
    async setInputFiles(pathToFile: string): Promise<void> {
        await test.step(
            `Загрузить файл по нажатию на [${this.name}]`,
            async () => {
                await this.locator.setInputFiles(pathToFile);
            },
            { box: true },
        );
    }

    // Для подтверждения ввода в поле
    async pressEnter(): Promise<void> {
        await test.step(
            `Нажать Enter в поле [${this.name}]`,
            async () => {
                await this.locator.click();
                await this.locator.page().keyboard.press('Enter');
            },
            { box: true },
        );
    }
}