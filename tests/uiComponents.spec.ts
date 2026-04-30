import {test, expect, Locator} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test.describe('UI Components', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Input fields', async ({page}) => {
        const usingTheGridEmailField: Locator = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'});

        await usingTheGridEmailField.fill('test@test.com');
        await usingTheGridEmailField.clear();
        await usingTheGridEmailField.pressSequentially('test@test2.com', {delay: 20}) // to simulate real user typing

        const inputEmail: string = await usingTheGridEmailField.inputValue()
        
        // generic assertion
        expect(inputEmail).toEqual('test@test2.com')

        // locator assertion
        await expect(usingTheGridEmailField).toHaveValue('test@test2.com')
    });

    test('Radio butons', async ({page}) => {
        const usingTheGrid: Locator = page.locator('nb-card', {hasText: "Using the Grid"})

        const firstRadioButton: Locator = usingTheGrid.getByRole('radio', {name: 'Option 1'})
        const secondRadioButton: Locator = usingTheGrid.getByRole('radio', {name: 'Option 2'})

        await firstRadioButton.check({force: true})
        await expect(firstRadioButton).toBeChecked()
        await secondRadioButton.check({force: true})
        const secondRadioStatus: boolean = await secondRadioButton.isChecked()
        const firstRadioStatus: boolean = await firstRadioButton.isChecked()
        expect(secondRadioStatus).toBeTruthy()
        expect(firstRadioStatus).toBeFalsy()
    })
});

test.skip('Checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true});
    await page.getByRole('checkbox', {name: 'Show toast with icon'}).uncheck({force: true});

    const allCheckboxes: Locator[] = await page.getByRole('checkbox').all()

    for (const checkbox of allCheckboxes) {
        await checkbox.check({force: true})
        const checkboxStatus: boolean = await checkbox.isChecked()
        expect(checkboxStatus).toBeTruthy()
        await checkbox.uncheck({force: true})
        const updatedCheckboxStatus: boolean = await checkbox.isChecked()
        expect(updatedCheckboxStatus).toBeFalsy()
    }
})

test.skip('List and dropdowns', async ({page}) => {
    const dropdownMenu: Locator = page.locator('ngx-header nb-select')
    await dropdownMenu.click()

    const optionList: Locator = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    optionList.filter({hasText: 'Cosmic'}).click()
    const header: Locator = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropdownMenu.click()
    for (const color in colors) {
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        //await dropdownMenu.click()
        if (color != 'Corporate') {
            await dropdownMenu.click()
        }
    }
})

test.skip('tooltip', async ({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    const tooltipPlacement: Locator = await page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await tooltipPlacement.getByRole('button', {name: 'Top'}).hover()
    const tooltipText: string = await page.locator('nb-tooltip div span').textContent()
    //console.log(tooltipText);
    expect(tooltipText).toBe('This is a tooltip')
})

test.skip('browser dialog box', async ({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
        expect (dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.locator('table tbody tr').first().locator('.nb-trash').click()
    expect(await page.locator('table tbody tr').first()).not.toHaveText('mdo@gmail.com')
})

test.skip('web tables', async ({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // get the row by any text in that row and update age
    // const targetRow: Locator = await page.getByRole('row', {name: 'twitter@outlook.com'})
    // await targetRow.locator('.nb-edit').click()
    // await page.locator('input-editor').getByPlaceholder('Age').clear()
    // await page.locator('input-editor').getByPlaceholder('Age').fill('49')
    // await page.locator('.nb-checkmark').click()
    // expect(await targetRow.locator('td').nth(7)).toHaveText('49')

    // test filter of the table
    const ages: string[] = ['20', '30', '40', '200']

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500) // wait for the table to refresh

        const allAges: Locator[] = await page.locator('table tbody tr').all()
        for(let row of allAges) {
            const cellValue: string = await page.locator('td').last().textContent()
            if (age === '200') {
                await expect(page.locator('table tbody')).toContainText('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test.skip('Date picker', async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    const commonDatepicker: Locator = page.getByPlaceholder('Form Picker')
    await commonDatepicker.click()
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('29', {exact: true}).click()
    await expect(commonDatepicker).toHaveValue('Oct 29, 2025')
})