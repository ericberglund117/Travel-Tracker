import Traveler from "./traveler";
import Trip from "./trip"
import domUpdates from "./domUpdates"
import moment from 'moment'
import querySelectorNodes from "./index"

let fetcher = {

  getTravelerData(number) {
    const todaysDate = moment().format('YYYY/MM/DD')
    Promise.all([
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers'),
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips'),
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
    ])
    .then(response => Promise.all(response.map(response => response.json())))
    .then(response => {
      let tripsData = response[1].trips.map(trip => {
        let destination = response[2].destinations.find(destination =>{
          return destination.id === trip.destinationID
        })
        return new Trip(trip, destination)
      })
      let specificTraveler = response[0].travelers.find(traveler => traveler.id === number)
      let traveler = new Traveler(specificTraveler, tripsData)
      domUpdates.createIdentifiers(traveler, tripsData, response[2].destinations, todaysDate)
      this.useFetchData(traveler)
    })
    .catch(error => console.log(error))
  },

  useFetchData(traveler) {
    domUpdates.welcomeTraveler(traveler);
    domUpdates.displayDestinationCards(traveler);
    domUpdates.displayUpcomingTravelerTrips(traveler, domUpdates.allDestinations);
    domUpdates.displayAmountSpent(traveler, domUpdates.allTrips, domUpdates.allDestinations);
    domUpdates.displayPastTrips(traveler, domUpdates.allDestinations);
    domUpdates.displayPendingTrips(traveler, domUpdates.allDestinations);
  },

  travelerRequestedTripPost(destinationIdentification) {
    if (querySelectorNodes.tripDepartureDate.value && querySelectorNodes.numberOfDaysInput.value && querySelectorNodes.numberOfTravelersInput.value) {
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.createTrip(destinationIdentification))
      })
      .then(response => console.log(response))
      //.then(response => this.getTravelerData(domUpdates.traveler.id))
      .then(domUpdates.displayTripConfirmation())
      .catch(error => console.log(error))
      } else {
        domUpdates.displayTripError()
      }
    },

  createTrip(destinationIdentification){
    if (querySelectorNodes.tripDepartureDate.value && querySelectorNodes.numberOfDaysInput.value && querySelectorNodes.numberOfTravelersInput) {
      let requestedDestination = domUpdates.allDestinations.find(destination => {
        return destination.id === destinationIdentification
      });
      let mostRecentTripRequest = domUpdates.allTrips.pop();
      let requestedTrip = {
        id: mostRecentTripRequest.id + 4,
        userID: parseInt(domUpdates.traveler.id),
        destinationID: parseInt(requestedDestination.id),
        travelers: parseInt(querySelectorNodes.numberOfTravelersInput.value),
        date: moment(querySelectorNodes.tripDepartureDate, 'YYYY-MM-DD'),
        duration: parseInt(querySelectorNodes.numberOfDaysInput.value),
        status: 'pending',
        suggestedActivities: []
      }
      domUpdates.displayTripEstimation(requestedTrip, requestedDestination)
      return requestedTrip
    }
  }
}

export default fetcher;
