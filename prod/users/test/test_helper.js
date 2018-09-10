const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
        console.warn('warning', error);
    });
});


//the following is a hook, gets executed before any tests...
beforeEach((done) => {
    // this takes time to run, so need to tell mocha not to continue till done... uses done callback!
    mongoose.connection.collections.users.drop(() => {
        done();
    }); 
});