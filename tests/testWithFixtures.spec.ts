import { test } from '../fixtures/test-options';

test('Form Layouts E2E', async ({ formLayoutsPage, randomPerson }) => {
  await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    randomPerson.email,
    randomPerson.password,
    randomPerson.option
  );
  await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomPerson.fullName, randomPerson.email, true);
});
