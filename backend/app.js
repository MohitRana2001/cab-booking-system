const express = require("express")
const app = express();
const connectDB = require("./connect");
require('dotenv').config();
const userController = require("./controllers/userController");
const cabController = require("./controllers/cabController");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send("Hello world")
})

try {
    async function start() {
      const { Models } = await connectDB();
      app.listen(3000, console.log("server listening on port:3000"));
      userController(app, Models);
      cabController(app, Models);
    }
    start();
  } catch (error) {
        console.error("Sorry! Cannot start the server!", error);
  }
  