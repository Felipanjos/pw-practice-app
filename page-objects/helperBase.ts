import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RandomPerson } from './randomPerson';

export class HelperBase {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNumberOfSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }

  static generateRandomPerson(): RandomPerson {
    const randomPerson = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: faker.internet.password(),
      email: null,
      fullName: null,
      option: 'Option ' + faker.number.int({ min: 1, max: 2 }),
    };

    randomPerson.email = faker.internet.email({
      firstName: randomPerson.firstName,
      lastName: randomPerson.lastName + faker.number.int(100),
      provider: '@test.com',
    });

    randomPerson.email = randomPerson.email.toLowerCase();

    randomPerson.fullName = faker.person.fullName({
      firstName: randomPerson.firstName,
      lastName: randomPerson.lastName,
    });

    return randomPerson;
  }
}
