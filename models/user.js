var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Item = require('./items');



var userSchema = new Schema({
	username:  {
		type: String,
		// required: true,
		// validate: {
  //         validator: function(z) {
  //           return /^([a-zA-z]{8,})$/.test(z);
  //         },
  //         message: 'Invalid Username! Must have at least 8 alpha characters, Must not have numbers and special characters'
  //       },
	},
	
	name:{
    type: String,
  },
  school:{
    type: String,
    default: 'None specified'
  },
  contact:{
    type: String,
    required: true,
  },
  photo:{
    type: String,
    default: 'https://mbevivino.files.wordpress.com/2011/08/silhouette_orange.jpg'
  },
  fb: String,
  facebook: {
    id: String,
    token: String,
    },

	email: {
		type: String,
  		validate: {
            validator: function(v) {
              return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: 'Sorry! The email you entered is invalid'
          },
  
},
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);