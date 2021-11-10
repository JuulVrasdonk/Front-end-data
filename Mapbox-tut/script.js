// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = 'pk.eyJ1IjoianV1bHZyYXNkb25rIiwiYSI6ImNrdnRnbW8ydjByZGgyb205ZmZvZWJjYW4ifQ.1kI6XuFZQ1JkxTAjgzjcrA'; 
const map = new mapboxgl.Map({
  container: 'map',
  // Replace YOUR_STYLE_URL with your style URL.
  style: 'mapbox://styles/mapbox/streets-v9', 
  center: [4.8780881169916785, 52.37720940712757],  
  zoom: 10.7
});

// Dummy data van mijn huis(ongeveer), Fest en Leeuwenburg
const data = [[4.8780881169916785, 52.37720940712757], [4.910373814479113, 52.35971178592076], [4.916463167657747, 52.34596092144606]];

// Ik maak een container variable en selecteer 
//hierin de container waar mijn Mapbox map zich in bevindt
const container = map.getCanvasContainer();


// Nu wil ik deze container koppelen aan D3. 
// Dit moet om zometeen mijn SVG's op de kaart
// te kunnen tekenen. Ik zet ook de z-index op 2
// omdat de Mapbox anders boven de D3 graphics 
// worden gezet. 
const svg = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("position", "absolute")
    .style("z-index", 2)

// In deze project functie zeg ik tegen Mapbox wat de coörinaten 
// zijn uit mijn data array. 
function project(d) {
    return map.project(new mapboxgl.LngLat(d[0], d[1]));
}

// Hier geef ik aan hoe de data gevisualiseerd moet worden.
const dots = svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("r", 10)
  .style("fill", "#ff0000");


// Nu render ik de dots SVG's naar de kaart door ze door de 
// project functie heen te halen. Via cx en cy hieraan te 
// koppelen verteld  mapbox via de project functie waar
// de dots moeten komen. Fucking vet. 
function render() {
    dots
      .attr("cx", d => {
        return project(d).x;
      })
      .attr("cy", d => {
        return project(d).y;
      });
}

// Hier vertel ik wat dots moeten als ik in- of uitzoom of beweeg.
render();
      map.on("viewreset", render);
      map.on("move", render);
      map.on("moveend", render);
