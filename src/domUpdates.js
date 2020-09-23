import querySelectorNodes from "./index";
import Traveler from "./traveler"
import Trip from "./trip"

let domUpdates = {

  // toggleViews() {
  //   if(document.querySelector(".sign-in-view").style.display === 'none' && document.querySelector(".main-page").style.display === 'block') {
  //     document.querySelector(".sign-in-view").style.display = 'block';
  //     document.querySelector(".main-page").style.display = 'none';
  //   } else {
  //     document.querySelector(".sign-in-view").style.display = 'none'
  //     document.querySelector(".main-page").style.display = 'block'
  //   }
  // },
  traveler: {},
  allTrips: [],
  allDestinations: [],
  today: '',

  createIdentifiers(traveler, trips, destinations, todaysDate) {
    domUpdates.traveler = traveler;
    domUpdates.allTrips = trips;
    domUpdates.allDestinations = destinations;
    domUpdates.today = todaysDate;
  },

  welcomeTraveler(traveler) {
      let firstName = traveler.name.split(" ")[0];
      let welcomeMsg = `
      <div class="welcome-msg">
      <h1>Welcome ${firstName}!</h1>
      </div>`;
      document.querySelector(".travel-tracker-header").insertAdjacentHTML("beforeend",
      welcomeMsg)
  },

  displayUpcomingTravelerTrips(traveler, destinations) {
    querySelectorNodes.bookedTripsCardsSection.innerHTML = '';
    let travelerFutureTrips = traveler.getFutureTrips(traveler.allTrips, domUpdates.today)
    travelerFutureTrips.forEach(trip => {
      if(trip.status === 'pending' || 'approved') {
        querySelectorNodes.bookedTripsCardsSection.insertAdjacentHTML(`beforeend`,
          `<article class="trips-card-body" id="booked-trips-section"></article>
          <p>Destination: ${destinations[trip.destinationID - 1].destination}</p>
          <p>Travelers: ${trip.travelers}</p>
          <p>Date: ${trip.date}</p>
          <p>Status: ${trip.status}</p>
          <hr>
          </article>`
        )};
    });
  },

  displayPastTrips(traveler, destinations) {
    let previousTrips = traveler.getPastTrips(traveler.allTrips, domUpdates.today)
    previousTrips.forEach(trip => {
        querySelectorNodes.travelerPastTrips.insertAdjacentHTML(`beforeend`,
          `<article class="trips-card-body" id="booked-trips-section"></article>
          <p>Destination: ${destinations[trip.destinationID - 1].destination}</p>
          <p>Travelers: ${trip.travelers}</p>
          <p>Date: ${trip.date}</p>
          <p>Status: ${trip.status}</p>
          <hr>
          </article>`
        );
    });
  },

  displayPendingTrips(traveler, destinations) {
    let previousTrips = traveler.getPendingTrips(traveler.allTrips)
    previousTrips.forEach(trip => {
        querySelectorNodes.travelerPendingTrips.insertAdjacentHTML(`beforeend`,
          `<article class="trips-card-body" id="booked-trips-section"></article>
          <p>Destination: ${destinations[trip.destinationID - 1].destination}</p>
          <p>Travelers: ${trip.travelers}</p>
          <p>Date: ${trip.date}</p>
          <p>Status: ${trip.status}</p>
          <hr>
          </article>`
        );
    });
  },

  displayAmountSpent(traveler, tripData, destinations) {
   let amountSpent = traveler.getAmountSpent(tripData, destinations);
   querySelectorNodes.yearlyAmountSpent.innerHTML = (`<h3>You spent $${amountSpent} on traveling this year!</h3>`);
 },

 displayDestinationCards(traveler) {
   let allDestinations = domUpdates.allDestinations;
   allDestinations.forEach(destination => {
     querySelectorNodes.destinationsCards.insertAdjacentHTML('beforeend',
      `<article class="sub-sub-card" id="desinations-sub-card">
            <h3>${destination.destination}</h3>
            <input type="image" class="destination-image" id="${destination.id}" src="${destination.image}" alt="${destination.alt}"/>
          </article>`
        )
   })
 },

 displayTripConfirmation() {
   querySelectorNodes.confirmationMsg.innerHTML = '<h3>You have successfully booked your trip! It is now pending</h3>';
 },

 displayTripError() {
   querySelectorNodes.confirmationMsg.innerHTML = '<h3>Please select a valid destination and date</h3>';
 },

 displayTripEstimation(trip, destination) {
   let requestedTrip = new Trip(trip, destination);
   querySelectorNodes.tripEstimation.innerText = `Estimated Trip Cost: ${requestedTrip.getTripCost()}`
 },

}

export default domUpdates;
