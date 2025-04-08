import { test } from '../test-options';

test('Form Layouts E2E', async ({ pageManager, randomPerson }) => {
  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      randomPerson.email,
      randomPerson.password,
      randomPerson.option
    );
  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(randomPerson.fullName, randomPerson.email, true);
});
