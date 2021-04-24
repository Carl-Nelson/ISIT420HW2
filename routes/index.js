var express = require('express');
var router = express.Router();

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const Orders = require("../Orders");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection
const dbURI =
"mongodb+srv://bcUser:bcUser@cluster0.cy7eo.mongodb.net/OrdersDB?retryWrites=true&w=majority";

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);


/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});


/* post a new Order and don't push to Mongo */
router.post('/Orders', function(req, res) {

    //don't need to post to mongo for this one
    //let oneNewOrder = new Orders(req.body);  // call constuctor in Trails code that makes a new mongo Trail object
    //console.log(oneNewOrder);

    console.log(req.body);
});


router.post('/NewOrder', function(req, res) {

  let oneNewOrder = new Orders(req.body);  // call constuctor in Orders code that makes a new mongo Order object
  console.log(oneNewOrder);
  oneNewOrder.save((err, order) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
    console.log(order);
    res.status(201).json(order);
    }
  });
});


module.exports = router;
