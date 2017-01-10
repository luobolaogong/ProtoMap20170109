if (goog.DEBUG) console.log('Map.js loading...');
/**
 * @fileoverview This file defines the leaf.Map class, through which most all operations and communication occur.
 */
goog.provide('leaf.Map');
//goog.require('goog.debug');
goog.require('leaf.Controls');
goog.require('leaf.Features');
goog.require('leaf.Layers');
goog.require('leaf.SpatialFilter');
goog.require('leaf.MeasureTool');  // I really don't think this is necessary



/**
 * @classdesc The Map class represents the entire map and the interactions with its parts.
 * It knows about its layers, features, controls, and the underlying Leaflet map object which
 * governs the display and actions.
 *
 * @summary
 * Constructor for a leaf.Map object.
 *
 * @description
 * This constructor creates a leaf.Map object.
 *
 * @example var map = new leaf.Map(); or possibly leaf.Map.getInstance() in the future
 *
 * @constructor
 */
leaf.Map = function() {
  console.log("In Map.js.constructor.  L.version: " + L.version);
  console.log("L.drawVersion: " + L.drawVersion);
  console.log("L.labelVersion: " + L.labelVersion);
  /**
   * The Layers object keeps track of the various layers for the map.
   * Its constructor also causes layers to be created.
   * @type {leaf.Layers}
   */
  this.layers = new leaf.Layers();
  /**
   * The Leaflet map object works with its Leaflet layers and controls.  The layers need
   * to be created before the leafletMap is created, because it needs an initial
   * layer.
   * <p/>
   * The existence of the map is partially dependent upon having a valid layer to display.
   * If there is no layer, the map will not be created.  If the database doesn't specify
   * an "enabled", base layer, the entire map is doomed, unless there's a backup.
   * <p/>
   * Note: Markers/features only display in the middle map of a continuous world,
   * so we may want to change continuousWorld to false.
   * @type {L.map}
   */
  this.leafletMap = L.map('map', {
    crs: leaf.Map.CRS,
    //crs:wgs84,
    //continuousWorld: true, // has any effect?  This was commented out
    center: [0, 0],
    zoom: 1, // nav plugin can affect this
    zoomControl: false,
    attributionControl: false,
    layers: [this.layers.baseLayer.leafletLayer] // error if there isn't one of these
  });
  this.spatialFilter = new leaf.SpatialFilter(this);
  this.measureTool = new leaf.MeasureTool(this);
  /**
   * The Features object keeps track of Plumes, Markers, and Locations.
   * @type {leaf.Features}
   */
  this.features = new leaf.Features(this.leafletMap);
  /**
   * The map's controls, which apply to the Leaflet map object.
   * This needs to be created after the layers have been created,
   * because the overview control uses one of the layers.
   * A reference to the controls may be useful later.
   *
   * @type {leaf.Controls}
   */
  this.controls = new leaf.Controls(this);

};

// May want to try the following some time:
// /**
//  * Make leaf.Map a singleton, accessible by leaf.Map.getInstance().
//  */
// goog.addSingletonGetter(leaf.Layers);


/**
 * The default zoom level for zoomToLocation and others.
 * @type {number}
 */
leaf.Map.prototype.DEFAULT_ZOOM = 5;


/**
 * The map's Coordinate Reference System, that all layers should adhere to.
 * DoD is supposed to use 4326 (or perhaps more exactly, 3395) exclusively.
 * Works best for GVS.  CRS EPSG3857 is what is used for most maps.
 * @type {L.CRS}
 */
leaf.Map.CRS = L.CRS.EPSG4326;
//leaf.Map.CRS = L.CRS.EPSG4326;
//leaf.Map.CRS = L.CRS.EPSG3395; // Does NOT work with Leaflet 1.0, though I think it should.
//leaf.Map.CRS = L.CRS.EPSG3857; // Does not work with Leaflet 1.0 and that set for our layers
//leaf.Map.CRS.transformation = new L.Transformation(1/180, 1, -1/180, 0.5);

// Does this need to be done before Minimap initializes?
if (goog.string.compareVersions(L.version, "0.8") == -1) {
  //console.log("Running Leaflet 0.7.7 probably, and will therefore create a new CRS similar to EPSG4326");
  leaf.Map.CRS = L.extend({}, L.CRS, {
    code: 'EPSG:4326', // guess
    projection: L.extend({}, L.Projection.LonLat, {bounds:L.bounds([-180, -90], [180, 90])}),
    transformation: new L.Transformation(1 / 180, 1, -1 / 180, 0.5),
    getSize: function (zoom) {
      var b = this.projection.bounds,
          s = this.scale(zoom),
          min = this.transformation.transform(b.min, s),
          max = this.transformation.transform(b.max, s);
      return L.point(Math.abs(max.x - min.x), Math.abs(max.y - min.y));
    }
  });
}

//var map = L.map('map',{crs:wgs84}).setView([0,0], 1);





// L.CRS.EPSG4326ForLeaflet077 = L.extend({}, L.CRS, {
//   code: 'EPSG:4326ForLeaflet077',
//   projection: L.Projection.LonLat,
//   transformation: new L.Transformation(1 / 180, 1, -1 / 180, 0.5)
// });
// leaf.Map.CRS = L.CRS.EPSG4326ForLeaflet077;

// test see http://kartena.github.io/Proj4Leaflet/api/
// var transformation = new L.Transformation(1, 0, -1, 0);
// var resolutions = [8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5];
// var crs = new L.Proj.CRS('EPSG:4326',
//     '',
//     {
//       resolutions: resolutions,
//       transformation: transformation,
//       origin: [0, 0]
//     });
// var crs = new L.Proj.CRS('EPSG:3006',
//     '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
//     {
//       resolutions: [
//         8192, 4096, 2048, 1024, 512, 256, 128,
//         64, 32, 16, 8, 4, 2, 1, 0.5
//       ],
//       origin: [0, 0]
//     });
//
// var crs2 = new L.Proj.CRS('EPSG:2400',
//     '+lon_0=15.808277777799999 +lat_0=0.0 +k=1.0 +x_0=1500000.0 ' +
//     '+y_0=0.0 +proj=tmerc +ellps=bessel +units=m ' +
//     '+towgs84=414.1,41.3,603.1,-0.855,2.141,-7.023,0 +no_defs',
//     {
//       resolutions: [8192, 4096, 2048], // 3 example zoom level resolutions
//     });

//leaf.Map.CRS = crs;
// end test

/**
 * Reset the map's view to some initial standard location and zoom level.  Should have defaults set.
 * Currently use [0,0] 2
 * @summary Goes to full map view
 * @protected
 */
leaf.Map.prototype.resetView = function() {
  this.leafletMap.setView([0, 0], 1);
};


/**
 * Zoom and pan to the specified location and create a location marker for it.  A Location tag
 * is used as a label, and therefore is expected to be relatively short.  If no location tag is provided,
 * then a hover is created using the location information.  A marker is created, and the view
 * is centered at the lat/lng specified
 * <p/>
 * This method is not called with Results/Callouts information, like through setResults().
 *
 * @protected
 * @param {number} lat Latitude in decimal degrees
 * @param {number} lng Longitude in decimal degrees
 * @param {string} opt_locationTag The label and hover to put on a Leaflet marker on the map at the specified location.
 */
leaf.Map.prototype.zoomToLocation = function(lat, lng, opt_locationTag) {
  console.log("In Map.js.zoomToLocation");
  if (!(goog.isNumber(lat) && goog.isNumber(lng))) {
    alert('Cannot zoom to a location that has no location.');
    return;
  }
  var latLng = L.latLng(lat, lng);
  latLng = latLng.wrap();
  //
  // Add a marker to the map for the location, if a location tag was passed in.  Possible duplicate?
  //
  // if (goog.isDefAndNotNull(opt_locationTag)) {
  //   var leafletMarker = L.marker(latLng, {
  //     title: opt_locationTag,
  //     alt: "zoomToLocation"
  //   });
  //   this.features.Markers.markersGroup.addLayer(leafletMarker);
  // }
  
  //
  // If a location tag is provided, create a zoom marker to place at the 
  // zoom location, using an appropriate zoom marker icon.
  //
  if (goog.isDefAndNotNull(opt_locationTag)) {
    var leafletMarker = L.marker(latLng, {
      title: opt_locationTag, // Shows up when hover over location marker.
      alt: 'zoomToLocation'
    });
    // Markers are not laying down on the map when built in MSAT, perhaps because the default
    // Leaflet icon cannot be found in that build environment.  So, we specify marker icons here.
    if (goog.isFunction(window.parent.getMapLayerData)) { // marker icons locations differ for prototype
      iconUrl = 'images/marker.png';
    }
    else {
      iconUrl = 'resources/img/marker-icon.png';
    }
    var locationIcon = L.icon({
      iconUrl: iconUrl,
      iconAnchor: [10, 37], // maybe required
      labelAnchor: [0, 0] // maybe to help line things up as they used to
    });
    leafletMarker.setIcon(locationIcon);
    this.features.Markers.markersGroup.addLayer(leafletMarker);
  }
  leaf.map.leafletMap.setView(latLng, this.DEFAULT_ZOOM + 3, {animate: true});
  console.log("Leaving Map.js.zoomToLocation");
};


/**
 * This method simply returns the query result count, which is set by setQueryResultsCount.
 *
 * @protected
 * @return {number} The number of query results.
 */
leaf.Map.prototype.getQueryResultsCount = function() {
  return this.queryResultsCount;
};


/**
 * Sets the query results count.
 *
 * @protected
 * @param {number} count The number of query results
 */
leaf.Map.prototype.setQueryResultsCount = function(count) {
  console.log('In Map.setQueryResultsCount, with count ' + count);
  this.queryResultsCount = count;
};


/**
 * Sets the query results count.
 *
 * @protected
 * @param {number} count The number of query results
 */
leaf.Map.prototype.setQueryResultsCount = function(count) {
  this.queryResultsCount = count;
};


/**
 * When the "Show Details" link in the popup is clicked, this method is called,
 * and this method calls the JSNI callback LeafletMapImpl.callbacks'
 * method getDetails(alternateId), which calls the Java method
 * getDetails(String alternateId) which calls selectRow, and switchToDetails.
 *
 * @protected
 * @param {string} alternateId Some kind of Id
 */
leaf.Map.prototype.showDetails = function(alternateId) {
  if (!goog.isFunction(window.parent.getDetails)) {
    return;
  }
  window.parent.getDetails(alternateId);
};


/**
 * Process the query results provided by the server, the result of which will be a set of markers
 * on the map.
 * <p/>
 * This method is currently being skipped over, from setResults() directly to
 * leaf.Callouts.prototype.processQueryResultsCallouts()
 *
 * @protected
 * @param {string} resultsArray Query results, in JSON format, containing callouts and possibly also tracks
 */
leaf.Map.prototype.addQueryResultsFeatures = function(resultsArray) {
  alert('In Map.addQueryResultsFeatures.  Probably no longer needed.');
  this.features.addQueryResultsCallouts(resultsArray);
};

if (goog.DEBUG)  console.log('Map.js loaded');
