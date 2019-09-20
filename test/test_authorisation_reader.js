import request from 'supertest';
import { expect } from 'chai';
import utils from './utils';


/*  AUTHORISATION TESTS (Reader)
 *  This tests that readers only have
 *  read access to the API endpoints. */


let cookie, server, agent;

describe("Authorisation (Reader):", () => {

    before((done) => {
      server = utils.testServer();
      agent = request.agent(server);
      utils.loginAsReader(agent, (err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
    });

    it('should permit readers to GET records', function(done) {
      agent.get('/records')
        .set('Cookie', cookie)
        .expect(200, done);
    });

    it('should not permit readers to POST records', function(done) {
      agent.post('/records')
        .set('Cookie', cookie)
        .send(utils.sampleRecord())
        .expect('Forbidden action')
        .expect(403, done);
    });

    it('should not permit readers to PUT record', function(done) {
      let updatedRecord = utils.sampleRecord();
      updatedRecord.colour = "red";
      agent.put('/records/' + utils.sampleRecord().id)
      .set('Cookie', cookie)
      .send(updatedRecord)
      .expect('Forbidden action')
      .expect(403, done);
    });

    it('should permit readers to GET record', function(done) {
      agent.get('/records/' + utils.sampleRecord().id)
        .set('Cookie', cookie)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.have.all.keys(Object.keys(utils.sampleRecord()));
          expect(res.body.id).to.equal(utils.sampleRecord().id);
          done();
        });
    });

    it('should not permit readers to DELETE record', function(done) {
      agent.delete('/records/' + utils.sampleRecord().id)
      .set('Cookie', cookie)
      .expect('Forbidden action')
      .expect(403, done);
    });

    after(() => {
      server.close();
    });

});
