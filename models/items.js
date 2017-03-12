var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment-timezone');

var ItemSchema = new Schema({

  // id is created automatically
  name: {

    type: String,

    required: [true, 'Fill up Name']
  },
  price: {

    type: String,

    required: [true, 'Fill up Address']

  },
  description: String,
  category: {
    type: String,
    required: [true, 'Please select a Category']},
  status: String,
  imageUrl: {

        type: String,

    },
  sellername: String,
  selleremail: String,
  sellercontact: String,
  user:{

        type: Schema.Types.ObjectId, ref: 'User',

        required: [true,"User id is undefined"]

    },
  // contact: String,
  // zomato: String,
  // photo: String,
  // photoslink: String,
  // createdate: {

  //   type: Date,
  // },
  // updatedate: String,

});

module.exports = mongoose.model('Item', ItemSchema);