import { test, expect, Locator } from '@playwright/test';

test('Input fields', async ({ page }) => {
    await page.goto('/')
    await page.locator('')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    const usingTheGridEmailField: Locator = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' });

    await usingTheGridEmailField.fill('test@test.com');
    await usingTheGridEmailField.clear();
    await usingTheGridEmailField.pressSequentially('test@test2.com', { delay: 20 }) // to simulate real user typing

    const inputEmail: string = await usingTheGridEmailField.inputValue()

    // generic assertion
    expect(inputEmail).toEqual('test@test2.com')

    // locator assertion
    await expect(usingTheGridEmailField).toHaveValue('test@test2.com')
});