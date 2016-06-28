const ReactDOM = require("react-dom");
const React = require('react');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const Search = require('./components/search');
const NavBar = require('./components/nav_bar');
const SessionActions = require('./actions/session_actions');

window.SessionApitUtil = require('./util/session_api_util');

const App = React.createClass({
  render () {
    return (
      <div>
        <NavBar />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Search}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  SessionActions.receiveCurrentUser(window.currentUser);
  ReactDOM.render(<Router history={hashHistory}>{routes}</Router>,
                  document.getElementById('root'));
});
