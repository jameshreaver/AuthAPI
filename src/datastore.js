import Datastore from 'nedb';


/*  DATASTORE
 *  Methods to create and configure
 *  dtastores for the application. */


 var usersData, recordsData;

// Setup databases
 function setup(path) {
   usersData = createStore(path, 'users');
   recordsData = createStore(path, 'records');
 }

// Create and configure datastore
function createStore(path, name) {
  let store = new Datastore({
    filename: `${path}/${name}.db`,
    autoload: true
  });
  store.persistence
    .setAutocompactionInterval(
      process.env.INTERVEL);
  store.serialise = serialise(store);
  store.deserialise = deserialise(store);
  return store;
}

// Return users database
 function users() {
   return usersData;
 }

// Return records database
 function records() {
   return recordsData;
 }

// Helper
function serialise(store) {
  return (doc, done) =>  {
    done(null, doc.id)
  };
};

// Helper
function deserialise(store) {
  return (id, done) => {
    store.findOne({ id: id }, (err, doc) => {
      if (err) return done(err);
      done(null, doc);
    });
  };
}


export default {
  setup,
  users,
  records
};
