import {test} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('User facing locators', async ({page}) => {
    await page.getByRole('button', {name: 'Submit'}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Password').first().click()

    await page.getByText('Using the Grid').first().click()
})