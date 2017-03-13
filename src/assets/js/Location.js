import Events from '../../events/all';

class Location {
  constructor() {
    this.latLng = [];
  }

  currentPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
      this.latLng[0] = position.coords.latitude;
      this.latLng[1] = position.coords.longitude;

      this.dispatch();
    }.bind(this), function(err) {
      console.error(err);

      // Recife - Marco Zero
      this.latLng[0] = '-8.0631534';
      this.latLng[1] = '-34.8733055';

      this.dispatch();
    }.bind(this));
  }

  dispatch() {
    Events.$emit('location_ok', this.position());
  }

  position() {
    return this.latLng;
  }
}

export default Location;