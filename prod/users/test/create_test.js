const assert = require('assert');
const User = require('../src/user');


describe('this test is going to describe creating records', () => {
    it('saves a user', () => {
        const joe = new User({ name: 'joe' });

        joe.save()
            .then(() => {
                //has joe been saved successfully?
                assert(!joe.isNew);
                done();
            });
    });
});