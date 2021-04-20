const { registerUser, firstLastName } = require("../src/registerUser");
const timeout = 30000;

describe("Arequipa English Registration page", () => {
  beforeEach(async () => {
    await page.goto("http://arequipaenglish.localhost:8888/register");
  });

  it(
    'should be titled "Create new account"',
    async () => {
      await expect(page.title()).resolves.toMatch("Create new account | Arequipa English");
    },
    timeout
  );

  it(
    "should calculate correctly the Fullname",
    async () => {
      await expect(page).toFill("#edit-field-name-0-value", "Kate");
      await expect(page).toFill("#edit-field-last-names-0-value", "Martin");
      await expect(page).toFill("#edit-field-birth-year-0-value", "1950");

      const element = await page.$("#edit-name");
      const text = await (await element.getProperty("value")).jsonValue();
      await expect(text).toBe("Kate Martin");
    },
    timeout
  );

  it(
    "should show a success page after submit",
    async () => {
      await registerUser(page);
      const headerExpected = "Welcome to Arequipa English";
      await expect(page).toMatchElement("h1", { text: headerExpected });
    },
    timeout
  );
});
