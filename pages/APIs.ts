import { expect, APIRequestContext } from '@playwright/test';
// import { readJson } from '../utilities/jsonActions'
import { faker } from '@faker-js/faker';

export class APIHelper {

  request: APIRequestContext;
  baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = 'https://reqres.in';
  }

  async getListOfUsers(): Promise<void> {
    const response = await this.request.get(this.baseUrl + "/api/users?page=2", {
      headers: {
        "x-api-key": "reqres-free-v1"
      }
    });
    console.log("The API GET response is: ", await response.json());
    expect(response.status()).toBe(200);
  }

  async createUser(): Promise<string | undefined> {
    const response = await this.request.post(this.baseUrl + "/api/users", {
      data: {
        "name": faker.person.fullName(),
        "job": faker.person.jobTitle()
      }, headers: { "x-api-key": "reqres-free-v1" }
    });

    const jsonData = await response.json(); // Wait for JSON to resolve
    if (!jsonData.id) {
      throw new Error('No user ID returned in response');
    }
    console.log("The create user API response is: ", jsonData);
    expect(response.status()).toBe(201);
    return jsonData.id;
  }

  async deleteCreatedUser(id: string | undefined): Promise<void> {
    if (!id) {
      throw new Error('User ID is undefined. Cannot delete.');
    }

    const response = await this.request.delete(`${this.baseUrl}/api/users/${id}`, {
      headers: { "x-api-key": "reqres-free-v1" }
    });

    expect(response.status()).toBe(204);
  }

}