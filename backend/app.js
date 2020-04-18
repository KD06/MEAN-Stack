const express = require("express");
const bodyParser = require("body-parser");
const Post = require('./model/post');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// V4z7nsSChQegE6rD
mongoose.connect("mongodb+srv://DILLIK:V4z7nsSChQegE6rD@cluster0-ypl1y.mongodb.net/node-angular?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true}).
then(
  response => { console.log("Connected to database");
}).catch(error=>{
  console.log("Connection failed!", error)
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost =>{
    res.status(201).json({
      message: 'Post added successfully',
      postId : createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(
  response => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: response
    });
  }  
  ).catch(error=> console.log(error));
});

app.delete("/api/posts/:id", (req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then(
    response => {
      console.log(response);
      res.status(200).json({message: "Post deleted!"})
    }
  ).
  catch(error => console.log("error while deleting a post", error));
})

module.exports = app; 