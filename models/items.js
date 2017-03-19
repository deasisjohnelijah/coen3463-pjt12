var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment-timezone');
var User = require('./user');
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
  imageUrl1: {

        type: String,
        default: 'http://fileserver.buh.edu.vn/2016/12/no_image-14_18_42_477.png'

    },
  imageUrl2: {

        type: String,
        default: 'http://fileserver.buh.edu.vn/2016/12/no_image-14_18_42_477.png'

    },
  imageUrl3: {

        type: String,
        default: 'http://fileserver.buh.edu.vn/2016/12/no_image-14_18_42_477.png'

    },
  sellername: {
    type: String,
    default: 'Anonymous'
  },
  selleremail: {
    type: String,
    default: 'None specified'
  },
  sellercontact: {
    type: String,
    default: 'Anonymous'
  },

  sellerfirst_name:{
    type: String,
    default: 'Anonymous'
  },
  sellerlast_name:{
    type: String,
    default: 'Anonymous'
  },
  sellerschool:{
    type: String,
    default: 'Anonymous'
  },
  sellerphoto:{
    type: String,
    default: 'https://mbevivino.files.wordpress.com/2011/08/silhouette_orange.jpg'
  },
  sellerfacebook:{
    type: String,
    default: 'www.facebook.com'
  }, 
  createdate: {

    type: Date,
  },
  updatedate: String,
   // seller:{

  //       type: Schema.Types.ObjectId, ref: 'User',

  //       required: [true,"User id is undefined"]

  //   },


});

// ItemSchema.post('remove', (todo)=>{  //everytime a remove is called

//     User.findById(item.user, function (err, user) {  //grab the to then query the user

//         user.items.pull(todo); //pull the todo from the todos of the user

//         user.save(); //then save

//     });
// });

module.exports = mongoose.model('Item', ItemSchema);