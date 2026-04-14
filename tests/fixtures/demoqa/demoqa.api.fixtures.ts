import { test as base } from '@playwright/test';
import {DataGenerator} from "../../utils/data.generator";
import {BookClient} from "../../api-clients/book-client";
import {UserClient} from "../../api-clients/user-client";

export const test = base.extend<{
    userClient: UserClient;
    bookClient: BookClient;
    dataGenerator: DataGenerator;
    authorizedUser: {
        userId: string;
        token: string;
        username: string;
        password: string;
    };
}>({
    userClient: async ({ request }, use) => {
        await use(new UserClient(request));
    },

    bookClient: async ({ request }, use) => {
        await use(new BookClient(request));
    },

    dataGenerator: async ({}, use) => {
        await use(new DataGenerator());
    },

    authorizedUser: async ({ userClient, dataGenerator }, use) => {
        const username = dataGenerator.userName();
        const password = dataGenerator.password();

        const userResponse = await userClient.createUser(username, password);
        if (userResponse.status !== 201) {
            throw new Error('Failed to create user');
        }

        const tokenResponse = await userClient.generateToken(username, password);
        if (tokenResponse.status !== 200) {
            throw new Error('Failed to generate token');
        }

        const user = {
            userId: userResponse.body.userID,
            token: tokenResponse.body.token,
            username,
            password
        };

        await use(user);
    }
});
