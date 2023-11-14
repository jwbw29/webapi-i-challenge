// implement your API here
// in nodejs, we don't import -- we use require

const express = require("express"); // importing a CommonJS module
const data = require("./data/db.js"); // importing a CommonJS module
console.log("data = ", data);

const server = express(); //gives us an instance of a server powered by Express
server.use(express.json()); //teaches express how to parse JSON from the body

let id = 0;
let getId = () => ++id; // helper function to create auto-incrementing id

server.get("/", (req, res) => {
  res.send("Hello World!");
});

// get all existing hobbits
server.get("/hobbits", (req, res) => {
  data
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });

  //   res.status(200).json(hobbits); // could write .send(hobbits) but .json is more explicit to future devs
});

// get specific hobbit
server.get("/hobbits/:id", (req, res) => {
  const { id } = req.params;
  data
    .findById(id)
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: "The user with the specified ID does not exist.",
          });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// post new hobbit
server.post("/hobbits", (req, res) => {
  hobbits.push({ id: getId(), name: req.body.name });
  res.status(201).json(hobbits); // 201 means "Created"
});

// update hobbit
server.put("/hobbits/:id", (req, res) => {
  hobbits = hobbits.map((hob) =>
    hob.id == req.params.id ? { ...hob, name: req.body.name } : hob
  );
  res.status(200).json(hobbits);
});

// delete hobbit
server.delete("/hobbits/:id", (req, res) => {
  hobbits = hobbits.filter((hob) => hob.id != req.params.id);
  res.status(200).json(hobbits);
});

server.listen(8000, () => console.log(`API running on ${8000}`));
