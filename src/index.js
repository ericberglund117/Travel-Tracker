// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import domUpdates from './domUpdates';
import moment from 'moment';
import Traveler from './traveler';
import Trip from './trip'
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let allTravelerTrips;
let tripData;
let allDestinations;
let traveler;
let userID;
let allData;
let selectedDestination;

//____query selectors________

let signInButton = document.querySelector(".sign-in-btn")
let signInUsernameInput = document.getElementById("sign-in-input-username")
let signInPasswordInput = document.getElementById("sign-in-input-password")
let signInView = document.querySelector(".sign-in-view").style.display = "none";
let bookedTripsCardsSection = document.querySelector(".trips-card-body")
let travelerPastTrips = document.querySelector(".past-trips")
let travelerSection = document.querySelector(".left-section").style.display = 'block';
let estimateButton = document.querySelector(".trip-estimate-btn")
let submitTripButton = document.querySelector(".book-trip-btn")
let currentTravelerLocation = document.querySelector(".current-location")
let currentTravelerPendingTrips = document.querySelector(".pending-trips")
let yearlyAmountSpent = document.getElementById("total-amount-spent-year")
let numberOfTravelersInput = document.querySelector("#number-travelers-input")
let tripDepartureDate = document.getElementById("#trip-date")
let destinationsCards = document.querySelector(".sub-card-body")
let departureDate = document.getElementById("trip-date")
let confirmationMsg = document.querySelector(".confirmation-message")
let loginButton = document.querySelector(".log-in-button")

let querySelectorNodes = {
  signInButton,
  signInView,
  bookedTripsCardsSection,
  travelerSection,
  estimateButton,
  submitTripButton,
  currentTravelerLocation,
  currentTravelerPendingTrips,
  destinationsCards,
  yearlyAmountSpent,
  numberOfTravelersInput,
  departureDate,
  tripDepartureDate,
  travelerPastTrips,
  confirmationMsg
}

//_________event listeners____________
// signInButton.addEventListener('click')
// estimateButton.addEventListener('click')
// submitTripButton.addEventListener('click')
// estimateButton.addEventListener('click')
window.addEventListener('load', (event) => {
  let traveler1 = {
    "id": 3,
    "name": "Sibby Dawidowitsch",
    "travelerType": "shopper"
  }
  traveler = new Traveler(traveler1)
  getSingleTraveler(traveler)
})

window.addEventListener('load', checkData)
window.addEventListener('click', selectDestination)
submitTripButton.addEventListener('click', makeTripRequest)
signInButton.addEventListener('click', signIn)

function getTravelerDestinationData(traveler) {
  return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  .then((response) => response.json())
  .then(data => allDestinations = data.destinations)
  .then(getTravelerTrips(traveler))
  .catch(error => console.log(error));
}

function getSingleTraveler(traveler) {
  return fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${traveler.id}`)
  .then((response) => response.json())
  .then(data => traveler = new Traveler(data))
  .then(getTravelerTrips(traveler))
  .catch(error => console.log(error));
}

function getTravelerTrips(traveler) {
  let allTravelerTrips;
  return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  .then((response) => response.json())
  .then(data => allTravelerTrips = data)
  .then(() => {
    let travelerTrips = allTravelerTrips.trips.filter(trip => {
      return trip.userID === traveler.id;
    })
    traveler.allDestinations = allDestinations;
    traveler.trips = travelerTrips;
    useFetchData(traveler)
  })
  .catch(error => console.log(error));
}

function checkData() {
  Promise.all([getSingleTraveler(traveler), getTravelerTrips(traveler), getTravelerDestinationData(traveler)])
  .then(data => console.log(allData))
  .catch(error => console.log(error));
}

function travelerRequestedTripPost(traveler, userID, numberOfTravelersInput, selectedDestination ) {
  return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
    .then(response => response.json())
    .then(data => {
      let allTrips = data;
    })
    .then(() => {
      let tripRequest = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
        },
      body: JSON.stringify({
        id:(allTrips.trips.length + 1),
        userID: userID,
        destinationID: selectedDestination,
        travelers: parseInt(numberOfTravelersInput.value),
        date: moment(tripDepartureDate, 'YYYY/MM/DD'),
        status: 'pending',
        suggestedActivities: []
        })
      };
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', tripRequest)
        .then(response => response.json())
        .then(() => {
          getTravelerDestinationData(traveler)
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
}

function useFetchData(traveler) {
  domUpdates.welcomeTraveler(traveler)
  domUpdates.displayTravelerTrips(traveler, traveler.allDestinations);
  domUpdates.displayAmountSpent(traveler, traveler.trips, traveler.allDestinations);
  domUpdates.displayDestinationCards(traveler);
  domUpdates.displayPastTrips(traveler, traveler.allDestinations);
}

function selectDestination(event) {
  if (event.target.classList.contains('destination-image')) {
    selectedDestination = parseInt(event.target.id)
  }
}

function makeTripRequest() {
  if(moment(departureDate.value, 'YYYY/MM/DD', true).isValid() && selectedDestination) {
    travelerRequestedTripPost(traveler, userID, numberOfTravelersInput, selectedDestination);
    domUpdates.displayTripConfirmation()
  } else {
    domUpdates.displayTripError()
  }
}

function signIn(username, password) {
  domUpdates.toggleViews()

 }

function submitLogin() {
  if (signIn(signInUsernameInput.value, signInPasswordInput.value)) {
    getTravelerDestinationData(traveler, userID);
    domUpdates.toggleMainView();
  }
}


export default querySelectorNodes;
