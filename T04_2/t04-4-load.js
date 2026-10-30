// T04-4: load tvBrandCount.csv, convert types, run quick checks

// Show a readable message on the page (and in the Console) if anything goes wrong
const showChartError = (message) => {
  console.error(message);
  const box = document.querySelector(".responsive-svg-container") || document.body;
  box.insertAdjacentHTML("beforeend", `<p class="chart-error">${message}</p>`);
};

if (typeof d3 === "undefined") {
  showChartError("D3 did not load. Check your internet connection and the d3 &lt;script&gt; tag in index.html.");
} else if (location.protocol === "file:") {
  showChartError("This page was opened as a file. Start it with Live Server (the address should begin with http://127.0.0.1) so the CSV can load.");
} else {
  /* Load CSV, convert types, quick check */
  // Column names must match the CSV headers exactly (brand, count)
  d3.csv("data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count // '+' converts the string to a number
  })).then(data => {
    // Quick checks
    console.log(data); // whole array of typed objects
    console.log("rows:", data.length);
    console.log("max:", d3.max(data, d => d.count));
    console.log("min:", d3.min(data, d => d.count));
    console.log("extent:", d3.extent(data, d => d.count)); // [min, max]

    // Optional: sort descending by count for easier reading
    data.sort((a, b) => d3.descending(a.count, b.count));

    // Hand off to the chart builder (implemented in T04-5)
    createBarChart(data);
  }).catch(err => {
    showChartError("The chart could not be drawn: " + err.message +
      ". Check that data/tvBrandCount.csv exists and its headers are brand,count.");
  });
}
