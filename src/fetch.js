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

  travelerRequestedTripPost() {
    if (querySelectorNodes.tripDepartureDate.value && querySelectorNodes.numberOfDaysInput.value && querySelectorNodes.numberOfTravelersInput) {
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.createTrip())
      })
      .then(response => console.log(response))
      .then(response => this.getTravelerData(domUpdates.user.id))
      .catch(error => console.log(error))
      } else {
        alert('Something is invalid, please try again')
      }
    },

  createTrip(){
    if (querySelectorNodes.tripDepartureDate.value && querySelectorNodes.numberOfDaysInput.value && querySelectorNodes.numberOfTravelersInput) {
      let requestedDestination = domUpdates.allDestinations.find(destination => {
        return destination.destination === selectDestination(event)
      });
      let mostRecentTripRequest = domUpdates.allTrips.pop();
      let requestedTrip = {
        id: mostRecentTripRequest.id + 4,
        userID: parseInt(domUpdates.user.id),
        destinationID: parseInt(destination.id),
        travelers: parseInt(querySelectorNodes.numberOfTravelersInput.value),
        date: moment(querySelectorNodes.tripDepartureDate.value).format('YYYY/MM/DD'),
        duration: parseInt(querySelectorNodes.numberOfDaysInput.value),
        status: 'pending',
        suggestedActivities: [],
      }
      domUpdates.displayTripEstimation(requestedTrip, destination)
      return requestedTrip
    }
  }
}

  //
  // getSingleTraveler(traveler) {
  //   return fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${traveler.id}`)
  //   .then((response) => response.json())
  //   .then(data => traveler = new Traveler(data))
  //   .then(this.getTravelerTrips(traveler))
  //   .catch(error => console.log(error));
  // },
  //
  // getTravelerTrips(traveler) {
  //   let allTravelerTrips;
  //   return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  //   .then((response) => response.json())
  //   .then(data => allTravelerTrips = data)
  //   .then(() => {
  //     let travelerTrips = allTravelerTrips.trips.filter(trip => {
  //       return trip.userID === traveler.id;
  //     })
  //     traveler.allDestinations = allDestinations;
  //     traveler.trips = travelerTrips;
  //     this.useFetchData(traveler)
  //   })
  //   .catch(error => console.log(error));
  // },
  //
  // checkData() {
  //   Promise.all([getSingleTraveler(), getTravelerTrips(), getTravelerDestinationData()])
  //   .then(data => console.log(allData))
  //   .catch(error => console.log(error));
  // },
  //
  // travelerRequestedTripPost(traveler, userID, numberOfTravelersInput, selectedDestination ) {
  //   return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  //     .then(response => response.json())
  //     .then(data => {
  //       let allTrips = data;
  //     })
  //     .then(() => {
  //       let tripRequest = {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json'
  //         },
  //       body: JSON.stringify({
  //         id:(allTrips.trips.length + 1),
  //         userID: userID,
  //         destinationID: selectedDestination,
  //         travelers: parseInt(numberOfTravelersInput.value),
  //         date: moment(tripDepartureDate, 'YYYY/MM/DD'),
  //         status: 'pending',
  //         suggestedActivities: []
  //         })
  //       };
  //       fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', tripRequest)
  //         .then(response => response.json())
  //         .then(() => {
  //           this.getTravelerDestinationData(traveler)
  //         })
  //         .catch(error => console.log(error))
  //     })
  //     .catch(error => console.log(error))
  // },
  //

export default fetcher;
