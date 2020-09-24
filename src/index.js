
import domUpdates from './domUpdates';
import moment from 'moment';
import Traveler from './traveler';
import Trip from './trip'
import fetcher from "./fetch"
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';


let traveler;
let selectedDestinationId;

let logInButton = document.querySelector(".log-in-button");
let signInUsernameInput = document.getElementById("sign-in-input-username");
let signInPasswordInput = document.getElementById("sign-in-input-password");
let signInView = document.querySelector(".sign-in-view");
let bookedTripsCardsSection = document.querySelector(".trips-card-body");
let travelerPastTrips = document.querySelector(".past-trips");
let travelerPendingTrips = document.querySelector(".pending-trips");
let travelerSection = document.querySelector(".left-section");
let tripEstimation = document.querySelector(".trip-estimate");
let submitTripButton = document.querySelector(".book-trip-btn");
let yearlyAmountSpent = document.getElementById("total-amount-spent-year");
let numberOfTravelersInput = document.getElementById("number-travelers-input");
let numberOfDaysInput = document.getElementById("number-days-input");
let tripDepartureDate = document.getElementById("trip-date");
let destinationsCards = document.querySelector(".sub-card-body");
let confirmationMsg = document.querySelector(".confirmation-message");
let loginButton = document.querySelector(".log-in-button");
let mainPage = document.querySelector(".main-page");

let querySelectorNodes = {
  submitTripButton,
  travelerSection,
  bookedTripsCardsSection,
  destinationsCards,
  yearlyAmountSpent,
  numberOfTravelersInput,
  tripDepartureDate,
  travelerPastTrips,
  confirmationMsg,
  tripEstimation,
  numberOfDaysInput,
  travelerPendingTrips,
  selectedDestinationId
};

window.addEventListener('click', selectDestination)
submitTripButton.addEventListener('click', makeTripRequest)
logInButton.addEventListener('click', submitLogin)

function selectDestination(event) {
  if (event.target.classList.contains('destination-image')) {
    selectedDestinationId = parseInt(event.target.id)
  };
};

function makeTripRequest() {
  console.log(tripDepartureDate.value)
  if(moment(tripDepartureDate.value, 'YYYY-MM-DD') && selectedDestinationId) {
    fetcher.travelerRequestedTripPost(selectedDestinationId);
  } else {
    domUpdates.displayTripError()
  };
};

function submitLogin() {
  if (signInUsernameInput.value.includes('traveler') && signInPasswordInput.value === 'travel2020') {
    let identifier = parseInt(signInUsernameInput.value.split('traveler')[1])
    signInView.classList.add('hidden')
    mainPage.classList.remove('hidden')
    fetcher.getTravelerData(identifier);
  };
};


export default querySelectorNodes;
