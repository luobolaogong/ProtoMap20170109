/**
 * @fileoverview This file defines the leaf.Marker class which is under the control of the leaf.Features class.
 */
goog.provide('leaf.Marker');
goog.require('goog.html.utils');

/**
 * @classdesc The Marker class ("leaf.Marker") is managed by leaf.Features, and represents a Query Result,
 * which shows up on the map as a Leaflet marker (L.Marker) with Popup, all of which can be identified
 * by hovering or clicking, and all of which can be removed from the map with a "clear results" button press,
 * or by a non-appending new query.
 * @summary
 * Creates a leaf.Marker object.
 * @description
 * This is the constructor for creating a leaf.Marker object.
 * <p/>
 * A Marker should have access to its Callout information so that content can be swapped if necessary,
 * "less/more", level1/level2, whatever. A marker can have a Popup, Label, and Title (hover).
 * <p/>
 * Popup is what shows when you click on the marker.  It is complicated text, probably with HTML
 * stuff for hiding the secondary parts of the popup.  The text comes from the callout info.
 * <p/>
 * Label is the text that is next to the marker, and it should be short.  The label component comes
 * from the plugin, and is not part of core Leaflet.  In previous version, it was green text, and it was
 * basically the name of the thing.
 * <p/>
 * Title is what shows up when you hover over the marker.  This is something we did not have in the
 * OpenLayers version, but it comes for free in core Leaflet Marker.  Not sure what value it has, except
 * that it would declutter things if we didn't use the label.
 * <p/>
 * Placement of markers on the map is only in the "center" map, unless the coords go out of
 * bounds of -180/180.  Larger negatives go to a map on the left, and bigger positives go to
 * the map on the right.  So, if the user keeps scrolling left or right, the markers will
 * not be seen.  And we try to wrap the markers before they're placed.
 *
 * If the callout passed in to this Marker constructor lacks an icon, then it's probably
 * an error, or we're outside of MSAT in a test environment.  (Currently the icons come
 * from the symbology server.) If one is not available, then we provide
 * an accessible default icon.
 *
 * If the location is 0,0, then it's probably a bad one, but 0,0 is a legal location and so
 * we can't just dismiss it.
 *
 * This function gets called when there's a "Functional Layers" query (left panel).
 *
 * This constructor should be helped with a Popup constructor and methods.
 *
 * @param {leaf.Callout} callout
 * @protected
 * @constructor
 */
leaf.Marker = function(callout) {
  this.latLng = callout.location;

  this.labelContent = callout.labelContent;
  this.hoverContent = goog.html.utils.stripHtmlTags(callout.hoverContent);
  this.popupContent = callout.popupContent;

  // Create a marker.  May need to use a default marker icon if no url is specified.  (It should be.)
  if (goog.isDefAndNotNull(callout.markerIconUrl)) {
    // callout.markerIconUrl looks like this on development machine:
    // "https://localhost/SymbologyImpl/point/2525b_SFGPUSMM----US8_1.png?CENTER_ON_HOTSPOT=true"
    // https://gold.msat.akimeka.com/SymbologyImpl/flag?SCHEME=REFERENCE&CODE=CIA
    var markerIconUrl = callout.markerIconUrl.replace(/localhost/, 'gold.msat.akimeka.com'); // swap localhost for symbology server host for dev mode
    var markerIcon = L.icon({
      iconUrl: markerIconUrl,
      // iconAnchor: [0, 0],
      iconAnchor: [8, 8], // A compromise offset for a few different icons from our symbology server resource
      labelAnchor: [0, 0] // not for the hover, the label ('title')
    });
    this.leafletMarker = L.marker(this.latLng, {
      icon: markerIcon,
      title: this.hoverContent,
      alt: ''
    });
  }
  else {
    // Establish location of default marker icons
    L.Icon.Default.imagePath = 'css/images';
    if (!goog.isFunction(window.parent.getMapLayerData)) {
      L.Icon.Default.imagePath = 'resources/img';
    }
    this.leafletMarker = L.marker(this.latLng, {
      title: this.hoverContent,
      alt: ''
    });
  }

  if (this.labelContent) {
    this.leafletMarker.bindLabel(this.labelContent, {
      direction: 'auto',
      //offset: [12,15], // default value.  Related to labelAnchor option in Marker
      noHide: true
    });
    this.leafletMarker.setOpacity(1, true);
    this.leafletMarker.bindPopup(this.popupContent);
  }
};
if (goog.DEBUG) console.log('Marker.js loaded');




// if (goog.DEBUG) console.log('Marker.js loading...');
// /**
//  * @fileoverview This file defines the leaf.Marker class which is under the control of the leaf.Features class.
//  */
// goog.provide('leaf.Marker');
// //goog.require('goog.html.utils');
//
//
//
// /**
//  * @classdesc The Marker class ("leaf.Marker") is managed by leaf.Features, and represents a Query Result,
//  * which shows up on the map as a Leaflet marker (L.Marker) with Popup, all of which can be identified
//  * by hovering or clicking, all of which can be removed from the map with a "clear results" button press,
//  * or by a non-appending new query.
//  * @summary
//  * Creates a leaf.Marker object.
//  * @description
//  * This is the constructor for creating a leaf.Marker object.
//  * <p/>
//  * A Marker should have access to its Callout information so that content can be swapped if necessary,
//  * "less/more", level1/level2, whatever. A marker can have a Popup, Label, and Title (hover).
//  * <p/>
//  * Popup is what shows when you click on the marker.  It is complicated text, probably with HTML
//  * stuff for hiding the secondary parts of the popup.  The text comes from the callout info.
//  * <p/>
//  * Label is the text that is next to the marker, and it should be short.  The label component comes
//  * from the plugin, and is not part of core Leaflet.  In previous version, it was green text, and it was
//  * basically the name of the thing.
//  * <p/>
//  * Title is what shows up when you hover over the marker.  This is something we did not have in the
//  * OpenLayers version, but it comes for free in core Leaflet Marker.  Not sure what value it has, except
//  * that it would declutter things if we didn't use the label.
//  * <p/>
//  * Placement of markers on the map is only in the "center" map, unless the coords go out of
//  * bounds of -180/180.  Larger negatives go to a map on the left, and bigger positives go to
//  * the map on the right.  So, if the user keeps scrolling left or right, the markers will
//  * not be seen.  And we try to wrap the markers before they're placed.
//  *
//  * It appears that a Marker is not automatically added to the map.  Perhaps that's done by adding a
//  * Marker to the Markers object that is attached to the Features object that's attached to the map.
//  *
//  * This constructor should be helped with a Popup constructor and methods.
//  *
//  * @example var Marker = new leaf.Marker(latLng, markerIconUrl, labelContent, popupContent);
//  * @param {leaf.Callout} callout
//  * @protected
//  * @constructor
//  */
// leaf.Marker = function(callout) {
//   // TODO: Compare this with Location.  Similar code.  Should probably be in one place.
//   this.latLng = callout.location;
//   //this.markerIconUrl = callout.markerIconUrl;
//   if (goog.DEBUG) {
//     if (this.markerIconUrl.search('localhost') != -1) { // hack for testing in MSAT on localhost where don't have symbology server
//       this.markerIconUrl = this.markerIconUrl.replace(/localhost/, 'dev.msat.akimeka.com');
//     }
//   }
//   this.labelContent = callout.labelContent;
//   this.hoverContent = goog.html.utils.stripHtmlTags(callout.hoverContent);
//   this.popupContent = callout.popupContent;
//   this.leafletMarker = L.marker(this.latLng, {
//     title: this.hoverContent,
//     alt: ''
//   });
//   //
//   // This next section is just to get an icon.  Test environment is different from real, but we need test environment
//   // on different machines.  So, for now, we test to see what environment we're on.
//   // Also, supposedly a url could be missing when the Marker is constructed, but I don't think it should be, because
//   // urls are supposed to come in with Results/Callouts.  Only zoomToLocation() stuff doesn't have a URL.
//   //
//   if (goog.isFunction(window.parent.getMapLayerData)) {
//     this.markerIcon = L.icon({
//       iconUrl: this.markerIconUrl,
//       iconAnchor: [0, 0], // maybe required
//       labelAnchor: [0, 0] // maybe to help line things up as they used to
//     });
//   }
//   else {
//     this.markerIcon = L.icon({
//       iconUrl: 'resources/img/marker-icon.png', // blue pin white dot
//       // iconUrl: 'images/marker.png', // red diamond not 100% sure this works inside MSAT
//       iconAnchor: [10, 37], // maybe required
//       labelAnchor: [0, 0] // maybe to help line things up as they used to
//     });
//   }
//   this.leafletMarker.setIcon(this.markerIcon);
//   if (this.labelContent) {
//     this.leafletMarker.bindLabel(this.labelContent, {
//       //className: 'olFramedCloudPopupContent', // this is an OpenLayers thing, not something we created
//       direction: 'auto',
//       //opacity: 0, // default is 1
//       noHide: true}); // true means always show label, false means only show it when hover over icon
//     this.leafletMarker.setOpacity(1, true); // sets opacity of marker.  Defaults are 1.  If want to set opacity of label same, pass in true
//     this.leafletMarker.bindPopup(this.popupContent);
//   }
//
// };
// if (goog.DEBUG) console.log('Marker.js loaded');
