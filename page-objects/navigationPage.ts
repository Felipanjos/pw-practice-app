import { Locator, Page } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly formLayoutsMenuItem: Locator;
  readonly datepickerMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly toastrMenuItem: Locator;
  readonly tooltipMenuItem: Locator;
  readonly formsFeatureTitle: string;
  readonly modalAndOverlaysFeatureTitle: string;
  readonly extraComponentsFeatureTitle: string;
  readonly tablesAndDataFeatureTitle: string;
  readonly authFeatureTitle: string;
  readonly chartsFeatureTitle: string;

  constructor(page: Page) {
    this.page = page;
    this.formLayoutsMenuItem = page.getByTitle('Form Layouts');
    this.datepickerMenuItem = page.getByTitle('Datepicker');
    this.smartTableMenuItem = page.getByTitle('Smart Table');
    this.toastrMenuItem = page.getByTitle('Toastr');
    this.tooltipMenuItem = page.getByTitle('Tooltip');

    this.formsFeatureTitle = 'Forms';
    this.modalAndOverlaysFeatureTitle = 'Modal & Overlays';
    this.extraComponentsFeatureTitle = 'Extra Components';
    this.chartsFeatureTitle = 'Charts';
    this.tablesAndDataFeatureTitle = 'Tables & Data';
    this.authFeatureTitle = 'Auth';
  }

  async gotoBaseURL() {
    await this.page.goto('/');
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem(this.formsFeatureTitle);
    await this.formLayoutsMenuItem.click();
  }

  async datePickerPage() {
    await this.selectGroupMenuItem(this.formsFeatureTitle);
    await this.datepickerMenuItem.click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem(this.tablesAndDataFeatureTitle);
    await this.smartTableMenuItem.click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem(this.modalAndOverlaysFeatureTitle);
    await this.toastrMenuItem.click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem(this.modalAndOverlaysFeatureTitle);
    await this.tooltipMenuItem.click();
  }

  private async selectGroupMenuItem(groupMenuItemTitle: string) {
    this.gotoBaseURL();
    const groupMenuItemLocator = this.page.getByTitle(groupMenuItemTitle);
    const isExpanded = (await groupMenuItemLocator.getAttribute('aria-expanded')) === 'true';
    if (!isExpanded) await groupMenuItemLocator.click();
  }
}
