// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// const uri = `mongodb+srv://cisc327-group13:hRVhQCdnIfee8EUg@taskmanagercluster.rwpdhbh.mongodb.net/?retryWrites=true&w=majority`;

// async function connect() {
//   try {
//     await mongoose.connect(uri);
//     console.log('connected to MongoDB');
//   } catch (e) {
//     console.log(e);
//   }
// }

// connect();

// app.listen(8000, () => {
//   console.log('server started on port 8000');
// });

const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
