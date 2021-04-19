exports.isDebugging = () => {
  debugSettings = {
    headless: false,
    defaultViewport: null,
    slowMo: 5,
    devtools: false,
  };

  return process.env.NODE_ENV === "debug" ? debugSettings : {};
};

exports.randomNumber = (max) => Math.floor(Math.random() * max);

const updateField = async (field, page) => {
  try {
    const { label, selector, type, value } = field;
    await page.waitForSelector(selector);
    if ("evaluate" in field && field.evaluate) await page.evaluate(field.evaluate);

    if (type === "text") await page.type(selector, value);
    if (type === "select") await page.select(selector, value);
    if (type === "file") {
      // Sets the value of the file input to fileToUpload
      const inputUploadHandle = await page.$(selector);
      inputUploadHandle.uploadFile(value);
    }

    if (type === "submit") {
      await page.click(selector);
      await page.waitForNavigation();
    }
    await page.waitForTimeout(400);
    // console.log("Testing field: " + label);
  } catch (err) {
    console.log(err);
  }
};
exports.testField = updateField;
