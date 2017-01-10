if (goog.DEBUG) console.log('Features.js loading...');
/**
 * @fileoverview  This file defines the class leaf.Features, and keeps track of groups of Feature objects
 * for use by leaf.Map.
 *
 */
goog.provide('leaf.Features');
goog.require('leaf.Callout');
goog.require('leaf.Locations');
goog.require('leaf.Marker');
goog.require('leaf.Markers');
goog.require('leaf.Plumes');

/**
 * @classdesc The Features class ("leaf.Features") creates and manages groups of features, which
 * currently includes Markers, Plumes, and Locations.
 * <p/>
 * A feature is partially based on what what "Results" are, which is a JSON string that is provided by the server
 * through LeafMapImpl.setResults(), in response to a user Query.  Results are either callouts or tracks.
 * Callouts are either Plumes or single points represented by markers with popups, labels, and hovers.
 * A Location is a single point, represented by a marker and label and hover, and does not have a popup.
 * Currently we do nothing with Tracks.
 * <p/>
 * Features can be removed from the map with a "clear results" button press, or by a non-appending new query.
 * <p/>
 * There can be an issue when appending, that you can have more than one feature at a particular location,
 * for example when an appending query contains some previously placed features.  We were keeping track
 * of these features and preventing duplicates, but maybe it isn't so much of an issue, and not worth the
 * extra code.
 *
 * @summary
 * Creates a leaf.Features object, which holds references to markers, locations, and plumes.
 *
 * @description
 * This is the constructor for creating the object that keeps track of markers, locations and plumes, and
 * provides the way to add and remove them from view.
 *
 * @example var Features = new leaf.Features();
 * @param {L.map} leafletMap A Leaflet Map object, not a leaf.Map
 * @protected
 * @constructor
 */
leaf.Features = function(leafletMap) {
  /**
   * The way to get to Markers from Features
   * @type {leaf.Markers}
   */
  this.markers = new leaf.Markers();
  this.markers.markersGroup.addTo(leafletMap);
  /**
   * The way to get to Plumes from Features.
   * @type {leaf.Plumes}
   */
  this.plumes = new leaf.Plumes();
  // this.Plumes.plumesGroup.addTo(leafletMap);
  this.plumes.geoJsonPlumes.addTo(leafletMap); // so, after this, anything added to geoJsonPlumes should show up on the map
  /**
   * The way to get to Locations from Features.
   * @type {leaf.Locations}
   */
  this.locations = new leaf.Locations(); // but what about Location objects?
  this.locations.locationsGroup.addTo(leafletMap);

};

/**
 * Because Features manages Markers, this is the way to add a Marker to the map.
 * @protected
 * @param {leaf.Marker} marker
 */
leaf.Features.prototype.addMarker = function(marker) {
  this.markers.addMarker(marker);
};

/**
 * Because Features manages Markers, this is the way to remove all Marker objects from the map.
 * We don't have a way to remove a single Marker.
 * @protected
 */
leaf.Features.prototype.removeMarkers = function() {
  this.markers.removeMarkers();
};

/**
 * Because Features manages Locations, this is the way to add a Location to the map.
 * @param {leaf.Location} location
 */
leaf.Features.prototype.addLocation = function(location) {
  this.locations.addLocation(location);
};

/**
 * Because Features manages Locations, this is the way to remove all Location objects
 * from the map.  We don't have a way to remove a single Location.
 * @protected
 */
leaf.Features.prototype.removeLocations = function() {
  this.locations.removeLocations();
};

/**
 * Because Features manages Plumes, this is the way to add a Plume to the map.
 * @protected
 * @param {leaf.Plume} plume Not sure of the type
 */
leaf.Features.prototype.addPlume = function(plume) {
  this.plumes.push(plume); // does this ever happen?
};

/**
 * Because Features manages Plumes, this is the way to remove all Plume objects
 * from the map.  We don't have a way to remove a single Plume.
 * @protected
 */
leaf.Features.prototype.removePlumes = function() {
  this.plumes.removePlumes();
};

/**
 * This method takes an array of leaf.Callout objects which would contain information
 * for plumes and/or markers, and processes each one according to the kind it represents.
 * If it is for a plume callout, then it has a GeometryTag, and it is added to a list of
 * plumes for the Map's features.  Otherwise it's a regular marker callout, and it is put
 * into a new array of callouts which later gets sent off to processMarkerCallouts() which does the
 * dirty work of creating popups, etc.
 *
 * Results can be tracks or callouts.  Result callouts can be leaf.Plume or leaf.Marker objects.
 * (Plumes will probably contain L.Marker objects)
 *
 * @param {Array.<leaf.Callout>} queryResultsCalloutsArray An array of JSON objects representing
 * callouts (not tracks) results from a query
 */
leaf.Features.prototype.addQueryResultsCallouts = function(queryResultsCalloutsArray) {
  //
  // Is there a problem if don't clear out markersGroup before we add new markers,
  // or if we try to add the same markersGroup to the map again?  I don't think so.
  // this.Markers.markersGroup.clearLayers();
  // this.Markers.markersGroup.removeFrom(leaf.map.leafletMap);
  //
  var markerCalloutsArray = [];
  //for (var index = 0; index < queryResultsCalloutsArray.length; index++) {
  for (var index in queryResultsCalloutsArray) {
    var queryResultsCallout = queryResultsCalloutsArray[index];
    var callout = new leaf.Callout(queryResultsCallout); // does not do plume stuff here, except to set isPlume flag for it
    if (!goog.isDef(callout.location)) {
      console.log("Features.addQueryResultsCallouts(), there is no location specified, so skipping this one.");
      continue; // could have checked earlier against queryResultsCallout.lat and lon
    }
    // bad logic here.  If not a plume, then assumed to be a marker
    if (callout.isPlume) {
      this.plumes.addPlume(queryResultsCallout);
    }
    else { // if we do a marker in addition to the plume, then this marker works as a parent.  The geoJSON one doesn't have a popup or label
      var marker = new leaf.Marker(callout);
      this.markers.addMarker(marker); // adds it to the markersGroup
    }
  }
};

if (goog.DEBUG) console.log('Features.js loaded');
