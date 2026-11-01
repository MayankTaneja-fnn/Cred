import getFlights from "./getFlights.js";

let source = "Delhi";
let destination = "Bengaluru";
let date = "01/08/2026";
let time = "10:00";

const flights = getFlights(source, destination, date, time);

for(let i=0; i<flights.size(); i++){
    let flight = flights.extractMin();
    for(let j=0; j<flight.length; j++){
        console.log(`Flight ID: ${flight[j].id}, Source: ${flight[j].source}, Destination: ${flight[j].destination}, Date: ${flight[j].date}, Start Time: ${flight[j].startTime}, End Time: ${flight[j].endTime}, Duration: ${flight[j].duration}`);
    }
    console.log('-----------------------------');
}
