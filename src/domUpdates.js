const domUpdates {

  renderAmountSpent: (traveler, tripData, destinationData) => {
   let amountSpent = traveler.getAmountSpent(tripData, destinationData);
   yearlyAmountSpent.innerHtml(`<h2>You spent $${amountSpent} on traveling this year!</h2>`);
 },
}

export default domUpdates;
