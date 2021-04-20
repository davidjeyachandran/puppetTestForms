// Date field
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

// Get Page title
const title = await page.title();
console.log("Current page: " + title + " - ", page.url());

const header = await page.evaluate(() => document.querySelector("h1").textContent.trim());

// await page.setViewport({ width: 1092, height: 764 });
// https://chercher.tech/puppeteer/select-dropdown-puppeteer
// https://medium.com/touch4it/end-to-end-testing-with-puppeteer-and-jest-ec8198145321
