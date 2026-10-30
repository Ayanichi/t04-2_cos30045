// T04-2: first D3 steps

// Select the first <h1> and set its colour to green
d3.select("h1")
  .style("color", "green");

// Select the first <div>, append a <p> inside it, and set its text
d3.select("div")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Append an empty <rect> (invisible: no size, position or fill yet)
d3.select("svg")
  .append("rect");

// Append a second <rect> with position, size and fill so it is visible
d3.select("svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "green");
