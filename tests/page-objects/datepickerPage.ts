import { expect, Locator, Page } from '@playwright/test';

export class DatepickerPage {
    private readonly page: Page;
    
    readonly calendarMonthAndYearSelector: Locator;
    readonly nextMonthButtonSelector: Locator;
    readonly dayCellSelector: Locator;
    readonly formPickerInputField: Locator;
    
    constructor( page: Page ){
        this.page = page;
        
        this.calendarMonthAndYearSelector = this.page.locator('nb-calendar-view-mode').getByRole('button');
        this.nextMonthButtonSelector = this.page.locator('button [data-name="chevron-right"]');
        this.dayCellSelector = this.page.locator('nb-calendar-day-cell[class="day-cell ng-star-inserted"]');
        this.formPickerInputField = this.page.getByPlaceholder('Form Picker');
    }

    async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number): Promise<void> {
        await this.formPickerInputField.click();

        const expectedDate = await this.selectDateInTheCalendar(numberOfDaysFromToday);
    
        await expect(this.formPickerInputField).toHaveValue(expectedDate);
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number): Promise<string> {
        // Setup: Calculate target date
        const date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);

        const [ targetDate, targetMonthShort, targetMonthLong, targetYear ] = [
            date.getDate().toString(),
            date.toLocaleString('en-US', { month: 'short'}),
            date.toLocaleString('en-US', { month: 'long'}),
            date.getFullYear(),
        ];

        // Action: Navigate to the target month and targetYear
        const targetMonthAndYear = `${targetMonthLong} ${targetYear}`;
        let currentMonthAndYear = await this.calendarMonthAndYearSelector.textContent();

        while (!currentMonthAndYear.includes(targetMonthAndYear)) {
            await this.nextMonthButtonSelector.click();
            currentMonthAndYear = await this.calendarMonthAndYearSelector.textContent();
        }
    
        await this.dayCellSelector.getByText(targetDate, { exact: true }).click();
        return `${targetMonthShort} ${targetDate}, ${targetYear}`;
    }

    private async selectRangeDatepickerDateFromToday(numberOfDaysFromToday: number): Promise<void> {

    }
}