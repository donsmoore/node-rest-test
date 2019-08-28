
let ObjectId = require('mongodb').ObjectId;
let Card = require('../model/model');

function getAllCards(request, response) {
    console.log('getAllCards:');
    let query = Card.find({});
    query.exec((error, results) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).send(results);
        }
    });
}

function getOneCard(request, response) {
    console.log('getOneCard: ' + request.params.id );
    let query = Card.find({"_id":ObjectId(request.params.id)});
    query.exec((error, results) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).send(results);
        }
    });
}

function addOneCard(request, response) {
    console.log('addOneCard: ' + JSON.stringify(request.body));
    let newCard = new Card(request.body);
    newCard.save((error, results) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).send(results);
        }
    });
}

exports.getAllCards = getAllCards;
exports.getOneCard = getOneCard;
exports.addOneCard = addOneCard;

