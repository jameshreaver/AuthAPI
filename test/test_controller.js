import request from 'supertest';
import { expect } from 'chai';
import utils from './utils';


/*  CONTROLLER TESTS
 *  This tests that the actions at the API
 *  endpoints are executed correctly. */


let cookie, server, agent;

describe("Controller:", () => {

    before((done) => {
      server = utils.testServer();
      agent = request.agent(server);
      utils.loginAsWriter(agent, (err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
    });

    it('should respond to GET records requests correctly', function(done) {
      agent.get('/records')
        .set('Cookie', cookie)
        .expect(200)
        .end(function(err, res) {
            expect(res.body).to.be.an('array').that.is.not.empty;
            expect(res.body[0]).to.have.all.keys(Object.keys(utils.sampleRecord()));
            done();
        });
    });

    it('should respond to GET record requests correctly', function(done) {
      agent.get('/records/' + utils.sampleRecord().id)
        .set('Cookie', cookie)
        .expect(200)
        .end(function(err, res) {
            expect(res.body).to.have.all.keys(Object.keys(utils.sampleRecord()));
            expect(res.body.id).to.equal(utils.sampleRecord().id);
            done();
        });
    });

    it('should respond to POST records requests correctly', function(done) {
      agent.post('/records/')
        .set('Cookie', cookie)
        .send(utils.otherRecord())
        .expect(200)
        .end(function(err, res) {
          agent.get('/records')
            .set('Cookie', cookie)
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.deep.include(utils.otherRecord());
                done();
            });
        });
    });

    it('should respond to PUT records requests correctly', function(done) {
      let updatedRecord = utils.sampleRecord();
      updatedRecord.colour = "red";
      agent.put('/records/' + utils.sampleRecord().id)
        .set('Cookie', cookie)
        .send(updatedRecord)
        .expect(200)
        .end(function(err, res) {
          agent.get('/records/' + utils.sampleRecord().id)
            .set('Cookie', cookie)
            .expect(200)
            .end(function(err, res) {
                expect(res.body.name).to.equal(updatedRecord.name)
                done();
            });
        });
    });

    it('should respond to DELETE requests correctly', function(done) {
      agent.delete('/records/' + utils.otherRecord().id)
        .set('Cookie', cookie)
        .expect(200)
        .end(function(err, res) {
          agent.get('/records')
            .set('Cookie', cookie)
            .expect(200)
            .end(function(err, res) {
                expect(res.body).not.deep.include(utils.otherRecord());
                done();
            });
        });
    });

    after((done) => {
      server.close();
      done();
    });

});
