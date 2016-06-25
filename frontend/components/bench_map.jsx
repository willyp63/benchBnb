const React = require('react');
const ReactDOM = require('react-dom');
const BenchActions = require('../actions/bench_actions');
const BenchStore = require('../stores/bench_store');
const hashHistory = require('react-router').hashHistory;

module.exports = React.createClass({
  componentDidMount () {
    this.markers = {};
    this.highlightedId = null;

    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: {lat: 37.7758, lng: -122.435}, // this is SF
      zoom: 13
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);

    this.mapListener1 = google.maps.event.addListener(this.map, 'idle', this._handleIdle);
    this.mapListener2 = google.maps.event.addListener(this.map, 'click', this._handleClick);
  },
  _handleClick (coords) {
    const lat = coords.latLng.lat();
    const lng = coords.latLng.lng();
    hashHistory.push({
      pathname: "benches/new",
      query: {lat: lat, lng: lng}
    });
  },
  _handleIdle () {
    this.listener = BenchStore.addListener(this._onChange);
    BenchActions.fetchBenches(this.getBounds());
  },
  getBounds () {
    const bounds = this.map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    return {northEast: {lat: northEast.lat(), lng: northEast.lng()},
            southWest: {lat: southWest.lat(), lng: southWest.lng()}};
  },
  componentWillUnmount () {
    console.log("unmount");
    this.listener.remove();
    google.maps.event.removeListener(this.mapListener1);
    google.maps.event.removeListener(this.mapListener2);
  },
  _onChange () {
    // add new marks and record them
    const newMarkers = {};
    BenchStore.all().forEach(bench => {
      newMarkers[bench.id] = true;

      if (!this.markers[bench.id]) {
        const marker = this.addBenchMarker(bench);
        this.markers[bench.id] = marker;
      }
    });

    // remove markers for old benches
    Object.keys(this.markers).forEach(id => {
      if (this.markers[id] && !newMarkers[id]) {
        this.removeBenchMarker(id);
        this.markers[id] = null;
      }
    });

    this.unhighlightMarker();
    this.highlightMarker(BenchStore.highlightedId());
  },
  addBenchMarker (bench) {
    const pos = new google.maps.LatLng(bench.lat, bench.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map
    });
    return marker;
  },
  removeBenchMarker (id) {
    this.markers[id].setMap(null);
  },
  highlightMarker (id) {
    if (this.markers[id]) {
      // fade out all markers
      this.allMarkers().forEach(marker => marker.setOpacity(0.25));

      // highlight one
      this.markers[id].setOpacity(1.0);
      this.highlightedId = id;
    }
  },
  unhighlightMarker () {
    if (this.highlightedId) {
      this.allMarkers().forEach(marker => marker.setOpacity(1.0));
      this.highlightedId = null;
    }
  },
  allMarkers () {
    const markers = [];
    Object.keys(this.markers).forEach(id => {
      if (this.markers[id]) { markers.push(this.markers[id]); }
    });
    return markers;
  },
  render () {
    return (
      <div>
        <div className='map' ref='map'>
        </div>
        {this.props.children}
      </div>
    );
  }
});
