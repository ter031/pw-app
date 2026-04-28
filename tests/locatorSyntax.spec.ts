import {test} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({page}) => {
    // by tagname
    page.locator('input')

    // by id
    page.locator('#inputEmail1')

    //by class value
    page.locator('.input-full-width')

    // by attribute
    page.locator('[placeholder="Email"]')

    // by class full value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"')

    // combine different locators
    //await page.locator('input[placeholder="Email"]').first().click()

    // by xpath
    //await page.locator('//input[@placeholder="Email"]').click()

    // by partial text
    page.locator(':text("Using")')

    // by exact text
    page.locator(':text-is(""Using the Grid")')
})