const React = require("react");
const LoginForm = require('./login_form');
const SignupForm = require('./signup_form');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

module.exports = React.createClass({
  getInitialState () {
    return {displayForm: false,
            loggedIn: Boolean(SessionStore.currentUser())};
  },
  componentWillMount () {
    this.sessionListener = SessionStore.addListener(this._sessionChange);
  },
  componentWillUnmount () {
    this.sessionListener.remove();
  },
  _sessionChange () {
    if (SessionStore.currentUser()) {
      this.setState({loggedIn: true});
    } else {
      this.setState({loggedIn: false});
    }
  },
  _login () {
    this.setState({displayForm: "LOGIN"});
  },
  _signup () {
    this.setState({displayForm: "SIGNUP"});
  },
  _logout () {
    SessionActions.logout();
  },
  _closeForm () {
    this.setState({displayForm: false});
  },
  render () {
    let form = "";
    if (this.state.displayForm === "LOGIN") {
      form = <LoginForm onClose={this._closeForm} />;
    } else if (this.state.displayForm === "SIGNUP") {
      form = <SignupForm onClose={this._closeForm} />;
    }

    return (
      <div>
        <div className="nav-bar">
          <img src="assets/logo.png" className="logo" />
          <h1>Bench BnB</h1>
          <input type="text" className="search-bar" />
          {this.state.loggedIn ?
            <div>
              <button onClick={this._logout}>Log Out!</button>
              <h2>Logged In As: {SessionStore.currentUser().user_name}</h2>
            </div> :
            <div>
              <button onClick={this._signup}>Sign Up!</button>
              <button onClick={this._login}>Log In!</button>
            </div>
          }
        </div>
        {form}
      </div>
    );
  }
});
