if (goog.DEBUG) console.log('Layer.js loading...');
/**
 * @fileoverview This file defines the leaf.Layer class, which creates layers used by the map.
 */
goog.provide('leaf.Layer');
goog.require('leaf.Legend'); // experiment


/**
 * @classdesc The Layer class ("leaf.Layer"), used by leaf.Layers, creates layers for the map.
 * <p/>
 * We assume that if the layer is marked as a base layer, then it is an overlay layer, and that
 * all overlay layers have transparency.
 * <p/>
 * The layer parameters mostly come from the contents of the database layer tables MSAT.LAYER_PARAMETER
 * and MSAT.MAP_LAYER, but is augmented by other processing before it is accessed here as an element
 * of a JSONArray, as a result of calling window.parent.getMapLayerData().
 * <p/>
 * The params and types that come in from the database were put together for use by OpenLayers map layer
 * creation constructors, and don't necessarily fit Leaflet layer constructors.
 * <p/>
 * These tables should be simplified , clarified, and made less map-API specific.  The LAYER_PARAMETER
 * table contains a LAYER_PARAMETER_NAME called "params", which has a JSON string value containing a
 * set of parameters that could be applied to an OpenLayers layer constructor, but these do not exactly
 * work with Leaflet.  Plus, there is not a 1:1 correspondence between the layer types (in the MAP_LAYER
 * table) and these params records.  There is a many to one relationship, and there are at least
 * four tables involved.
 * <p/>
 * The database currently lists only three map services (known as MAP_LAYER_TYPE in the
 * MAP_LAYER table): "ArcGISCache", "ArcGIS93Rest", and "WMS" for the authorized NGA layers
 * that we use.  These names come from the type of layer constructor call that was used in OpenLayers.
 * <p/>
 * ArcGISCache layer types are coming mostly from a WMS map tile server with URLs like this:
 * maps.gvs.nga.mil/arcgis/services/Basemap/<layerName>/MapServer/WMSServer
 * <p/>
 * ArcGIS93Rest layer types come from a server that handles these kinds of URL's:
 * https://services.gvs.nga.mil/arcgis/rest/services/Specialty/MGRS_Grids/MapServer/export
 * <p/>
 * In Leaflet, a raster layer may be considered either a base layer or an overlay, depending on whether it
 * has transparency or not.  Layers are stacked in a map, with overlays on top because overlays have
 * transparency.  Layers that are attached to the map are considered "enabled" here.
 *
 * @summary
 * Constructor for a leaf.Layer object.
 *
 * @description
 * Creates a new Layer out of an element of the array of JSON objects, coming originally
 * from the database layer tables MSAT.LAYER_PARAMETER and MSAT.MAP_LAYER, and mostly
 * designed to support an OpenLayers layer constructor.
 *
 * @example var layer = new leaf.Layer(jsonLayerData);
 * @param {Object} jsonLayerData
 * @constructor
 */
leaf.Layer = function(jsonLayerData) {
  /**
   * The display name for the layer or set of layers if more than one.
   * @type {string}
   */
  this.name = jsonLayerData.layerName;
  /**
   * The URL for the layer, as stored in the database.  THIS IS NEW!
   * @type {string}
   */
  this.url = jsonLayerData.parameters.url;
  /**
   * Indicates whether this layer is considered a base layer or an overlay.  There may be a
   * conflict between jsonLayerData.parameters.base and jsonLayerData.parameters.params.isBaseLayer.
   * If either are true, then it's considered a base layer.
   * @type {boolean}
   */
  // this.isBaseLayer = goog.isDefAndNotNull(jsonLayerData.parameters.base) ||
  //     goog.isDef(jsonLayerData.parameters.params.isBaseLayer);
  this.isBaseLayer =
      (goog.isDefAndNotNull(jsonLayerData.parameters.base) ? jsonLayerData.parameters.base : false) ||
      (goog.isDefAndNotNull(jsonLayerData.parameters.params.isBaseLayer) ? jsonLayerData.parameters.params.isBaseLayer : false);

  // I think the following logic works just fine, as 'undefined' probably acts like 'false'.
  // this.isBaseLayer = false;
  // if (jsonLayerData.parameters.base || jsonLayerData.parameters.params.isBaseLayer) {
  //   this.isBaseLayer = true;
  // }

  // this.isBaseLayer = goog.isDefAndNotNull(jsonLayerData.parameters.base) ||
  //     goog.isDef(jsonLayerData.parameters.params.isBaseLayer);
  /**
   * Hack.  MGRS overlays should not be considered base layers
   */
  if (this.name.search(/MGRS/) != -1) {
    this.isBaseLayer = false;
  }
  // Only create a legend for weather overlay layers
  // The logic here is weak.  Depends on the format of the url in the database,
  // or assumptions about where you find weather layer info and assume you can
  // get the legends from the same place.  WHY ISN'T THIS IN the leaf.Layer(json) CONSTRUCTOR?
  if (jsonLayerData.parameters.url.search(/weather/) != -1) {
    this.legend = new leaf.Legend(this.name); // Oh wow, so a layer does have access to its legend, and a legend has access to its image DOM node
  }
  //
  // /**
  //  * This is a hack, focusing on MGRS.  Is it listed as a base layer?  And yet it has transparency?
  //  * It isn't listed in the UI layers list (prob because 'hidden'?), but for testing purposes
  //  * we want it in the overlays list in the Leaflet layers control.
  //  * <p/>
  //  * Hey, does JSDoc do this right?  I don't think so.  I think it will skip it.  Will not doc hasTransparency.
  //  */
  // if (goog.isDef(jsonLayerData.parameters.params.transparent)) {
  //   this.hasTransparency = jsonLayerData.parameters.params.transparent;
  // }
  /**
   * "Enabled" probably comes from whether a layer in the layer panel's layer list is selected.
   * It basically means that these selected layers are supposed to be attached to the map and
   * therefore visible.
   *
   * @type {boolean}
   */
  this.isEnabled = jsonLayerData.enabled;
  /**
   * "hidden" probably comes from whether a layer is supposed to show up in the layer panel's
   * layer list, or not.  For example MGRS layers, and also the overview layer probably are not
   * supposed to be in the list, as the MGRS layers are controlled by the MGRS button (silly),
   * and the overview layer supposedly shouldn't have a duplicate in the list.  Also silly.
   *
   * @type {boolean}
   */
  this.shouldBeListed = goog.isDefAndNotNull(jsonLayerData.parameters.hidden) ? !jsonLayerData.parameters.hidden : true;
  /**
   * leafletLayer is the object returned by calling a Leaflet layer constructor using the parameter
   * values in the layer data, and its type is defined in the Leaflet library.
   * @type {L.GridLayer}
   */
  this.leafletLayer = this.createLayer(jsonLayerData);  // Why don't we create the legend in this, if this is a weather layer?
  /**
   *  layerId is used to identify a layer, and is generated for each layer probably as in "index"
   *  to find layers.  If we're testing, using proxy layer data outside of MSAT/GWT, we generate it here.
   *  Otherwise, it comes from some GWT logic based on the page where the layer list resides.
   *  The logic here is the same as for the GWT generated layerId, which may be found in
   *  MapLayerUtility.generateUniqueIndex().  Could possibly do the same kind of thing using
   *  goog.getUid(obj) (see page 65 closure book)
   *
   * @type {string}
   */
  this.layerId = null;
  if (!goog.isDefAndNotNull(jsonLayerData.index)) { // why would this ever be null or undefined?
    if (!leaf.Layers.gwt_uid) { // what the heck is this?  gwt_uid on a Layers object???  Oh, a counter.  What a stupid name.  Change to currentUid or counterUid or sequencedUidName or something.
      leaf.Layers.gwt_uid = 1;
    }
    this.layerId = 'gwt-uid-' + leaf.Layers.gwt_uid++;
  }
  else {
    this.layerId = jsonLayerData.index; // this value gets generated by GWT somehow
  }
};


/**
 * Creates the Leaflet layer object.
 * <p/>
 * Creation of Leaflet layer objects is done once per layer.  The Leaflet map object
 * uses the information of a Leaflet layer object to decide how to make the tile requests.
 * The Leaflet layer objects are created with the constructors L.tileLayer and L.tileLayer.wms,
 * both of which extend GridLayer.  I don't know how this interacts with REST or non-REST services.
 *
 * This method relies upon various object parameters being set on "this" before being called.
 *
 * TODO: The layer constructors' properties are guesses.  Layers have not yet been tuned for speed.
 * @param {Object} jsonLayerData
 * @return {L.GridLayer}
 */
leaf.Layer.prototype.createLayer = function(jsonLayerData) {
  //this.attribution = 'layer: ' + jsonLayerData.layerName; // experimental, seems hacky
  var attribution = 'layer: ' + jsonLayerData.layerName; // experimental, seems hacky
  var format = goog.isDef(jsonLayerData.parameters.params.format) ? jsonLayerData.parameters.params.format : 'png';
  var hasTransparency = goog.isDef(jsonLayerData.parameters.params.transparent) ? jsonLayerData.parameters.params.transparent : false;
  // var hasTransparency = false;
  // if (goog.isDef(jsonLayerData.parameters.params.transparent)) {
  //   hasTransparency = jsonLayerData.parameters.params.transparent;
  // }
  var useCache = goog.isDef(jsonLayerData.parameters.params.useCache) ? jsonLayerData.parameters.params.useCache : false;
  //var crs = leaf.Map.CRS;
  //console.log("In Layer.js and leaf.Map.CRS.code is " + leaf.Map.CRS.code + " and projection: " + leaf.Map.CRS.projection.MAX_LATITUDE + " Maj/Min: " + leaf.Map.CRS.projection.R_MAJOR + "/" + leaf.Map.CRS.projection.R_MINOR);
  var leafletLayer = null;

  switch (jsonLayerData.layerType) {
    case 'ArcGISCache': // Shaded Relief, World StreetMap, World Imagery, World CADRG, Boundary, Transportation
    case 'XY': // Esri Imagery world,           for test data that doesn't come from the database tables
      var xyLayerUrl = jsonLayerData.parameters.url + '/tile/{z}/{y}/{x}';
      leafletLayer = L.tileLayer(xyLayerUrl, {
        noWrap: false,
        //transparent: isTransparent,
        transparent: hasTransparency,
        format: format,
        f: 'image',
        maxZoom: 16, // a guess.
        attribution: attribution,
        useCache: useCache
      });
      break;
    case 'WMSBoundless': // Boundless,      test data for a cachable non-GVS layer
        console.log("WMSBoundless has this url: " + jsonLayerData.parameters.url);
      leafletLayer = L.tileLayer.wms(jsonLayerData.parameters.url, {
        noWrap: false,
        layers: jsonLayerData.parameters.params.layers,
        service: 'WMS',
        request: 'GetMap',
        crs: leaf.Map.CRS,
        format: 'image/png', // right?
        //transparent: isTransparent,
        transparent: hasTransparency,
        dpi: '96',
        attribution: attribution,
        useCache: useCache
      });
      break;
    case 'ArcGIS93Rest': // MGRS, MGRS Labels
      //console.log("ArcGIS93Rest has this url: " + jsonLayerData.parameters.url);
      leafletLayer = L.tileLayer.wms(jsonLayerData.parameters.url, {
        noWrap: false,
        layers: jsonLayerData.parameters.params.layers,
        service: 'WMS',
        request: 'GetMap',
        crs: leaf.Map.CRS,
        format: format,
        f: 'image',
        //transparent: isTransparent,
        transparent: hasTransparency,
        dpi: '96',
        attribution: attribution,
        useCache: useCache
      });
      break;
    case 'WMS': // Hillshade
      //console.log("Some WMS layer has this url: " + jsonLayerData.parameters.url);
      var wmsLayerUrl = jsonLayerData.parameters.url;
      if (wmsLayerUrl.search(/weather/) == -1) {
        // NOT weather, hillshade
        // Should have url like:
        // https://maps.gvs.nga.mil/arcgis/services/Basemap/NGA_Hillshade_2D/MapServer/WMSServer?
        // LAYERS=0&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&FORMAT=image%2Fjpeg&SRS=EPSG%3A4326&
        // BBOX=-180,-90,332,422&WIDTH=256&HEIGHT=256
        leafletLayer = L.tileLayer.wms(jsonLayerData.parameters.url, {
          noWrap: false,
          layers: jsonLayerData.parameters.params.layers,
          service: 'WMS',
          request: 'GetMap',
          crs: leaf.Map.CRS,
          format: format,
          f: 'image',
          //transparent: isTransparent,
          transparent: hasTransparency,
          dpi: '96',
          attribution: attribution,
          useCache: useCache
        });
      }
      else {
        // YES, weather, using proxy server.  Should we do something about weather legends here?  Prob not bec this is Leaflet layer obj creation
        var prefix = 'weather/WMS';
        if (goog.DEBUG) {
          prefix = 'https://dev.msat.akimeka.com/weather/WMS';
        }
        var index = wmsLayerUrl.search(/LAYERS/i); // this is a temp thing, but may want to check against -1
        var layersFromUrl = wmsLayerUrl.slice(index + 7); // rename to layerNameFromUrl
        //console.log("Something has this url: https://test.msat.akimeka.com/weather/WMS");
        leafletLayer = L.tileLayer.wms(prefix, {
          noWrap: false,
          layers: layersFromUrl,
          service: 'WMS',
          request: 'GetMap',
          crs: leaf.Map.CRS,
          format: 'image/png',
          transparent: 'TRUE',
          dpi: '96',
          attribution: attribution,
          useCache: useCache
        });
        //this.isBaseLayer = false; // hack test to handle stupid weather layers.  Not needed here, but in MSAT version.
      }
      break;
    case 'WMSWeather': // test case for test weather layer
      console.log("Some WMSWeather layer has this url: " + jsonLayerData.parameters.url);
      leafletLayer = L.tileLayer.wms(jsonLayerData.parameters.url, {
        noWrap: false,
        layers: jsonLayerData.parameters.params.layers,
        service: 'WMS',
        request: 'GetMap',
        crs: leaf.Map.CRS,
        format: format,
        f: 'image',
        //transparent: isTransparent,
        transparent: hasTransparency,
        dpi: '96',
        attribution: attribution,
        useCache: useCache
      });
      //this.isBaseLayer = false; // hack test to handle stupid weather layers.  Probably not needed here at all because of test data.
      break;
    default:
      console.error('unknown layer type ' + jsonLayerData.layerType);
      return null;
  }
  if (goog.DEBUG) {
    var isOverview = goog.isDef(jsonLayerData.parameters.overview) ? jsonLayerData.parameters.overview : false;
    console.log('Created layer \"' + jsonLayerData.layerName + '\" type: ' +
        jsonLayerData.layerType +
        ' enabled: ' + jsonLayerData.enabled +
        ' overview: ' + isOverview +
        ' hasTransp: ' + hasTransparency);
  }
  return leafletLayer;
};
if (goog.DEBUG) console.log('Layer.js loaded');
