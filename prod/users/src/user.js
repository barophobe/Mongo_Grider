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
    likes: Number
});

// Fat arrow function is not used because the this keyword. If a fat arrow was used this would not refer to the instance ,
// but instead would refer to the file!
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});


const User = mongoose.model('user', UserSchema);

module.exports = User;