const Store = require('flux/utils').Store;
const dispatcher = require('../dispatcher');

let _errors, _form;

const ErrorStore = new Store(dispatcher);

ErrorStore.errors = () => _errors;
ErrorStore.form = () => _form;

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "RECEIVE_ERRORS":
      setErrors(payload.errors);
      _form = payload.form;
      this.__emitChange();
      break;
    case "REMOVE_ERRORS":
      _errors = _form = undefined;
      this.__emitChange();
      break;
  }
};

function setErrors (errors) {
  _errors = [];
  Object.keys(errors).forEach(name => {
    _errors.push(name + " " + errors[name]);
  });
}

module.exports = ErrorStore;
