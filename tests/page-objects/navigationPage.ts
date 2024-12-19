import { Locator, Page } from '@playwright/test';

export class NavigationPage {

    readonly page: Page;
    readonly formLayoutsMenuItem: Locator;
    readonly datepickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly toastrMenuItem: Locator;
    readonly tooltipMenuItem: Locator;

    constructor (page: Page) {
        this.page = page;
        this.formLayoutsMenuItem = page.getByTitle('Form Layouts');
        this.datepickerMenuItem = page.getByTitle('Datepicker');
        this.smartTableMenuItem = page.getByTitle('Smart TAble');
        this.toastrMenuItem = page.getByTitle('Toastr');
        this.tooltipMenuItem = page.getByTitle('Tooltip');
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms');
        await this.formLayoutsMenuItem.click();
    }

    async datePickerPage() {
        await this.selectGroupMenuItem('Forms');
        await this.datepickerMenuItem.click();
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data');
        await this.smartTableMenuItem.click();
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.toastrMenuItem.click();
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.tooltipMenuItem.click();
    }

    private async selectGroupMenuItem(groupMenuItemTitle: string){
        const groupMenuItemLocator = this.page.getByTitle(groupMenuItemTitle);
        const isExpanded = await groupMenuItemLocator.getAttribute('aria-expanded') === 'true';
        if (!isExpanded)
            await groupMenuItemLocator.click();
    }
}