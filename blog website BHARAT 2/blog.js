const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (Make sure MongoDB is running)
mongoose.connect('mongodb://localhost/blog-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema for the blog post
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

// Create a model based on the schema
const Post = mongoose.model('Post', postSchema);

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.error(err);
    } else {
      res.render('index', { posts: posts });
    }
  });
});

app.get('/newpost', (req, res) => {
  res.render('newpost');
});

app.post('/newpost', (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });

  newPost.save((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
