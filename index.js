// implement your API here
// in nodejs, we don't import -- we use require

const express = require("express"); // importing a CommonJS module

const server = express(); //gives us an instance of a server powered by Express

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(8000, () => console.log(`API running on ${8000}`));
