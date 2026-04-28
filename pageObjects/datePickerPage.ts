import {Page, Locator, expect} from '@playwright/test';

export class DatePickerPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectDateFromFormPicker(day: string) {
        const commonDatepicker: Locator = this.page.getByPlaceholder('Form Picker')
        await commonDatepicker.click()
        await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(day, {exact: true}).click()
        await expect(commonDatepicker).toHaveValue('Oct 29, 2025')
    }
}