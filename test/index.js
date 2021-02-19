//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Pet = require('../petModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);


describe('Pets', () => {
    beforeEach((done) => { //Before each test we empty the database
        Pet.remove({}, (err) => {
           done();
        });
    });
});    


//TEST the POST route
describe('/POST pets', () => {
  
  it('it should not POST a pet without names field',  (done) => {
      let pet = {
          category: "Dog",
          tags: ["puppy", "brown"],
          status: "sold"
      }
    chai.request(server)
        .post('/api/pets')
        .send(pet)
        .end((err, res) => {
              res.should.have.status(405);
              res.body.err.should.have.property('name')
          done();
        });
  });
  it('it should POST a pet ', (done) => {
        let pet = {
          name : "Rex",
          category: "Dog",
          tags: ["puppy", "brown"]
        
      }
    chai.request(server)
        .post('/api/pets')
        .send(pet)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('message').eql('Successful operation');
            res.body.should.be.a('object');
            res.body.pet.should.have.property('name').eql('Rex');
        done();
        });
  });
});



/*
  * Test the /GET route
  */
describe('/GET pets', () => {
  it('it should GET all the pets', (done) => {
    chai.request(server)
        .get('/api/pets')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('message').eql("OK");
          done();
        });
  });
});    


