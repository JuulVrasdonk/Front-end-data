export default async function getPages() {
  // set some variables
  const baseUrl = `https://api.schiphol.nl/public-flights/destinations?page=`;
  let page = 1;
  
  let cities = []


  do {
    // try catch to catch any errors in the async api call
    try {
      // use node-fetch to make api call
      const resp = await fetch(`${baseUrl}${page}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          app_id: "2754d242",
          app_key: "67b1ecc17f4097520677f888b201d009",
          ResourceVersion: "v4",
        }
      });


      const data = await resp.json();
      const destinations = data.destinations
      destinations.forEach(singleData => {
            let city = singleData.city
            if (typeof city === "string") {
              cities.push(city)
            } else {
              // cities = null 
            }
      });

      // increment the page with 1 on each loop
      page++;

    } catch (err) {
      console.error(`Oeps, something is wrong ${err}`);
    }
    // keep running until there's no next page
  } while (page < 50);
  return cities
}

