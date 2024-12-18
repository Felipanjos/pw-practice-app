import { Page } from '@playwright/test';

export class NavigationPage {

    readonly page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms');
        await this.page.getByTitle('Form Layouts').click();
    }

    async datePickerPage() {
        await this.selectGroupMenuItem('Forms');
        await this.page.getByTitle('Datepicker').click();
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data');
        await this.page.getByTitle('Smart Table').click();
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.page.getByTitle('Toastr').click();
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.page.getByTitle('Tooltip').click();
    }

    private async selectGroupMenuItem(groupMenuItemTitle: string){
        const groupMenuItemLocator = this.page.getByTitle(groupMenuItemTitle);
        const isExpanded = await groupMenuItemLocator.getAttribute('aria-expanded') === 'true';
        if (!isExpanded)
            await groupMenuItemLocator.click();
    }
}