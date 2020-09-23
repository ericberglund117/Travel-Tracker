import moment from 'moment';
import domUpdates from './domUpdates'

class Traveler {
  constructor(traveler, trips) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.pendingTrips = [];
    this.pastTrips = [];
    this.futureTrips = [];
    this.allTrips = trips;
  };

  getPendingTrips(tripsData) {
    tripsData.forEach(trip => {
      if (this.id === trip.userID && trip.status === 'pending') {
        this.pendingTrips.push(trip)
      }
    })
    return this.pendingTrips
  };

  getFutureTrips(tripsData, today) {
    let travelerTrips = tripsData.filter(trip => {
      return this.id === trip.userID
    })
    travelerTrips.forEach(trip => {
      if (moment(trip.date, 'YYYY/MM/DD') > moment(today, 'YYYY/MM/DD')) {
      this.futureTrips.push(trip)
    }
    })
    return this.futureTrips
  };

  getPastTrips(tripsData, today) {
    let tripMatch = tripsData.filter(trip => {
      return this.id === trip.userID
    })
    tripMatch.forEach(trip => {
      if (moment(trip.date, 'YYYY/MM/DD') < moment(today, 'YYYY/MM/DD')) {
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
      if (moment(currentYearTrips).isBetween('2019-01-01', '2021-01-01')) {
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
}
export default Traveler;
