import express from 'express';
import configure from '../src/setup';


/*  TEST UTILS
 *  Provides a series of helper methods
 *  for testing purposes.  */


function testServer() {
  const server = express();
  server.path = 'test/data';
  configure(server);
  const port = process.env.PORT;
  return server.listen(port);
}

function closeServer(server) {
  return  () => {
    server.close();
  };
}

function loginAsWriter(agent, callback) {
  agent.post('/login')
  .set('content-type', 'application/json')
  .send(writerCredentials())
  .end(callback);
}

function loginAsReader(agent, callback) {
  agent.post('/login')
  .set('content-type', 'application/json')
  .send(readerCredentials())
  .end(callback);
}

function sampleRecord() {
  return {
    id : "25527b51-ead2-46b3-824b-3905ea0e5091",
    fruit : "banana",
    colour : "yellow",
    weight : "55",
    value: "3"
  };
}

function otherRecord() {
  return {
    id : "3f6b2557-0bf6-4c7e-8ba4-729d36e95e6f",
    fruit : "apple",
    colour : "green",
    weight : "52",
    value: "2"
  };
}

function invalidRecord() {
  return {
    id : "ID00002300X",
    fruit : "pear",
    colour : 400,
    weight : "fifty",
    value: "2"
  };
}

function writerCredentials() {
  return {
    username : "writer@example.com",
    password : "dQxfGaZlmSvtWVQM2e6S"
  }
}

function readerCredentials() {
  return {
    username : "reader@example.com",
    password : "2UGYIxn2AjcXRzC9U1h1"
  }
}

function invalidCredentials() {
  return {
    username : "name@example.com",
    password : "mypassword"
  }
}

export default {
  testServer,
  closeServer,
  loginAsWriter,
  loginAsReader,
  writerCredentials,
  readerCredentials,
  invalidCredentials,
  invalidRecord,
  sampleRecord,
  otherRecord
}
