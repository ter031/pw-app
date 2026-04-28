import {test} from '../test-options'
import {faker} from '@faker-js/faker';

test('fill form and layouts page forms', async ({pageManager}) => {
    const randomName: string = faker.person.fullName()
    const randomEmail: string = `${randomName.replace(/\s+/g, '')}${faker.number.int(100)}@test.com`
    await pageManager.navigateToFormLayoutsPage().submitUsingTheGridForm(randomEmail, 'testPassword', 'Option 2')
    await pageManager.navigateToFormLayoutsPage().submitInlineForm(randomName, randomEmail, false)
})