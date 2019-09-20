import express from 'express';
import configure from './setup';


const server = express();
server.path = 'data';

configure(server);

const port = process.env.PORT;
server.listen(port);
