class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = 'pending' || trip.status;
    this.suggestedActivities = [];
  }

  getTripCost(destinationData) {
    let tripDestination = destinationData.find(destination => {
      return destination.id === this.destinationID
    })
    let estimatedLodgingCost = tripDestination.estimatedLodgingCostPerDay * this.duration
    let estimatedFlightCost = tripDestination.estimatedFlightCostPerPerson * this.travelers
    let totalCost =  estimatedLodgingCost + estimatedFlightCost
    return Math.round(totalCost * 1.1)
  }
}

export default Trip;
