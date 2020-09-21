import moment from 'moment';

class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.pendingTrips = [];
    this.pastTrips = [];
    this.futureTrips = [];
  };

  getPendingTrips(tripsData) {
    tripsData.forEach(trip => {
      if (this.id === trip.userID && trip.status === 'pending') {
        this.pendingTrips.push(trip)
      }
    })
    return tripsData
  };

  getFutureTrips(tripsData) {
    let travelerTrips = tripsData.filter(trip => {
      return this.id === trip.userID
    })
    travelerTrips.forEach(trip => {
      if (moment(trip.date, 'YYYY/MM/DD').fromNow().includes('in') && trip.status ===
    'approved') {
      this.futureTrips.push(trip)
    }
    })
    return this.futureTrips
  };

  getPastTrips(tripsData) {
    let tripMatch = tripsData.filter(trip => {
      return this.id === trip.userID
    })
    tripMatch.forEach(trip => {
      if (moment(trip.date, 'YYYY/MM/DD').fromNow().includes('ago') && trip.status ===
    'approved') {
      this.pastTrips.push(trip)
      }
    })
    return this.pastTrips
  };

  getAmountSpent(tripsData, destinationData) {
    let yearOfTrips = [];
    let tripMatch = tripsData.filter(trip => {
      return this.id === trip.userID
    })
    tripMatch.forEach(trip => {
      let currentYearTrips = moment(trip.date, 'YYYY/MM/DD');
      if (moment(currentYearTrips).isBetween('2019-01-01', '2021-01-01') && trip.status === 'approved') {
        yearOfTrips.push(trip)
      }
    })
    let yearlyCostEstimation = yearOfTrips.reduce((totalCost, trip) => {
      destinationData.forEach(destination => {
        if (destination.id === trip.destinationID) {
          let tripFlightCost = trip.travelers * destination.estimatedFlightCostPerPerson
          let tripLodgingCost = trip.duration * destination.estimatedLodgingCostPerDay
          totalCost += tripFlightCost + tripLodgingCost
        }
      })
      return totalCost
    }, 0)
    return Math.round(yearlyCostEstimation * 1.1)
  };

  makeTripRequest(trip) {
    return window
      .fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trip)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error.message))
  };
}

export default Traveler;
