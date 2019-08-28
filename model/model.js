
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CardSchema = new Schema({
    name: {type: String, required: true},
    height: {type: String},
    width: {type: String}
    },{
        versionKey: false
    }
);

module.exports = mongoose.model('card', CardSchema);
