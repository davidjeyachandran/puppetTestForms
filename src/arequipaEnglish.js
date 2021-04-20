const puppeteer = require("puppeteer");
const { isDebugging } = require("./utilities.js");
const { registerUser } = require("../src/registerUser");

(async () => {
  try {
    const browser = await puppeteer.launch(isDebugging());
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();
    await page.goto("http://arequipaenglish.localhost:8888/register");
    await navigationPromise;

    await registerUser(page);
    await browser.close();
  } catch (err) {
    console.log(err);
  }
})();
