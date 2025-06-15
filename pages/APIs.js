import { expect } from '@playwright/test';
// import { readJson } from '../utilities/jsonActions.js'
import { faker } from '@faker-js/faker';

export class APIHelper {

  /**
   * Reference "request" from Playwright without actually importing it in the code
   * Helps with auto-suggestion/auto-completion
   * Add this JSDoc before class constructor and you're good to go
   * @param {import('@playwright/test').APIRequestContext} request
  */
  constructor(request) {
    this.request = request
    this.baseUrl = 'https://reqres.in'
  }

  async getListOfUsers() {
    const response = await this.request.get(this.baseUrl + "/api/users?page=2")
    console.log("The API GET response is: ", await response.json())
    expect(response.status()).toBe(200)
  }

  async createUser() {
    const response = await this.request.post(this.baseUrl + "/api/users", {
      data: {
        "name": faker.person.fullName(),
        "job": faker.person.jobTitle()
      }, headers: { "x-api-key": "reqres-free-v1" }
    })

    const jsonData = await response.json(); // Wait for JSON to resolve
    console.log("The create user API response is: ", jsonData)
    expect(response.status()).toBe(201)
    return await jsonData.id
  }

  async deleteCreatedUser(id) {
    const response = await this.request.delete(`${this.baseUrl}/api/users/${id}`, {
      headers: { "x-api-key": "reqres-free-v1" }
    })

    expect(response.status()).toBe(204)
  }

}