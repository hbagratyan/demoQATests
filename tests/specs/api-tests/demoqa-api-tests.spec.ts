import {test} from '../../fixtures/demoqa/demoqa.fixtures';
import {expect} from "@playwright/test";
import {endpoints} from "../../constants/demoqa-constants";
import {DataGenerator} from "../../utils/data.generator";

test.describe('API проверки создания пользователя, добавления и удаления книг', () => {

    const data = new DataGenerator()

    test('Create User - Valid credentials', async ({request}) => {
        const username = data.userName()
        const password = data.password()

        const response = await request.post(endpoints.createUser, {
            data: {
                userName: username,
                password: password
            }
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.username).toBe(username);
    });

    test('Create User with Empty Username - Error validation', async ({request}) => {
        const response = await request.post(endpoints.createUser, {
            data: {
                userName: '',
                password: data.password()
            }
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.userID).toBeUndefined();
        expect(body.code).toBeDefined();
        expect(body.message).toContain('required');
    });

    test('Create User with Empty Password - Error validation', async ({request}) => {
        const response = await request.post(endpoints.createUser, {
            data: {
                userName: data.userName(),
                password: ''
            }
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.userID).toBeUndefined();
        expect(body.code).toBeDefined();
        expect(body.message).toContain('required');
    });

    test('Add Book Happy Path', async ({request}) => {
        const response = await request.post(endpoints.bookActions, {
            data: {
                userId: "string",
                collectionOfIsbns: [
                    {
                        isbn: "string"
                    }
                ]
            }
        })
        expect(response.status()).toBe(200);
    });

    test('Add Book Sad Path', async ({request}) => {
        const response = await request.post(endpoints.bookActions, {
            data: {
                userId: "string",
                collectionOfIsbns: [
                    {
                        isbn: "string"
                    }
                ]
            }
        })
        expect(response.status()).toBe(200);
    });

    test('Delete Book Happy Path', async ({request}) => {
        const response = await request.delete(endpoints.bookActions,
            {
                data: {
                    userId: "string",
                    collectionOfIsbns: [
                        {
                            isbn: "string"
                        }
                    ]
                }
            }
        )
        expect(response.status()).toBe(200);
    });

    test('Delete Book sad Path', async ({request}) => {
        const response = await request.delete(endpoints.bookActions,
            {
                data: {
                    userId: "string",
                    collectionOfIsbns: [
                        {
                            isbn: "string"
                        }
                    ]
                }
            }
        )
        expect(response.status()).toBe(200);
    });
});
