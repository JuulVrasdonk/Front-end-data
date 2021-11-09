const circle = d3.select("circle");
circle.attr("r", 10);
circle.attr("cx", 20);
circle.attr("cy", 23);

// alternative syntax via chaining
circle.attr("r", 10).attr("cx", 20).attr("cy", 23);

// set css styles
circle.style("stroke-width", 2);
circle.style("fill", "#B23B22")
// add, remove css classes
circle.classed("highlight", true);

// set inner text
d3.select("text").text("Hello");
d3.select("div").html(`<strong>Hello</strong>`);


const body = d3.select("body");
body.append("svg").attr("width", 800).attr("height", 600);
body.style("background-color", "#B23B22");

d3.select("svg").remove();
d3.select("div").remove();

