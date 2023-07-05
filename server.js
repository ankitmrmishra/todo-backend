const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://todo-19kmg0ygs-ankitmrmishra.vercel.app/", // Allow requests from this origin
    methods: "GET,POST,DELETE", // Allow specific HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:index', (req, res) => {
  const todo = todos.find(t => t.index === parseInt(req.params.index));
  if (!todo) {
    res.status(404).send();
  } else {
    res.json(todo);
  }
});

app.post('/todos', (req, res) => {
  const newTodo = {
    index: Math.floor(Math.random() * 1000000), // unique random index
    title: req.body.title,
    
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});



app.delete('/todos/:index', (req, res) => {
  const todoIndex = todos.findIndex(t => t.index === parseInt(req.params.index));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos.splice(todoIndex, 1);
    res.status(200).send();
  }
});

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});
app.listen(3000 , () =>{
  console.log("listenih");
})
module.exports = app;
