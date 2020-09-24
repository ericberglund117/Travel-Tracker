import { expect } from 'chai';
import Traveler from "../src/Traveler";

describe('Travler', function() {
  let travelerInfo;
  let traveler1;
  let traveler2;
  let tripInfo;
  let destinationInfo;
  let today;

  beforeEach(function() {
    today = '2020-09-23'
    travelerInfo = [
      {
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer"
      },
      {
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker"
      }
    ];
    tripInfo = [
      {
      "id": 1,
      "userID": 1,
      "destinationID": 49,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 2,
      "userID": 1,
      "destinationID": 25,
      "travelers": 2,
      "date": "2020/10/04",
      "duration": 7,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 3,
      "userID": 1,
      "destinationID": 12,
      "travelers": 3,
      "date": "2020/12/04",
      "duration": 10,
      "status": "pending",
      "suggestedActivities": []
      }
    ];
    traveler1 = new Traveler(travelerInfo[0]);
    destinationInfo = [
      {
      "id": 49,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
      },
      {
      "id": 25,
      "destination": "Paris, France",
      "estimatedLodgingCostPerDay": 50,
      "estimatedFlightCostPerPerson": 500,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
      },
      {
      "id": 12,
      "destination": "Rekyvik, Iceland",
      "estimatedLodgingCostPerDay": 80,
      "estimatedFlightCostPerPerson": 600,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
      }
    ];
  });

  describe('Properties and functionality', function() {
    it('should be a function', function() {
      expect(Traveler).to.be.a('function');
    });

    it('should initialize a traveler with an id', function() {
      expect(traveler1.id).to.equal(1)
    });

    it('should initialize a traveler with a name', function() {
      expect(traveler1.name).to.equal('Ham Leadbeater')
    });

    it('should initialize a traveler with a traveler type', function() {
      expect(traveler1.travelerType).to.equal('relaxer')
    });

    it('should initialize a traveler with an empty array for pending trips', function() {
      expect(traveler1.pendingTrips).to.deep.equal([])
    });

    it('should initialize a traveler with an empty array for past trips', function() {
      expect(traveler1.pastTrips).to.deep.equal([])
    });

    it('should initialize a traveler with an empty array for future trips', function() {
      expect(traveler1.futureTrips).to.deep.equal([])
    });

    describe('getPendingTrips', function() {
      it(`should be able to get a traveler's pending trips`, function() {
        traveler1.getPendingTrips(tripInfo)
        expect(traveler1.pendingTrips).to.deep.equal([tripInfo[2]])
      })
    })

    describe('getFutureTrips', function() {
      it(`should be able to get a traveler's future trips`, function() {
        traveler1.getFutureTrips(tripInfo, today)
        expect(traveler1.futureTrips).to.deep.equal([tripInfo[1], tripInfo[2]])
      })
    })

    describe('getPastTrips', function() {
      it(`should be able to get a traveler's past trips`, function() {
        traveler1.getPastTrips(tripInfo, today)
        expect(traveler1.pastTrips).to.deep.equal([tripInfo[0]])
      })
    })

    describe('getAmountSpent', function() {
      it('should be able to calculate how much a traveler has spent on trips over a year', function() {
        traveler1.getAmountSpent(tripInfo, destinationInfo)
        expect(traveler1.getAmountSpent(tripInfo, destinationInfo)).to.equal(5401)
      })
    })
  })
})
