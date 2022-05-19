const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

// Username: admin1

// pass: tkp1P9rdXcIoduDA

// const collection = client.db("TODOAPP").collection("task");

//Mongo
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin1:tkp1P9rdXcIoduDA@todo.ruzbe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const collection = client.db("TODOITEMS").collection("List");
        app.get('/list', async(req,res) =>{
            const query = {};
            const cursor = collection.find(query);
            const list = await cursor.toArray();
            res.send(list);
        })

        //post product
        app.post('/list',async (req,res)=>{
            const newProduct = req.body;
            console.log('adding new user', newProduct);
            const list = await collection.insertOne(newProduct);
            res.send({list});
        })

        // delet product

        app.delete('/list/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const list = await collection.deleteOne(query);
            res.send(list);
        })

    } finally {
      
    }
  }
  run().catch(console.dir);


/********************************************************/
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})