

/*  ERRORS
 *  Provide a series of helper methods
 *  for error handling. */


function invalidLogin(res) {
  return res.status(401)
    .send("Invalid credentials");
}

function forbidden(res) {
  return res.status(403)
    .send("Forbidden action");
}

function notFound(res, err) {
  return res.status(404)
    .send("Resource not found");
}

function client(res, err) {
  return res.status(400)
    .send(err || "Client error");
}

function input(res, err) {
  return res.status(422)
    .json({ errors: err.array() });
}


export default {
  invalidLogin,
  forbidden,
  notFound,
  client,
  input
}
