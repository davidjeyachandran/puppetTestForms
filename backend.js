const labels = document.getElementsByTagName("LABEL");
for (key in labels) {
  if (typeof labels[key] === "object" && "htmlFor" in labels[key]) {
    const label = labels[key].innerText;
    const id = labels[key].htmlFor;
    console.log(label, id);
  }
}
