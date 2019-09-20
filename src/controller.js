import db from './datastore';
import error from './errors';


/*  CONTROLLER
 *  Methods to manipulate resources
 *  corresponding to each endpoint. */


// serves GET /records
function getRecords(req, res) {
  db.records().find(
    {}, {_id:0}, sendResults(res)
  );
}

// serves POST /records
function addRecord(req, res) {
  db.records().insert(
    req.body, sendResults(res)
  );
}

// serves GET /records/:id
function getRecord(req, res) {
  db.records().findOne({
    id: req.params.id
  }, {_id:0}, sendResults(res));
}

// serves PUT /records/:id
function updateRecord(req, res) {
  db.records().update({
    id: req.params.id
  }, {
    $set : req.body
  }, {_id:0}, sendResults(res));
}

// serves DELETE /records/:id
function deleteRecord(req, res) {
  db.records().remove({
    id: req.params.id
  }, { multi: true }, sendResults(res));
}

// Helper
function sendResults(res) {
  return (err, docs) => {
    if (err) {
      error.client(res, err);
    } else if (!docs) {
      error.notFound(res);
    } else {
      res.json(docs);
    }
  }
}

export default {
  getRecords,
  addRecord,
  getRecord,
  updateRecord,
  deleteRecord
};
