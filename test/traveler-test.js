import { expect } from 'chai';
import Traveler from "../src/Traveler";

describe('Travler', function() {
  let travelerInfo;
  let traveler1;
  let traveler2;
  let tripInfo;
  let trip;

  beforeEach(function() {
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
      "userID": 44,
      "destinationID": 49,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 2,
      "userID": 35,
      "destinationID": 25,
      "travelers": 5,
      "date": "2020/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
      }
    ];
    traveler1 = new Traveler(travelerInfo[0]);
    traveler2 = new Traveler(travelerInfo[1]);
    //trip = new Trip(tripInfo[0])
  });

  describe('Properties and functionality', function() {
    it('should be a function', function() {
      expect(Traveler).to.be.a('function');
    });

    it('should initialize a traveler with an id', function() {
      expect(traveler1.id).to.equal(1)
    })

    it('should initialize a traveler with a name', function() {
      expect(traveler1.name).to.equal('Ham Leadbeater')
    })

    it('should initialize a traveler with a traveler type', function() {
      expect(traveler1.travelerType).to.equal('relaxer')
    })
  })
})
