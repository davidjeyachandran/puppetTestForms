const puppeteer = require("puppeteer");

const fields = [
  { label: "First name", type: "text", selector: "#edit-field-name-0-value", value: "Matt" },
  {
    label: "Last name",
    evaluate: "(selector) => document.querySelector(selector).click()",
    type: "select",
    selector: "#edit-field-last-names-0-value",
    value: "Pratt",
  },
  { label: "Birth Year", type: "text", selector: "#edit-field-birth-year-0-value", value: "1948" },
  { label: "Phone", type: "text", selector: "#edit-field-phone-0-value", value: "955 555 555" },
  {
    label: "English Level",
    type: "select",
    selector: "#edit-field-english-level",
    value: "INTERMEDIATE",
  },

  {
    label: "Institute",
    type: "text",
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
  {
    label: "Picture",
    type: "file",
    selector: "#edit-user-picture-0-upload",
    value: "annabelle-daddy.jpg",
  },
  {
    label: "Create new account",
    type: "submit",
    selector: "#edit-submit",
    value: null,
  },
];

(async () => {
  const testField = async (field) => {
    try {
      const { label, selector, type, value } = field;
      await page.waitForSelector(selector);
      if ("evaluate" in field && field.evaluate) await page.evaluate(field.evaluate);
      if (type === "text") await page.type(selector, value);
      if (type === "select") await page.select(selector, value);
      if (type === "file") {
        // Sets the value of the file input to fileToUpload
        // https://stackoverflow.com/questions/59273294/how-to-upload-file-with-js-puppeteer
        const inputUploadHandle = await page.$(selector);
        inputUploadHandle.uploadFile(value);

        /*
        // doing click on button to trigger upload file
        await page.waitForSelector('#upload');
        await page.evaluate(() => document.getElementById('upload').click());

        // wait for selector that contains the uploaded file URL
        await page.waitForSelector('#upload-link');
*/
      }

      if (type === "date") {
        let dateString = await page.evaluate(
          (d) =>
            new Date(d).toLocaleDateString(navigator.language, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
          date.toISOString()
        );
        await page.type("input", dateString);
      }

      if (type === "submit") {
        await page.click(selector);
        await page.waitForNavigation();
      }
      await page.waitForTimeout(400);
      console.log("Testing field: " + label);
    } catch (err) {
      console.log("Error in field: " + label);
      console.log(err);
    }
  };

  const isDebugging = () => {
    debugSettings = {
      headless: false,
      defaultViewport: null,
      slowMo: 5,
      devtools: false,
    };

    return process.env.NODE_ENV === "debug" ? debugSettings : {};
  };

  const browser = await puppeteer.launch(isDebugging());
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://arequipaenglish.com/register");

  // await page.setViewport({ width: 1092, height: 764 });

  await navigationPromise;

  const title = await page.title();
  console.log("Current page: " + title + " - ", page.url());

  for (const key in fields) {
    await testField(fields[key]);
  }

  // await browser.close();
})();
