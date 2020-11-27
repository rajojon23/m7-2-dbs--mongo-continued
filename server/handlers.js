'use strict';
const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getSeats = async () => {
    console.log("getSeats called");

    // creates a new client
    const client = await MongoClient(MONGO_URI, options);
    const dbName = "exercise_1";

   // connect to the client
   await client.connect();
   
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);



    try {

        // const seats = await db.collection("seats").find().limit(5).toArray();
        const seats = await db.collection("seats").find().toArray();
       
        let formattedSeats ={};//the only format that will be accepted by the FE

        for (let index = 0; index < seats.length; index++) {
          let seat = seats[index];
          formattedSeats[seat._id] = {
            price : seat.price, 
            isBooked : seat.isBooked
          };
          
        }


 
        console.log("seats requested");
        // console.log(testSeats);  
        client.close();


        return formattedSeats;
 
      } catch (err) {
        console.log("seats request error");
        console.log(err.stack);
        
      }

      
};

const bookSeat = async (seatID) => {

  const client = await MongoClient(MONGO_URI, options);
  const dbName = "exercise_1";

 await client.connect();

  const db = client.db(dbName);


  try {
      const result = await db.collection("seats").updateOne({_id : seatID}, {$set: { isBooked :  true} });

      console.log("seat booking requested");
      console.log(result.modifiedCount);

      client.close();

      return ;

    } catch (err) {
      console.log("seats booking request error");
      console.log(err.stack);
      
    }

    
};

const addBooker = async ({fullName, email, seatID}) => {

  const client = await MongoClient(MONGO_URI, options);
  const dbName = "exercise_1";

 await client.connect();

  const db = client.db(dbName);


  try {
      const result = await db.collection("bookers").insertOne({
                                                                _id : seatID ,
                                                                fullName : fullName,
                                                                email: email
                                                              });

      console.log("user adding requested");
      // console.log(result);

      client.close();

      return ;

    } catch (err) {
      console.log("user adding  request error");
      console.log(err.stack);
      
    }

    
};

module.exports = { getSeats , bookSeat, addBooker};
