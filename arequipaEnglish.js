const puppeteer = require("puppeteer");

const fields = [
  { label: "First name", type: "text", selector: "#edit-field-name-0-value", value: "Mat" },
  { label: "Last name", type: "text", selector: "#edit-field-last-names-0-value", value: "Rat" },
  { label: "Phone", type: "text", selector: "#edit-field-phone-0-value", value: "955 555 555" },
  {
    label: "Institute",
    selector: "#edit-field-institute-0-value",
    value: "Instituto de Idiomas",
  },
  {
    label: "Degree",
    type: "text",
    selector: "#edit-field-degree-0-value",
    value: "Ingeneria de Pruebas",
  },
  {
    label: "Email",
    type: "text",
    selector: '[data-drupal-selector="edit-mail"]',
    value: "davidjeyachandran+30@gmail.com",
  },
];

(async () => {
  const testField = async (field) => {
    console.log("Testing: " + field.label);
    await page.waitForSelector(field.selector);
    await page.type(field.selector, field.value);
    await page.waitForTimeout(400);
  };

  const isDebugging = () => {
    debugSettings = {
      headless: false,
      defaultViewport: null,
      // slowMo: 250,
      devtools: false,
    };

    return process.env.NODE_ENV === "debug" ? debugSettings : {};
  };

  const browser = await puppeteer.launch(isDebugging());
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://arequipaenglish.com/");

  // await page.setViewport({ width: 1092, height: 764 });

  await navigationPromise;

  await page.waitForSelector(
    "#block-english-account-menu > .content > .clearfix > .menu-item:nth-child(1) > a"
  );
  await page.click(
    "#block-english-account-menu > .content > .clearfix > .menu-item:nth-child(1) > a"
  );

  await navigationPromise;
  const title = await page.title();
  console.log("Current page: " + title + " - ", page.url());

  for (const key in fields) {
    const { label, type, selector, value } = field[key][selector];
    console.log("Processing field: " + label);
    await page.waitForSelector(selector);
    if (type === "text") await page.type(selector, value);
    await page.waitForTimeout(500);
  }

  // // First name
  // await page.waitForSelector("#edit-field-name-0-value");
  // await page.type("#edit-field-name-0-value", "David");

  // // Last name
  // const selectorLastName = "#edit-field-last-names-0-value";
  // await page.waitForSelector(selectorLastName);
  // await page.type(selectorLastName, "Test");
  // await page.waitForTimeout(500);

  // const selectorPhone = "#edit-field-phone-0-value";
  // await page.waitForSelector(selectorPhone);
  // await page.type(selectorPhone, "997 555 555");
  // await page.waitForTimeout(500);

  await page.waitForSelector("#edit-field-institute-0-value");
  await page.type("#edit-field-institute-0-value", "Centro de Idiomas");
  await page.waitForTimeout(500);

  await page.waitForSelector("#edit-field-degree-0-value");
  await page.type("#edit-field-degree-0-value", "Ingeneria de Pruebas");
  await page.waitForTimeout(500);

  await page.waitForSelector('[data-drupal-selector="edit-mail"]');
  await page.type('[data-drupal-selector="edit-mail"]', "davidjeyachandran+30@gmail.com");
  await page.waitForTimeout(500);

  // User Picture
  await page.type("#edit-field-birth-year-0-value", "1948");
  await page.click("#edit-user-picture-0-upload");

  //   let dateString = await page.evaluate(
  //     d => new Date(d).toLocaleDateString(navigator.language, {
  //         day: "2-digit",
  //         month: "2-digit",
  //         year: "numeric",
  //     }),
  //     date.toISOString()
  // );
  // await page.type("input", dateString)")

  // await browser.close();
})();
