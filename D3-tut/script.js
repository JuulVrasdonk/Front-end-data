const margin = {top: 40, bottom: 10, left: 120, right: 20};
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Creates sources <svg> element
const svg = d3.select('body').append('svg')
.attr('width', width+margin.left+margin.right)
.attr('height', height+margin.top+margin.bottom);

// Group used to enforce margin
const g = svg.append('g')
.attr('transform', `translate(${margin.left},${margin.top})`);

// Global variable for all data
let data;

// Scales setup
const xscale = d3.scaleLinear().range([0, width]);
const yscale = d3.scaleBand().rangeRound([0, height]).paddingInner(0.1);

// Axis setup
const xaxis = d3.axisTop().scale(xscale);
const g_xaxis = g.append('g').attr('class','x axis');
const yaxis = d3.axisLeft().scale(yscale);
const g_yaxis = g.append('g').attr('class','y axis');

/////////////////////////
// TODO use the provided code sample (see html checkbox and change handler)
// when checked just the entries where `location.country === 'US'` should be shown


d3.json('https://rawgit.com/sgratzl/d3tutorial/master/examples/weather.json').then((json) => {
  data = json;

  update(data);
});

function update(new_data) {
  //update the scales
  xscale.domain([0, d3.max(new_data, (d) => d.temperature)]);
  yscale.domain(new_data.map((d) => d.location.city));
  //render the axis
  g_xaxis.call(xaxis);
  g_yaxis.call(yaxis);


  // Render the chart with new data
  // DATA JOIN
  const rect = g.selectAll('rect').data(new_data).join(
    // ENTER 
    // new elements
    (enter) => {
      const rect_enter = enter.append('rect').attr('x', 0);
      rect_enter.append('title');
      return rect_enter;
    },
    // UPDATE
    // update existing elements
    (update) => update,
    // EXIT
    // elements that aren't associated with data
    (exit) => exit.remove()
  );

  // ENTER + UPDATE
  // both old and new elements
  rect.transition()
    .attr('height', yscale.bandwidth())
    .attr('width', (d) => xscale(d.temperature))
    .attr('y', (d) => yscale(d.location.city));

  rect.select('title').text((d) => d.location.city);
}

//interactivity
d3.select('#filter-us-only').on('change', function() {
  const checked = d3.select(this).property('checked');
  if(checked === true) {
      const filtered_data = data.filter((d) =>  d.location.country === 'US');
      update(filtered_data);
  } else {
      update(data)
  }
});

