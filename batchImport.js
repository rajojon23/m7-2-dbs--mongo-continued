const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const seats = {};
const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
for (let r = 0; r < row.length; r++) {
  for (let s = 1; s < 13; s++) {
    seats[`${row[r]}-${s}`] = {
      _id: `${row[r]}-${s}`,  
      price: 225,
      isBooked: false,
    };
  }
}

const batchImport = async () => {

    // creates a new client
    const client = await MongoClient(MONGO_URI, options);
    const dbName = "exercise_1";

   // connect to the client
   await client.connect();
   
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);


    
    

    try {

       const result = await db.collection("seats").insertMany(Object.values(seats));//has to be an array to be accepted by mongo
       assert.strictEqual(96, result.insertedCount);

       console.log("seats inserted");
       

     } catch (err) {
       console.log("seats insert error");
       console.log(err.stack);
       
     }


   // close the connection to the database server
   client.close();
   console.log("disconnected!");


}

batchImport();