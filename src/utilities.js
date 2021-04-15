const isDebugging = () => {
  debugSettings = {
    headless: false,
    defaultViewport: null,
    slowMo: 5,
    devtools: false,
  };

  return process.env.NODE_ENV === "debug" ? debugSettings : {};
};
exports.isDebugging = isDebugging;

const randomNumber = (max) => Math.floor(Math.random() * max);
exports.randomNumber = randomNumber;

const testField = async (field) => {
  try {
    const { label, selector, type, value } = field;
    await page.waitForSelector(selector);
    if ("evaluate" in field && field.evaluate) await page.evaluate(field.evaluate);
    const valueCustom = "valueCustom" in field ? field.valueCustom : value;
    console.log(valueCustom);
    if (type === "text") await page.type(selector, valueCustom);
    if (type === "select") await page.select(selector, valueCustom);
    if (type === "file") {
      // Sets the value of the file input to fileToUpload
      const inputUploadHandle = await page.$(selector);
      inputUploadHandle.uploadFile(valueCustom);
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
exports.testField = testField;
