import querySelectorNodes from "./index";
import Traveler from "./traveler"

let domUpdates = {

  toggleViews() {
    if(document.querySelector(".sign-in-view").style.display === 'none') {
      document.querySelector(".sign-in-view").style.display = 'block';
    } else {
      document.querySelector(".sign-in-view").style.display = 'none'
    }
    if(document.querySelector(".left-section").style.display === 'block') {
      document.querySelector(".left-section").style.display = 'none';
    } else {
      document.querySelector(".left-section").style.display = 'block'
    }
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

  displayTravelerTrips(traveler, destinations) {
    querySelectorNodes.bookedTripsCardsSection.innerHTML = '';
    traveler.trips.forEach(trip => {
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

  displayAmountSpent(traveler, tripData, destinations) {
   let amountSpent = traveler.getAmountSpent(tripData, destinations);
   querySelectorNodes.yearlyAmountSpent.innerHTML = (`<h3>You spent $${amountSpent} on traveling this year!</h3>`);
 },

 displayDestinationCards(traveler) {
   let allDestinations = traveler.allDestinations;
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
   querySelectorNodes.confirmationMsg.innerHTML = '<h3>You have successfully booked your trip</h3>';
 },

 displayTripError() {
   querySelectorNodes.confirmationMsg.innerHTML = '<h3>Please select a valid destination and date</h3>';
 },

 displayPastTrips(traveler, destinations) {
   let previousTrips = traveler.getPastTrips(traveler.trips)
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
 }

}

export default domUpdates;
