// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import domUpdates from './domUpdates';
import moment from 'moment';
import Traveler from './traveler';
import Trip from './trip'
import fetcher from "./fetch"
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
let travelerPendingTrips = document.querySelector(".pending-trips")
let travelerSection = document.querySelector(".left-section").style.display = 'block';
let tripEstimation = document.querySelector(".trip-estimate")
let submitTripButton = document.querySelector(".book-trip-btn")
let currentTravelerLocation = document.querySelector(".current-location")
let currentTravelerPendingTrips = document.querySelector(".pending-trips")
let yearlyAmountSpent = document.getElementById("total-amount-spent-year")
let numberOfTravelersInput = document.getElementById("number-travelers-input")
let numberOfDaysInput = document.getElementById("number-days-input")
let tripDepartureDate = document.getElementById("trip-date")
let destinationsCards = document.querySelector(".sub-card-body")
let confirmationMsg = document.querySelector(".confirmation-message")
let loginButton = document.querySelector(".log-in-button")

let querySelectorNodes = {
  signInButton,
  signInView,
  bookedTripsCardsSection,
  travelerSection,
  submitTripButton,
  currentTravelerLocation,
  currentTravelerPendingTrips,
  destinationsCards,
  yearlyAmountSpent,
  numberOfTravelersInput,
  tripDepartureDate,
  travelerPastTrips,
  confirmationMsg,
  tripEstimation,
  numberOfDaysInput,
  travelerPendingTrips
}

//_________event listeners____________
// signInButton.addEventListener('click')
// estimateButton.addEventListener('click')
// submitTripButton.addEventListener('click')
// estimateButton.addEventListener('click')
window.addEventListener('load', (event) => {
  fetcher.getTravelerData(3)
})

window.addEventListener('load', fetcher.checkData)
window.addEventListener('click', selectDestination)
submitTripButton.addEventListener('click', makeTripRequest)
signInButton.addEventListener('click', signIn)

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
