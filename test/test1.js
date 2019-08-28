//process.env.NODE_ENV = 'test';

let Card = require('../model/model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
chai.use(chaiHttp);
describe('Cards', () => {
    describe('/GET card', () => {
        it('it should GET 0 cards at beginning of unit test.', (done) => {
            chai.request(app)
                .get('/card')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);  // zero because it should be empty because of the deleteOne() above  -- NOT REALLY NECESSARY
                    done();
                });
        });
    });
    after((done) => {
        Card.deleteOne({}, (err) => {
            done();
        });
    });
    describe('/POST card incorrect ', () => {
        it('it should not POST a card without name field', (done) => {
            let card = {
                width: "200px",
                height:"300px"
            };
            chai.request(app)
                .post('/card')
                .send(card)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    // dsm: 'name' here is also in line after it.
                    res.body.errors.should.have.property('name');
                    res.body.errors.name.should.have.property('kind').eql('required');
                    done();
                });
        });
    });
    describe('/POST card correct ', () => {
        it('it should POST a card with a name field', (done) => {
            let card = {
                name: "Test Card 234",
                width: "200px",
                height:"300px"
            };
            chai.request(app)
                .post('/card')
                .send(card)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.not.have.property('errors');
                    // dsm: '_id' here is also in line after it.
                    res.body.should.have.property('_id');
                    res.body._id.should.be.a('string');
                    done();
                });
        });
    });
});

