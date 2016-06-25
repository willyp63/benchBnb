const dispatcher = require('../dispatcher');
const BenchAPIUtil = require('../util/bench_api_util');
const React = require('react');

module.exports = {
  fetchMap () {
    const mapDOMNode = React.createElement("div", {className: "map", ref: "map"});
    const mapOptions = {
      center: {lat: 37.7758, lng: -122.435}, // this is SF
      zoom: 13
    };
    const map = new google.maps.Map(mapDOMNode, mapOptions);
    dispatcher.dispatch({
      actionType: "MAP_RECEIVED",
      map: map,
      mapDOMNode: mapDOMNode
    });
  }
};
