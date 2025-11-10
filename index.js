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

    app.get("/habits", async (req, res) => {
        const result = await habitCollection.find().toArray()
      res.send(result);
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
