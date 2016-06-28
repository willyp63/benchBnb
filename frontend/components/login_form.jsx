const React = require('react');
const Modal = require('react-modal');
const SessionActions = require('../actions/session_actions');
const ErrorStore = require('../stores/error_store');
const SessionStore = require('../stores/session_store');

const customStyles = {
  content: {
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '400px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#eeeeee'
  }
};

module.exports = React.createClass({
  componentWillMount () {
    Modal.setAppElement('#root');
  },
  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this._errorChange);
    this.sessionListener = SessionStore.addListener(this._sessionChange);
  },
  getInitialState () {
    return {modalIsOpen: true, errors: undefined, user: {user_name: "", password: ""}};
  },
  openModal: function () {
    this.setState({modalIsOpen: true});
  },
  afterOpenModal: function () {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  },
  closeModal: function () {
    this.setState({modalIsOpen: false});
    this.props.onClose();
    this.errorListener.remove();
    this.sessionListener.remove();
  },
  _onChange (e) {
    const newUser = this.state.user;
    newUser[e.target.id] = e.target.value;
    this.setState({user: newUser});
  },
  _sessionChange () {
    if (SessionStore.currentUser()) {
      this.closeModal();
    }
  },
  _errorChange () {
    this.setState({errors: ErrorStore.errors()});
  },
  _onSubmit (e) {
    e.preventDefault();
    SessionActions.login(this.state.user);
  },
  render () {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <form onSubmit={this._onSubmit} className="login-form">
            {this.state.errors ?
              <ul>{
                this.state.errors.map(errorMsg => {
                  return <li key={errorMsg}>{errorMsg}</li>;
                })
              }</ul> : ""
            }
            <label for="user_name">Username:</label>
            <input type="text" id="user_name"
                   value={this.state.user.user_name}
                   onChange={this._onChange} />

                 <label for="password">Password:</label>
            <input type="text" id="password"
                   value={this.state.user.password}
                   onChange={this._onChange} />

                 <input type="submit" value="Log In!" />
          </form>
        </Modal>
      </div>
    );
  }
});
