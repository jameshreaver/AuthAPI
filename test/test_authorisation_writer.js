import request from 'supertest';
import { expect } from 'chai';
import utils from './utils';


/*  AUTHORISATION TESTS (Writers)
 *  This tests that writers have
 *  full access to the API endpoints. */


let cookie, server, agent;

describe("Authorisation (Writers):", () => {

    before((done) => {
      server = utils.testServer();
      agent = request.agent(server);
      utils.loginAsWriter(agent, (err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
    });

    it('should permit writers to GET records', function(done) {
      agent.get('/records')
        .set('Cookie', cookie)
        .expect(200, done);
    });

    it('should permit writers to POST records', function(done) {
      agent.post('/records')
        .set('Cookie', cookie)
        .send(utils.sampleRecord())
        .expect(200, done);
    });

    it('should permit writers to PUT record', function(done) {
      let updatedRecord = utils.sampleRecord();
      updatedRecord.colour = "red";
      agent.put('/records/' + utils.sampleRecord().id)
        .set('Cookie', cookie)
        .send(updatedRecord)
        .expect(200, done);
    });

    it('should permit writers to GET record', function(done) {
      agent.get('/records/' + utils.sampleRecord().id)
        .set('Cookie', cookie)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.have.all.keys(Object.keys(utils.sampleRecord()));
          expect(res.body.id).to.equal(utils.sampleRecord().id);
          done();
        });
    });

    it('should permit writers to DELETE record', function(done) {
      agent.post('/records/')
        .set('Cookie', cookie)
        .send(utils.otherRecord())
        .end(function(err, res) {
          agent.delete('/records/' + utils.otherRecord().id)
            .set('Cookie', cookie)
            .expect(200, done);
        });
    });

    after((done) => {
      server.close();
      done();
    });

});
