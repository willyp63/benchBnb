const dispatcher = require('../dispatcher');
const BenchAPIUtil = require('../util/bench_api_util');

module.exports = {
  fetchBenches (bounds) {
    BenchAPIUtil.getBenches(bounds, this.receiveBenches);
  },
  receiveBenches (benches) {
    dispatcher.dispatch({
      actionType: "BENCHES_RECEIVED",
      benches: benches
    });
  },
  createBench (bench) {
    BenchAPIUtil.postBench(bench, function (newBench) {
      dispatcher.dispatch({
        actionType: "NEW_BENCH",
        bench: newBench
      });
    });
  },
  highlightBench (id) {
    dispatcher.dispatch({
      actionType: "BENCH_HIGHLIGHTED",
      id: id
    });
  },
  unhighlightBench (id) {
    dispatcher.dispatch({
      actionType: "BENCH_UNHIGHLIGHTED",
      id: id
    });
  }
};
