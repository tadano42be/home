const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://tadano42be:<qlqjs0980Qq>@vr-ssul.81vku.mongodb.net/?retryWrites=true&w=majority&appName=vr-ssul', { useNewUrlParser: true, useUnifiedTopology: true });

// Add this route to handle adding comments
app.post('/posts/:id/comments', async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.comments.push({ content: req.body.content });
    await post.save();
    res.send(post);
});

// Update the /posts route to sort by updatedAt
app.get('/posts', async (req, res) => {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.send(posts);
});


app.put('/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(post);
});

app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.send({ message: 'Post deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
