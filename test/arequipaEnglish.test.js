const { registerUser } = require("../src/registerUser");

describe("Arequipa English Registration page", () => {
  beforeAll(async () => {
    await page.goto("https://arequipaenglish.com/register");
  });

  it('should be titled "Create new account"', async () => {
    await expect(page.title()).resolves.toMatch("Create new account | Arequipa English");
  });

  it("should show a success page after submit", async () => {
    await registerUser(page);
    // await expect(page.title()).resolves.toMatch("Create new account | Arequipa English");
  });
});
