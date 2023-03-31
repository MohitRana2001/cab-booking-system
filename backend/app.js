const express = require("express")
const app = express();
const connectDB = require("./connect");

app.get("/", (req,res) => {
    res.send("Hello world")
})

try {
    async function start() {
      const { Models } = await connectDB();
      app.listen(3000, console.log("server listening on port:3000"));
    }
    start();
  } catch (error) {
        console.error("Sorry! Cannot start the server!", error);
  }
  