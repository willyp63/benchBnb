const React = require('react');
const Modal = require('react-modal');
const Dropzone = require('react-dropzone');
const BenchActions = require('../actions/bench_actions');

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
  getInitialState () {
    return {modalIsOpen: true, bench: {description: "",
                                       num_seats: "",
                                       lat: this.props.lat,
                                       lng: this.props.lng,
                                       image_url: ""}};
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
  },
  _onChange (e) {
    const newBench = this.state.bench;
    newBench[e.target.id] = e.target.value;
    this.setState({bench: newBench});
  },
  _onSubmit (e) {
    e.preventDefault();
    BenchActions.createBench(this.state.bench);
    this.closeModal();
  },
  uploadImage (e) {
    e.preventDefault();
    window.cloudinary.openUploadWidget(
      window.CLOUDINARY_OPTIONS,
      function(error, results){
        if (!error) {
          const newBench = this.state.bench;
          newBench.image_url = "https://res.cloudinary.com/dcwxxqs4l/image/upload/w_100/" + results[0].path;
          this.setState({bench: newBench});
        }
      }.bind(this)
    );
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
                   value={this.state.bench.description}
                   onChange={this._onChange} />

            <label for="num_seats">Number of Seats</label>
            <input type="text" id="num_seats"
                   value={this.state.bench.num_seats}
                   onChange={this._onChange} />

            <label for="lat">Latitude</label>
            <input type="text" id="lat"
                  value={this.state.bench.lat}
                  disabled="true" />

            <label for="lng">Longitude</label>
            <input type="text" id="lng"
                   value={this.state.bench.lng}
                   disabled="true" />

                 {this.state.bench.image_url ?
               <img src={this.state.bench.image_url} /> :
               ""}
            <button onClick={this.uploadImage}>Upload Image</button>

            <input type="submit" value="Create Bench!" />
          </form>
        </Modal>
      </div>
    );
  }
});
