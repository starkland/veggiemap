class GoogleMaps {
  constructor(address) {
    this.geocoder = new google.maps.Geocoder();
    this.address = address;
    this.results = [];
  }

  geocode() {
    return this.geocoder.geocode({'address': this.address}, this.geocodeSuccess);
  }

  geocodeSuccess(results, status) {
    console.info(results, status);

    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        // console.log(results[1]);
        return this.results = results[1];
      } else {
        console.warn('Sem resultados..');
      }
    } else {
      console.warn('Geocoder falhou por conta de: ' + status);
    }
  }

}

export default GoogleMaps;