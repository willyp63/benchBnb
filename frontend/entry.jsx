const ReactDOM = require("react-dom");
const React = require('react');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const Search = require('./components/search');
const BenchForm = require('./components/bench_form');

const App = React.createClass({
  render () {
    return (
      <div>
        <header><h1>Bench BnB</h1></header>
        {this.props.search}
        {this.props.benchForm}
      </div>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
    <IndexRoute components={{search: Search}}/>
    <Route path="benches/new" components={{search: Search, benchForm: BenchForm}}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router history={hashHistory}>{routes}</Router>,
                  document.getElementById('root'));
});
