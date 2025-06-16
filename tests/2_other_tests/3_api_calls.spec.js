import { test } from '../../global_setup/test_setup.js';
import { APIHelper } from '../../pages/APIs.js'

let apiHelper, createdUserId
test.beforeEach(async ({ request }) => {
    apiHelper = new APIHelper(request)
})

test.describe.serial('API tests', () => {
    test('get list of users', { tag: '@regression' }, async () => {
        await apiHelper.getListOfUsers()
    })

    test('create a user with fake name and job', { tag: '@regression' }, async () => {
        createdUserId = await apiHelper.createUser()
        console.log("Created user id: ", createdUserId)
    })
    
    test('delete the created user', { tag: '@regression' }, async () => {
        await apiHelper.deleteCreatedUser(createdUserId)
    })
})
