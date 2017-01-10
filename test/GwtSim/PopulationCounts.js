if (goog.DEBUG) console.log('(GwtSim/)PopulationCounts.js loading...');
goog.provide('testGwtSim.PopulationCounts');

// The idea here is to simulate a populuation count query, requiring a spatial filter,
// and insuring it is not too large an area.
// There's a panel, and in the panel some text, and a button, and some warning text.
//
// Text explanation: "To see pop counts, draw a xx, constrained to 60,000".
// Text warning "Spatial Filter must be applied..." and "Exceeds limit" or something.
// "Display>>" button to start the query.
//
// There will be a check to see if there is a spatial filter drawn, and if it is less
// than 60,000.  The attributes of the filter, (bbox, and area) are made available for checking
// area, and sending the bbox coords to the db.
//
// The population results should be passed back somewhere.
//
// There's code at msat-portlet/src/com/akimeka/web/client/accordion/visibility/PVPopulationPanel.java
// with methods onSubmit(event), and validate().
//
// In AccordionFormPanel.java is validateSpatialFilter() which just checks if the spatial filter has
// some geometry information, by calling SpatialQueryUtils.getSpatialFilterGeometry().
//
// Wow, what's SpatialQueryUtils?  It's a class containing two static methods:
// getSpatialFilterGeometry(), and getSpatialFilterCentroid().  Those guys get their info
// from MapFactory.getMapImpl().getGeometry(), and getCentroid().  So, it's important that
// the new spatial filter puts its results somewhere that's accessible from there.  Probably
// in SpatialFilter.js
testGwtSim.PopulationCounts = function() {
  var explanationText = "To see pop counts draw something less than 60k sqmi";
  var displayButton = new goog.ui.Button();
  var maxAreaSize = 60000;
  var population = 0;
};
testGwtSim.PopulationCounts.prototype.getPopulation = function() {
  this.population = 123456;
};
testGwtSim.PopulationCounts.prototype.getSpatialFilterGeometry = function() {
  var geometry = spatialFilter.getGeometry();
};
testGwtSim.PopulationCounts.prototype.getSpatialFilterCentroid = function() {
  var centroid = spatialFilter.getCentroid();
};
testGwtSim.PopulationCounts.prototype.getSpatialFilterArea = function() {
  var area = spatialFilter.getArea();
};
testGwtSim.PopulationCounts.prototype.validate = function() {
  // something is available
  // the size is within limits
};

if (goog.DEBUG) console.log('(GwtSim/)PopulationCounts.js loaded.');
