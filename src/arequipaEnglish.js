const puppeteer = require("puppeteer");
const { isDebugging } = require("./utilities.js");
const { registerUser, firstLastName } = require("../src/registerUser");

(async () => {
  try {
    const browser = await puppeteer.launch(isDebugging());
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 1000 });

    const navigationPromise = page.waitForNavigation();
    await page.goto("http://arequipaenglish.localhost:8888/register");
    await navigationPromise;

    // await registerUser(page);

    await firstLastName(page);

    // await browser.close();
  } catch (err) {
    console.log(err);
  }
})();
