if (goog.DEBUG) console.log('MeasureTool.js loading...');
goog.provide('leaf.MeasureTool');

// The following comes from leaflet.measure.js
// https://github.com/jtreml/leaflet.measure

L.Control.Measure = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onRemove: function(map) { // I added this.  Maybe helps remove conflict between measure and draw/spatial
    if(this._layerPaint) {
      this._layerPaint.clearLayers();
    }
  },
  onAdd: function (map) {
    var className = 'leaflet-control-zoom leaflet-bar leaflet-control',
        container = L.DomUtil.create('div', className);
    this._createButton(
        //'&#8674;', // a unicode decimal code for a rightwards dashed arrow
        '&#8596;', // a unicode decimal code for a rightwards dashed arrow
        'Measure',
        'leaflet-control-measure leaflet-bar-part leaflet-bar-part-top-and-bottom',
        container,
        this._toggleMeasure,
        this
    );

    return container;
  },

  _createButton: function (html, title, className, container, fn, context) {
    var link = L.DomUtil.create('a', className, container);
    link.innerHTML = html;
    link.href = '#';
    link.title = title;

    L.DomEvent
        .on(link, 'click', L.DomEvent.stopPropagation)
        .on(link, 'click', L.DomEvent.preventDefault)
        .on(link, 'click', fn, context)
        .on(link, 'dblclick', L.DomEvent.stopPropagation);

    return link;
  },

  _toggleMeasure: function () {
    this._measuring = !this._measuring;

    if(this._measuring) {
      L.DomUtil.addClass(this._container, 'leaflet-control-measure-on');
      this._startMeasuring();
    } else {
      L.DomUtil.removeClass(this._container, 'leaflet-control-measure-on');
      this._stopMeasuring();
    }
  },

  _startMeasuring: function() {
    this._oldCursor = this._map._container.style.cursor;
    this._map._container.style.cursor = 'crosshair';

    this._doubleClickZoom = this._map.doubleClickZoom.enabled();
    this._map.doubleClickZoom.disable();

    L.DomEvent
        .on(this._map, 'mousemove', this._mouseMove, this)
        .on(this._map, 'click', this._mouseClick, this)
        .on(this._map, 'dblclick', this._finishPath, this)
        .on(document, 'keydown', this._onKeyDown, this);

    if(!this._layerPaint) {
      this._layerPaint = L.layerGroup().addTo(this._map);
    }

    if(!this._points) {
      this._points = [];
    }
  },

  _stopMeasuring: function() {
    this._map._container.style.cursor = this._oldCursor;

    L.DomEvent
        .off(document, 'keydown', this._onKeyDown, this)
        .off(this._map, 'mousemove', this._mouseMove, this)
        .off(this._map, 'click', this._mouseClick, this)
        .off(this._map, 'dblclick', this._mouseClick, this);

    if(this._doubleClickZoom) {
      this._map.doubleClickZoom.enable();
    }

    if(this._layerPaint) {
      this._layerPaint.clearLayers();
    }

    this._restartPath();
  },

  _mouseMove: function(e) {
    if(!e.latlng || !this._lastPoint) {
      return;
    }

    if(!this._layerPaintPathTemp) {
      this._layerPaintPathTemp = L.polyline([this._lastPoint, e.latlng], {
        color: 'red',
        weight: 1.5,
        clickable: false,
        dashArray: '6,3'
      }).addTo(this._layerPaint);
    } else {
      this._layerPaintPathTemp.spliceLatLngs(0, 2, this._lastPoint, e.latlng);
    }

    if(this._tooltip) {
      if(!this._distance) {
        this._distance = 0;
      }

      this._updateTooltipPosition(e.latlng);

      var distance = e.latlng.distanceTo(this._lastPoint);
      this._updateTooltipDistance(this._distance + distance, distance);
    }
  },

  _mouseClick: function(e) {
    // Skip if no coordinates
    if(!e.latlng) {
      return;
    }

    // If we have a tooltip, update the distance and create a new tooltip, leaving the old one exactly where it is (i.e. where the user has clicked)
    if(this._lastPoint && this._tooltip) {
      if(!this._distance) {
        this._distance = 0;
      }

      this._updateTooltipPosition(e.latlng);

      var distance = e.latlng.distanceTo(this._lastPoint);
      this._updateTooltipDistance(this._distance + distance, distance);

      this._distance += distance;
    }
    this._createTooltip(e.latlng);


    // If this is already the second click, add the location to the fix path (create one first if we don't have one)
    if(this._lastPoint && !this._layerPaintPath) {
      this._layerPaintPath = L.polyline([this._lastPoint], {
        color: 'red',
        weight: 2,
        clickable: false
      }).addTo(this._layerPaint);
    }

    if(this._layerPaintPath) {
      this._layerPaintPath.addLatLng(e.latlng);
    }

    // Update the end marker to the current location
    if(this._lastCircle) {
      this._layerPaint.removeLayer(this._lastCircle);
    }

    this._lastCircle = new L.CircleMarker(e.latlng, {
      color: 'red',
      opacity: 1,
      weight: 1,
      fill: true,
      fillOpacity: 1,
      radius:4, // was 2
      clickable: this._lastCircle ? true : false
    }).addTo(this._layerPaint);

    this._lastCircle.on('click', function() { this._finishPath(); }, this);

    // Save current location as last location
    this._lastPoint = e.latlng;
  },

  _finishPath: function() {
    // Remove the last end marker as well as the last (moving tooltip)
    if(this._lastCircle) {
      this._layerPaint.removeLayer(this._lastCircle);
    }
    if(this._tooltip) {
      this._layerPaint.removeLayer(this._tooltip);
    }
    if(this._layerPaint && this._layerPaintPathTemp) {
      this._layerPaint.removeLayer(this._layerPaintPathTemp);
    }

    // Reset everything
    this._restartPath();
  },

  _restartPath: function() {
    this._distance = 0;
    this._tooltip = undefined;
    this._lastCircle = undefined;
    this._lastPoint = undefined;
    this._layerPaintPath = undefined;
    this._layerPaintPathTemp = undefined;
  },

  _createTooltip: function(position) {
    var icon = L.divIcon({
      className: 'leaflet-measure-tooltip',
      iconAnchor: [-5, -5]
    });
    this._tooltip = L.marker(position, {
      icon: icon,
      clickable: false
    }).addTo(this._layerPaint);
  },

  _updateTooltipPosition: function(position) {
    this._tooltip.setLatLng(position);
  },

  _updateTooltipDistance: function(total, difference) {
    var totalRound = this._round(total),
        differenceRound = this._round(difference);

    var text = '<div class="leaflet-measure-tooltip-total">' + totalRound + ' mi</div>';
    if(differenceRound > 0 && totalRound != differenceRound) {
      text += '<div class="leaflet-measure-tooltip-difference">(+' + differenceRound + ' mi)</div>';
    }

    this._tooltip._icon.innerHTML = text;
  },

  _round: function(val) {
    //return Math.round((val / 1852) * 10) / 10;
    return Math.round((val / 1609) * 10) / 10;
  },

  _onKeyDown: function (e) {
    if(e.keyCode == 27) {
      // If not in path exit measuring mode, else just finish path
      if(!this._lastPoint) {
        this._toggleMeasure();
      } else {
        this._finishPath();
      }
    }
  }
});

L.Map.mergeOptions({
  measureControl: false
});

L.Map.addInitHook(function () {
  if (this.options.measureControl) {
    this.measureControl = new L.Control.Measure();
    this.addControl(this.measureControl);
  }
});

L.control.measure = function (options) {
  return new L.Control.Measure(options);
};









leaf.MeasureTool = function(map) {
  this.map = map;
  this.measureToolControl = null;
  this.isControllerActive = false;
};

leaf.MeasureTool.prototype.toggleMeasureTool = function() {
  if (this.isControllerActive) {
    this.deactivate();
  }
  else {
    this.activate();
  }
};

leaf.MeasureTool.prototype.activate = function() {
  console.log("In MeasureTool.js.activate()");
  this.measureToolControl.addTo(this.map.leafletMap);
  this.isControllerActive = true;
  console.log("Leaving MeasureTool.js.activate()");
};

leaf.MeasureTool.prototype.deactivate = function() {
  console.log("In MeasureTool.js.deactivate()");
  if (this.isControllerActive) {
    this.measureToolControl._measuring = true; // total hack, reaching in like this to set state
    this.measureToolControl._toggleMeasure(); // and to stop.  They should have provided a public function
    this.measureToolControl.removeFrom(this.map.leafletMap); // should make control disappear, how about shape?
  }
  this.isControllerActive = false;
  console.log("Leaving MeasureTool.js.deactivate()");
};

if (goog.DEBUG) console.log('MeasureTool.js loaded.');
