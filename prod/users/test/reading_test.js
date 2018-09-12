const assert = require('assert');
const User = require('../src/user');

describe('Reading users from the database', () => {
    let joe, alex, maria, zac;

    beforeEach((done) => {
        alex = new User({ name: 'Alex' });
        joe = new User({ name: 'Joe' });
        maria = new User({ name: 'Maria' });
        zac = new User({ name: 'Zac' });

        Promise.all([alex.save(), joe.save(), maria.save(), zac.save()])
            .then(() => done());
        });

    it('find all users with the name of joe', (done) => {
        User.find({ name: 'Joe' })
        .then((users) => {
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: joe._id })
        .then((user) => {
            assert(user.name === 'Joe');
            done();
        });
    });

    it('can skip and limit the result set', () => {
        // -Alex- [Joe, Maria] Zac
        User.find({})
        .sort({ name: 1 })
        .skip(1)
        .limit(2)
        .then((users) => {
            assert(users.length === 2 );
            assert(users[0].name === 'Joe' );
            assert(users[1].name === 'Maria' );
            done();
        })
    });
});