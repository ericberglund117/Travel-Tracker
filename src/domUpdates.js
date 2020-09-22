import querySelectorNodes from "./index";

let domUpdates = {

  toggleViews() {
    signInView.classList.toggle('hidden');
    travelerSection.classList.toggle('hidden');
  },

  welcomeTraveler(traveler) {
    let firstName = currentTraveler.name.split(" ")[0];
    let welcomeMsg = `
      <div class="welcome-msg">
        <h1>Welcome ${firstName}!</h1>
      </div>`;
    document.querySelector(".travel-tracker-header").insertAdjacentHTML("afterbegin",
    welcomeMsg)
  },

  displayTravelerTrips(traveler, destinations) {
    querySelectorNodes.bookedTripsCardsSection.innerHTML = '';
    traveler.trips.forEach(trip => {
      querySelectorNodes.bookedTripsCardsSection.insertAdjacentHTML(`beforeend`,
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
   let amountSpent = traveler.getAmountSpent(tripData, destinationData);
   yearlyAmountSpent.innerHtml(`<h2>You spent $${amountSpent} on traveling this year!</h2>`);
 },

 displayDestinationCards(travler) {
   traveler.allDestinations.forEach(destination => {
     destinationsCards.insertAdjacentHTML('beforeend',
      `<article class="sub-sub-card" id="desinations-sub-card">
            <h3>${destination.destination}</h3>
            <input type="image" class="destination-image" id="${destination.id}" src="${destination.image}" alt="${destination.alt}"/>
          </article>`
        )
   })
 }

}

export default domUpdates;
