const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    subTitle: String,
    content: String,
    image: String,
    isOriginal: Boolean,
    publishTime: Date,
    see: Number,
    like: Number,
    category: String,
    tags: [String],
    comments: [Schema.Types.Mixed]
},{
    collection: 'Blog'
});

const Blog = mongoose.model('Blog', blogSchema);


const publishBlog = (blog) => {
    return Blog.create(blog);
}

module.exports = {
    publishBlog
};