import React, { Component } from "react";
import Geocode from "react-geocode";
import { geolocated } from "react-geolocated";
import { Map, GoogleApiWrapper } from "google-maps-react";
import classes from "./Map.css";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/Index";

Geocode.setApiKey("AIzaSyByIGOTVCCTgVFwwL5U9EekkPVHWk9BEcc");

class GoogleMap extends Component {
  state = {
    selectedPlace: "",
    markerCoordinate: {
      lat: 0,
      lng: 0
    }
  };
  // onMarkerClick = (props, marker, e) => {
  //   this.setState({
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   });
  // };

  // onMapClicked = props => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // };

  onMapReady = () => {
    this.setState({
      markerCoordinate: {
        lat: this.props.coords.latitude,
        lng: this.props.coords.longitude
      }
    });

    this.getAddressfromCoordinates(
      this.state.markerCoordinate.lat,
      this.state.markerCoordinate.lng
    );
  };

  onMarkerDragEnd = ({ latLng }) => {
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.setState({
      ...this.state,
      markerCoordinate: {
        lat,
        lng
      }
    });
    this.getAddressfromCoordinates(lat, lng);
  };

  getAddressfromCoordinates = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({ selectedPlace: address });
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    let body = <h1>loading...</h1>;

    if (this.props.coords) {
      body = (
        <div className={classes.map}>
          <Map
            ref="map"
            google={this.props.google}
            zoom={14}
            onReady={this.onMapReady}
            initialCenter={{
              lat: this.props.coords.latitude,
              lng: this.props.coords.longitude
            }}
            onDragend={(_, { center }) =>
              this.onMarkerDragEnd({ latLng: center })
            }
          >
            <div
              className={classes.centerMarker}
              onClick={this.onMarkerClick}
            ></div>
          </Map>
        </div>
      );
    }
    return (
      <div className={classes.maindiv}>
        {body}
        <input
          readOnly
          className={classes.inputbox}
          type="text"
          placeholder="your selected location"
          value={this.state.selectedPlace}
        ></input>
        <button
          onClick={() => {
            this.props.onmapsave(this.state.selectedPlace);
          }}
        >
          save
        </button>
        <button onClick={this.props.onmapclose}>close</button>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    Visible: state.ContactReducer.Visible,
    selectedPlace: state.ContactReducer.selectedplace
  };
};

const mapDispatchtoprops = dispatch => {
  return {
    onmapsave: selectedplace => dispatch(actions.mapSave(selectedplace)),
    onmapclose: () => dispatch(actions.mapClose())
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoprops
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyByIGOTVCCTgVFwwL5U9EekkPVHWk9BEcc"
  })(
    geolocated({
      positionOptions: {
        enableHighAccuracy: false
      },
      userDecisionTimeout: 5000
    })(GoogleMap)
  )
);

// {
//   <Marker
//             draggable
//             animation={this.props.google.maps.Animation.DROP}
//             onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
//             onClick={this.onMarkerClick}
//           ></Marker>

// <InfoWindow
// marker={this.state.activeMarker}
// visible={this.state.showingInfoWindow}
// onClose={this.onMapClicked}
// >
// <div>
//   <h1 style={{ fontSize: "10px" }}>{this.state.selectedPlace}</h1>
// </div>
// </InfoWindow>
// }
