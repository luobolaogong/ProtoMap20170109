if (goog.DEBUG) console.log('Layers.js loading...');
/**
 * @fileoverview  This file defines the class leaf.Layers, and keeps track of groups of layers
 * for use by leaf.Map.  It relies on the definition and creation of leaf.Layer objects, as found
 * in Layer.js.
 * <p/>
 * Weather layers will probably want to have a legend.  Check this out as a possibility of having multiple
 * weather layer legends available: https://github.com/yohanboniface/Leaflet.TileLegend
 * Another possibility for weather legends is a dialog box: http://nbtsolutions.github.io/Leaflet.Dialog/
 */
goog.provide('leaf.Layers');
goog.require('goog.dom');
goog.require('leaf.Layer');
goog.require('leaf.Legends');


/**
 * @classdesc The Layers class ("leaf.Layers") maintains a set of layers that are created when the Map
 * is created, and layers are not added to that list of layers thereafter, or deleted from it.
 * It relies on the definition and creation of leaf.Layer objects, as found
 * in Layer.js.
 * <p/>
 * One of the first things that should be done, if it has not been done already, is to make sure
 * we have access to the tile/layer resources.  We don't want the map to start requesting tiles,
 * like about 9 per view all at once, without first making sure we have access.  If we don't,
 * we could get multiple authentication requests, one for each tile.
 * <p/>
 * GVS has their own authentication
 * process called Axis something or other, and every tile request goes through this process.  It sets a
 * cookie so that it speeds up access after authenticating, but still, every tile request is
 * checked for authorization.  Maybe on SIPR Axis doesn't get involved, but I doubt it;  There
 * may still be some kind of authentication process per tile.  (Check on this.)  As far as I know,
 * GVS doesn't have an "authorizeMe" service you can request before you make tile requests.
 * <p/>
 * We have therefore just been requesting the same tile (256x256 image), from the same layer every
 * time MSAT map portlet is started, or restarted, and once the tile has been received, we move forward.
 * (And there is no special caching, right?)
 * <p/>
 * There should be an initial shallow layer we serve up
 * from our own map tile server that does not require GVS access or authorization, and in the background
 * GVS can be accesses, and CAC request made (if not on SIPR), and if authorizatino fails, we'll still
 * have a layer and the portlet would still work.  Otherwise, the map portlet is dead.
 * <p/>
 * All of the layers that are kept track of here are raster TileLayer object.  Leaflet has other
 * kinds of layers, such as markers, surprisingly.  We currently do not keep track of markers here.
 * <p/>
 * There are only three main functions here, which have to do with which layers are visible.  They
 * could probably be simplified.
 * <p/>
 * Leaflet does support stacking of layers, and you can change their order.  At this time we're only
 * allowing one base layer to be attached to the map at a time, which means when a new base layer is
 * selected, we remove the old one from the map.  This happens without flicker.  Also, I
 * don't know about the memory burden or slowdown on the map if we had all base layers and all
 * overlays attached to the map at one time and just change their stacking order when a new base layer is selected.
 * This would probably be less complicated than how we currently do it.
 * <p/>
 * dbLayersData is an array of JSON objects, each describing a layer, using parameter values mostly
 * from the database layer tables MSAT.LAYER_PARAMETER and MSAT.MAP_LAYER, but constructed by a
 * complicated set of methods, near the top of which are MapLayerBO.fetchMapLayerCategories(),
 * and loadLayerParameters() but also includes MapLayerUtility.parseLayerJSONArray and
 * MapControlsAccordionPanel.fetchedResults and MapLayerQuery.  There are actually 4 tables that
 * are involved in managing layers, and they are not straight forward:
 * <p/>
 *   The "LAYER_PARAMETER" table has has these "parameter type" fields:
 *   <ul>
 *     <li> url (string)</li>
 *     <li> params (strings of form "field":"value" separated by commas)</li>
 *     <li> base (t/f) (seems to conflict with "isBaseLayer" below)</li>
 *     <li> overview (t/f -- whether to be used for the overview map or not)</li>
 *     <li> hidden (t/f -- enabled or not?)</li>
 *     <li> "url_" is usually a url_ up to the point where params would come, but in the case of
 weather, all the params are part of the url_.</li>
 *   </ul>
 *   "params" can have these fields and values, but others could be added:
 *   <ul>
 *     <li> layers (strings, comma sep)</li>
 *     <li> format ("PNG" is all I've seen)</li>
 *     <li> isBaseLayer, (t/f) (Seems to conflict with "base" above)</li>
 *     <li> transparent (t/f)</li>
 *   </ul>
 * <p/>
 * The "MAP_LAYER" table has two fields:
 *   <ul>
 *     <li> MAP_LAYER_NAME (Used in the layer list in the UI)</li>
 *     <li> MAP_LAYER_TYPE ("ArcGISCache", "WMS", "ArcGIS93Rest")</li>
 *   </ul>
 * <p/>
 * Questions: What the difference is between "base" and "isBaseLayer"?
 * What does "hidden" mean, and how is that related to "Enabled" and "Visible"?
 * Does "hidden" mean it's not supposed to go into the list in the UI?  Like MGRS
 * and overview layers?  Probably.
 *
 * @summary
 * Creates a leaf.Layers object, which holds lists of layers.
 *
 * @description
 * This is the constructor for creating the object that keeps track of layers.
 *
 * @example var layers = new leaf.Layers();
 *
 * @constructor
 */
leaf.Layers = function() {
  //console.log("Creating a legends object, which I guess holds legend elements");
  this.legends = new leaf.Legends(); // experimental
  //this.legendsLinkedMap = new goog.
  /**
   * layersDataArray is an array of layer data elements from window.parent.getMapLayerData().
   * This array is used to create layers, and comes from database layer tables (4 of them), along
   * with some manipulation along the way until we get them from calling getMapLayerData.  This array
   * has a bias toward OpenLayers layer constructors.
   * <p/>
   * A test version of this array exists for when testing outside of MSAT.
   * @type {Array.<JSON>}
   * @protected
   */
  this.layersDataArray = null;
  if (goog.DEBUG) {
    if (goog.isFunction(window.parent.getMapLayerData)) {
      this.layersDataArray = window.parent.getMapLayerData();
    }
    else {
      this.layersDataArray = testData.LayersData; // assumes test/data/LayersData.js has been loaded
    }
  }
  else {
    this.layersDataArray = window.parent.getMapLayerData();
  }
  /**
   * "indexedLayersList" is an array of leaf.Layer objects that can be "indexed" by a layerId.  It
   * is not the same array as this.layersDataArray; This is an array of leaf.Layer objects, and the
   * other is just parameters and options from the database tables.  This list is an object, rather than
   * an array, but mostly it's accessed as if it were an array.  This should be fixed.
   * <p/>
   * This list contains ALL layers, whether they are base, or overlay, or "hidden" (MGRS, overview?)
   * So, we don't want to create a layers control using all of them, particularly the "hidden" ones.
   * @protected
   * @type {Array.<leaf.Layer>}
   */
  this.indexedLayersList = this.createLayers();
  /**
   * This layer is used in the overview window, displayed with the plugin MiniMap.  It is selected when
   * it has the paremeter "isOverview".
   * @protected
   * @type {leaf.Layer}
   */
  this.overviewLayer = this.createOverviewLayer(); // need actual new instance, not a layerId
  /**
   * This is the initial base layer to be used when the map comes up.  The map should come up with no layer showing if
   * one is not designated as "enabled"..
   * @protected
   * @type {leaf.Layer}
   */
  this.baseLayer = this.findFirstEnabledBaseLayer(); // This does not create a copy.  It's a reference into array.
};


/**
 * Creates the leaf.Layer objects that are used by the map as either base or overlay layers.  These are created
 * from the array of layer data objects, and returned in an object.  This method is called when the map is created
 * and not after that.
 *
 * @return {Object} An object containing a set of properties named by layerId where each value is a leaf.Layer objects
 * @protected
 */
leaf.Layers.prototype.createLayers = function() {
  var indexedLayersList = {};
  for (var arrayIndex = 0; arrayIndex < this.layersDataArray.length; arrayIndex++) {
    var jsonLayer = this.layersDataArray[arrayIndex];
    var layer = new leaf.Layer(jsonLayer); // this also establishes an layerId
    indexedLayersList[layer.name] = layer; // So, rather than unique id for every one created, gunna try indexing by layer name
  }

  // // The following is a test
  // var wmsLayer = L.tileLayer.wms('http://demo.opengeo.org/geoserver/ows?', {
  //   layers: 'nasa:bluemarble'
  // });
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxMaybe created a special wms layer blue marble: " + wmsLayer.name);
  // indexedLayersList["fritz" + wmsLayer.name] = wmsLayer;

  return indexedLayersList;
};


/**
 * Finds and returns the first base layer marked enabled.
 * @protected
 * @return {?leaf.Layer} The first layer found that is an enabled base layer
 */
leaf.Layers.prototype.findFirstEnabledBaseLayer = function() {
  for (var layerIndex in this.indexedLayersList) {
    var layer = this.indexedLayersList[layerIndex];
    if (layer.isBaseLayer && layer.isEnabled) {
      return layer;
    }
  }
  //
  // If there is no enabled base layer, that's an error in the layer data coming
  // from the database, etc., and then the map would have no layer to use, and
  // the map could not be created.  So, we'll try to recover by selecting the
  // first layer found in the list.
  //
  for (var firstLayerIndex in this.indexedLayersList) {
    return this.indexedLayersList[firstLayerIndex];
  }
  console.error('Could not find an initial layer for the map');
  return null; // this is trouble.  Leaflet.map will not be created.
};


/**
 * Create a new layer instance for the overview "minimap" control.  The layer used in the overview control
 * must be a different instance than one used as a base or overlay layer.  If no layer can be found that's
 * marked as "overview", then return null, and the control will not be created.
 *
 * @return {?leaf.Layer} A layer to be used as the overview layer
 * @protected
 */
leaf.Layers.prototype.createOverviewLayer = function() {
  for (var arrayIndex = 0; arrayIndex < this.layersDataArray.length; arrayIndex++) {
    var dbLayer = this.layersDataArray[arrayIndex];
    if (dbLayer.parameters.overview) {
      return new leaf.Layer(dbLayer);
    }
  }
  return null;
};


/**
 * Sets the layer's isEnabled flag to match the specified visibility parameter value,
 * and adjusts the map's layers.
 * <p/>
 * "Visibility" does not exist in the JSON layer's data elements.  The closest thing is whether the
 * layer is supposed to be "enabled" or not.  So, this method sets the isEnabled value
 * to the value of isVisible, and then updates the map accordingly.  If "isVisible" is false,
 * and it is removed from the map, then it's possible that the map will not have a layer.
 * This scenario is unlikely, as long as the UI is working correctly.
 * <p/>
 * This method is currently named this way to keep compatibility with the "*MapImpl.java" files, which
 * implement IMap.java.  Probably LeafletMapImpl.js (the leaflet version of OLMapImpl.js" can be changed to
 * instead call a method in this class called something like enableLayer(layerId, isVisible)
 * <p/>
 * The layer may be a base layer or an overlay layer.
 * @protected
 * @param {string} layerId
 * @param {boolean} isVisible
 */
leaf.Layers.prototype.setLayerVisibility = function(layerId, isVisible) {
  var layer = this.indexedLayersList[layerId];
  if (!goog.isDefAndNotNull(layer)) {
    console.log("In Layers.js.setLayerVisibility.  This should not happen.  Could not find layer by key " + layerId);
  }
  if (layer.name.search(/MGRS/) == -1) {
    console.log('Special case here.  MGRS really should not be a base layer');
  }
  if (layer.isEnabled == isVisible) {
    return;
  }
  layer.isEnabled = isVisible;
  if (layer.isEnabled) {
    if (layer.isBaseLayer) {
      this.setBaseLayer(layer); // bad name.  what does it do?  add the layer, remove another, set current?
    }
    else {
      console.log("Layers.js.setLayerVisibility for layer " + layer.name + ", calling addLayer");
      leaf.map.leafletMap.addLayer(layer.leafletLayer);
      var index = layer.url.search(/weather/i);
      if (index != -1) { // does the following get executed ever?
        var legendDomImage = goog.dom.createDom('img', {
              'id': 'weather-legend',
              'style': 'position:absolute; bottom:20px; left:20px; z-index:999',
              'src': 'https://test.msat.akimeka.com/weather/WMS?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&STYLE=default&FORMAT=image/png;mode=8bit&CRS=CRS:84&LAYER=' + layer.name
            }
        );
        goog.dom.appendChild(document.body, legendDomImage);
        console.log("Tried accessing legend image with this: " + legendDomImage.src);
      }
    }
  }
  else {
    // Remove the layer.  If this is a baselayer, there will be no baselayer to show.
    leaf.map.leafletMap.removeLayer(layer.leafletLayer); // is this ever executed?
  }
};


/**
 * This method swaps base layers, and updates the baseLayer status.
 * <p/>
 * The counterpart OLLayers.setBaseLayer() function was getting an OpenLayers
 * layer passed into it.  And I think that it was totally a local function.  I
 * think it was being called by selectBaseLayer(), which was coming in from
 * GWT.  So, we really don't need to call this method setBaseLayer, since
 * it should only be used internally to this class. Could call it swapBaseLayers(layer).
 * <p/>
 * This assumes the leafLayer passed in is a base layer.  Is this always true?
 * <p/>
 * This method could probably be greatly simplified if we allow the map to maintaining
 * a list of layers, and just swap their stacking orders.
 * TODO: This should be a private method, but so should most others.  Fix later
 * @param {leaf.Layer} newBaseLayer
 * @protected
 */
leaf.Layers.prototype.setBaseLayer = function(newBaseLayer) {
  //
  // If already the current base layer, do nothing.  Unlikely scenario.
  //
  if (this.baseLayer.layerId == newBaseLayer.layerId) {
    return;
  }
  //
  // Disable all base layers and enable the new one.
  //
  var layerIndex;
  var layer;
  for (layerIndex in this.indexedLayersList) {
    if (this.indexedLayersList[layerIndex].isBaseLayer) {
      this.indexedLayersList[layerIndex].isEnabled = false;
    }
  }
  //
  // Set the flag for this leafLayer to show it's special, and set current
  //
  newBaseLayer.isEnabled = true;
  this.baseLayer = newBaseLayer;
  //
  // Remove ALL Leaflet layers from the map, because we're going to add them
  // back, in order so that overlays will be on top.
  // OR, maybe don't touch the overlays, but just send the baselayer to the back.
  //
  leaf.map.leafletMap.eachLayer(function(leafletLayer) { // change this map.map stuff to something like mapClass.leafletMap
    leaf.map.leafletMap.removeLayer(leafletLayer);
  });
  //
  // Add all enabled (Leaflet) layers to the map, which includes existing enabled ("visible") overlays.
  // Order is important, in that overlays should come after base layer.
  //
  for (layerIndex in this.indexedLayersList) {
    layer = this.indexedLayersList[layerIndex];
    if (layer.isBaseLayer) {
      if (layer.isEnabled) {
        leaf.map.leafletMap.addLayer(layer.leafletLayer);
      }
    }
  }

  for (layerIndex in this.indexedLayersList) {
    layer = this.indexedLayersList[layerIndex];
    if (!layer.isBaseLayer) {
      if (layer.isEnabled) {
        leaf.map.leafletMap.addLayer(layer.leafletLayer);
      }
    }
  }
  // Perhaps change layer attribution at this point, if we want that control, which is unlikely.
};


/**
 * This method causes the specified base layer to be swapped in, by calling setBaseLayer.
 * <p/>
 * The OLLayers.selectBaseLayer function directly removed from the map the OpenLayers
 * layer that corresponded to the "current baselayer", and then called setBaseLayer
 * with the new layer, which set the "current baselayer" to it.
 * <p/>
 * This method just delegates these tasks to setBaseLayer.
 *
 * @param {string} layerId The index into the indexed layers list
 */
leaf.Layers.prototype.selectBaseLayer = function(layerId) {
  this.setBaseLayer(this.indexedLayersList[layerId]);
};


/**
 * This function is probaby not called.
 * @param {*} layerData
 */
leaf.Layers.prototype.addLayer = function(layerData) { // change name.  Not json.
  alert("In Layers.addLayer.  I don't think this method is called.  layerData: " + layerData);
};

if (goog.DEBUG) console.log('Layers.js loaded');


