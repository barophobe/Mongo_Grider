const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

// Fat arrow function is not used because the this keyword. If a fat arrow was used this would not refer to the instance ,
// but instead would refer to the file!
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});
// all middleware will use the next variable. For asyncronous code. quite like the done command in mocha
UserSchema.pre('remove', function(next) {
    // this === joe
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({ _id: { $in: this.blogPosts } })
        .then(() => next());

});


const User = mongoose.model('user', UserSchema);

module.exports = User;