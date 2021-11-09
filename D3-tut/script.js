const data = [1, 2, 3];
d3.select("svg")
  .selectAll("circle")
  .data(data)
  .join("circle")
  .attr("r", 10)
  .attr("cx", (d, i) => d * 10)
  .attr("cy", (d, i) => i * 50);
