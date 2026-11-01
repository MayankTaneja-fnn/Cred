import Flight from './models/flight.js';
import flightData from './Dataset/data.json' with { type: 'json' };
import FlightMinHeap from './utils/priority_queue.js';
import getIndirectFlights from './getIndirectFlights.js';

export { flightData };

const getFlights =  (source, destination,date, time) => {
    let dataset= flightData;
    const flightMap = new Map();
    let directFlights= new FlightMinHeap();
    let cities=["Delhi","Mumbai","Bengaluru","Chennai","Hyderabad","Kolkata"];

    for (let i = 0; i < cities.length; i++) {
        for(let j=0;j<dataset.length;j++){
            if(cities[i] === dataset[j].source  && dataset[j].date === date && time <= dataset[j].startTime){
                const flight = new Flight(dataset[j].id, dataset[j].source, dataset[j].destination, dataset[j].date, dataset[j].startTime, dataset[j].endTime, dataset[j].duration);
                if (!flightMap.has(flight.source)) {
                    flightMap.set(flight.source, []);
                }
                flightMap.get(flight.source).push(flight);
        }
    }
    }
    for(let i=0; i<dataset.length; i++){
        if(dataset[i].source === source && dataset[i].destination === destination && dataset[i].date === date && dataset[i].startTime >= time){
            let flight = new Flight(dataset[i].id, dataset[i].source, dataset[i].destination, dataset[i].date, dataset[i].startTime, dataset[i].endTime, dataset[i].duration);
            directFlights.insert(flight);
        }
    }
    if(directFlights.size()===10){
        return directFlights;
    }
    getIndirectFlights(flightMap, source, destination, date, time, [], directFlights);
    return directFlights;
}


export default getFlights;