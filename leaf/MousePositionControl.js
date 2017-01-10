if (goog.DEBUG) console.log('MousePositionControl.js loading...');
goog.provide('leaf.MousePositionControl');

// The following comes from L.Control.MousePositoin.js
// https://github.com/ardhi/Leaflet.MousePosition/tree/master
// and augmented for MGRS

L.Control.MousePosition = L.Control.extend({
  options: {
    position: 'bottomleft',
    separator: ' : ',
    emptyString: 'Unavailable',
    lngFirst: false,
    numDigits: 5,
    lngFormatter: undefined,
    latFormatter: undefined,
    prefix: ""
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML=this.options.emptyString;
    return this._container;
  },

  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove)
  },

  _onMouseMove: function (e) {
    var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
    var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
    var mgrs = this.options.mgrsFormatter ? this.options.mgrsFormatter(e.latlng.lat, e.latlng.lng) : 'unknown mgrs coord';
    var value = this.options.lngFirst ? lng + this.options.separator + lat + this.options.separator + mgrs : lat + this.options.separator + lng + this.options.separator + mgrs;
    var prefixAndValue = this.options.prefix + ' ' + value;
    this._container.innerHTML = prefixAndValue;
  }

});

L.Map.mergeOptions({
  positionControl: false
});

L.Map.addInitHook(function () {
  if (this.options.positionControl) {
    this.positionControl = new L.Control.MousePosition();
    this.addControl(this.positionControl);
  }
});

L.control.mousePosition = function (options) {
  return new L.Control.MousePosition(options);
};


if (goog.DEBUG) console.log('MousePositionControl.js loaded.');

