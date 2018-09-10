const assert = require('assert');
const User = require('../src/user');


// 4 ways to delete something. there is a remove method on the model instance and also the model class. Also a class
// method to remove by property and by id
describe('Deleting a user', () => {
    let joe;


    beforeEach((done) => {
       joe = new User({ name: 'Joe' });
       joe.save()
           .then(() => done());
    });

    it('model instance remove', (done) => {
        joe.remove()
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
        assert(user === null);
        done();
        });
    });

    it('class method remove', (done) => {
        //Remove a bunch of records with some given criteria
        User.remove({ name: 'Joe' })
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
            assert(user === null);
            done();
        });
    });

   it('class method findOneAndRemove', (done) => {
       //
       User.findOneAndRemove({ name: 'Joe' })
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
             assert(user === null);
             done();
        });
    });

   it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
        .then(() => User.findOne({ name: 'Joe'}))
        .then((user) => {
            assert(user === null);
            done();
        });
    });
});