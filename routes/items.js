var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var Item= require('../models/items');
var uuid = require('uuid/v4');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, 'public/uploads/')
  },
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
})
var upload = multer({storage: storage});


router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Item.find( function(err, items, count) {
    res.render('items', {items: items, user: req.user});
  })
});

router.post('/', function(req, res){ 
  res.redirect('/items') 
}); 

router.post('/add', upload.any(), function(req, res) {
    new Item({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      upload: req.body.upload,
      imageUrl: req.body.imageUrl,
      // contact: req.body.contact,
      // zomato: req.body.zomato,
      // photo: req.body.photo,
      // photoslink: req.body.photoslink,
      // createdate: moment().tz("Asia/Manila").format('LLL'),
      
    }).save(function(err, item, count) {
      if(err) {
        res.render('add', {error: err});
      } else {
        res.redirect('/items');
      }
    })
});

router.get('/add', function(req, res) {
  res.render('add', {item: {}, user: req.user});
});



router.route('/:item_id')
  .all(function(req, res, next) {
    item_id = req.params.item_id;
    item = {};
    Item.findById(item_id, function(err, c) {
      item = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('item', {item: item, moment: moment, user: req.user});
  })

  // .post(function(req, res) {
  //   restaurant.notes.push({
  //     note: req.body.notes
  //   });

  //   restaurant.save(function(err, contact, count) {
  //     if(err) {
  //       res.status(400).send('Error adding note: ' + err);
  //     } else {
  //       res.send('Note added!');
  //     }
  //   });
  // })
router.route('/:item_id/edit')
  .all(function(req, res, next) {
    item_id = req.params.item_id;
    item = {};
    Item.findById(item_id, function(err, c) {
      item = c;
      next();
      
    });
  })

  .get(function(req, res) {
    res.render('edit', {edit: item, moment: moment, user: req.user});
  })
  .post(function(req, res) {

    item.name = req.body.name;
    item.price = req.body.price;
    item.description = req.body.description;
    item.category = req.body.category;
    item.status = req.body.status;
    item.imageUrl = req.body.imageUrl;
    // restaurant.contact = req.body.contact;
    // restaurant.zomato = req.body.zomato;
    // restaurant.photo = req.body.photo;
    // restaurant.photoslink = req.body.photoslink;
    // restaurant.updatedate = moment().tz("Asia/Manila").format('LLL'),

    item.save(function(err, item, count) {
      if(err) {
        res.status(400).send('Error saving item: ' + err);
      } else {
        res.redirect('/items/'+item_id)
      }
    });
  })

router.route('/:item_id/delete')
  .all(function(req, res, next) {
    item_id = req.params.item_id;
    item = {};
    Item.findById(item_id, function(err, c) {
      item = c;
      next();
    });
  })
  .get(function(req, res) {
    item.remove(function(err, item) {
      
      if(err) {
        res.status(400).send("Error removing item: " + err);
      } else {
        res.redirect('/items');
      }
    });
  });



module.exports = router;
