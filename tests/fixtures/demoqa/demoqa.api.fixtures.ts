import { test as base } from '@playwright/test';
import {DataGenerator} from "../../utils/data.generator";
import {BookClient} from "../../api-clients/book-client";
import {UserClient} from "../../api-clients/user-client";

export const test = base.extend<{
    userClient: UserClient;
    bookClient: BookClient;
    dataGenerator: DataGenerator;
}>({
    userClient: async ({ request }, use) => {
        await use(new UserClient(request));
    },

    bookClient: async ({ request }, use) => {
        await use(new BookClient(request));
    },

    dataGenerator: async ({}, use) => {
        await use(new DataGenerator());
    }
});
