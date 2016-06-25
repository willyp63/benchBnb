module.exports = {
  getBenches (bounds, callback) {
    $.ajax({
      url: '/api/benches',
      method: 'GET',
      dataType: 'JSON',
      data: {bounds: bounds},
      success (benches) {
        callback(benches);
      }
    });
  },
  postBench (bench, callback) {
    $.ajax({
      url: '/api/benches',
      method: 'POST',
      dataType: 'JSON',
      data: {bench: bench},
      success (bench) {
        callback(bench);
      }
    });
  }
};
