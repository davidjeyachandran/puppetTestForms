describe("Arequipa English", () => {
  beforeAll(async () => {
    await page.goto("https://arequipaenglish.com/register");
  });

  it('should be titled "Create new account"', async () => {
    await expect(page.title()).resolves.toMatch("Create new account | Arequipa English");
  });
});
