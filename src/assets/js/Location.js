class Location {
  constructor() {
    this.latLng = [];
  }

  get() {
    navigator.geolocation.getCurrentPosition((position) => {
      this._success(position);
    }, (error) => {
      this._error(error);
    });
  }

  _success(position) {
    this.latLng[0] = position.coords.latitude;
    this.latLng[1] = position.coords.longitude;
  }

  _error() {
    // Recife - Marco Zero
    this.latLng[0] = '-8.0631534';
    this.latLng[1] = '-34.8733055';
  }

  position() {
    return this.latLng;
  }
}

export default Location;