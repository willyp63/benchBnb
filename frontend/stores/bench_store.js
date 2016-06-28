const Store = require('flux/utils').Store;
const dispatcher = require('../dispatcher');

let _benches = {};
let _highlightedId = null;

const BenchStore = new Store(dispatcher);

BenchStore.all = function () {
  const benchesArr = [];
  Object.keys(_benches).forEach(id => {
    if (_benches.hasOwnProperty(id)) {
      benchesArr.push(_benches[id]);
    }
  });
  return benchesArr;
};

BenchStore.highlightedId = function () {
  return _highlightedId;
};

BenchStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "BENCHES_RECEIVED":
      resetAllBenches(payload.benches);
      this.__emitChange();
      break;
    case "BENCH_HIGHLIGHTED":
      highlightBench(payload.id);
      this.__emitChange();
      break;
    case "BENCH_UNHIGHLIGHTED":
      unhighlightBench(payload.id);
      this.__emitChange();
      break;
    case "NEW_BENCH":
      _benches[payload.bench.id] = payload.bench;
      this.__emitChange();
      break;
  }
};

function highlightBench (id) {
  if (_benches[id]) {
    _highlightedId = id;
  }
}

function unhighlightBench (id) {
  _highlightedId = null;
}

function resetAllBenches (benchesArr) {
  _benches = {};
  benchesArr.forEach(bench => {
    _benches[bench.id] = bench;
  });
}

module.exports = BenchStore;
