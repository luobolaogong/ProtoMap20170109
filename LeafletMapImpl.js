if (goog.DEBUG) console.log('LeafletMapImpl.js loading...');
/**
 * @fileoverview This is the "gateway" JavaScript file that communicates with the
 * GWT/Java code found in LeafMapImpl.java. All function calls and communication
 * with the map component go through the JSNI code that's in LeafMapImpl.java,
 * and through this file.
 * <p/>
 * Any kind of testing of the map would also generally go through this file.  That is,
 * testing code could directly call functions in this file, and should not access
 * functions in any other JS file.
 * <p/>
 * Here's the communication:
 * <p/>
 * *.java (Server) || *.java (GWT) (Client) | LeafletMapImpl.java | LeafletMapImpl.js | leaf/*.js | Leaflet.js
 * <p/>
 * LeafletMapImpl is not a class.  It is a namespaced global Object.  The functions
 * defined on it are available to all.  However, the only functions that we need to
 * provide here are the ones that are listed as JSNI functions in LeafMapImpl.java.
 * And the functions here can be completely rewritten, as long as the signatures match
 * what's in the LeafMapImpl.java JSNI code.  So, this file need not look at all like
 * the OpenLayers counterpart OLMapImpl.js, except for the fact that function signatures
 * should match.  The OLMapImpl.js file contains several functions that are not used.
 * We do not have those functions here.
 *
 * The code here should really be considered prototype, and this file will probably be thrown away
 * if we use the right GWT replacement.
 * <p/>
 * TODO: Alphabetize these functions.
 */
goog.provide('LeafletMapImpl');
goog.require('goog.json'); // req?
goog.require('leaf.Map');

/**
 * "Entry Point":  This doesn't belong in this file.  Plus, it's JQuery.
 * <p/>
 * The following means "Execute the anonymous callback function when the DOM is ready to be used."
 * The "$()" is an alias for the highly overloaded jQuery function, where "function() { ...}"
 * is a callback to be executed.  This may be the same as "$(document).ready(function(){...});"
 * <p/>
 * So, the Map object creation won't happen until the DOM is ready.  But I don't know how
 * it knows it's ready, unless this function was in an HTML file which loaded files.  Perhaps
 * that HTML file loads this LeafletMapImpl.js function, in which case you'd think that it should
 * load this JS file last.  But I'm not sure.
 * <p/>
 * So, uncomment the following JQuery code when running inside MSAT.
 */
console.log("document.location.href is " + document.location.href);
var uniqueKeyForListener = goog.events.listenOnce(document, goog.events.EventType.LOAD, function() {
  console.log("In listener function for when the doc has been loaded and is ready");
}
);
console.log("In LeafletMapImpl.js, uniqueKeyForListener: " + uniqueKeyForListener);

if (goog.isFunction(window.parent.getMapLayerData)) { // this is a test.  We don't want this junk JQuery function outside of MSAT.
  $(function() {
    console.log("LeafletMapImpl.js, Bringing up the map by creating an instance of leaf.Map ...");
    leaf.map = new leaf.Map();
    console.log("LeafletMapImpl.js, The map should be up now.");
  });
}

/**
 * This is a placeholder class, for JSDoc purposes for now.
 * @protected
 * @constructor
 */
LeafletMapImpl = function() {
};


/** @type {number} Meters/Miles conversions.  These should not be here. */
LeafletMapImpl.SQ_METERS_PER_SQ_MILE = 2589988.110336;
LeafletMapImpl.METERS_PER_MILE = 1609.344;


/** @enum {number} These match the values in MapFilter.java */
LeafletMapImpl.Filters = {
  COUNTRY_FILTER: 0,
  MTF_FILTER: 1,
  SPATIAL_FILTER: 2,
  SPATIAL_PLUS: 3,
  COUNTRY_PLUS: 4,
  NO_FILTER: 5
};


///** @type {boolean} */
//LeafletMapImpl.isMeasureToolOn = false; // is this necessary now?


/**
 * This function is probably not called.
 * @param {boolean} activate
 */
LeafletMapImpl.activateElevation = function(activate) { //boolean
  alert('In JS LeafletMapImpl.activateElevation(activate)');
};


/**
 * Questionable whether this is ever called.
 * @param {Layer} layerData
 */
LeafletMapImpl.addLayer = function(layerData) {
  alert('In JS LeafletMapImpl.addLayer');
  leaf.map.layers.addLayer(layerData);
};


/**
 * Clear some kind of filter.  Probably means clear the spatial filter
 * Of course this crap isn't clear, and needs to be.  What does this mean clear filter?  Spatial filter?
 * If so, does it mean wipe out the drawn shape off the map, and reset coordinates and area sizes?
 * Also remove the controller from the map?  Why not just call "SpatialFilter.deactivate()"?
 * Is it because this function is only supposed to remove the shape off the screen?  Well, that can be
 * done by just clicking on the spatial filter button in the GWT panel.  Or is it important for some
 * reason to remove the drawn shape without removing the controller, or without turning off spatial filter
 * in the GWT panel?  I don't think so.  I think that this function probably should not be called.
 * I think it's an artifact of OpenLayers implementation.
 */
LeafletMapImpl.clearFilter = function() {
  console.log('In LeafletMapImpl.js.clearFilter().  Remove the spatial filter controller?  The shape?  Do it in controller when get callback?');
  //leaf.map.spatialFilter.deleteBBox();
  //leaf.map.spatialFilter.drawnItemsFeatureGroup.removeLayer(drawControlShapeObject); // won't work but need this.
  leaf.map.spatialFilter.removeDrawnShape();
  console.log("Leaving LeafletMapImpl.js.clearFilter()");
};


/**
 * This function is probably never called.  In the OpenLayers version it did
 * nothing, but it existed for some reason in the past.  If it is ever called
 * it may make sense to remove markers, plumes and locations.
 */
LeafletMapImpl.clearLayers = function() {
  leaf.map.features.removeMarkers();
  leaf.map.features.removePlumes();
  leaf.map.features.removeLocations();
};


/**
 * Markers are a result of Results (callouts and tracks), so remove markers at least.
 * Plumes do come from Results, specifically callouts with geometry, so remove them.
 * Locations are not from Results, so don't remove them.
 */
LeafletMapImpl.clearResults = function() {
  leaf.map.features.removeMarkers(); //
  leaf.map.features.removePlumes(); //
};


/**
 * Disable drawing.  This probably has to do with the spatial filter.
 */
LeafletMapImpl.disableDraw = function() {
  console.log('InJS LeafletMapImpl.disableDraw, which maybe means turn off spatial filter?  Or stop drawing?');
  //leaf.map.spatialFilter.spatialFilterDrawControl.deactivate();
  console.log("Leaving LeafletMapImpl.disableDraw()");
};


/**
 * Disable scrolling.  I don't now what this is about.
 */
LeafletMapImpl.disableScrolling = function() {
  alert('In JS LeafletMapImpl.disableScrolling()');
};


/**
 * Enable scrolling.  I don't know what this is about.
 */
LeafletMapImpl.enableScrolling = function() {
  alert('In LeafletMapImpl.enableScrolling');
};


/**
 * This function is called from ResultsGridPanel.xxx() and it expects
 * to get back a string of the form "<lat>:<lng>", or null.  The location
 * is based on the leafletMarker of the most recent set, that is closest to the
 * eyepoint.  But, if they call leaf.MapImpl.clearResults() first, then
 * there are no markers available!  This appears to be a timing issue.
 *
 * Whatever calls this, seems to make the following calls in this order:
 * clearResults, fetchNearestMarker, zoomToLocation, setResults.  That's
 * a strange order, because after you clearResults, there are no markers
 * around to fetch, or zoom to.
 *
 * Check out ResultsGridPanel.
 * @return {Marker} the nearest marker
 */
LeafletMapImpl.fetchNearestMarker = function() {
  alert('In LeafletMapImpl.fetchNearestMarker()');
  //return leaf.map.resultsLayer.fetchNearestMarker();
  return null;
};


/**
 * Get the centroid of the spatial filter.
 * Who calls this?  
 *
 * @return {string} centroid The centroid's coordinates as JSON shape
 */
LeafletMapImpl.getCentroid = function() {
  console.log('In LeafletMapImpl.js.getCentroid()');
  var spatialFilterCentroid = leaf.map.spatialFilter.getCentroid();
  return spatialFilterCentroid;
};


/**
 * Get the geometry of something.  Probably means the spatial filter.
 * @return {null}
 */
LeafletMapImpl.getGeometry = function() {
  console.log('In LeafletMapImpl.getGeometry(), doing nothing but returning empty shape for now.');
  var spatialFilterGeometry = leaf.map.spatialFilter.getGeometry();
  return spatialFilterGeometry;
  //return '{shape: []}';
};


/**
 * Get the spatial filter area in square miles.  This is a spatial filter thing.
 * @return {null}
 */
LeafletMapImpl.getSpatialFilterAreaInSquareMiles = function() {
  // console.log('InJS LeafletMapImpl.getSpatialFilterAreaInSquareMiles');
  // var areaInSqMeters = leaf.map.spatialFilter.getArea();
  // if (typeof areaInSqMeters == 'number') {
  //   return areaInSqMeters / LeafletMapImpl.SQ_METERS_PER_SQ_MILE;
  // }
  // return null;
  var areaSqMiles = leaf.map.spatialFilter.getArea(); // assumes we're in sq miles already
  if (goog.isNumber(areaSqMiles)) {
    return areaSqMiles;
  }
  return null; // ??  who gets this? LeafletMapImpl.java.getFilterSelectedSize()

};


/**
 * Unnecessary function now that the applet is gone?
 * @param {string} queryId
 */
LeafletMapImpl.jobQueryComplete = function(queryId) {
  alert('In JS LeafletMapImpl.jobQueryComplete(queryId): ' + queryId);
};


/**
 * The specification for this method is that it returns "true" or "false" as a string, and
 * if the coordinate is valid, (according to the spec "MSAT Coordinate Locate Functional
 * Specification" of October 6th, 2010, as referenced in FB 17876), then we also pan/zoom to it.
 * 
 * Maybe we should also be placing a marker at the coordinate.  Supposedly we used to do that.
 * 
 * The parsing of user input coordinates could be much less restrictive, but we follow the spec.
 *
 * @param {string} coordinate a "raw" string coordinate, as input by user, for diff coord systems and formats
 * @return {boolean} whether or not the input coordinate could be parsed and was legal
 */
LeafletMapImpl.locateCoordinate = function(inputCoordString) {
  console.log("In LeafletMapImpl.js.locateCoordinate(" + inputCoordString + "), will call Location.coord2LatLng(rawCoordString)");
  var latLng = Location.coord2LatLng(inputCoordString);
  // LeafletMapImpl.java JSNI locationCoordinate wants indication of valid input
  if (goog.isNull(latLng)) {
    return 'false';
  }
  var leafletMarker = L.marker(latLng, {
    title: inputCoordString,
    alt: "zoomToLocation"
  });
  leaf.map.features.Markers.markersGroup.addLayer(leafletMarker);
  leaf.map.leafletMap.setView(latLng, this.DEFAULT_ZOOM, {animate: true});
  console.log("Leaving LeafletMapImpl.js.locateCoordinate(inputCoordString) and return true");
  return 'true';
};

/**
 * Log an error.  For now, this goes to console.log
 * @param {string} logString
 */
LeafletMapImpl.log = function(logString) {
  console.log(logString); // temporary until decide where to send this.
};


/**
 * Log an error.  For now, this goes to console.error
 * @param {string} errorString
 */
LeafletMapImpl.logError = function(errorString) {
  console.error(errorString); // temporary until decide where to send this.
};


/**
 * Changes the internal order in the LayerList.  Probably not used.
 * @param {number} oldIndex actually not sure if integer or something else
 * @param {number} newIndex
 */
LeafletMapImpl.moveLayer = function(oldIndex, newIndex) { // int int
  alert('In JS LeafletMapImpl.moveLayer(oldIndex, newIndex)');
};


/**
 * This function is called when there's a change to the Map Controls Panel's
 * controls, for example when a layer is checked or unchecked.
 *
 * I assume that what this is supposed to do is notify the map that it needs
 * to change the leafletLayers that are displayed.  In Leaflet we have a single
 * basemap that is active, and then we have overlays on top of it.  This model
 * seems different from what WorldWind had: It seemed we could have multiple
 * "basemaps" active, and the one you saw was the one with the greatest Z
 * value.  And if there were holes, you could see through that hole to a layer
 * below it.  You could turn all basemaps off if you wanted, and you'd have a
 * black earth.  I assume you can do something similar in Leaflet where
 * you still have your single basemap, which can be swapped out for something
 * different, but you can turn on and off the overlays.  And most of our leafletLayers
 * will be overlays, if not all by a single basemap.
 * So, this function probably causes the map to swap the basemap, or add or
 * subtract the overlay leafletLayers.
 *
 * The key to what this is supposed to do is probably found in PluggableMapCanvas.java
 *
 * Looks like this method is getting called multiple times for the same layer
 * when you click "Clear Imagery" or "Clear Maps".  That logic, wherever it is
 * needs to be seriously looked at.
 *
 * @param {boolean} viewable indicates whether the check box is checked or not
 * @param {string} layerName is the text associated with a layer
 */
LeafletMapImpl.notifyViewable = function(viewable, layerName) {
  switch (layerName) {
    case 'mgrs-grid':
      //leaf.map.layers.setLayerVisibility(leaf.map.layers.mgrsIndex, viewable);
      break;
  }
};


/**
 * Remove a layer from the map.  Probably not used.
 * @param {number} index Actually, not sure what type this is
 */
LeafletMapImpl.removeLayer = function(index) {
  alert('In JS LeafletMapImpl.removeLayer(index)');
};


/**
 * Render a spatial query.  I have no idea what this means.
 * @param {number} lowerLat
 * @param {number} leftLong
 * @param {number} upperLat
 * @param {number} rightLong
 */
LeafletMapImpl.renderSpatialQuery = function(lowerLat, leftLong, upperLat, rightLong) { //double double double double
  alert('In leaf.MapImpl.renderSpatialQuery(lat, lng, uplat, rightlng)');
};


/**
 * Set the view back to the default, whatever that is.  0,0 level 2, probably.
 */
LeafletMapImpl.resetView = function() {
  leaf.map.resetView();
};


/**
 * Select the base layer indicated by the index.  This essentially swaps the new one in,
 * and the old one out from the Leaflet map.
 * @param {number} index Okay, what is the real type here?
 */
LeafletMapImpl.selectBaseLayer = function(index) {
  alert('In LeafletMapImpl.selectBaseLayer, index is ' + index);
  leaf.map.layers.selectBaseLayer(index);
};


/**
 * This function probably has something to do with callout popup content,
 * (because of "L2" as in "level 2"?) but maybe not.
 * @param {string} data probably of type string.  Check.
 */
LeafletMapImpl.setL2Results = function(data) {
  alert('LeafletMapImpl.setL2Results not yet implemented.  data: ' + data);
};


/**
 * This function acts upon a filter tool change.  It may cause the spatial filter
 * to activate, or turn off, or just cause the MTF filter information to display.
 * This function may be unused.  Don't know yet.
 *
 * @param {enum} toolId
 * @param {*} buffer Unused
 * @param {*} filterInfo Unused
 */
LeafletMapImpl.setFilter = function(toolId, buffer, filterInfo) {
  console.log('InJS LeafletMapImpl.setFilter(), toolId: ' + toolId + ' buffer: ' + buffer + ' filterInfo: ' + filterInfo);
  switch (toolId) {
    case LeafletMapImpl.Filters.MTF_FILTER:
      console.log("In LeafletMapImpl.js.setFilter, cae MTF_FILTER");
      //leaf.map.overlays.setMtfOverlay(filterInfo);
      break;
    case LeafletMapImpl.Filters.SPATIAL_FILTER:
        console.log("In LeafletMapImpl.js.setFilter, case SPATIAL_FILTER");
      //leaf.map.spatialFilter.activateBBox();
        leaf.map.spatialFilter.activate();
      break;
    case LeafletMapImpl.Filters.NO_FILTER:
      console.log("In LeafletMapImpl.js.setFilter, cae NO_FILTER");
      LeafletMapImpl.disableDraw();
      LeafletMapImpl.clearFilter();
      break;
    case LeafletMapImpl.Filters.SPATIAL_PLUS: // click on spatial X
      console.log("In LeafletMapImpl.js.setFilter, case SPATIAL_PLUS");
      //LeafletMapImpl.disableDraw();
      //LeafletMapImpl.clearFilter();
        leaf.map.spatialFilter.deactivate(); // new
      break;
    case LeafletMapImpl.Filters.COUNTRY_PLUS: // click on arrow
      console.log("In LeafletMapImpl.js.setFilter, cae COUNTRY_PLUS");
      console.log("In LeafletMapImpl.js.setFilter, and we have some kinda filter or no filter, and will call disableDraw and clearFilter");
      LeafletMapImpl.disableDraw();
      LeafletMapImpl.clearFilter();
      break;
    case LeafletMapImpl.Filters.COUNTRY_FILTER:
      console.log("In LeafletMapImpl.js.setFilter, cae COUNTRY_FILTER");
      /*falls through*/
    default:
      console.log("In LeafletMapImpl.js.setFilter, case default");
      console.log('LeafletMapImpl.setFilter(): toolId is ' + toolId + ' No implementation yet.');
      LeafletMapImpl.clearFilter();
  }
};


/**
 * This method can be called to reassemble the parts of "results" that are
 * broken up by ResultsDataStore.passDataToMap() and sent in "parts".
 * This may be prone to error, as it assumes there will be an ordered series
 * of calls to this function to reconstruct the whole.
 *
 * @param {number} key double an index for the entire results set
 * @param {number} partNumber int The segment number for this part of the results
 * @param {number} totalParts int The total number of segments/parts expected
 * @param {string} partContent String The actual JSON content of this segment/part
 */
LeafletMapImpl.setPartResults = function(key, partNumber, totalParts, partContent) {
  console.log('InJS LeafletMapImpl.setPartResults');
  if (LeafletMapImpl.setPartResults.key != key) {
    if (LeafletMapImpl.setPartResults.reconstructedResultsString !== '') {
      alert("LeafletMapImpl.setPartResults(): Didn't finish the previous reconstruction before new results parts arrived.");
    }
    LeafletMapImpl.setPartResults.key = key;
    LeafletMapImpl.setPartResults.reconstructedResultsString = '';
  }
  LeafletMapImpl.setPartResults.reconstructedResultsString += partContent;
  if (partNumber >= totalParts - 1) {
    LeafletMapImpl.setResults(LeafletMapImpl.setPartResults.reconstructedResultsString);
    LeafletMapImpl.setPartResults.reconstructedResultsString = '';
    LeafletMapImpl.setPartResults.key = null;
  }
};


/**
 * Static to help keep string state between function calls.
 * @type {string}
 */
LeafletMapImpl.setPartResults.reconstructedResultsString = '';


/**
 * Looks like this is just a mechanism to keep track of whether a part is part of the previous whole or not.
 * @type {*} basically just a name for a set of results
 */
LeafletMapImpl.setPartResults.key = null;


/**
 * Sets the query results count.
 *
 * @param {number} count The number of query results
 */
LeafletMapImpl.setQueryResultsCount = function(count) {
  leaf.map.setQueryResultsCount(count);
};


/**
 * This function, setResults, is used to display different kinds of
 * elements on the map.  It is called by leaf.MapImpl.setResults(String data).
 *
 * The results that get passed in are formatted as JSON data, which is string and not an Object.
 *
 * Whether to append or not should have been passed in, but we reach back to grab it.
 * @param {JSON} queryResultsAsJsonString The results from some query
 */
LeafletMapImpl.setResults = function(queryResultsAsJsonString) {
  var append = goog.isFunction(window.parent.isAppendResults) ? window.parent.isAppendResults() : true;
  // Should reset the count of visible features before processing results?
  if (!append) {
    LeafletMapImpl.clearResults(); }
  if (!goog.isDefAndNotNull(queryResultsAsJsonString)) {
    alert('LeafletMapImpl.setResults(): No results string passed in.');
    return;
  }
  //
  // Create an Object from the JSON string to work with it easier.
  //
  var resultsObj = goog.json.parse(queryResultsAsJsonString);
  var resultsTracksArray = resultsObj.Results.tracks;
  // an array of raw results, which is part of what was provided by server, but not an array of Callout objects
  var resultsCalloutsArray = resultsObj.Results.callouts;
  leaf.map.setQueryResultsCount(resultsTracksArray.length + resultsCalloutsArray.length);
  if (resultsTracksArray.length > 0) {
    console.log('Ignoring tracks for now.');
  }
  if (resultsCalloutsArray.length > 0) {
    leaf.map.features.addQueryResultsCallouts(resultsCalloutsArray); // should be called addQueryResultsFeatures()
  }
};

// // This is brand new.  Seems to be missing previously, and there was maybe a workaround
// // And there was a call to LeafSpatialFilter.js.setSpatialFilterLimits().  Probably
// // there was an OpenLayersSpatialFilter.js file.
// LeafletMapImpl.setSpatialFilterLimits = function(squareMiles) {
//   alert('InJS LeafletMapImpl.setSpatialFilterMaxSize, squareMiles: ' + squareMiles);
//   leaf.map.spatialFilter.setMaxSizeInSquareMiles(squareMiles);
// };

// This is a strange function.  Has to be here, because it's in LeafletMapImpl.java
LeafletMapImpl.setSpatialFilterLimits = function(maxSize, hasMaxSizeLimit) {
  this.setSpatialFilterHasMaxSizeLimit(hasMaxSizeLimit);
  this.setSpatialFilterMaxSize(maxSize);
};

// This is brand new.  Seems to be missing previously, and there was maybe a workaround
// And there was a call to LeafSpatialFilter.js.setSpatialFilterLimits().  Probably
// there was an OpenLayersSpatialFilter.js file.  So, what's the diff between this function and next?
LeafletMapImpl.setSpatialFilterHasMaxSizeLimit = function(hasMaxSizeLimit) {
//  console.log('LeafletMapImpl.js.setSpatialFilterHasMaxSizeLimit: ' + hasMaxSizeLimit);
  leaf.map.spatialFilter.setSpatialFilterHasMaxSizeLimit(hasMaxSizeLimit); // What? 
};
/**
 * Establishes the spatial filters maximum size allowed.
 * @param {number} squareMiles
 */
LeafletMapImpl.setSpatialFilterMaxSize = function(squareMiles) {
  console.log('In LeafletMapImpl.js.setSpatialFilterMaxSize, squareMiles: ' + squareMiles); // what the heck?
  //leaf.map.spatialFilter.setMaxSizeInSquareMiles(squareMiles);
  leaf.map.spatialFilter.setMaxSizeLimit(squareMiles);
};

/**
 * Looks like this is the function that gets called when you want to swap layers
 * Maybe it's only for overlay layers.  This can be triggered when a checkbox is
 * checked, or unchecked,, or when the MGRS button is clicked.  How about Weather?
 * So, this appears to only be involved in overlays.
 * So, what actually removes the layer if checked is false?
 * @param {string} index The layer index.  I think this is a string, not sure.
 * @param {boolean} checked whether the check box was checked or unchecked
 */
LeafletMapImpl.toggleLayer = function(index, checked) {
  console.log('Not sure that we should be calling setLayerVisibility for every kind of layer.  MGRS?');
  leaf.map.layers.setLayerVisibility(index, checked);
};


/**
 * leafletMapImpl.java has a toggleMeasureTool method, and it calls this method.
 * MeasureToolbar.java defines a toggle button for turning on and off the measure
 * tool. We try to keep IMap.java, and leaf.MapImpl.java unchanged, so we put
 * the state in MeasureTool.js.
 */
LeafletMapImpl.activateMeasureTool = function() {
  console.log('In JS LeafletMapImpl.activateMeasureTool');
  leaf.map.measureTool.activate();
};

LeafletMapImpl.deactivateMeasureTool = function() {
  console.log('In JS LeafletMapImpl.deactivateMeasureTool');
  leaf.map.measureTool.deactivate();
};

/**
 * leafletMapImpl.java has a toggleMeasureTool method, and it calls this method.
 * MeasureToolbar.java defines a toggle button for turning on and off the measure
 * tool. We try to keep IMap.java, and leafletMapImpl.java unchanged, so we put
 * the state in MeasureTool.js in isControllerActive.  The toggle button knows
 * the state, and it should just call activate or deactivate.
 */
LeafletMapImpl.toggleMeasureTool = function() {
  console.log('In JS LeafletMapImpl.toggleMeasureTool, calling MeasureTool.js.toggleMeasureTool()');
  leaf.map.measureTool.toggleMeasureTool();
};

LeafletMapImpl.activateAppendResults = function() {
  console.log('In JS LeafletMapImpl.activateAppendResults');
  window.parent.isAppendResults = true; // this is used in setResults()
  //leaf.map.AppendResults.activate();
};

LeafletMapImpl.deactivateAppendResults = function() {
  console.log('In JS LeafletMapImpl.deactivateAppendResults');
  window.parent.isAppendResults = false; // this is used in setResults()
  //leaf.map.AppendResults.deactivate();
};



/**
 * Pan and zoom to the location specified by the latitude and longitude specified,
 * and if a locationName is specified, then also place a leafletMarker there.  This method
 * merely calls the same function in leaf.Map.  This method can be called from
 * ResultsGridPanel.zoomToLocation(lat,lng), and it does NOT want another marker
 * placed.
 *
 * @param {number} latitude in decimal degrees
 * @param {number} longitude in decimal degrees
 * @param {string=} opt_locationName
 */
LeafletMapImpl.zoomToLocation = function (latitude, longitude, opt_locationName) {
  //leaf.Map.zoomToLocation(latitude, longitude, opt_locationName);
  leaf.map.zoomToLocation(latitude, longitude, opt_locationName);
};


/**
 * I think at one time this function would find the closes marker to the eyepoint.
 * Not sure it's used any more, because I don't think it makes sense.
 */
LeafletMapImpl.zoomToNearestMarker = function() {
  alert('In LeafletMapImpl.zoomToNearestMarker()');
  //leaf.Map.resultsLayer.zoomToNearestMarker();
};

if (goog.DEBUG) console.log('LeafletMapImpl.js loaded');


