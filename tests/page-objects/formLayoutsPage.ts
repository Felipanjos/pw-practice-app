import { Locator, Page } from '@playwright/test';

export class FormLayoutsPage {
  private readonly page: Page;
  //#region Using the Grid
  readonly usingTheGridForm: Locator;
  readonly usingTheGridFormEmail: Locator;
  readonly usingTheGridFormPassword: Locator;
  readonly usingTheGridFormSubmit: Locator;
  readonly usingTheGridRadioButtons: { [key: string]: Locator };
  //#endregion

  //#region Inline form
  readonly inlineForm: Locator;
  readonly inlineFormName: Locator;
  readonly inlineFormEmail: Locator;
  readonly inlineFormRememberMe: Locator;
  readonly inlineFormSubmit: Locator;
  //#endregion

  constructor(page: Page) {
    this.page = page;

    //#region Using the Grid
    this.usingTheGridForm = this.page.locator('nb-card', {
      hasText: 'Using the Grid',
    });
    this.usingTheGridFormEmail = this.usingTheGridForm.getByRole('textbox', {
      name: 'Email',
    });
    this.usingTheGridFormPassword = this.usingTheGridForm.getByRole('textbox', {
      name: 'Password',
    });
    this.usingTheGridRadioButtons = {
      'Option 1': this.usingTheGridForm.getByRole('radio', {
        name: 'Option 1',
      }),
      'Option 2': this.usingTheGridForm.getByRole('radio', {
        name: 'Option 2',
      }),
    };
    this.usingTheGridFormSubmit = this.usingTheGridForm.getByRole('button');
    //#endregion

    //#region Inline form
    this.inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });
    this.inlineFormName = this.inlineForm.getByRole('textbox', {
      name: 'Jane Doe',
    });
    this.inlineFormEmail = this.inlineForm.getByRole('textbox', {
      name: 'Email',
    });
    this.inlineFormRememberMe = this.inlineForm.getByRole('checkbox');
    this.inlineFormSubmit = this.inlineForm.getByRole('button');
    //#endregion
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string,
  ) {
    await this.usingTheGridFormEmail.fill(email);
    await this.usingTheGridFormPassword.fill(password);

    const radioButton = this.usingTheGridRadioButtons[optionText];
    await radioButton.check({ force: true });
    await this.usingTheGridFormSubmit.click();
  }

  /**
   * Fills inline form with user details
   * @param name - first and last name
   * @param email - valid email for test user
   * @param rememberMe - save session or not
   */
  async submitInlineFormWithNameEmailAndCheckbox(
    name: string,
    email: string,
    rememberMe: boolean,
  ) {
    await this.inlineFormName.fill(name);
    await this.inlineFormEmail.fill(email);

    if (rememberMe) await this.inlineFormRememberMe.check({ force: true });

    await this.inlineFormSubmit.click();
  }
}
