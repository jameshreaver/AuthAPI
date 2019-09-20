import controller from './controller.js';
import permission from './permissions';
import validate from './validator';
import auth from './auth';


/*  ROUTES
 *  Create routes for the api backend
 *  adding relevant middlewares. */


const routes = (app) => {

  app.route('/login')
      .post(auth.login());

  app.route('/records')
      .get(auth.check(), auth.can(permission.viewRecords), controller.getRecords)
      .post(auth.check(), auth.can(permission.addRecord), validate.isRecord(), controller.addRecord);

  app.route('/records/:id')
      .get(auth.check(), auth.can(permission.viewRecords), validate.isId(), controller.getRecord)
      .put(auth.check(), auth.can(permission.updateRecord), validate.isRecord(), controller.updateRecord)
      .delete(auth.check(), auth.can(permission.deleteRecord), validate.isId(), controller.deleteRecord);
}

export default routes;
