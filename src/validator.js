import { checkSchema, param, validationResult } from 'express-validator';
import error from './errors';


/*  VALIDATOR
 *  This file contains middlewares which
 *  check that the input is valid. */


// Check input is valid Record

function isRecord() {
  return [
    checkSchema({
      id : { isUUID : true },
      fruit : { isString : true },
      colour : { isString : true },
      weight : { isInt : true },
      value: { isInt : true }
    }), checkValidation()
  ];
}

// Check input is valid id

function isId() {
  return [
    param('id').isUUID(),
    checkValidation()
  ];
}

// Helper
function checkValidation() {
  return (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return error.input(res, err);
    } else {
      next();
    }
  }
}

export default {
  isRecord,
  isId
}
