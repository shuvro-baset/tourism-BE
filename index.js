const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

// use cors into my app 
app.use(cors());
// receive json data from frontend
app.use(express.json());

// database connection url
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oh18i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("travencyDb");
      const toursCollection = database.collection("tours");
      const bookingToursCollection = database.collection("bookingTours")
        
      // GET API
      app.get('/home', async (req, res) => {
        const cursor = toursCollection.find({});
        const tours = await cursor.toArray();
        res.send(tours);
        
      });
      // POST API
      app.post('/add-tours', async (req, res) => {
        const tours = req.body;
        console.log('hit the post api', tours);

        const result = await toursCollection.insertOne(tours);
        console.log(result);
        res.json(result)
    });
    // get tour for booking 
      app.get('/tour-book/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const tour = await toursCollection.findOne(query);
        console.log('load tour with id: ', id, tour);
        res.send(tour);
      })
    // post for booking tour
    app.post('/tour-book/:id', async (req, res) => {
      const tourBookingData = req.body;
      const tourBooking = await bookingToursCollection.insertOne(tourBookingData);
      console.log('load tour with id: ', id, tour);
      res.json(tourBooking);
    })
    // get my tours
    app.get('/my-tours', async (req, res) => {
      const cursor = bookingToursCollection.find({})
      const tours = await cursor.toArray();
      res.send(tours)

    })
    // get my tours
    app.get('/manage-all-tours', async (req, res) => {
      const cursor = bookingToursCollection.find({})
      const tours = await cursor.toArray();
      res.send(tours)
    })
     
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);






app.get('/', (req, res) => {
    res.send("welcome to travency  ..... ")
})



// listen on port 5000
app.listen(port, ()=>{
    console.log("listening on port", port);
})