import { test } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
})

test('Navigate to form layouts', async ({page}) => {
    await page.getByText('Form Layouts').click()
})

test('Navigate to datepicker page', async ({page}) => {
    await page.getByText('Datepicker').click()
})

// test.describe('My first test suite', () => {
//     test('My first test', () => {

//     })

//     test('My second test', () => {

//     })
// })