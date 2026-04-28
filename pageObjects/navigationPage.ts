import { Page, Locator } from "@playwright/test";

export class NavigationPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigateToFormLayouts() {
        this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async navigateToDatePicker() {
        this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async navigateToSmartTable() {
        this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async navigateToTooltip() {
        this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    async navigateToToastr() {
        this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    private async selectGroupMenuItem(groupMenuItem: string) {
        const menuItem: Locator =  this.page.getByTitle(groupMenuItem)
        const expandedState: string = await menuItem.getAttribute('aria-expanded')

        if (expandedState == 'false') {
            await menuItem.click()
        }
    }
}