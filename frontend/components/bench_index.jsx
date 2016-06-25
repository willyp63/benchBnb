const React = require('react');
const BenchStore = require('../stores/bench_store');
const BenchIndexItem = require('./bench_index_item');

module.exports = React.createClass({
  getInitialState () {
    return { benches: BenchStore.all() };
  },
  componentDidMount () {
    this.listener = BenchStore.addListener(this._onChange);
  },
  componentWillUnmount () {
    this.listener.remove();
  },
  _onChange () {
    this.setState({ benches: BenchStore.all() });
  },
  render () {
    return (
      <div className='index'>
        {this.state.benches.map(bench => {
          return <BenchIndexItem key={bench.id} bench={bench} />;
        })}
      </div>
    );
  }
});
