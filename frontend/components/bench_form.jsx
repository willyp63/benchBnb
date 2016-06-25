const React = require('react');
const Modal = require('react-modal');
const hashHistory = require('react-router').hashHistory;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

module.exports = React.createClass({
  componentWillMount () {
    Modal.setAppElement('.root');
  },
  getInitialState () {
    return {modalIsOpen: true,
            description: "",
            numSeats: "",
            latitude: this.props.location.query.lat,
            longitude: this.props.location.query.lng};
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
    hashHistory.push({pathname: "/"});
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <form onSubmit={this._onSubmit} className="bench-form">
            <label for="description">Description</label>
            <input type="text" id="description"
                   value={this.state.description}
                   onChange={this._onChange} />

            <label for="numSeats">Number of Seats</label>
            <input type="text" id="numSeats"
                   value={this.state.numSeats}
                   onChange={this._onChange} />

            <label for="latitude">Latitude</label>
            <input type="text" id="latitude"
                  value={this.state.latitude}
                  disabled="true" />

            <label for="longitude">Longitude</label>
            <input type="text" id="longitude"
                   value={this.state.longitude}
                   disabled="true" />

            <input type="submit" value="Create Bench!" />
          </form>
        </Modal>
      </div>
    );
  }
});
