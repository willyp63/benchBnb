const React = require('react');

module.exports = React.createClass({
  getInitialState () {
    return {description: "", numSeats: ""};
  },
  _onChange (e) {
    const newSate = {};
    newSate[e.target.id] = e.target.value;
    this.setState(newSate);
  },
  _onSubmit (e) {
    e.preventDefault();
  },
  render () {
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <label for="description">Description</label>
          <input type="text" id="description"
                 value={this.state.description}
                 onChange={this._onChange} />

          <label for="numSeats">Number of Seats</label>
          <input type="text" id="numSeats"
                 value={this.state.numSeats}
                 onChange={this._onChange} />

          <input type="submit" value="Create Bench!" />
        </form>
      </div>
    );
  }
});
