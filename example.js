const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await page.goto("https://movilicemos.org/");
  // await page.waitForNavigation();
  await page.click("#block-stack-main-menu > ul > li:nth-child(2) > a");
  const link = "#root > div > div > ul > li:nth-child(1) > article > div > a";
  await page.waitForSelector(link);
  await page.click(link);
  console.log("Current page:", page.url());
  await page.screenshot({ path: "recursos.png" });

  await browser.close();
})();

const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://arequipaenglish.com/register");

  await page.setViewport({ width: 1382, height: 417 });

  await page.waitForSelector(
    ".content > #user-register-form > #edit-field-name-wrapper #edit-field-name-0-value"
  );
  await page.click(
    ".content > #user-register-form > #edit-field-name-wrapper #edit-field-name-0-value"
  );

  await page.type(
    ".content > #user-register-form > #edit-field-name-wrapper #edit-field-name-0-value",
    "David"
  );

  await page.waitForSelector("#ajax-wrapper #edit-user-picture-0-upload");

  await browser.close();
})();
