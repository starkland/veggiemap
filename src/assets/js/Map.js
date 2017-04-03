class Map {
  constructor(mapContainer) {
    this.accessToken = 'pk.eyJ1IjoidGh1bGlvcGgiLCJhIjoiY2l6dGYzbzh3MDBxdDJxb2RwM3Q1dThrYSJ9.Z1gPJ1HHyF4extvmILwDOQ';

    this.layerUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`;

    this.mapContainer = mapContainer;
    this.baseLayerMap = this.setLayer('base');

    this.markersLayer = L.markerClusterGroup({
      maxClusterRadius: 120,
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true
    });

    this.Map = null;
    this.arrayOfLatLngs = [];

    this.leaflet = window.L;
  }

  display() {
    const mapOptions = {
      zoom: 15,
      scrollWheelZoom: false,
      layers: this.baseLayerMap
    };

    return this.Map = new this.leaflet.map(this.mapContainer, mapOptions);
  }

  setLayer(value) {
    switch(value) {
      case 'base':
        return this._setBaseLayer();
      break;

      case 'offline':
        return this._setOfflineLayer();
      break;
    }
  }

  _setBaseLayer() {
    const options = {
      attribution: 'VeggieMap',
      id: 'mapbox.streets',
      accessToken: this.accessToken
    };

    return L.tileLayer(this.layerUrl, options);
  }

  _setOfflineLayer() {
    const options = {
      attribution: 'Offline',
      id: 'mapbox.light'
    };

    this.offlineMap = L.tileLayer(this.layerUrl, options);
  }

  addMarker(markerArray) {
    const array = markerArray;

    this.arrayOfLatLngs = [];
    this.markersLayer.clearLayers();

    array.forEach((item) => {
      const veggie = item.veggie;
      let keys = Object.keys(veggie);

      // address, location and name
      if(keys.length === 3) {
        // adiciona a lat/lng de cada marcador ao array
        this.arrayOfLatLngs.push([veggie.location[0], veggie.location[1]]);

        // adiciona os marcadores ao mapa
        this.buildMarker(item);
      }
    });

    this.updateMap();
  }

  buildMarker(obj) {
    let title = `<h4>${obj.veggie.name}</h4> <small>${obj.veggie.address}</small>`;

    let marker = this.leaflet.marker(new this.leaflet.LatLng(obj.veggie.location[0], obj.veggie.location[1]), {
      title: title,
      icon: this.buildIcon(obj.type)
    });

    marker.bindPopup(title);

    this.markersLayer.addLayer(marker);
  }

  buildIcon(type) {
    switch(type) {
      case 'evento':
        return this.leaflet.AwesomeMarkers.icon({
          icon: 'star',
          markerColor: 'green',
          prefix: 'fa'
        });
      break;

      case 'fixo':
        return this.leaflet.AwesomeMarkers.icon({
          icon: 'hand-o-up',
          markerColor: 'black',
          prefix: 'fa'
        });
      break;
    }
  }

  updateMap() {
    let bounds = new this.leaflet.LatLngBounds(this.arrayOfLatLngs);

    this.Map.fitBounds(bounds);
    this.Map.addLayer(this.markersLayer);
  }

  zoomOut() {
    return this.Map.setZoom(3);
  }
}

export default Map;
