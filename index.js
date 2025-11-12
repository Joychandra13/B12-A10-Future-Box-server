const express = require('express')
const cors = require ('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://habitTracker:TYPtb8kCwcvsIjMa@cluster0.3v9uvsg.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const db = client.db("habitTracker")
    const habitCollection = db.collection("habits");

    // All
    app.get("/habits", async (req, res) => {
        const result = await habitCollection.find().toArray()
      res.send(result);
    });

    // latest
    app.get("/latest-habits", async (req, res) => {
      const result = await habitCollection
        .find()
        .sort({ createdAt: -1 })
        .limit(6)
        .toArray();

      console.log(result);

      res.send(result);
    });


    // post
    app.post("/habits",   async (req, res) => {
      const data = req.body;
      const result = await habitCollection.insertOne(data);
      res.send({
        success: true,
        result,
      });
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Server is running fine!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
