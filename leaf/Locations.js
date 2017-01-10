if (goog.DEBUG) console.log('Locations.js loading...');
/**
 * @fileoverview  This file defines the class leaf.Locations, and keeps track of groups of Location instances
 * for use by the map object leaf.Map via leaf.Features.
 */
goog.provide('leaf.Locations');



/**
 * @classdesc The Locations class ("leaf.Locations") knows about Location instances, and leaf.Features knows about
 * leaf.Locations.
 *
 * @summary
 * Constructor for a leaf.Locations object.
 *
 * @description
 * This constructor creates a leaf.Locations object.
 *
 * @example var locations = new leaf.Locations();
 *
 * @constructor
 */
leaf.Locations = function() {
  /**
   * Location object are grouped, using the plugin markerClusterGroup.  This makes them cluster like regular markers.
   * and allows easy removal as a group.
   * @type {L.markerClusterGroup}
   */
  this.locationsGroup = L.markerClusterGroup();
};


/**
 * Adds a location (in the form of a L.Marker) to the (cluster) group, which adds it to the map.
 * So it looks like we don't use a Location object at all!  
 * Should probably change this to "addLocationMarker", and create a new function for adding
 * a single Location object.  Do this stuff later.  No time now.  Must work on Spatial.
 * @protected
 * @param {L.Marker} leafletMarker Marker for the location
 */
leaf.Locations.prototype.addLocation = function(leafletMarker) {
  this.locationsGroup.addLayer(leafletMarker);
};


/**
 * Removes the specified location from the map.  I don't think this is called.
 * @protected
 * @param {L.Location} location
 */
leaf.Locations.prototype.removeLocation = function(location) {
  alert('In Locations.removeLocation.');
  this.locationsGroup.removeLayer(location);
};


/**
 * Deletes all locations from the group, which deletes them from the map.
 * @protected
 */
leaf.Locations.prototype.removeLocations = function() {
  this.locationsGroup.clearLayers();
};
if (goog.DEBUG) console.log('Locations.js loaded');

