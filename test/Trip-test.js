import { expect } from 'chai';
import Traveler from '../src/traveler';
import Trip from '../src/trip'

describe('Trip', function() {
  let tripInfo;
  let trip;
  let destinationInfo;

  beforeEach(function() {
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
    ];
    trip = new Trip(tripInfo[1], destinationInfo)
    destinationInfo = [
      {
      "id": 25,
      "destination": "Paris, France",
      "estimatedLodgingCostPerDay": 50,
      "estimatedFlightCostPerPerson": 500,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
      }
    ];
  });

  describe('Properties and functionality', function() {
    it('should be a function', function() {
      expect(Trip).to.be.a('function')
    });

    it('should be an instance of a trip', function() {
    expect(trip).to.be.an.instanceof(Trip);
    });

    it('should have an id', function() {
    expect(trip.id).to.equal(2);
    });

    it(`should have a user's id`, function() {
      expect(trip.userID).to.equal(1)
    });

    it('should have a destination ID', function() {
      expect(trip.destinationID).to.equal(25)
    });

    it('should have a number of travelers', function() {
      expect(trip.travelers).to.equal(2)
    });

    it('should have a start date for the trip', function() {
      expect(trip.date).to.equal("2020/10/04")
    });

    it('should have a duration of the trip in days', function() {
      expect(trip.duration).to.equal(7)
    });

    it('should have a default trip status of pending', function() {
      expect(trip.status).to.equal('pending')
    });

    it('should start with no suggested activities', function() {
      expect(trip.suggestedActivities).to.eql([])
    });
  });

  describe('getTripCost', function() {
    it('should be able to calculate the cost of a trip request', function() {
      expect(trip.getTripCost()).to.equal(1485)
    });
  });
});
