const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
//importing routes
const productRoutes = require("./routes/product");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
//using body parser gor json data
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
//using the routes
app.use(productRoutes);

//Connecting application with database
const dbName = "shop";
MongoClient.connect(
  `mongodb+srv://rameshnagella272:cUqlLG32rL5rsXXt@cluster0.nwhcfn3.mongodb.net/${dbName}?retryWrites=true&w=majority`
)
  .then((client) => {
    console.log(`Connected!`);
    client.connect();
    //connecting to 3000 port
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
