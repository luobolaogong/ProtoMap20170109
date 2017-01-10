if (goog.DEBUG) console.log('Location.js loading...');
/**
 * @fileoverview This file defines the leaf.Location class, which is used by the leaf.Features class.
 */
goog.provide('leaf.Location');

/**
 * @classdesc A Location is kept track of by the Features class. Visually, the Location class ("leaf.Location")
 * has a marker and a label and a hover, but has no popup.  It does not use Callout information.
 * <p/>
 * Label is the text that is next to the location, and it should be short.  The label component comes from the plugin,
 * and is not part of core Leaflet.
 * <p/>
 * Hover is what shows up when you hover over the location.  This is something we did not have in the OpenLayers
 * version, but it comes for free in core Leaflet Location.
 * <p/>
 * It is (isn't?) possible to create a Location by itself and add it to the map, without a Features object
 * to keep track of it.  It's done by ....(?)
 * Who creates this?
 *
 * @summary Constructor for a leaf.Location object.
 * @description This constructor creates a leaf.Location object.
 * @example var location = new leaf.Location();
 * @param {L.LatLng} latLng
 * @param {string=} opt_labelContent
 * @param {string=} opt_hoverContent
 * @protected
 * @constructor
 */
leaf.Location = function(latLng, opt_labelContent, opt_hoverContent) {
  // TODO: fix up the following. Stuff coming in and going out needs analysis
  // TODO: Compare this with Marker constructor.  Similar code.  Should probably be in one place.
  this.latLng = latLng;
  this.labelContent = opt_labelContent;
  this.leafletMarker = L.marker(latLng, {
    title: opt_hoverContent, // Shows up when hover over location marker.
    alt: '' //locationIconUrl Is something needed here?  If no alt value, does something else change in the hover/popup?
  });
  if (goog.isFunction(window.parent.getMapLayerData)) { // hack, just to see if in MSAT env.
    this.locationIcon = L.icon({
      //      iconUrl: 'resources/images/marker.png', // not 100% sure this works inside MSAT
      iconUrl: 'images/marker.png', // not 100% sure this works inside MSAT
      iconAnchor: [10, 37], // maybe required
      labelAnchor: [0, 0] // maybe to help line things up as they used to
    });
  } else {
    // This works in my dev env, outside MSAT
    this.locationIcon = L.icon({
      //      iconUrl: 'resources/img/marker-icon.png', // blue pin white dot, why can't use default?
      iconUrl: 'resources/img/marker-icon.png', // blue pin white dot, why can't use default?
      // iconUrl: 'images/location.png', // red diamond not 100% sure this works inside MSAT
      iconAnchor: [10, 37], // maybe required
      labelAnchor: [0, 0] // maybe to help line things up as they used to
    });
  }
  this.leafletMarker.setIcon(this.locationIcon);
  if (goog.isDefAndNotNull(opt_labelContent)) {
    this.leafletMarker.bindLabel(opt_labelContent, {
      //className: 'olFramedCloudPopupContent', // this is an OpenLayers thing, not something we created
      direction: 'auto',
      //opacity: 0, // default is 1
      noHide: true}); // true means always show label, false means only show it when hover over icon
    this.leafletMarker.setOpacity(1, true); // sets opacity of location.  Defaults are 1.  If want to set opacity of label same, pass in true
  }
};


/**
 * Convert a raw string coordinate into an object containing a
 * latitude and longitude, if possible.
 *
 * Because we support three basic formats, we try parsing them
 * in a logical order.
 *
 * A raw coordinate should follow one of these formats:
 * <ul>
 * <li>Sexagecimal: DDMM.mmmmH DDDMM.mmmmH
 * <li>MGRS (not near poles): ZzSSRRRRUUUU
 * <li>Decimal: D.d, D.d
 * </ul>
 *
 * The coordinate specifications are found in "MSAT Coordinate Locate
 * Functional Specification" of October 6th, 2010, as referenced in
 * FogBugz case 17876.
 *
 * Since "sexagecimal" is the most restrictive, we get it out of the
 * way first.  If that's not a match, then MGRS, and if that doesn't
 * match, finally decimal.
 *
 * @protected
 * @param {string} coordString A coordinate potentially in one of three accepted forms
 * @return {Object} An object containing two properties (lat and lng), or null if could not parse
 */
Location.coord2LatLng = function(coordString) {
  var latLng;
  latLng = Location.sexagecimal2LatLng(coordString);
  if (latLng !== null) {
    return latLng;
  }
  latLng = Location.mgrs2LatLng(coordString);
  if (latLng !== null) {
    return latLng;
  }
  latLng = Location.decimal2LatLng(coordString);
  if (latLng !== null) {
    return latLng;
  }
  return null;
};


/**
 * Convert a raw coordinate string, potentially in modified
 * sexagecimal format, into a an object containing a latitude and
 * longitude.  If it's not in sexagecimal format, return null.
 *
 * "Sexagecimal", as used here, is basically this format: DDMM.mmmmH DDDMM.mmmmH
 *
 * The spec says the space delimiter should be a single space, but we are
 * more lenient and allow multiple "white" characters.  This should not be
 * an issue.
 *
 * @protected
 * @param {string} coordString coordinate string in sexagecimal format
 * @return {Object} An object containing properties lat and lng, or null if bad format
 */
Location.sexagecimal2LatLng = function(coordString) {
  var sexaCoordRegExpPattern = /^\s*(\d\d)(\d\d\.\d\d\d\d)([NnSs])\s+(\d\d\d)(\d\d\.\d\d\d\d)([EeWw])\s*$/;
  var sexaCoordRegExp = new RegExp(sexaCoordRegExpPattern);
  var sexaCoordPatternExists = sexaCoordRegExp.test(coordString);
  if (!sexaCoordPatternExists) {
    return null;
  }
  var parsedCoord = sexaCoordRegExp.exec(coordString);
  var latDegs = parseInt(parsedCoord[1], 10);
  var latMins = parseFloat(parsedCoord[2]);
  var lngDegs = parseInt(parsedCoord[4], 10);
  var lngMins = parseFloat(parsedCoord[5]);
  var northSouthChar = parsedCoord[3].toUpperCase();
  var eastWestChar = parsedCoord[6].toUpperCase();

  var lat = latDegs + (latMins / 60.0);
  if (northSouthChar == 'S') {
    lat = -lat;
  }
  if (lat < -90.0 || lat > 90.0) {
    return null;
  }

  var lng = lngDegs + (lngMins / 60.0);
  if (eastWestChar == 'W') {
    lng = -lng;
  }
  if (lng < -180.0 || lng > 180.0) {
    return null;
  }
  return {lat: lat, lng: lng};
};


/**
 * Convert a raw coordinate string in MGRS format into a an object containing a
 * latitude and longitude.  If it's not in sexagecimal format, return null.
 *
 * This method makes use of some library code that primarily works with USNG
 * rather than MGRS coordinates, but it should work well enough.
 *
 * MGRS format, when not near poles, is basically "ZzSRU" where
 * <ul>
 * <li>Z is one or two digits specifying a longitudinal zone,
 * <li>z is a character representing a latitudinal zone,
 * <li>S is two characters square identification,
 * <li>R is the distance right
 * <li>U is the distance up
 * </ul>
 * The number of digits of R and U must match in number and be 5 or less.
 * Technically it can be no digits and be a legal MGRS, but the USNG software
 * requires at least one R and one U digit.
 *
 * There can be spaces anywhere in this coordinate string.
 * Example: 18S UJ 23371 06519
 *
 * Note: We currently do NOT handle MGRS coordinate strings that represent polar
 * latitudes below 80 south or above 84 north. The library code we're using ("usngBetter.js")
 * does not handle coordinates in that range.  If it's important for the user to
 * specify polar-range MGRS coordinates, then we will need some new code.
 *
 * @protected
 * @param {string} coordString expected to be in MGRS format
 * @return {Object} An object containing lat and lng properties, or null if format wrong
 */
Location.mgrs2LatLng = function(coordString) {
  //return null; // just for now, because don't have usngBetter.js set up at home
  //
  // The library functions isUSNG() and USNGtoLL() require 7 characters, and an initial
  // "0" if the grid zone is less than 10.  So we have to prepare otherwise
  // legal MGRS in order to use those functions.
  //
  coordString = coordString.replace(/\s/g, '');
  var firstCharacter = coordString.charAt(0);
  if (isNaN(firstCharacter)) {
    return null;
  }
  var secondCharacter = coordString.charAt(1);
  if (isNaN(secondCharacter)) {
    coordString = '0' + coordString;
  }
  if (coordString.length == 5) {
    coordString += '00'; // pad out to 7
  }
  //
  // Use library code to check if this is a USNG coordinate string,
  // and if so, parse it.
  //
  //if (!orgmymanateecommonusng.isUSNG(coordString)) {
  if (!orgmymanateecommonusng.isUSNG(coordString)) {
    return null;
  }
  try {
    var latLngResult = new Array(2);
    orgmymanateecommonusng.USNGtoLL(coordString, latLngResult);
    var lat = latLngResult[0];
    var lng = latLngResult[1];
    return {lat: lat, lng: lng};
  }
  catch (E) {
    alert('Could not convert MGRS coordinate \"' + coordString + '\"  ' + E.message);
  }
  return null;
};
/**
 * Convert a raw coordinate string in decimal degrees format into a an object
 * containing a latitude and longitude.  If it's not in decimal format, return null.
 * Note this function assumes the degrees are within bounds of -180 to 180 and -90 to 90.
 *
 * Decimal is basically "SDHsSDH" where:
 * <ul>
 * <li>S is an optional sign "-" or "+".  Must match the hemisphere designation if given.
 * <li>D is the decimal degrees value (latitude then longitude), and may contain a decimal point.  Must be within range.
 * <li>H is an optional hemisphere character from set "NnSsEeWw" (latitude first).
 * <li>s is a separator between latitude and longitude.  Spec only allows " ", or ",", or ", ".  (May want less strict.)
 * </ul>
 *
 * @protected
 * @param {string} coordString expected to be in decimal degrees format
 * @return {Object} An object containing lat and lng properties, or null if format wrong
 */
//function decimal2LatLng(coordString) {
Location.decimal2LatLng = function(coordString) {
  var ddCoordRegExpPattern = /^\s*((-|\+)?(\d{0,2}\.\d*|\d{1,2}))([NnSs]?)(\s|,|,\s)((-|\+)?(\d{0,3}\.\d*|\d{1,3}))([EeWw]?)\s*$/;
  var ddCoordRegExp = new RegExp(ddCoordRegExpPattern);
  var ddCoordPatternExists = ddCoordRegExp.test(coordString);
  if (!ddCoordPatternExists) {
    return null;
  }
  var latLngArray = ddCoordRegExp.exec(coordString);
  var lat = Number(latLngArray[1]);
  var lng = Number(latLngArray[6]);

  // Adjust for bad strings with longitude values outside of -180, 180
  var latLng = L.latLng(lat, lng);
  latLng = latLng.wrap();
  lng = latLng.lng;

  var northSouthChar = latLngArray[4].toUpperCase();
  var eastWestChar = latLngArray[9].toUpperCase();
  var latSign = latLngArray[2];
  var lngSign = latLngArray[7];

  // Sign and hemisphere must agree
  if ((latSign == '-' && northSouthChar == 'N') ||
      (latSign == '+' && northSouthChar == 'S') ||
      (lngSign == '-' && eastWestChar == 'E') ||
      (lngSign == '+' && eastWestChar == 'W')) {
    return null;
  }
  if (lat > 0.0 && northSouthChar == 'S') {
    lat = -lat;
  }
  if (lat < -90.0 || lat > 90.0) {
    console.log("Cannot have latitudes outside of -90 to 90 degrees.");
    return null;
  }
  if (lng > 0.0 && eastWestChar == 'W') {
    lng = -lng;
  }
  if (lng < -180.0 || lng > 180.0) {
    return null;
  }
  return {lat: lat, lng: lng};
};
if (goog.DEBUG) console.log('Location.js loaded');
