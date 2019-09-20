import request from 'supertest';
import { expect } from 'chai';
import utils from './utils';


/*  VALIDATION TESTS
 *  This tests that input is correctly
 *  validated before it is used. */


let cookie, server, agent;

describe("Validation:", () => {

    before((done) => {
      server = utils.testServer();
      agent = request.agent(server);
      utils.loginAsWriter(agent, (err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
    });

    it('should not permit GET requests with invalid id', function(done) {
      agent.get('/records/' + utils.invalidRecord().id)
        .set('Cookie', cookie)
        .expect(422)
        .end(function(err, res) {
            let error = res.body.errors[0];
            expect(error.param).to.equal("id");
            expect(error.msg).to.equal("Invalid value");
            done();
        });
    });

    it('should not permit POST requests with invalid record', function(done) {
      agent.post('/records/')
        .set('Cookie', cookie)
        .send(utils.invalidRecord())
        .expect(422)
        .end(function(err, res) {
            let errors = res.body.errors;
            expect(errors[0].param).to.equal("id");
            expect(errors[0].msg).to.equal("Invalid value");
            expect(errors[1].param).to.equal("colour");
            expect(errors[1].msg).to.equal("Invalid value");
            expect(errors[2].param).to.equal("weight");
            expect(errors[2].msg).to.equal("Invalid value");
            done();
        });
    });

    it('should not permit PUT requests with invalid record', function(done) {
      agent.put('/records/' + utils.sampleRecord().id)
        .set('Cookie', cookie)
        .send(utils.invalidRecord())
        .expect(422)
        .end(function(err, res) {
            let errors = res.body.errors;
            expect(errors[1].param).to.equal("colour");
            expect(errors[1].msg).to.equal("Invalid value");
            expect(errors[2].param).to.equal("weight");
            expect(errors[2].msg).to.equal("Invalid value");
            done();
        });
    });

    it('should not permit DELETE requests with invalid id', function(done) {
      agent.delete('/records/' + utils.invalidRecord().id)
        .set('Cookie', cookie)
        .expect(422)
        .end(function(err, res) {
            let error = res.body.errors[0];
            expect(error.param).to.equal("id");
            expect(error.msg).to.equal("Invalid value");
            done();
        });
    });

    after((done) => {
      server.close();
      done();
    });

});
