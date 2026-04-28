import {test, expect} from '@playwright/test'
import { PageManager } from '../pageObjects/pageManager'
import {faker} from '@faker-js/faker';

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test('navigate to different pages', async ({page}) => {
    const pageManager: PageManager = new PageManager(page)
    await pageManager.navigateToNavigationPage().navigateToFormLayouts()
    await pageManager.navigateToNavigationPage().navigateToDatePicker()
    await pageManager.navigateToNavigationPage().navigateToSmartTable()
})

test('fill form and layouts page forms', async ({page}) => {
    const randomName: string = faker.person.fullName()
    const randomEmail: string = `${randomName.replace(/\s+/g, '')}${faker.number.int(100)}@test.com`
    const pageManager: PageManager = new PageManager(page)
    await pageManager.navigateToNavigationPage().navigateToFormLayouts()
    await pageManager.navigateToFormLayoutsPage().submitUsingTheGridForm(randomEmail, 'testPassword', 'Option 2')
    await page.screenshot({path: 'screenshots/formLayoutsPage.png'})
    await pageManager.navigateToFormLayoutsPage().submitInlineForm(randomName, randomEmail, false)
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})
})