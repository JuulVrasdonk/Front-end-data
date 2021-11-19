export function renderToMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoianV1bHZyYXNkb25rIiwiYSI6ImNrdnRnbW8ydjByZGgyb205ZmZvZWJjYW4ifQ.1kI6XuFZQ1JkxTAjgzjcrA'; 
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/juulvrasdonk/ckw1xzwxt4kum14mprcvnfxq8', 
    center: [10.5854738679537563, 25.83355015464672], 
    zoom: 1.8,
    minZoom: .5
  });

  // Ik laad hier de data in die ik ophaal uit geocoding.js
  d3.json("./data.json").then((data) => {
    update(data)
  })

  function update(data) {
  // Ik maak een container variable en selecteer 
  // hierin de container waar mijn Mapbox map zich in bevindt
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
    .classed("dot", true)
    .attr("r", 5)
    .style("fill", "#1B60DB")


  d3.select("circle:last-of-type")
    .attr("r", 10)
    .attr("id", "schiphol")
    .style("fill", "#914BD2")


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


  // Hier voeg ik een kleine staggering animation toe met GSAP.
  const dotTl = gsap.timeline();

  dotTl.from(".dot", {
    duration: 1,
    opacity: 0
  })
  .from(".dot", {
    opacity: 0,
    scale: 0
  })

  .to(".dot", {
    scale: 1, 
    opacity: .7,
    stagger: .007, 
    ease: Elastic.easeOut.config(1, 0.3)
  })

  // Hier vertel ik wat dots moeten als ik in- of uitzoom of beweeg.
  render();
        map.on("viewreset", render);
        map.on("move", render);
        map.on("moveend", render);
}
}