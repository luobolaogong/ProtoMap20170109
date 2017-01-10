if (goog.DEBUG) console.log('test/GwtSim/Toolbar.js loading...');
goog.provide('testGwtSim.Toolbar');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarButton');
goog.require('goog.ui.ToolbarSeparator');
goog.require('goog.ui.ToolbarToggleButton');


function turnOnOffAppendResults(e) {
  var eventType = e.type;
  if (eventType !== 'action') { // I know this is bad.  Don't understand events yet.
    return;
  }
  var eventTargetState = e.target.getState();
  var activateAppend = (eventTargetState & goog.ui.Component.State.CHECKED) ? true : false;
  if (activateAppend) {
    console.log("test/GwtSim/Toolbar.js.turnOnOffAppendResults: Turning on Append Results");
    LeafletMapImpl.activateAppendResults();
    //LeafletMapImpl.activateAppendResults(); // this works and is more direct and doesn't rely on state in AppendResults.js
  }
  else {
    console.log("test/GwtSim/Toolbar.js.turnOnOffAppendResults: Turning off Append Results");
    LeafletMapImpl.deactivateAppendResults();
    //LeafletMapImpl.deactivateAppendResults(); // this works and is more direct and doesn't rely on state in AppendResults.js
  }
}
function turnOnOffMeasureTool(e) {
  var eventType = e.type;
  if (eventType !== 'action') { // I know this is bad.  Don't understand events yet.
    return;
  }
  var eventTargetState = e.target.getState();
  var activateMeasure = (eventTargetState & goog.ui.Component.State.CHECKED) ? true : false;
  if (activateMeasure) {
    console.log("test/GwtSim/Toolbar.js.turnOnOffMeasureTool: Turning on Measure control");
    LeafletMapImpl.toggleMeasureTool(); // this is the way it's done in MSAT
    //LeafletMapImpl.activateMeasureTool(); // this works and is more direct and doesn't rely on state in MeasureTool.js
  }
  else {
    console.log("test/GwtSim/Toolbar.js.turnOnOffMeasureTool: Turning off Measure control");
    LeafletMapImpl.toggleMeasureTool(); // this is the way it's done in MSAT
    //LeafletMapImpl.deactivateMeasureTool(); // this works and is more direct and doesn't rely on state in MeasureTool.js
  }
}

//testGwtSim.Toolbar.turnOnOffSpatialFilter = function (e) {
function turnOnOffSpatialFilter(e) {
  var eventType = e.type;
  if (eventType !== 'action') { // I know this is bad.  Don't understand events yet.
    return;
  }
  var eventTargetState = e.target.getState();
  var activateSpatialFilter = (eventTargetState & goog.ui.Component.State.CHECKED) ? true : false;
  if (activateSpatialFilter) {
    console.log("test/GwtSim/Toolbar.js.turnOnOffSpatialFilter: Turning on spatial filter control");
    LeafletMapImpl.setFilter(LeafletMapImpl.Filters.SPATIAL_FILTER, null, null);
  }
  else {
    console.log("test/GwtSim/Toolbar.js.turnOnOffSpatialFilter: Turning off spatial filter control");
//    LeafletMapImpl.clearFilter(); // necessary?  Maybe not.
//    console.log("test/GwtSim/Toolbar.js.turnOnOffSpatialFilter: Back from calling clearFilter, now calling setFilter");
    LeafletMapImpl.setFilter(LeafletMapImpl.Filters.SPATIAL_PLUS, null, null);
  }
  console.log("Leaving test/GwtSim/Toolbar.js.turnOnOffSpatialFilter");
}

function clearResults(e) {
  var eventType = e.type;
  if (eventType !== 'action') { // I know this is bad.  Don't understand events yet.
    return;
  }
  LeafletMapImpl.clearResults();
}

function resetMap(e) {
  var eventType = e.type;
  if (eventType !== 'action') { // I know this is bad.  Don't understand events yet.
    return;
  }
  LeafletMapImpl.resetView();
}

function getPopulation(e) {
  var eventType = e.type;
  if (eventType !== 'action') { // I know this is bad.  Don't understand events yet.
    return;
  }
  // Setup the test.  Results depend on if a spatial filter has been drawn

  LeafletMapImpl.setSpatialFilterHasMaxSizeLimit(true); // or name it setSpatialFilterLimitEnabled(true)
  LeafletMapImpl.setSpatialFilterMaxSize(60000);
  var spatialFilter = leaf.map.spatialFilter;

  console.log("Gunna try to get population and check spatial filter.");

  // We have to maintain a difference between when there's a drawn shape on the map
  // representing a spatial filter area, and when the draw controller is active (and
  // on the map).  This is because it's possible to have the controller on the map
  // when there's no drawn shape.  This happens after the controller becomes active
  // but before a shape is drawn, or after a shape is deleted.
  //
  // Therefore, "isActiveShape" means there's a spatial filter shape drawn on the map,
  // and it's characteristics (centroid, area/size, coordinate definition, and maybe
  // bounding box) are accessible and can be used.
  //
  // And "isSpatialFilterControlerActive" is for the controller.
  if (!spatialFilter.isShapeActive) {
    console.log("Sorry, an active spatial filter required; won't try to get population.");
    return;
  }
  // if (spatialFilterControl.isShapeActive) {
  //   console.log("Spatial filter control is active.");
  // }
  //if (spatialFilter.isBBoxAvailable) {
  //if (spatialFilter.isShapeActive) {
  //console.log("shape is available");
  console.log("Shape definition (currently bbox, but could be 3 points for a circle, or multiple points for poly): " + spatialFilter.bbox.toBBoxString());
  console.log("Centroid: " + spatialFilter.centroid);
  console.log("Area/Size: " + spatialFilter.size);
  //console.log("GeodesicAreaSquareMeters: " + spatialFilter.geodesicAreaSquareMeters);
  //console.log("geodesicAreaSquareMiles: " + spatialFilter.geodesicAreaSquareMiles);
  //}
  //console.log("maxSizeInSquareMiles: " + spatialFilter.maxSizeInSquareMiles);
  //console.log("maxSizeInSquareMeters: " + spatialFilter.maxSizeInSquareMeters);
  console.log("Max size limit: " + spatialFilter.maxSizeLimit);
  console.log("Has filter limit?: " + spatialFilter.filterHasLimit);
  if (spatialFilter.filterHasLimit) {
    if (spatialFilter.size > spatialFilter.maxSizeLimit) {
      console.log("You're over your limit.");
    }
    else {
      console.log("It's a good request, not over limit.")
    }
  }
}

function getPlume(e) {
  var eventType = e.type;
  if (eventType !== 'action') { // I know this is bad.  Don't understand events yet.
    return;
  }
  console.log("In Toolbar.js.getPlume(e), button clicked, so simulate clicking on CBRNE Events Display button with a selected event.");
  //var queryResultsCalloutsArray = testData.PlumeData;
  //leaf.features.addQueryResultsCallouts(queryResultsCalloutsArray);

  var plumesResultsString = goog.json.serialize(testData.PlumeData);
  LeafletMapImpl.setResults(plumesResultsString); // This will also wipe out any previously created markers, unless append is set.
  console.log("Leaving Toolbar.js.getPlume(e)");
}


function logEvent(e) {
  //console.log("In Toolbar.js logEvent(e)"); // happens every time cursor hovers over new button
  var eventType = e.type;
  if (eventType !== 'action') { // hack
    return;
  }
  var eventTargetId = e.target.getId();
  var eventTargetCaption = null;
  if (typeof e.target.getCaption == 'function' && e.target.getCaption()) {
    eventTargetCaption = e.target.getCaption();
  }
  var eventTargetState = e.target.getState();

  var activeState = (eventTargetState & goog.ui.Component.State.ACTIVE) ? true : false;
  var checkedState = (eventTargetState & goog.ui.Component.State.CHECKED) ? true : false;
  var selectedState = (eventTargetState & goog.ui.Component.State.SELECTED) ? true : false;

  console.log('Toolbar.js logEvent(): Event target ID: ' + eventTargetId + ', Caption: ' + eventTargetCaption // + '" eventType: ' + eventType // + ' state: ' + state
//                + ', Active: ' + activeState
      + ', Checked: ' + checkedState // this one only makes sense for checkboxes.  We want button press too
//                + ', Selected: ' + selectedState
  );
}

/**
 * @classdesc A Toolbar is something to behold.
 * @summary Constructor for a test.GwtSim.Toolbar object.
 * @description This constructor creates a test.GwtSim.Toolbar object.
 * @example var Toolbar = new test.GwtSim.Toolbar();
 * @protected
 * @constructor
 */
testGwtSim.Toolbar = function() {
  console.log('In test/GwtSim/Toolbar.js');

  var EVENTS = goog.object.getValues(goog.ui.Component.EventType);
  // this next one is the Google Closure Library Toolbar object, which is not part of Leaflet
  var toolbar = new goog.ui.Toolbar();

  var mtfFilterToggleButton = new goog.ui.ToolbarToggleButton('MTF Filter');
  mtfFilterToggleButton.setTooltip('MTF Filter');
  mtfFilterToggleButton.setChecked(false);
  toolbar.addChild(mtfFilterToggleButton, true);

  var spatialFilterToggleButton = new goog.ui.ToolbarToggleButton('Spatial Filter');
  spatialFilterToggleButton.setTooltip('Create Spatial Filter'); // later change this to "Delete Spatial Filter"
  spatialFilterToggleButton.setChecked(false);
  goog.events.listen(spatialFilterToggleButton, EVENTS, turnOnOffSpatialFilter);
  toolbar.addChild(spatialFilterToggleButton, true);

  var mgrsToggleButton = new goog.ui.ToolbarToggleButton('Append Results');
  mgrsToggleButton.setChecked(false);
  mgrsToggleButton.setTooltip('Append Results');
  goog.events.listen(mgrsToggleButton, EVENTS, turnOnOffAppendResults);

  toolbar.addChild(mgrsToggleButton, true);

  var appendResultsToggleButton = new goog.ui.ToolbarToggleButton('MGRS');
  appendResultsToggleButton.setChecked(false);
  appendResultsToggleButton.setTooltip('Show MGRS Grid');
  toolbar.addChild(appendResultsToggleButton, true);

  var measureToggleButton = new goog.ui.ToolbarToggleButton('Measure');
  measureToggleButton.setTooltip('Turn on Measure Tool');
  measureToggleButton.setChecked(false);
  goog.events.listen(measureToggleButton, EVENTS, turnOnOffMeasureTool);
  toolbar.addChild(measureToggleButton, true);

  toolbar.addChild(new goog.ui.ToolbarSeparator(), true);

  var showDetailsToolbarButton = new goog.ui.ToolbarButton('Show Details');
  showDetailsToolbarButton.setTooltip('Swap map with details page');
  toolbar.addChild(showDetailsToolbarButton, true);

  toolbar.addChild(new goog.ui.ToolbarSeparator(), true);

  var clearResultsToolbarButton = new goog.ui.ToolbarButton('Clear Results');
  clearResultsToolbarButton.setTooltip('Clear Results From Map');
  goog.events.listen(clearResultsToolbarButton, EVENTS, clearResults);
  toolbar.addChild(clearResultsToolbarButton, true);

  var resetMapToolbarButton = new goog.ui.ToolbarButton('Reset Map');
  resetMapToolbarButton.setTooltip('Reset Map');
  goog.events.listen(resetMapToolbarButton, EVENTS, resetMap);
  toolbar.addChild(resetMapToolbarButton, true);

  var getPopulationToolbarButton = new goog.ui.ToolbarButton('Get Population');
  getPopulationToolbarButton.setTooltip('Query Population using Spatial Filter');
  goog.events.listen(getPopulationToolbarButton, EVENTS, getPopulation);
  toolbar.addChild(getPopulationToolbarButton, true);

  var getPlumeToolbarButton = new goog.ui.ToolbarButton('Plume');
  getPlumeToolbarButton.setTooltip('Do a Plume');
  goog.events.listen(getPlumeToolbarButton, EVENTS, getPlume);
  toolbar.addChild(getPlumeToolbarButton, true);

//  goog.events.listen(mtfFilterToggleButton, EVENTS, testGwtSim.Toolbar.logEvent);
  goog.events.listen(mtfFilterToggleButton, EVENTS, logEvent);






//goog.events.listen(spatialFilterToggleButton, goog.ui.Component.EventType.CHANGE |goog.ui.Component.EventType.CHECK | goog.ui.Component.EventType.UNCHECK, logEvent);
//    goog.events.listen(spatialFilterToggleButton, EVENTS, logEvent);
  goog.events.listen(appendResultsToggleButton, EVENTS, logEvent);
  goog.events.listen(mgrsToggleButton, EVENTS, logEvent);
  goog.events.listen(measureToggleButton, EVENTS, logEvent);
  goog.events.listen(showDetailsToolbarButton, EVENTS, logEvent);
  goog.events.listen(clearResultsToolbarButton, EVENTS, logEvent);
  goog.events.listen(resetMapToolbarButton, EVENTS, logEvent);

  toolbar.render(goog.dom.getElement('toolbar'));
};

if (goog.DEBUG) console.log('test/GwtSim/Toolbar.js loaded');

// Notes:
//goog.events.listen(spatialFilterToggleButton, EVENTS, logEvent);
//   goog.events.listen(spatialFilterToggleButton, EVENTS, testGwtSim.Toolbar.turnOnOffSpatialFilter);
//   goog.events.listen(spatialFilterToggleButton, EVENTS, function (e) {
//     var eventType = e.type;
//     if (eventType !== 'action') { // I know this is bad.  Don't understand events yet.
//       return;
//     }
//     var eventTargetState = e.target.getState();
//     var activateSpatialFilter = (eventTargetState & goog.ui.Component.State.CHECKED) ? true : false;
//     if (activateSpatialFilter) {
//       console.log("Turning on spatial filter control");
//       LeafletMapImpl.setFilter(LeafletMapImpl.Filters.SPATIAL_FILTER, null, null);
//     }
//     else {
//       console.log("Turning off spatial filter control");
//       LeafletMapImpl.setFilter(LeafletMapImpl.Filters.SPATIAL_PLUS, null, null);
//     }
//
//   });
