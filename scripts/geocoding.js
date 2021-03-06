import getPages from "./get-data.js";


export async function getCoordinate() { 

    let cities = await getPages();
    let coordinateArray = [[4.764889304704452, 52.30728346742136]];
    console.log(coordinateArray);

        for(let city of cities) {
            let cityLocation
            const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
            const accessToken = `.json?limit=1&types=place%2Ccountry&access_token=pk.eyJ1IjoianV1bHZyYXNkb25rIiwiYSI6ImNrdnRnbW8ydjByZGgyb205ZmZvZWJjYW4ifQ.1kI6XuFZQ1JkxTAjgzjcrA`;
            cityLocation = `${baseUrl}${city}${accessToken}`
            const resp = await fetch(`${cityLocation}`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
                });

            const data = await resp.json();
            try {
                const coordinate = data.features[0].geometry.coordinates
                coordinateArray.push(coordinate)
            } catch(err) {
            }
        }
    return coordinateArray
}




