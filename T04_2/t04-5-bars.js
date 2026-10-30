// t04-5-bars.js (final version for T04-7: grouped bars + labels)
const createBarChart = (data) => {
  // --- Sizes (logical vs. display) ---
  const viewW = 560;
  const viewH = Math.max(220, data.length * 28);
  const displayW = 640;
  const displayH = Math.min(480, data.length * 24 + 40);

  // Space reserved on the left for category labels; bars start here
  const labelX = 150; // wide enough for long names like "SAMSUNG ELECTRONICS"

  // --- SVG root ---
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", `0 0 ${viewW} ${viewH}`)
    .attr("width", displayW)
    .attr("height", displayH)
    .style("border", "1px solid #ccc");

  // --- Scales (from T04-6) ---
  const xMax = d3.max(data, d => d.count);
  const xScale = d3.scaleLinear()
    .domain([0, xMax])
    // Shortened range so labelX + bar + value text stays inside the viewBox
    .range([0, viewW - labelX - 40]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, viewH])
    .paddingInner(0.2)
    .paddingOuter(0.1);

  // OLD rectangle-only drawing block from T04-6 (COMMENTED OUT for T04-7).
  /*
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 0)
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");
  */

  // --- NEW in T04-7: one group per row (bar + labels move together) ---
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // --- Bar rectangle inside the group ---
  // y is 0 because the group sets the vertical position via transform.
  barAndLabel
    .append("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", labelX)                      // bar starts at x = labelX
    .attr("y", 0)
    .attr("width", d => xScale(d.count))    // scaled width fits the viewBox
    .attr("height", yScale.bandwidth())     // bar thickness from the band scale
    .attr("fill", "steelblue");

  // --- Category text (left of bar, right-aligned at x = labelX) ---
  barAndLabel
    .append("text")
    .text(d => d.brand)                     // change if your category column differs
    .attr("x", labelX - 4)                  // small gap before the bar
    .attr("y", yScale.bandwidth() / 2)      // vertically centred in the band
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "end")             // text ends where the bar begins
    .style("font-family", "sans-serif")
    .style("font-size", "13px");

  // --- Value text (just past the end of each bar) ---
  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => labelX + xScale(d.count) + 4)
    .attr("y", yScale.bandwidth() / 2)
    .attr("dominant-baseline", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "13px");
};
