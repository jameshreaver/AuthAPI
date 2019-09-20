import { expect } from 'chai';
import utils from './utils';
import request from 'supertest';


/*  AUTHENTICATION TESTS
 *  This tests that the API endpoints
 *  are only accessible after login. */

let cookie, server, agent;

describe("Authentication:", () => {

    before(() => {
      server = utils.testServer();
      agent = request.agent(server);
    });

    it('should not permit unauthenticated GET requests', function(done) {
      agent.get('/records')
      .expect('Location', '/login')
      .expect(302, done);
    });

    it('should not permit unauthenticated POST requests', function(done) {
      agent.post('/records')
      .expect('Location', '/login')
      .expect(302, done);
    });

    it('should not permit unauthenticated DELETE requests.', function(done) {
      agent.delete('/records/id')
      .expect('Location', '/login')
      .expect(302, done);
    });

    it('should not permit login with incorrect credentials', function(done) {
      agent.post('/login')
      .set('content-type', 'application/json')
      .send(utils.invalidCredentials())
      .expect('Invalid credentials')
      .expect(401, done);
    });

    it('should permit login with correct credentials', function(done) {
      agent = request.agent(server);
      agent.post('/login')
      .set('content-type', 'application/json')
      .send(utils.readerCredentials())
      .expect('set-cookie', /connect.sid/)
      .expect(302)
      .end(function(err, res) {
          cookie = res.headers['set-cookie'];
          if(err) return done(err);
          done();
      });
    });

    it('should permit authenticated GET requests', function(done) {
      agent.get('/records')
        .set('Cookie', cookie)
        .expect(200, done);
    });

    after((done) => {
      server.close();
      done();
    });

});
