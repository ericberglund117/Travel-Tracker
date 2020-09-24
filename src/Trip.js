class Trip {
  constructor(trip, destination) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = 'pending' || trip.status;
    this.suggestedActivities = [];
    this.destination = destination;
  };

  getTripCost() {
    let estimatedLodgingCost = this.destination.estimatedLodgingCostPerDay * this.duration
    let estimatedFlightCost = this.destination.estimatedFlightCostPerPerson * this.travelers
    let totalCost =  estimatedLodgingCost + estimatedFlightCost
    return Math.round(totalCost * 1.1)
  };
};

export default Trip;
