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

// await page.setViewport({ width: 1092, height: 764 });
