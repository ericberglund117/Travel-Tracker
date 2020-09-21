import { expect } from 'chai';
import Traveler from '../src/traveler';
import Trip from '../src/trip'

describe('Trip', function() {
  let tripInfo;
  let trip;

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
    trip = new Trip(tripInfo[1])
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
  })
})
