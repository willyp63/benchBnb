const React = require('react');
const BenchActions = require("../actions/bench_actions");

module.exports = React.createClass({
  _onMouseEnter () {
    BenchActions.highlightBench(this.props.bench.id);
  },
  _onMouseLeave () {
    BenchActions.unhighlightBench(this.props.bench.id);
  },
  render () {
    return (
      <div className="index-item"
           onMouseEnter={this._onMouseEnter}
           onMouseLeave={this._onMouseLeave}>
        <img src={this.props.bench.image_url} />
        <p>Lat: {this.props.bench.lat}</p>
        <p>Lng: {this.props.bench.lng}</p>
        <p>Description: {this.props.bench.description}</p>
        <p>Number of Seats: {this.props.bench.num_seats}</p>
      </div>
    );
  }
});
