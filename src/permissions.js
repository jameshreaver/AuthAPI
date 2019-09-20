

/*  PERMISSIONS
 *  Create roles and role permissions
 *  for API access. */


 // Roles

const ROLE_WRITER = "writer";
const ROLE_READER = "reader";


function addRecord(user) {
  return user && canWriteRecords(user);
}

function updateRecord(user) {
  return user && canWriteRecords(user);
}

function deleteRecord(user) {
  return user && canWriteRecords(user);
}

function viewRecords(user) {
  return user && canReadRecords(user);
}

// Helper
function canReadRecords(user) {
  return [ ROLE_WRITER, ROLE_READER ].includes(user.role);
}
// Helper
function canWriteRecords(user) {
  return [ ROLE_WRITER ].includes(user.role);
}


export default {
  addRecord,
  updateRecord,
  deleteRecord,
  viewRecords
};
