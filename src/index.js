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

let travelerData;
let tripData;
let destinationData;

//____query selectors________
let signInButton = document.querySelector(".sign-in-btn")
let estimateButton = document.querySelector(".trip-estimate-btn")
let submitTripButton = document.querySelector(".book-trip-btn")
let currentTravelerLocation = document.querySelector(".current-location")
let currentTravelerPendingTrips = document.querySelector(".pending-trips")
let yearlyAmountSpent = document.querySelector(".total-amount-spent-year")

//_________event listeners____________
signInButton.addEventListener('click')
estimateButton.addEventListener('click')
submitTripButton.addEventListener('click')

function getAllFetchData() {
  let travelerData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
  .then((response) => response.json())
  .then(error => console.log(error.message));

  let tripData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  .then((response) => response.json())
  .then(error => console.log(error.message));

  let destinationData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  .then((response) => response.json())
  .then(error => console.log(error.message));

  return Promise.all([travelerData, tripData, destinationData])
    .then(response => {
      let allData = {}
      allData.travelerData = response[0].travelers;
      allData.tripData = response[1].trips;
      allData.destinationData = response[2].destinations;
      return allData
    })
    .catch(error => console.log(error.message));
}

getAllFetchData().then(data => {
  travelerData = data.travelerData;
  tripData = data.tripData
  destinationData = data.destinationData
})
  .catch(error => console.log(error.message))
