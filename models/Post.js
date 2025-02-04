const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
    createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
    title: String,
    tags: [String],
    content: String,
    comments: [commentSchema],
    updatedAt: { type: Date, default: Date.now },
});

postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Post', postSchema);
