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

  })
})
