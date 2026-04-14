import {APIRequestContext} from "@playwright/test";
import {endpoints} from "../constants/demoqa-constants";

export class UserClient {
    constructor(private request: APIRequestContext) {
    }

    async createUser(userName: string, password: string) {
        const response = await this.request.post(endpoints.createUser, {
            data: {userName, password}
        });
        return {
            status: response.status(),
            body: await response.json()
        };
    }

    async generateToken(userName: string, password: string) {
        const response = await this.request.post(endpoints.generateToken, {
            data: {userName, password}
        });
        return {
            status: response.status(),
            body: await response.json()
        };
    }
}
