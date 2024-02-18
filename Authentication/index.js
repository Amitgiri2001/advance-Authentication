const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());


///mongoDB Connection
// const uri1 = "mongodb://127.0.0.1:27017/test2";
// mongoose.connect(uri1).then(
//     () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
//         console.log("connected successfully")
//     },
//     err => { /** handle initial connection error */
//         console.log(err)
//     }
// );


// cluster connection

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://giriamit987:Amit2001@cluster0.0xttwlc.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);


mongoose.connect(uri).then(connect => { console.log(`connected successfully ${connect}`) }).
    catch(error => console.log(`error connecting${error}`));



// schema design

const schema = new mongoose.Schema({ userName: String, password: String });
const User = mongoose.model('User', schema);


async function newUser() {
    const user1 = new User({ userName: "Amit1", password: "Amit1" });
    await user1.save();
}

// newUser();

async function findUser() {
    const user = await User.findOne({ userName: "Amit1" });
    console.log(user);
}

findUser();

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});


app.post("/", (req, res) => {
    const userName = req.body.userName;
    res.send(`<h1>Hello ${userName}</h1>`);
})

app.listen(3000, () => {
    console.log("the server is started in port 3000");
});