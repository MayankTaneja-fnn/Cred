const getIndirectFlights = (flightMap, currentCity, destination, date, time, currentFlights, directFlights) => {
    console.log("c",currentCity);
    if (directFlights.size() === 10) {
        return;
    }

    if (destination === currentCity && currentFlights.length > 0) {
        directFlights.insert([...currentFlights]);
        return;
    }

    const availableFlights = flightMap.get(currentCity) || [];
    for (let flight of availableFlights) {
        if (
            flight.startTime >= time &&
            !currentFlights.some(f => f.id === flight.id) &&
            flight.date === date &&
            flight.destination !== currentCity
        ) {
            currentFlights.push(flight);
            getIndirectFlights(flightMap, flight.destination, destination, date, flight.endTime, currentFlights, directFlights);
            currentFlights.pop();
        }
    }
};

export default getIndirectFlights;