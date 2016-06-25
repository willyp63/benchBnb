const Store = require('flux/utils').Store;
const dispatcher = require('../dispatcher');

let _map = null;
let _mapDOMNode = null;

const MapStore = new Store(dispatcher);

MapStore.map = () => _map;
MapStore.mapDOMNode = () => _mapDOMNode;

MapStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "MAP_RECIEVED":
      _map = payload.map;
      _mapDOMNode = payload.mapDOMNode;
      this.__emitChange();
      break;
  }
};

module.exports = MapStore;
