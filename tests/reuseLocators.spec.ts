import {Locator, test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Reuse locators', async ({page}) => {
    const basicForm: Locator = page.locator('nb-card', {hasText: 'Basic form'});
    const emailField: Locator = basicForm.getByRole('textbox', {name: 'Email'});
    const passwordField: Locator = basicForm.getByRole('textbox', {name: 'Password'});
    const checkbox: Locator = basicForm.locator('nb-checkbox');
    const submitButton: Locator = basicForm.getByRole('button');
    let buttonText: string = ''

    await emailField.fill('test@test.com')
    await passwordField.fill('Welcome123')
    await checkbox.click()
    buttonText = await submitButton.textContent()
    const email: string = await emailField.inputValue()

    await expect(emailField).toHaveValue('test@test.com')
    await expect(checkbox.locator('.custom-checkbox')).toBeChecked()
    await expect(buttonText).toBe('Submit')
    await expect(email).toBe('test@test.com')
})