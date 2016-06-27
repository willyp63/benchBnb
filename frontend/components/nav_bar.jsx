const React = require("react");

module.exports = React.createClass({
  render () {
    return (
      <div className="nav-bar">
        <img src="assets/logo.png" className="logo" />
        <h1>Bench BnB</h1>
        <input type="text" className="search-bar" />
      </div>
    );
  }
});
