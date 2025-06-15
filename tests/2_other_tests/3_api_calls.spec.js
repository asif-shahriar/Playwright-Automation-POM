import { test } from '../../global_setup/test_setup.js';
import { APIHelper } from '../../pages/APIs.js'

let apiHelper, createdUserId
test.beforeEach(async ({ request }) => {
    apiHelper = new APIHelper(request)
})

test.describe.serial('API tests', () => {
    test('[@regression] get list of users', async () => {
        await apiHelper.getListOfUsers()
    })

    test('[@regression] create a user with fake name and job', async () => {
        createdUserId = await apiHelper.createUser()
        console.log("Created user id: ", createdUserId)
    })
    
    test('[@regression] delete the created user', async () => {
        await apiHelper.deleteCreatedUser(createdUserId)
    })
})
