const puppeteer = require("puppeteer");
const { randomNumber, testField } = require("./utilities.js");

const fields = [
  { label: "First name", type: "text", selector: "#edit-field-name-0-value", value: "Matt" },
  {
    label: "Last name",
    evaluate: "(selector) => document.querySelector(selector).click()",
    type: "text",
    selector: "#edit-field-last-names-0-value",
    value: "Pratt" + randomNumber(1000),
  },
  {
    label: "Picture",
    type: "file",
    selector: "#edit-user-picture-0-upload",
    value: "./src/person.jpeg",
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
    value: "davidjeyachandran+" + randomNumber(1000) + "@gmail.com",
  },
  {
    label: "Create new account",
    type: "submit",
    selector: "#edit-submit",
    value: null,
  },
];

exports.registerUser = async (page) => {
  try {
    const navigationPromise = page.waitForNavigation();
    await page.goto("https://arequipaenglish.com/register");
    await navigationPromise;

    const title = await page.title();
    console.log("Current page: " + title + " - ", page.url());

    for (const key in fields) {
      await testField(fields[key], page);
    }

    await browser.close();
  } catch (err) {
    console.log(err);
  }
};
