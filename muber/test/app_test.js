const assert = require('assert');
const request = require('supertest'); // by convention supertest is declared as request. as lodash/underscore is _ .
// no other packages change this way. its just convention..
const app = require('../app');
//pass in the express application. then chain on different actions. request(app)
describe('The express app', () => {
    it('Handles a GET request to /api',(done) => {
        request(app)
            .get('/api')
            .end((err, response) => {
                assert(response.body.hi === 'there');
                done();
        });
    });
});