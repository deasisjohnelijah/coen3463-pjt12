var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');




var User = new Schema({
	username:  {
		type: String,
		required: true,
		validate: {
          validator: function(z) {
            return /^([a-zA-z]{8,})$/.test(z);
          },
          message: 'Invalid Username! Must have at least 8 alpha characters, Must not have numbers and special characters'
        },
	},
	
	first_name:{
    type: String,
    default: 'Anonymous'
  },
	last_name:{
    type: String,
    default: 'Person'
  },
  school:{
    type: String,
    default: 'None specified'
  },
  contact:{
    type: String,
    default: 'None specified'
  },
  photo:{
    type: String,
    default: 'https://mbevivino.files.wordpress.com/2011/08/silhouette_orange.jpg'
  },
  facebook:{
    type: String,
    default: 'None specified'
  },
	email: {
		type: String,
		validate: {
          validator: function(v) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          },
          message: 'Sorry! The email you entered is invalid'
        },
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);