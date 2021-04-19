const { registerUser, firstLastName } = require("../src/registerUser");
const timeout = 30000;

describe("Arequipa English Registration page", () => {
  beforeAll(async () => {
    await page.goto("http://arequipaenglish.localhost:8888/register");
  });

  it('should be titled "Create new account"', async () => {
    await expect(page.title()).resolves.toMatch("Create new account | Arequipa English");
  });

  it("should calculate correctly the Fullname", async () => {
    await firstLastName(page);
    await expect(page).toFill('input[name="firstName"]', "James");
  });

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
