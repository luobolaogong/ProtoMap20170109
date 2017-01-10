if (goog.DEBUG) console.log('Markers.js loading...');
/**
 * @fileoverview  This file defines the class leaf.Markers, and keeps track of groups of markers
 * for use by the map object leaf.Map.
 */
goog.provide('leaf.Markers');



/**
 * @classdesc The Markers class ("leaf.Markers") is managed by leaf.Features, and represents a set
 * of Query Results, which show up on the map as a set of Leaflet marker (L.Marker) objects.
 * @summary
 * Creates a leaf.Markers object.
 * @description
 * This is the constructor for creating a leaf.Markers object, which holds lists of markers.
 * A Leaflet Marker, inherits from Layer, and so this constructor deals with markers as layers,
 * as part of a markerClusterGroup (a Leaflet plugin) which manages the markers and allows them
 * to be removed all at once, but also supports clustering.
 * @example var Markers = new leaf.Markers();
 * @protected
 * @constructor
 */
leaf.Markers = function() {
  /**
   * @type {L.markerClusterGroup}
   */
  this.markersGroup = L.markerClusterGroup(); // Careful!!!! Leaflet 0.7 and 1.0, req different Leaflet.markercluster plugin version
};


/**
 * Adds a leafletMarker to the (cluster) group, which adds it to the map.  Also may add an associated popup, I think.
 * @protected
 * @param {L.Marker} marker
 */
leaf.Markers.prototype.addMarker = function(marker) {
  //console.log("Markers.js.addMarker() Next line can fail if wrong plugin, I think.");
  this.markersGroup.addLayer(marker.leafletMarker);
  //console.log("Markers.js.addMarker() got here, no fail.  Seems to fail with Leaflet.markercluster-1.0.0-rc.1, and maybe master too.");
};


/**
 * Removes the specified leafletMarker from the group, which deletes it from the map.
 * Also deletes its popup, I hope.
 * @protected
 * @param {L.Marker} marker
 */
leaf.Markers.prototype.removeMarker = function(marker) {
  this.markersGroup.removeLayer(marker);
};


/**
 * Deletes all markers from the group, which deletes them from the map.
 * @protected
 */
leaf.Markers.prototype.removeMarkers = function() {
  this.markersGroup.clearLayers();
};
if (goog.DEBUG) console.log('Markers.js loaded');

