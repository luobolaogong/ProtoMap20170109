if (goog.DEBUG) console.log('SpatialFilter.js loading...');
goog.provide('leaf.SpatialFilter');

// leaf.SpatialFilterClass = L.Draw.Rectangle.extend({
// });
//
// var spFilCtrl = new leaf.SpatialFilterClass(map, {});

/**
 * SpatialFilter.js -- support for creating a spatial filter, using Leaflet.Draw.
 *
 * ToDo: ALL OF THIS NEEDS TO BE REWORKED.  IT'S BASED ON WHAT WE WERE DOING WITH OpenLayers WHICH
 * DID NOT HAVE A PLUGIN LIKE WE HAVE WITH Leaflet.Draw AND SO THERE'S ALL THIS EXTRA STUFF
 * GOING ON THAT CAN BE ELIMINATED.
 * 
 * States/phases: The control is either "active" and therefore showing or "inactive"/not showing.
 * The drawn shape is either a rectangle, circle, or polygon.  (First I guess we're limited to rectangle.)
 * It is either drawn or not drawn.  That is, it is either showing or not showing.  The control could be
 * showing, but no shape yet drawn.  The control could be showing but the shape was deleted.
 * The shape's attributes as shown as properties of this SpatialFilter class, such as area, centroid,
 * and bounds are valid when the shape is showing.  The property values may be accessible, but should
 * be considered invalid if the shape is not showing, or if the control is inactive.
 * 
 * The drawing/shape itself is considered a "layer" in Leaflet.  It can be edited, meaning it can be
 * moved, or its coordinates can be altered.  OpenLayers didn't do editing of shapes.
 *
 * The drawing and editing phases of a shape are detected by callbacks, such as
 * leafletMap.on('draw:created',...) and draw:start or whatever, or is it leafletMap.on('overlayadd', ...) ?
 *
 *
 * A spatial filter tool provides a geographic map region specification for
 * filtering data requests.
 *
 * This works with the Leaflet.Draw plugin that gets created as a Control element in the Controls.js file.
 *
 * We want to be able to control that controller from here.  That is, make it appear and disappear, and
 * get coordinates and areas from it.
 */

/**
 * Constructor for a spatial filter.
 */
leaf.SpatialFilter = function(map) {
  this.map = map; // just a guess
  this.spatialFilterControl = null; // added in later by controls object
  this.drawnItemsFeatureGroup = null; // L.featureGroup(); // guess for now.  Maybe intialize it here?
  this.drawControlShapeObject = null; // this is the shape object that was drawn by the draw control
  this.isShapeActive = false; // This should probably mean there's a shape on the map, defining an area.
  this.isControllerActive = false; // new
  this.bbox  = null; // a Leaflet LatLngBounds.  Change to shapeDefinition?  Could be BBox/LatLngBounds, or Circle with any 3 points on circumfrance, or set of points.  Need to have shape type too.
  this.centroid  = null;  // How about a Leaflet LatLng object?  this was a OpenLayers.Geometry.Point, with x/y in degrees
  this.size = 0;

  //this.geodesicAreaSquareMeters = 0; // Area in sq meters
  //this.geodesicAreaSquareMiles = 0; // Area in sq meters
  //this.maxSizeInSquareMiles = Number.MAX_VALUE; //max allowed area in sq. mi. can be set by OpenLayersMapImpl.java
  this.maxSizeLimit = Number.MAX_VALUE; //max allowed area in sq. mi. can be set by OpenLayersMapImpl.java
  //this.maxSizeInSquareMeters = Number.MAX_VALUE;
  this.filterHasLimit = false;
  //this.spatialFilterDrawControl = null; //controls if the cursor is set to draw a selection box or the navigation cursor.
};


/*
 * This function deals with the current test buttons, and will be replaced with something
 * else that has the same logic.
 *
 * This function is called when the HTML file's "boxToggle" input radio button,
 * is clicked.  It causes the DrawBoxControl to activate, therefore making
 * a left mouse button drag draw a rectangle.
 *
 * ********************************
 * This is a function rather than a method, (note, no prototype) so cannot use "this"
 * inside it to get the SpatialFilter's members.  It's a function because it's used
 * in HTML code in OLMap.html.
 * I've made this mistake too many times and takes a while to figure out what went wrong.
 * ********************************
 */
// SpatialFilter.toggleControl = function(element) {
//   if (element.value == "box" && element.checked) {
//     olMap.spatialFilter.deleteBBox();
//     olMap.spatialFilter.spatialFilterDrawControl.activate();
//   }
//   else {
//     olMap.spatialFilter.spatialFilterDrawControl.deactivate();
//     olMap.spatialFilter.spatialFilter.isBBoxAvailable = false;
//   }
// };


/**
 * This is called from LeafletMapImpl.setFilter(a,b,c)
 */
leaf.SpatialFilter.prototype.activate = function() {
  console.log("In SpatialFilter.js.activate()");
  this.spatialFilterControl.addTo(this.map.leafletMap); // right?
  this.isControllerActive = true; // new
  console.log("Leaving SpatialFilter.js.activate()");
};

leaf.SpatialFilter.prototype.deactivate = function() { // new
  console.log("In SpatialFilter.js.deactivate()");
  if (this.isControllerActive) {
    this.spatialFilterControl.remove(); // Works with new plugin? should make control disappear, how about shape?
    //this.spatialFilterControl.removeFrom(this.map.leafletMap); // Works with new plugin? should make control disappear, how about shape?
  }
  this.removeDrawnShape();
  this.isControllerActive = false;
  console.log("Leaving SpatialFilter.js.deactivate()");
};

leaf.SpatialFilter.prototype.removeDrawnShape = function() { // new, same as deleteBbox?
  if (this.isShapeActive) {
    this.drawnItemsFeatureGroup.removeLayer(this.drawControlShapeObject); // fails?
  }
  else {
    console.log("No shape to erase because not active???");
  }
  this.isShapeActive = false;
};
// And shouldn't we also have a function that sets it back to infinity, as if the constraint is off?
leaf.SpatialFilter.prototype.setMaxSizeLimit = function(maxSize) {
  this.maxSizeLimit = maxSize;
  this.filterHasLimit = true;
};
leaf.SpatialFilter.prototype.resetMaxSizeLimit = function() {
  alert("In SpatialFilter.js.resetMaxSizeLimit()");
  this.maxSizeLimit = 0;
  this.filterHasLimit = false;
  console.log("Leaving SpatialFilter.js.resetMaxSizeLimit()");
};
// // The following function is only for testing of getGeometry
// // We'll make "geometry" be based on a BBox/LatLngBounds object
// // and I guess it will be JSON.
// leaf.SpatialFilter.prototype.setGeometry = function(latLngBounds) {
//   //this.isBBoxAvailable = true;
//   this.isShapeActive = true;
//   this.bbox = latLngBounds;
//     // var geometryJsonString = "{shape: [";
//     // geometryJsonString += "{lat:" + this.bbox.bottom + ",lon:" + this.bbox.left + "},"; // lower left
//     // // geometryJsonString += "{lat:" + this.bbox.top + ",lon:" + this.bbox.right + "}"; // upper right
//     // geometryJsonString += "]}";
//   // }
//   // else {
//   //   geometryJsonString = "{shape: []}"; // I think the caller expects this rather than null
//   // }
// };
leaf.SpatialFilter.prototype.getGeometry = function() {
  var geometryJsonString = null;
  //if (this.isBBoxAvailable) {
  if (this.isShapeActive) {
    geometryJsonString = "{shape: [";
    geometryJsonString += "{lat:" + this.bbox.getSouth() + ",lon:" + this.bbox.getWest() + "},"; // lower left
    geometryJsonString += "{lat:" + this.bbox.getNorth() + ",lon:" + this.bbox.getEast() + "}"; // upper right
    geometryJsonString += "]}";
  }
  else {
    geometryJsonString = "{shape: []}"; // I think the caller expects this rather than null
  }
  if (this.isShapeActive) {
    console.log("Testing JSON output rather than construct JSON string: " +
        JSON.stringify({
          shape: [
            { // lower left
              lat: this.bbox.getSouth(),
              lon: this.bbox.getWest()
            },
            { // upper right
              lat: this.bbox.getNorth(),
              lon: this.bbox.getEast()
            }
          ]
        }, null, 2)
    );
  }
  else {
    console.log("Testing JSON out: " +
        JSON.stringify({
          shape: []
        }, null, 2)
    );
  }
  console.log("Leaving SpatialFilter.js.getGeometry(), returning " + geometryJsonString);
  return geometryJsonString;

};
// // this is purely for testing purposes
// leaf.SpatialFilter.prototype.setCentroid = function(centroid) {
//   this.centroid = centroid;
//   var ll = L.latLng(centroid.lat - 1, centroid.lng - 1);
//   var ur = L.latLng(centroid.lat + 1, centroid.lng + 1);
//   this.bbox = L.latLngBounds(ll, ur);
//   //this.isBBoxAvailable = true;
//   this.isShapeActive = true; // which one?  Difference?  If it's active, then the drawn shape (bbox?) should be available
// };
/**
 * Return the centroid for the spatial filter, in JSON string format, as defined in
 * SpatialQueryUtils.java or maybe SpatialFilterPlugin.java.
 * What the crud?  Why in JSON?  Why not just a simple LatLng object?
 */
leaf.SpatialFilter.prototype.getCentroid = function() {
  var centroidJsonString = null;
  if (this.isShapeActive) {
    centroidJsonString = "{shape: [";
    centroidJsonString += "{lat:" + this.bbox.getCenter().lat + ",lng:" + this.bbox.getCenter().lng + "}";
    centroidJsonString += "]}";
  }
  else {
    centroidJsonString = "{shape: []}"; // I think the caller expects this, rather than null
  }
  console.log("Leaving SpatialFilter.js.getCentroid returning centroid JSON: " + centroidJsonString);
  return centroidJsonString;
};
/**
 * Return the area in square meters (default) covered by the spatial filter bbox.
 */
leaf.SpatialFilter.prototype.getArea = function() {
//  if (this.isBBoxAvailable) {
//    return this.geodesicAreaSquareMeters;
//  }
//  return 0.0;
//   if (this.geodesicAreaSquareMeters == this.maxSizeInSquareMeters) { // what?
//     return 0.0;
//   }
  //return this.geodesicAreaSquareMeters; // wrong.  Need sqmiles, I think.
    
  if (this.isShapeActive) {
    return this.size;
  }
  else {
    return 0;
  }
};

// ??????????????????
// Why don't the following functions start with get or set?
// And why are these statics?  Changing them.
// ??????????????????

leaf.SpatialFilter.prototype.getNumberWithCommas = function(x) {
  console.log("In SpatialFilter.js.numberWithCommas(x)");
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

//returns the size of the selected area - used for validation
leaf.SpatialFilter.prototype.getSpatialFilterSelectedSize = function() {
  alert("In SpatialFilter.js.getSpatialFilterSelectedSize()");
//  return olMap.spatialFilter.geodesicAreaSquareMiles;
  return this.area;
};

//sets the maxSize of the filter in square miles and if the filter has a limit.
//convenience method called by OpenLayersMapImpl.java
leaf.SpatialFilter.prototype.setSpatialFilterLimits = function(maxSize, hasLimit) {
  alert("In SpatialFilter.js.setSpatialFilterLimits()");
  this.maxSizeInSquareMiles = maxSize;
  this.filterHasLimit = hasLimit;
};

//sets a flag if the filter needs to be limited in size.  Should be a "set" function
leaf.SpatialFilter.prototype.setSpatialFilterHasMaxSizeLimit = function(hasLimit) {
  console.log("In SpatialFilter.js.setSpatialFilterHasMaxSizeLimit()");
  this.filterHasLimit = hasLimit;
};

//sets the maxSize of the filter in miles.
leaf.SpatialFilter.prototype.setSpatialFilterMaxSize = function(maxSize) { // Rename this to setSpatialFilterMaxSize
  alert("In SpatialFilter.js.setSpatialFilterMaxSize()");
  this.maxSizeInSquareMiles = maxSize;
};
if (goog.DEBUG) console.log('SpatialFilter.js loaded.');
