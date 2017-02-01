if (goog.DEBUG) console.log('Controls.js loading...');
/**
 * @fileoverview  This file defines the class leaf.Controls, which attaches Leaflet controls to the map
 * and maintains access to them.
 */
goog.provide('leaf.Controls');
goog.require('leaf.Legend');
goog.require('leaf.Legends');
//goog.require('leaf.SpatialFilter'); // nec for build in MSAT env?  Does not work outside of MSAT  Must have commented out
goog.require('leaf.MeasureTool'); // nec for build in MSAT env?
goog.require('leaf.MousePositionControl'); // nec for build in MSAT env?  New here in prototype

/**
 * @classdesc The Controls class creates, places, and maintains a set of controls for the map.
 * These currently include zoom, overview, attribution, loading, and scale.  It should also include
 * layer selection, measure, spatial filter, coordinate input, coordinate tracking, home,
 * and history/"nav".
 *
 * @summary
 * Creation and access to controls for the map.
 *
 * @description
 * This is the constructor which attaches the controls to the map.
 *
 * @example var Controls = new leaf.Controls(leaf.map);
 *
 * @param {leaf.Map} map The leaf.map global object.  Probably unnecessary
 * @constructor
 */
leaf.Controls = function(map) {
  if (goog.DEBUG) {
    console.log("Controls.js L.version: " + L.version);
    console.log("Controls.js L.drawVersion: " + L.drawVersion);
  }
  this.map = map; // What should we be using in this function, and anonymous?  map or this.map or leaf.map?
  var leafletMap = map.leafletMap;
  //
  // Top Left Controls: Overview (MiniMap)
  //
  var overviewLayer = map.layers.overviewLayer;
  if (goog.isDefAndNotNull(overviewLayer)) {
    this.miniMapControl = new L.Control.MiniMap(overviewLayer.leafletLayer, {
      //crs: leaf.Map.CRS, // not sure this helps
      minimized: true,
      toggleDisplay: true,
      autoToggleDisplay: true, // Once minimize or expand button clicked, this turns off.
      position: 'topleft',
      height: 80,
      width: 175,
      zoomLevelOffset: -8,
      aimingRectOptions: {color: '#FF0000', weight: 1},
      shadowRectOptions: {color: '#FFFFFF', weight: 1, opacity: 0, fillOpacity: 0}
    }).addTo(leafletMap);
  }
  //
  // A Draw Control is used for simulating a spatial filter control, for now, until it is
  // extended to be a true spatial filter control.
  //
//  if (!goog.isDef(window.parent.getMapLayerData)) {

  L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a spatial filter polygon';
  L.drawLocal.draw.toolbar.buttons.rectangle = 'Draw a spatial filter rectangle';
  L.drawLocal.draw.toolbar.buttons.circle = 'Draw a spatial filter circle';
  L.drawLocal.edit.toolbar.buttons.edit = 'Edit spatial filter';
  L.drawLocal.edit.toolbar.buttons.editDisabled = 'No spatial filter to edit';
  L.drawLocal.edit.toolbar.buttons.remove = 'Delete spatial filter';
  L.drawLocal.edit.toolbar.buttons.removeDisabled = 'No spatial filter to delete';
  L.drawLocal.edit.handlers.edit.tooltip.text = 'Drag handles to edit spatial filter';
  L.drawLocal.edit.handlers.remove.tooltip.text = 'Click on spatial filter to remove';

  var drawnShape = null;
  this.drawnItemsFeatureGroup = L.featureGroup(); // necessary if done in SpatialFilter?
  this.drawnItemsFeatureGroup.addTo(leafletMap); // without this, the shape goes away when release mouse as drawn
  map.spatialFilter.drawnItemsFeatureGroup = this.drawnItemsFeatureGroup;

  this.spatialFilterControl = new L.Control.Draw({
    position: 'topleft',
    // Editing may not work too well with Leaflet 1.0 and the matching draw plugin, but seems to work okay with Leaflet 0.7.7 and Draw 3.2
    edit: {
      featureGroup: this.drawnItemsFeatureGroup, // required
      poly: {
        allowIntersection: false
      },
      //showMeasurements: true, measurementOptions: {imperial:true},
      showArea: true, // I don't think this works
      remove: true // probably don't need this, as our button should remove it
    },
    // edit: false,

    draw: {
      // polyline: {
      //   metric: false,
      //   showMeasurements: true, measurementOptions: {imperial:true}, // doesn't seem to be working
      //   shapeOptions: {
      //     weight: 2,
      //     color: '#bada55'
      //   }
      // },
      polyline: false,
      polygon: {
        metric: false,
        showArea: true,
        allowIntersection: false, // restrict to simple polygons
        drawError: {
          color: '#e1e100', // Color the shape will turn when intersects
          message: 'Self intersecting polygons are not allowed.' // Message that will show when intersect
        },
        shapeOptions: {
          weight: 2,
          color: '#bada55'
        }
      },
      // polygon: false,
      rectangle: {
        metric: false,
        showArea: true,
        //repeatMode: false, // default
        shapeOptions: {
          clickable: true, // true is default
          color: '#ff0000',
          weight: 1
        }
      },
      circle: {
        metric: false,
        showArea: true
      },
      //circle: false,
      marker: false
    }
    //draw: false
  });
  //}
  map.spatialFilter.spatialFilterControl = this.spatialFilterControl; // new
  //
  // Callback for when a shape has just completed being drawn by user, that is,
  // when you release from drawing a rect, circ, or poly's last.
  //
  leafletMap.on('draw:created', function (event) {
    drawnShapeType = event.layerType;
    map.spatialFilter.drawControlShapeType = drawnShapeType; // new, will be used for non bbox areas later
    drawnShape = event.layer;
    map.controls.drawnItemsFeatureGroup.addLayer(drawnShape);
    map.spatialFilter.drawnItemsFeatureGroup.addLayer(drawnShape);
    map.spatialFilter.drawControlShapeObject = drawnShape; // more hacks to get something going quickly
    map.spatialFilter.centroid = map.controls.drawnItemsFeatureGroup.getBounds().getCenter();
    map.spatialFilter.bbox = map.controls.drawnItemsFeatureGroup.getBounds(); // LatLngBounds

    if (drawnShapeType == 'circle') {
      var radiusInMiles = drawnShape.getRadius() / LeafletMapImpl.METERS_PER_MILE;
      console.log("Radius is " + radiusInMiles);
      map.spatialFilter.size = Math.PI * radiusInMiles * radiusInMiles;
    }
    else {
      map.spatialFilter.size = L.GeometryUtil.geodesicArea(drawnShape.getLatLngs()) / LeafletMapImpl.SQ_METERS_PER_SQ_MILE;
    }
    map.spatialFilter.isShapeActive = true;
    // console.log("Controls.js, draw:created: Created bounds: " + map.spatialFilter.bbox.toBBoxString());
    // console.log("Controls.js, draw:created: Created bounds center: " + map.spatialFilter.centroid);
    // console.log("Controls.js, draw:created: Created area in sqmi: " + (map.spatialFilter.size));
  });

  leafletMap.on('draw:drawstart', function (event) { // When you click on the rect, or poly, or circle to start drawing mode
    //console.log("Controls.js, draw:start: Removing previous shape.");
    map.spatialFilter.isShapeActive = false; // right?  Prob doesn't matter
    map.controls.drawnItemsFeatureGroup.removeLayer(drawnShape);
  });

  leafletMap.on('draw:edited', function (event) {  // happens after click "Save" on the edit panel
    //drawnShapeType = event.layerType; // can't find this.  Will assume same as when created.
    map.spatialFilter.centroid = map.controls.drawnItemsFeatureGroup.getBounds().getCenter();
    map.spatialFilter.bbox = map.controls.drawnItemsFeatureGroup.getBounds(); // LatLngBounds
    var drawnShapes = event.layers.getLayers();
    var drawnShape = drawnShapes[0];
    if (drawnShapeType == 'circle') {
      var radiusInMiles = drawnShape.getRadius() / LeafletMapImpl.METERS_PER_MILE;
      map.spatialFilter.size = Math.PI * radiusInMiles * radiusInMiles;
    }
    else {
      var latLngs = drawnShape.getLatLngs();
      map.spatialFilter.size = L.GeometryUtil.geodesicArea(latLngs) / LeafletMapImpl.SQ_METERS_PER_SQ_MILE;
    }
    // console.log("Controls.js, draw:edited: Edited bounds: " + map.spatialFilter.bbox.toBBoxString());
    // console.log("Controls.js, draw:edited: Edited bounds centoid: " + map.spatialFilter.centroid);
    // console.log("Controls.js, draw:edited: Edited area: " + map.spatialFilter.size);
  });

  // leafletMap.on('draw:editmove', function (event) {
  //   console.log("Controls.js, draw:editmove, Draw editmove callback called.");
  // });
  //
  // leafletMap.on('draw:editresize', function (event) {
  //   console.log("Controls.js, draw:editresize: Draw editedresize callback called.");
  // });

  leafletMap.on('draw:deleted', function (event) { // after click on save for the deleted icon
    // console.log("Controls.js, draw:deleted:Draw deleted callback called.");
    // console.log("Should clear out anything?");
    map.spatialFilter.isShapeActive = false;
  });
  console.log('added spatialFilterControl');











  // Try to do a measure tool now.
  // I think the thing to do is to extend stuff that's in Leaflet.Draw, similar to how it's done in
  // https://github.com/makinacorpus/Leaflet.MeasureControl/blob/master/leaflet.measurecontrol.js
  // The problem with just creating another draw control which we did for Spatial, is that their
  // events are the same, and so the two controls would get confused.  Delete Spatial, and Measure
  // would delete.  Stuff like that.
  //
  //
  // var measuredShape = null;
  // this.measuredItemsFeatureGroup = L.featureGroup(); // necessary if done in SpatialFilter?
  //
  // map.measureTool.measuredItemsFeatureGroup = this.measuredItemsFeatureGroup;
  // this.measuredItemsFeatureGroup.addTo(leafletMap); // without this, the shape goes away when release mouse as drawn
  //
  // this.measureToolControl = new L.Control.Draw({ // probably need to extend this class and name is L.Control.Measure if can
  //   position: 'bottomleft',
  //   // Editing may not work too well with Leaflet 1.0 and the matching draw plugin, but seems to work okay with Leaflet 0.7.7 and Draw 3.2
  //   edit: {
  //     featureGroup: this.measuredItemsFeatureGroup, // required
  //     poly: {
  //       allowIntersection: true
  //     },
  //     //showMeasurements: true, measurementOptions: {imperial:true},
  //     showArea: true, // I don't think this works
  //     remove: true // probably don't need this, as our button should remove it
  //   },
  //   // edit: false,
  //
  //   draw: { // maybe change this to "measure:"
  //     // polyline: {
  //     //   metric: false,
  //     //   showMeasurements: true, measurementOptions: {imperial:true}, // doesn't seem to be working
  //     //   shapeOptions: {
  //     //     weight: 2,
  //     //     color: '#bada55'
  //     //   }
  //     // },
  //     polyline: true,
  //     polygon: {
  //       metric: false,
  //       showArea: true,
  //       allowIntersection: true,
  //       shapeOptions: {
  //         weight: 2,
  //         color: '#bada55'
  //       }
  //     },
  //     // polygon: false,
  //     rectangle: {
  //       metric: false,
  //       showArea: true,
  //       //repeatMode: false, // default
  //       shapeOptions: {
  //         clickable: true, // true is default
  //         color: '#ff0000',
  //         weight: 1
  //       }
  //     },
  //     circle: {
  //       metric: false,
  //       showArea: true
  //     },
  //     //circle: false,
  //     marker: false
  //   }
  //   //draw: false
  // });
  // //}
  // map.measureTool.measureToolControl = this.measureToolControl; // new
  // //
  // // Callback for when a shape has just completed being drawn by user, that is,
  // // when you release from drawing a rect, circ, or poly's last.
  // //
  // leafletMap.on('draw:created', function (event) {
  //   measuredShapeType = event.layerType;
  //   map.measureTool.drawControlShapeType = measuredShapeType; // new, will be used for non bbox areas later
  //   measuredShape = event.layer;
  //   map.controls.measuredItemsFeatureGroup.addLayer(measuredShape);
  //   map.measureTool.measuredItemsFeatureGroup.addLayer(measuredShape);
  //   map.measureTool.drawControlShapeObject = measuredShape; // more hacks to get something going quickly
  //   map.measureTool.centroid = map.controls.measuredItemsFeatureGroup.getBounds().getCenter();
  //   map.measureTool.bbox = map.controls.measuredItemsFeatureGroup.getBounds(); // LatLngBounds
  //
  //   if (measuredShapeType == 'circle') {
  //     var radiusInMiles = measuredShape.getRadius() / LeafletMapImpl.METERS_PER_MILE;
  //     console.log("Radius is " + radiusInMiles);
  //     map.measureTool.size = Math.PI * radiusInMiles * radiusInMiles;
  //   }
  //   else {
  //     map.measureTool.size = L.GeometryUtil.geodesicArea(measuredShape.getLatLngs()) / LeafletMapImpl.SQ_METERS_PER_SQ_MILE;
  //   }
  //   map.measureTool.isShapeActive = true;
  //   // console.log("Controls.js, measure:created: Created bounds: " + map.measureTool.bbox.toBBoxString());
  //   // console.log("Controls.js, measure:created: Created bounds center: " + map.measureTool.centroid);
  //   // console.log("Controls.js, measure:created: Created area in sqmi: " + (map.measureTool.size));
  // });
  //
  // leafletMap.on('measure:drawstart', function (event) { // When you click on the rect, or poly, or circle to start drawing mode
  //   //console.log("Controls.js, measure:start: Removing previous shape.");
  //   map.measureTool.isShapeActive = false; // right?  Prob doesn't matter
  //   map.controls.measuredItemsFeatureGroup.removeLayer(measuredShape);
  // });
  //
  // leafletMap.on('measure:edited', function (event) {  // happens after click "Save" on the edit panel
  //   //measuredShapeType = event.layerType; // can't find this.  Will assume same as when created.
  //   map.measureTool.centroid = map.controls.measuredItemsFeatureGroup.getBounds().getCenter();
  //   map.measureTool.bbox = map.controls.measuredItemsFeatureGroup.getBounds(); // LatLngBounds
  //   var measuredShapes = event.layers.getLayers();
  //   var measuredShape = measuredShapes[0];
  //   if (measuredShapeType == 'circle') {
  //     var radiusInMiles = measuredShape.getRadius() / LeafletMapImpl.METERS_PER_MILE;
  //     map.measureTool.size = Math.PI * radiusInMiles * radiusInMiles;
  //   }
  //   else {
  //     var latLngs = measuredShape.getLatLngs();
  //     map.measureTool.size = L.GeometryUtil.geodesicArea(latLngs) / LeafletMapImpl.SQ_METERS_PER_SQ_MILE;
  //   }
  //   // console.log("Controls.js, measure:edited: Edited bounds: " + map.measureTool.bbox.toBBoxString());
  //   // console.log("Controls.js, measure:edited: Edited bounds centoid: " + map.measureTool.centroid);
  //   // console.log("Controls.js, measure:edited: Edited area: " + map.measureTool.size);
  // });
  //
  // leafletMap.on('measure:editmove', function (event) {
  //   alert("Controls.js, measure:editmove, Draw editmove callback called.");
  // });
  //
  // leafletMap.on('measure:editresize', function (event) {
  //   alert("Controls.js, measure:editresize: Draw editedresize callback called.");
  // });
  //
  // leafletMap.on('measure:deleted', function (event) { // after click on save for the deleted icon
  //   // console.log("Controls.js, measure:deleted:Draw deleted callback called.");
  //   // console.log("Should clear out anything?");
  //   map.measureTool.isShapeActive = false;
  // });
  // console.log('added (contrived) MeasureControl');

  // We can create the measure tool control here, but we don't want to add it to the map here.
  // Instead, it should be added to, and removed from the map by the external "measure button", which
  // is in the GWT toolbar (in MSAT environment), or in the (this) prototype test/GwtSim/Toolbar.js toolbar.
  // Being able to add and remove it complicates matters, because you can remove the control without
  // removing the drawn measure geometry (a line for linear measurements.)  There should be a way to
  // reach into that controller programmatically to turn off the shape/geometry, but I don't know what
  // it is.  Further, there is a conflict between "layers" of the spatial filter shapes and the measure
  // shapes because Measure is built on top of Draw, and they weren't careful about conflicts.
  
  // MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE 
  // MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE 
  // MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE MEASURE
  // this.measureToolControl = L.Control.measureControl({
  //   position: 'bottomleft',
  //   //handler: {}
  //   // would like to modify the new L.Polyline([], this.options.shapeOptions); with options that do labeling for the poly segments, as in that other plugin
  // });
  // map.measureTool.measureToolControl = this.measureToolControl;
  this.measureToolControl = new L.Control.Measure({
    position: 'bottomleft',
    //color: 'red' // wrong
  });
  //this.measureToolControl.layerPaint.color = 'red'; // hack
  map.measureTool.measureToolControl = this.measureToolControl;

  // leafletMap.on('measure:measurestart', function (event) { // When you click on the rect, or poly, or circle to start measureing mode
  //   //console.log("Controls.js, measure:start: Removing previous shape.");
  //   map.measureTool.isShapeActive = false; // right?  Prob doesn't matter
  //   map.controls.measuredItemsFeatureGroup.removeLayer(measuredShape);
  // });
  //
  //
  // leafletMap.on('measure:deleted', function (event) { // after click on save for the deleted icon
  //   // console.log("Controls.js, measure:deleted:Draw deleted callback called.");
  //   // console.log("Should clear out anything?");
  //   map.measureTool.isShapeActive = false;
  // });
  //
  // leafletMap.on('measure:created', function (event) {
  //   measuredShapeType = event.layerType;
  //   map.measureTool.measureControlShapeType = measuredShapeType; // new, will be used for non bbox areas later
  //   measuredShape = event.layer;
  //   map.controls.measuredItemsFeatureGroup.addLayer(measuredShape);
  //   map.measureTool.measuredItemsFeatureGroup.addLayer(measuredShape);
  //   map.measureTool.measureControlShapeObject = measuredShape; // more hacks to get something going quickly
  //   map.measureTool.centroid = map.controls.measuredItemsFeatureGroup.getBounds().getCenter();
  //   map.measureTool.bbox = map.controls.measuredItemsFeatureGroup.getBounds(); // LatLngBounds
  //
  //   if (measuredShapeType == 'circle') {
  //     var radiusInMiles = measuredShape.getRadius() / LeafletMapImpl.METERS_PER_MILE;
  //     console.log("Radius is " + radiusInMiles);
  //     map.measureTool.size = Math.PI * radiusInMiles * radiusInMiles;
  //   }
  //   else {
  //     map.measureTool.size = L.GeometryUtil.geodesicArea(measuredShape.getLatLngs()) / LeafletMapImpl.SQ_METERS_PER_SQ_MILE;
  //   }
  //   map.measureTool.isShapeActive = true;
  //   // console.log("Controls.js, measure:created: Created bounds: " + map.measureTool.bbox.toBBoxString());
  //   // console.log("Controls.js, measure:created: Created bounds center: " + map.measureTool.centroid);
  //   // console.log("Controls.js, measure:created: Created area in sqmi: " + (map.measureTool.size));
  // });




















  leafletMap.on('overlayadd', function(e) {
    console.log("In Controls.js. leafletMap.on overlayadd");
    var index = e.layer._url.search(/weather/i);
    if (index == -1) {
      return; // not a weather layer.  Could be Boundary, Transportation, MGRS?
    }
    var legend = leaf.map.layers.indexedLayersList[e.name].legend;
    leaf.map.layers.legends.addLegend(legend); // Could simplify.  "legends" could just be the active legends list.  And a Layer can have a legend, the the list gets elements from Layer objects.
    // In the above line, why keep the legends list associated with the layers list?  When the layers list is pushed/popped, legends could be done at the same time.
  });

  leafletMap.on('overlayremove', function(e) {
    console.log("In Controls.js. leafletMap.on overlayremove.  I think I clicked on an overlay in layer's control.");
    var legend = leaf.map.layers.legends.legendsLinkedMap.get(e.name); // Diff from above indexedLayersList[name].legend Which better?  Why 2 structs?
    leaf.map.layers.legends.removeLegend(legend);
  });

  //
  // Bottom Left Controls:
  //
  // Layer control could go here.  For now, we put attribution.  Experimental.
  // Could possibly later be used for coordinate output?
  //
  //L.control.coordinates().addTo(leafletMap); // "Lng: dd.dddd Lat: dd.dddd"
  // var greenIcon = L.icon({
  //   iconUrl: 'leaf-green.png',
  //   shadowUrl: 'leaf-shadow.png',
  //   iconSize: [38,95],
  //   shadowSize: [50, 64]
  // });
  // var marker = L.marker({icon: greenIcon});
//  L.Icon.Default.imagePath = 'libs/LeafletLibs20160924/Leaflet-0.7.7/images';
  //L.Icon.Default.imagePath = 'resources/img';
  L.Icon.Default.imagePath = 'images';
  if (goog.DEBUG) {
    if (!goog.isFunction(window.parent.getMapLayerData)) {
      L.Icon.Default.imagePath = 'resources/img';
    }
  }
  //var locationIcon = L.icon({iconUrl: 'resources/images/cbrne_center.png'});
  //var marker = L.marker();

  // What the heck plugin is this?  This is coordinate stuff, not measure.  Stop getting confused.
  // Wish we could make the readout disappear when cursor is not on the map.
  // Where are the handlers?
  // L.control.coordinates({
  //   //markerType: L.marker
  //   markerProps: {title: "(click me, I'm a hover.  Wish I could display coord values)"},
  //   position: "bottomleft",
  //   useLatLngOrder:true,
  //   decimals:3,
  //   labelTemplateLat:"Lat: {y}",
  //   labelTemplateLng:"Lng: {x}"
  //   // labelFormatterLat : function(lat){return lat + " lat"},
  //   // labelFormatterLng : function(lng){return lng + " lng"},
  //   //customLabelFcn: function(latLonObj, opts) { "geohash: " + encodeGeoHash(latLonObj.lat, latLonObj.lng)}
  // }).addTo(leafletMap);
  // console.log('added Coordinates Control');

  // L.control.mouseCoordinate({
  //   position:"bottomleft",
  //   utm:true,
  //   utmref:true
  // }).addTo(leafletMap);

  // function mgrsFormatter(lat, lng) {
  //   var mgrs = orgmymanateecommonusng.LLtoMGRS(lat, lng, 5);
  //   return mgrs;
  // }
  //
  // this.mousePositionControl = L.control.mousePosition({
  //   position: "bottomleft",
  //   emptyString: "",
  //   prefix: "Lat,Lng, MGRS: ",
  //   separator: ", ",
  //   mgrsFormatter: mgrsFormatter
  // });
  // this.mousePositionControl.addTo(leafletMap);


  this.mousePositionControl = L.control.mousePosition({
    position: "bottomleft",
    emptyString: "",
    prefix: "Lat,Lng, MGRS: ",
    separator: ", ",
    mgrsFormatter: function mgrsFormatter(lat, lng) {
      var mgrsString = "";
      try {
        mgrsString = orgmymanateecommonusng.LLtoMGRS(lat, lng, 5);
        //console.log("mgrsString: " + mgrsString);
        if (goog.string.contains(mgrsString, 'NaN')) {
          return " (polar)";
        }
      }
      catch (e) {
        //console.log("Caught exception when calling LLtoMGRS from Controls.js: " + e.toString());
        return " (range)";
      }
      return mgrsString;
    }
  });
  this.mousePositionControl.addTo(leafletMap);




  // Doesn't work, because doesn't know "map.on"
  //L.control.mouseCoordinate({utm:true,utmref:true}).addTo(map);
  
  // Leaflet.mousePosition is another plugin that would probably be fine.  No coordinate input though.


  // this.measureControl = L.control.measure({
  //   //showMeasurements: true, measurementOptions: {imperial:true}, // test, doubt it works, nope, doesn't
  //   position: 'bottomleft',
  //   primaryLengthUnit: 'miles',
  //   secondaryLengthUnit: 'feet',
  //   primaryAreaUnit: 'sqmiles',
  //   secondaryAreaUnit: 'sqfeet',
  //   localization: 'en',
  //   decPoint: '.',
  //   thousandsSep: ','
  // });
  // this.map.measureTool.measureToolControl = this.measureControl;

  ////measureControl.addTo(myMap);
  //console.log('Created measureControl');

  // this.attributionControl = L.control.attribution({prefix: 'MSAT', position: 'bottomleft'});
  // this.attributionControl.addAttribution("map version -0.1"); //
  // this.attributionControl.addTo(leafletMap);

  //
  // Top Right Controls: zoom buttons (default), loading status
  //
  this.zoomControl = L.control.zoom({
    position: 'topright'
  }).addTo(leafletMap);

  //  The NavBar (history) is nice, but it does take up space, and clutters a bit.
  // var navBarControl = L.control.navbar({
  //   position: 'topright'
  //   // careful if set center and zoom conflicts with other controls
  // }).addTo(leafletMap);

  // Provides visual feedback regarding loading of resources.
  this.loadingControl = L.Control.loading({
    position: 'topright',
    zoomControl: this.zoomControl,
    delayIndicator: 500
  }).addTo(leafletMap);


  //
  // Bottom Right Controls: scale
  //
  this.scaleControl = L.control.scale({
    position: 'bottomright'
  }).addTo(leafletMap);

  // A layer control is for help in testing.  Outside of MSAT I don't have a way to select layers
  // easily/quickly.  This is only for testing (although we should be using this
  // control rather than the layer selector in the UI.)
  // In the future we may have a Leaflet layer control.  Currently, we do not.  This layer
  // control does not give access to our Layer object.  So, we're not dealing with our Layer
  // object when we click on a layer in the control's list.
  if (goog.DEBUG) {
    if (!goog.isFunction(window.parent.getMapLayerData)) {
      this.layersControl = L.control.layers(null, null, {
        position: 'bottomright'
      }).addTo(leafletMap);

      var layersList = map.layers.indexedLayersList;
      for (var layerIndex in layersList) {
        var layer = layersList[layerIndex];
        if (!layer.shouldBeListed) {
          continue;
        }
        if (layer.isBaseLayer && !layer.hasTransparency) {
          // extra test against MGRS, prob not needed now bec set isBaseLayer to false
          this.layersControl.addBaseLayer(layer.leafletLayer, layer.name);
        }
        else {
          this.layersControl.addOverlay(layer.leafletLayer, layer.name);
        }
      }
      console.log('added layersControl');
    }
  }





  // leafletMap.on('overlayadd', onOverlayAdd); // make this "Layers.onOverlayAdd" ?
    // leafletMap.on('overlayremove', onOverlayRemove);


};

//
// Handle legends when a weather overlay is added.
// By the way, this same kind of thing happens with layer annotations.  They get displayed
// at the bottom left, just where the legends should go.  They get removed correctly too.
// I'm doing part of that, in that I update the annotation string, I think.  So, maybe I
// should figure out if there's some smarts there I could use.  Maybe it's just the same
// as this "on" function, but hidden.
// The "e.layer" object is a leaflet layer, not our Layer object.
// If we could find the corresponding Layer object, we could get its legend, which
// was already created, and we could add it to the list of active/on layer legends.
// At this point this layer's legend is not in that Legends list.
// So, how could we get that layer?  Layer's are indexed by name, so should be
// leaf.map.layers[name]
//
// The image may not exist though.  So, we really need this special image checking and image loading stuff I was doing,
// because, for example, right now the Internet is not available, and it would be good to know that, rather than put
// up a broken image icon.  And maybe I can actually store the image too, in the list, so that we don't have to
// keep requesting it.  Just one time at the start where layers are loaded???
//
// The ImageLoader.js file is good for this.  (ImageTest.js may also be helpful)  See ImageLoader20160715
//
// And is this callback method the right place to display the image?  Dang, I should be more
// organized.  Get rid of broken stuff, and stuff that is commented out, and comment the files that do work.
// function onOverlayAdd(e) {
//   var index = e.layer._url.search(/weather/i);
//   if (index == -1) {
//     return; // not a weather layer.  Could be Boundary, Transportation, MGRS?
//   }
//   var legend = leaf.map.layers.indexedLayersList[e.name].legend;
//   leaf.map.layers.legends.addLegend(legend); // Could simplify.  "legends" could just be the active legends list.  And a Layer can have a legend, the the list gets elements from Layer objects.
//   // In the above line, why keep the legends list associated with the layers list?  When the layers list is pushed/popped, legends could be done at the same time.
//   // // This is a test.  Does not belong here.  Wanna see if can trigger it turning on.
//   // console.log("This is a test to see if can put a spatialfilter control on the map dynamically");
//   // leaf.map.Controls.spatialFilterControl.addTo(leaf.map.leafletMap);
//   // //leafletMap.addControl(this.spatialFilterControl); // either way
//
//
// }

// function onOverlayRemove(e) {
//   var legend = leaf.map.layers.legends.legendsLinkedMap.get(e.name); // Diff from above indexedLayersList[name].legend Which better?  Why 2 structs?
//   leaf.map.layers.legends.removeLegend(legend);
//
//   // // This does not belong here
//   // console.log("This is a test to see if can remove a spatialfilter control on the map dynamically");
//   // leaf.map.Controls.drawnItemsFeatureGroup.removeLayer(leaf.map.Controls.drawControlShapeObject); // ??
//   // leaf.map.leafletMap.removeControl(leaf.map.Controls.spatialFilterControl); // yes this removes the control
//
// }

if (goog.DEBUG) console.log('Controls.js loaded');
