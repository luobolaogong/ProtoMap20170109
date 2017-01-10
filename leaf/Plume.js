if (goog.DEBUG) console.log('Plume.js loading...');
/**
 * @fileoverview This file defines the leaf.Plume class
 */
goog.provide('leaf.Plume');

/**
 * @classdesc The Plume class ("leaf.Plume"), used by leaf.Plumes, holds Plume parameters for construction
 * and is used with other Plumes in the leaf.Plumes class, by the leaf.Map class.
 *
 * @summary
 * Constructor for a leaf.Plume object.
 *
 * @description
 * Creates a new Plume
 *
 * @example var Plume = new leaf.Plume(plumeCalloutJsonObject);
 * @param {Object} plumeCalloutJsonObject
 * @constructor
 */
leaf.Plume = function(plumeCalloutJsonObject) {
  console.log("In Plume.js.Plume(plumeCalloutJsonObject) constructor.  plumeCalloutJsonObject is NOT GeoJSON.");
  // Not sure yet what any of this will be used for
  this.lat = plumeCalloutJsonObject.lat;
  this.lng = plumeCalloutJsonObject.lon;
  this.childPlumes = plumeCalloutJsonObject.attributes;
  this.polygonPoints = plumeCalloutJsonObject.polygonPoints;
  this.circleLocation = plumeCalloutJsonObject.circleLocation;
  this.circleRadius = plumeCalloutJsonObject.circleRadius;

  //this.marker = new leaf.Marker(callout);
  //this.leafletMarker = L.marker([this.lat, this.lng]); // for what?
  
  var mainPlumeIconImagePath = 'https:www.apple.com';
  var plumeGeoJsonString = leaf.Callout.getGeoJsonForPlumeCalloutComponent(plumeCalloutJsonObject, mainPlumeIconImagePath);
  this.geoJsonPlumeObject = goog.json.unsafeParse(plumeGeoJsonString);;

  console.log("Leaving Plume.js.Plume(plumeCalloutJsonObject)");
};
if (goog.DEBUG) console.log('Plume.js loaded');
