const assert = require('assert');
const User = require('../src/user');


//set and save. Set will set something in memory but not persist it. It will only persist after save() is used.
// Usefull if you want to make several adjustments to an oblect/document before you want ot save it.
// update is used when you just want to do one update/make one change before saving a document

//model instance updates

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', likes: 0 });
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                 assert(users.length === 1);
                 assert(users[0].name === 'Alex');
                done();
        });
    }

    it('instance type using set and save', (done) => {
        joe.set('name', 'Alex');
       assertName(joe.save(), done);
    });


    it('A model instance can update', (done) => {
       assertName(joe.update({ name: 'Alex' }), done)
    });

//class type updates

    it('A model class can update', (done) => {
        assertName(
            User.update({ name: 'Joe'}, { name: 'Alex'}),
        done
        );
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'}),
        done
        );
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate( joe._id, { name: 'Alex' }),
            done
        );
    });

    it('A User can have their likes incremented by one', (done) => {
        User.update({ name: 'Joe' }, { $inc: {likes: 10 } })
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
            assert(user.likes === 10);
            done();
        });
    });

});