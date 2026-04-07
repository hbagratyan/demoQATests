import { Locator } from '@playwright/test';
import { BaseElement } from './base-element';

export class Block extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }
}