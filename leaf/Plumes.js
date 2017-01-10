if (goog.DEBUG) console.log('Plumes.js loading...');
/**
 * @fileoverview  This file defines the class leaf.Plumes, and keeps track of groups of Plume instances
 * for use by the map object leaf.Map via leaf.Features.
 */
goog.provide('leaf.Plumes');
goog.require('leaf.Plume');

// A plume may be a parent plume to a bunch of other child plumes.  The parent is usually just a single point,
// and the children are polygons defined by arrays of points.  Plumes do not go into cluster groups.
/**
 * @classdesc The Plumes class ("leaf.Plumes") knows about Plume instances, and leaf.Features knows about
 * leaf.Plumes.
 *
 * @summary
 * Constructor for a leaf.Plumes object.
 *
 * @description
 * This constructor creates a leaf.Plumes object.
 *
 * @example var plumes = new leaf.Plumes();
 *
 * @constructor
 */
leaf.Plumes = function() {
  /**
   * "plumes" are managed via a L.geoJson object, which is a layer, but also
   * a GeoJSON object or an array of GeoJSON objects (see geojson.org/geojson-spec.html)
   * A Leaflet GeoJson object extends FeatureGroup, which is a leaflet layer.
   */
  var geoJsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
  //this.geoJsonPlumes = L.geoJson(); // this is Leaflet 0.7
  this.geoJsonPlumes = L.geoJson(null, {
    style: function (feature) {
      return {
        "fillColor": feature.properties.style.fillColor,
        "color": feature.properties.style.color,
        "fillOpacity": feature.properties.style.fillOpacity,
        "opacity": feature.properties.style.opacity,
        "weight": feature.properties.style.weight
      };
    },
    pointToLayer: function (feature, latLng) {
      return L.circleMarker(latLng, geoJsonMarkerOptions);
    },
    onEachFeature: function (feature, layer) {
      if (feature.properties && feature.properties.label) {
        layer.bindPopup(feature.properties.label);



        // var plumeCallout = plumeCallouts[plumesCalloutsCtr];
        // //plumeCallout has GeometryTat, alternateId, attributes array, detailLabel, lat, lon, polygonPoints array, levelTwoBody
        // // probably plumeCallout is only part of a Callout?
        // var markerCallout = new leaf.Callout(plumeCallout);
        // var plumeMarker = new leaf.Marker(markerCallout); // fails bec plumeCallout is not a real Callout
        // leaf.map.features.markers.markersGroup.addLayer(plumeMarker.leafletMarker); // wrong?


      }
    }
  }); // this is Leaflet 0.7
//  this.geoJsonPlumes = L.geoJSON(); // this is Leaflet 1.0 and later
  // this.geoJsonPlumes = L.geoJson(null, {
  //   style: function (feature) {
  //     return {color: "feature.properties.color"};
  //   }
  // }).bindPopup(function (layer) {
  //   return "layer.feature.properties.description";
  // }).addTo(leaf.map); // use addData(GeoJSON) to add plumes
};
//
// This is where we're going to add plumes to the map, by adding to the this.geoJsonPlumes object, which
// is an L.geoJson object.  We create a string representation of the geoJson object first, and then
// parse it into an object.  Leaflet knows how to display it.
//
// This function calls getGeoJsonForPlumeCallout, once for the parent, and once for each child.
//
// One catch: Leaflet doesn't add labels or popups to child plumes.  The parent and child plumes are
// considered one geoJSON object, I think, and so only one label and one popup can be attached.
// To get around this we'd have to create separate gdoJSON objects for the parent and each of its
// children.  Oh, wait, maybe that's what plumeMarkers are.  That's an array of plume callouts as they're
// encountered, parent and each child.
//
leaf.Plumes.prototype.addPlume = function(plumeCallout) {
  // from OLPlumesLayer.js
  //
  // Check for duplicate plumes.  This is a whole plume,
  // which includes parent and children components.
  //
  // var callout = this.addPlumeCalloutToSet(plumeCallout);
  // if (!callout) {
  //   console.log("Detected duplicate plume.  Won't create or add it.");
  //   return;
  // }
  //
  // Since we're starting with the parent plume, we have
  // special header stuff to put into the geoJSON string.
  //
  var geoJsonString =
      "{\n" +
      '"type": "FeatureCollection",\n' + // oh wow, will be a GeoJSON FeatureCollection.  And in getGeoJsonForPlumeCallout we create a GeoJSON Feature
      '"features": [\n';

  //
  // Process the plume callout, getting a GeoJSON return string.
  // The result represents the parent, and so we throw in the
  // path to the icon so to be put into the GeoJSON string.
  //
  //  geoJsonString += OLCallout.getGeoJsonForPlumeCalloutComponent(plumeCallout, OLPlumesLayer.prototype.mainPlumeIconImagePath);
  var mainPlumeIconImagePath = "images/cbrne_center.png";
  geoJsonString += this.getGeoJsonForPlumeCallout(plumeCallout, mainPlumeIconImagePath); // parent plume
  var plumeCallouts = [];
  plumeCallouts.push(plumeCallout); // probably to later use for adding markers and popups and labels

  var childPlumeCallouts = null;
  var nChildPlumeCallouts = 0;
  if (plumeCallout.attributes) {
    //
    // Examine this callout's attributes for header, and plume components
    // and get a reference to the children plume array for use after we
    // process the parent.  We can throw the entire callout into the
    // processor, because that processor doesn't look for children.
    //
    var attributesArrays = plumeCallout.attributes;
    var plumeAttributeHeader = attributesArrays[0];
    if (plumeAttributeHeader[0] != "HEADER") {
      console.log("Mistaken header array.  Expected HEADER");
    }
    var isHeader = plumeAttributeHeader[1];
    if (isHeader !== true) {
      console.log("Bad header value: " + isHeader);
      return;
    }
    var plumeComponentsSection = attributesArrays[1];
    if (plumeComponentsSection[0] != "PLUMES") {
      console.log("Mistaken plumes array.  Expected PLUMES");
      return;
    }
    childPlumeCallouts = plumeComponentsSection[1];
    nChildPlumeCallouts = childPlumeCallouts.length;
  }
  if (nChildPlumeCallouts > 0) {
    geoJsonString += ",\n";
  }
  else {
    geoJsonString += "\n";
  }
  //
  // Process the children plume callouts, adding onto the GeoJSON string.
  // We can't have a trailing ",", so we do this in two parts.  We may have
  // only one child.
  // Maybe redo this, and just use a "string buffer", and chop off the trailing
  // comma rather than doing it this way.
  //
  var childPlumeCallout = null;
  var plumeComponentIconImagePath = "images/warning.png";
  for (var plumeComponentCtr = 0; plumeComponentCtr < nChildPlumeCallouts - 1; plumeComponentCtr++) {
    childPlumeCallout = childPlumeCallouts[plumeComponentCtr];
    plumeCallouts.push(childPlumeCallout); // okay so we're pushing each of these too.  But where is this used?
    geoJsonString += this.getGeoJsonForPlumeCallout(childPlumeCallout, plumeComponentIconImagePath); // child plume
    geoJsonString += ",\n";
  }
  if (nChildPlumeCallouts > 0) { // Handle the last one.  check this logic!!!
    childPlumeCallout = childPlumeCallouts[plumeComponentCtr];
    geoJsonString += this.getGeoJsonForPlumeCallout(childPlumeCallout, plumeComponentIconImagePath);
  }
  geoJsonString += "]\n}\n";
  //
  // Create a geoJSON object from the string we've been building,
  // and let the GeoJSON parser process it into something that can be
  // added to the map.
  //
  // And because the geoJSONObject has a structure that
  // we augmented with a style somewhere in that object, we need
  // to pull it out for the "style function", and we also want to
  // operate on each feature and bind a popup and a label.
  //
  //  var geoJsonObject = JSON.parse(geoJsonString);
  var geoJsonObject = goog.json.unsafeParse(geoJsonString);
  //geoJsonObject.setStyle(pathOptionsStyleIGuess);
  //console.log("geoJsonObject: " + geoJsonObject.toString());
  console.log("geoJsonString:\n" + geoJsonString);
  // OKAY must look at leafletjs.com/examples/geojson
  // I need to do things like that.
  
  this.geoJsonPlumes.addData(geoJsonObject); // temporary test.  Adds plumes and markers to map here. Skipping the tagging of individual plumes.
  //this.geoJsonPlumes.setStyle({'color' : 'green'});

  // JUST AN IDEA.  This kinda works.  But can't we assign a marker/label to each sub plume when they're created?
  // Now just put markers down according to what's in plumeCallouts array.
  // ADD MARKER AND POPUP AND LABEL HERE!!!!!!!!!!!!!!!!!
  // for (var plumesCalloutsCtr in plumeCallouts) {
  //   var plumeCallout = plumeCallouts[plumesCalloutsCtr];
  //   //plumeCallout has GeometryTat, alternateId, attributes array, detailLabel, lat, lon, polygonPoints array, levelTwoBody
  //   // probably plumeCallout is only part of a Callout?
  //   var markerCallout = new leaf.Callout(plumeCallout);
  //
  //
  //
  //
  //
  //   var plumeMarker = new leaf.Marker(markerCallout); // fails bec plumeCallout is not a real Callout
  //   leaf.map.features.markers.markersGroup.addLayer(plumeMarker.leafletMarker); // wrong?
  // }


  //console.log("OLPlumesLayer.addPlume(): GeoJSON plume(s) object:\n" + JSON.stringify(geoJsonObject, undefined, "\t"));
  //console.log("%o", geoJsonObject);

    // Okay so what's this next stuff supposed to do?
    // Oh gosh, we're supposed to find and tag each child plume, I think, with a popup and label.
  // var vectorFeaturesArray = this.geoJsonFormatParser.read(geoJsonObject);
  // if (vectorFeaturesArray === null) {
  //   alert("OLPlumesLayer.addPlume(): Error processing geoJsonObject. Not adding any feature(s) to the layer.");
  //   return;
  // }
  // //
  // // At this point we have an array of features, and each one contains a style
  // // property (under "data") containing color, fill, opacity.  We need to add
  // // that style directly as an attribute of feature, not data.
  // //
  // var feature,featureCtr;
  // for (featureCtr = 0; featureCtr < vectorFeaturesArray.length; featureCtr++) {
  //   feature = vectorFeaturesArray[featureCtr];
  //   feature.style = feature.data.style;
  // }
  // //
  // // Add circles here, since geoJSON doesn't support circles.
  // //
  // for (featureCtr = 0; featureCtr < vectorFeaturesArray.length; featureCtr++) {
  //   feature = vectorFeaturesArray[featureCtr];
  //   if (typeof feature.attributes.radius === "undefined" || // check these tests later
  //       isNaN(feature.attributes.radius) ||
  //       feature.attributes.radius <= 0) {
  //     continue;
  //   }
  //   // Amazingly, OpenLayers does not have a circle geometry.  Must use polygon.
  //   var featureLonLat = new OpenLayers.LonLat(feature.attributes.lon, feature.attributes.lat);
  //   featureLonLat.transform(olMap.standardProjection, olMap.basemapProjection);
  //   var origin = new OpenLayers.Geometry.Point(featureLonLat.lon, featureLonLat.lat);
  //   var radius = feature.attributes.radius/100;
  //   var sides = 36;
  //   var rotation = 0;
  //   var angle = Math.PI * ((1/sides) - (1/2));
  //   if(rotation) {
  //     angle += (rotation / 180) * Math.PI;
  //   }
  //   var rotatedAngle, x, y;
  //   var points = [];
  //   for(var i=0; i<sides; ++i) {
  //     rotatedAngle = angle + (i * 2 * Math.PI / sides);
  //     x = origin.x + (radius * Math.cos(rotatedAngle));
  //     y = origin.y + (radius * Math.sin(rotatedAngle));
  //     points.push(new OpenLayers.Geometry.Point(x, y));
  //   }
  //   var ring = new OpenLayers.Geometry.LinearRing(points);
  //   var featureCircle = new OpenLayers.Feature.Vector(ring, null, null);
  //   featureCircle.style = feature.style;
  //   featureCircle.style.fill = true;
  //   vectorFeaturesArray.push(featureCircle);
  // }
  // this.layer.addFeatures(vectorFeaturesArray);
  // olMap.resultsLayer.processResults(plumeMarkers);


  console.log("Leaving Plumes.js.addPlume()");
};

/**
 * Function to convert plume callout structure (either a parent,
 * or the child) into a GeoJSON object.
 * We ignore any children this plume may have.
 * <p/>
 * The result of calling this function is a GeoJSON string representing one GeoJSON
 * "Feature".  It can be combined with others to make a GeoJSON FeatureCollection, which
 * is perhaps how we do it in addPlume(), because our plume data seems to mostly be a "parent"
 * plume followed by a lot of child plumes.  Each of the child plumes should have a
 * popup and label, I think.  Each Leaflet L.geoJSON objects can have a popup bound to it.
 *
 * This function was a static function in Callout.js
 *
 * <p/>
 * The iconPath parameter is optional, and is only used for the parent.
 *
 * And how are the "attributes children" handled?  This isn't recursive.
 *
 * @param {Object} plumeCallout Raw callout data, not a leaf.Callout, I don't think.
 * @param {string} iconPath The URI for the icon
 * @return {string} Not sure how this string will be used yet.
 */
leaf.Plumes.prototype.getGeoJsonForPlumeCallout = function(plumeCallout, iconPath) {
  if (!plumeCallout) { // Should not be necessary
    return '';
  }
  //if (typeof plumeCallout.GeometryTag === 'undefined') {
  if (!goog.isDefAndNotNull(plumeCallout.GeometryTag)) {
    alert('Missing GeometryTag property for PlumeCallout:\n' + goog.json.serialize(plumeCallout));
    return '';
  }
  //if (!(plumeCallout.polygonPoints instanceof Array)) {
  if (!goog.isArray(plumeCallout.polygonPoints)) {
    alert('Missing polygonPoints array property:\n' + goog.json.serialize(plumeCallout));
    return '';
  }
  //if (typeof plumeCallout.circleLocation === 'undefined') {
  if (!goog.isDefAndNotNull(plumeCallout.circleLocation)) {
    alert('Missing circleLocation property:\n' + goog.json.serialize(plumeCallout));
    return '';
  }
  if (!goog.isDefAndNotNull(plumeCallout.circleRadius)) {
    alert('Missing circleRadius property in plumeCallout:\n' + goog.json.serialize(plumeCallout));
    return '';
  }
  plumeCallout.icon = iconPath; // but what if iconPath is null or undefined?  And where is this used?
  //
  // Get the type of geometry for this plume.
  // We assume plumeCallout contains a polygon, or a circle, or a point,
  // and NOT a combination of these.  Most of the time a plume is going to
  // have a regular polygon representation.
  // If there is an array of 1 or more polygon points, we assume it's a "polygon".
  // If there is a circleRadius > 0, then we have a circle.  Otherwise, we
  // assume it's a point, defined by the lat/lon coordinates
  //
  var geometryType = 'Point';
  var nCoordsForPlume = plumeCallout.polygonPoints.length;
  if (nCoordsForPlume > 0) {
    geometryType = 'Polygon';
  }
  var circleRadius = plumeCallout.circleRadius;
  if (circleRadius > 0.0) {
    geometryType = 'Circle';
  }
  //
  // Get color and fill for the geometry.  This section is for CHILD plumes,
  // and not for the HEAD/parent stuff.
  //
  var attributes = plumeCallout.attributes;
  var fill = false;
  var color = 'yellow';
  //if (typeof attributes !== 'undefined') {
  if (goog.isDefAndNotNull(attributes)) {
    // Seems wrong but probably right.  Just the way that GeoJSON is done.
    for (var attrCtr = 0; attrCtr < attributes.length; attrCtr++) {
      var attribute = attributes[attrCtr];
      if (attribute[0] == 'FILL') { // HEADER, PLUME, these are not for polygons
        fill = attribute[1]; // what the crud?  We overwrite this in each loop
        console.log("Just set fill to " + fill);
      }
      else if (attribute[0] == 'COLOR') {
        // We assume the color value string could be a hex value or a color name.
        // If the string can be parsed as a hex number, then we prefix it with "#"
        // otherwise we assume it's a name.
        if (isNaN(parseInt(attribute[1], 16))) { // "008000" base 16.  where is isNaN?  Native code
          color = attribute[1];
        }
        else {
          color = '#' + attribute[1]; // have to add "#" for geoJSON colors if hex?
        }
        console.log("Just set color to " + color);
      }
    } // why aren't we recursive, to take care of the attributes children?
  }
  // Clean this up.  Not all properties here work with geoJson!!!!!!!  Different names: color/fillColor, stroke/etc.  See geojson.org/geojson-spec.html

  // Okay, take a look at view-source:leafletjs.com/examples/geojson/example.html
  // Maybe I should create individual L.geoJSON objects for each sub plume, and add it to the map
  // Also notice L.circleMarker!!!!!!!

  var geoJsonString = '{\n';
  geoJsonString += '\t\"type\":\"Feature\",\n';
  //geoJsonString += '\t\"id\": \"' + plumeCallout.id + '\",\n'; // might wanna do something like this
  geoJsonString += '\t\"properties\": {\n'; // all this seems to be ignored
  geoJsonString += '\t\t\"style\": {\n';
  geoJsonString += '\t\t\t\"fill\": ' + fill + ',\n';
  geoJsonString += '\t\t\t\"fillColor\": \"' + color + '\",\n';
  //geoJsonString += '\t\t\t\"strokeColor\": \"' + color + '\",\n'; // seems to be ignored
  geoJsonString += '\t\t\t\"color\": \"' + color + '\",\n'; // seems to be ignored
  geoJsonString += '\t\t\t\"fillOpacity\": 0.5,\n'; // was 0.8
  geoJsonString += '\t\t\t\"opacity\": 0.5,\n'; // was 0.8
  //geoJsonString += '\t\t\t\"strokeWidth\": 2\n';
  geoJsonString += '\t\t\t\"weight\": 2\n';
  geoJsonString += '\t\t},\n';
  geoJsonString += '\t\t\"alternateId\": \"' + plumeCallout.alternateId + '\",\n';
  geoJsonString += '\t\t\"detailLabel\": \"' + plumeCallout.detailLabel + '\",\n';
  geoJsonString += '\t\t\"hasDetails\": \"' + plumeCallout.hasDetails + '\",\n';
  geoJsonString += '\t\t\"id\": \"' + plumeCallout.id + '\",\n';
  geoJsonString += '\t\t\"label\": \"' + plumeCallout.label + '\",\n';
  if (iconPath) {
    geoJsonString += '\t\t\"icon\": \"' + iconPath + '\",\n';
  }
  if (plumeCallout.hasLevelTwo) {
    geoJsonString += '\t\t\"hasLevelTwo\": \"' + plumeCallout.hasLevelTwo + '\",' +
        '\"levelTwoBody\": \"' + plumeCallout.levelTwoBody + '\",\n';
  }
  if (geometryType == 'Circle') {
    geoJsonString += '\t\t\"radius\": ' + circleRadius + ',\n';
  }
  geoJsonString += '\t\t\"lat\": ' + plumeCallout.lat + ',\n\t\t\"lon\": ' + plumeCallout.lon + '\n\t},\n';
  if (geometryType == 'Point') {
    //var plumeLocation = new OpenLayers.LonLat(plumeCallout.lon, plumeCallout.lat);
    var plumeLocation = L.latLng(plumeCallout.lat, plumeCallout.lon); // why is this done?  Used later?
    geoJsonString += '\t\"geometry\": {\n';
    geoJsonString += '\t\t\"type\": \"Point\",\n';
    geoJsonString += '\t\t\"coordinates\": [' + plumeLocation.lng + ', ' + plumeLocation.lat + ']\n';
    geoJsonString += '\t}\n';
  }
  else if (geometryType == 'Polygon') {
    geoJsonString += '\t\"geometry\": {\n';
    geoJsonString += '\t\t\"type\": \"Polygon\",\n'; // could be "MultiPolygon" maybe, but we want marker/label/popup for each
    geoJsonString += '\t\t\"coordinates\": [\n';
    geoJsonString += '\t\t[\n';
    for (var coordCtr = 0; coordCtr < plumeCallout.polygonPoints.length - 1; coordCtr++) {
      geoJsonString += '\t\t\t[' + plumeCallout.polygonPoints[coordCtr].longitude + ',' +
          plumeCallout.polygonPoints[coordCtr].latitude + '],\n';
    }
    geoJsonString += '\t\t[' + plumeCallout.polygonPoints[coordCtr].longitude +
        ',' + plumeCallout.polygonPoints[coordCtr].latitude + ']\n';
    geoJsonString += '\t]\n';
    geoJsonString += '\t]\n';
    geoJsonString += '\t}\n';
  }
  else if (geometryType == 'Circle') {
    // There's a bug somewhere that creates incomplete circle location info (and also reverses lat/lng),
    // so we at least check that they're both there, and use the callout's lat/lng if either are missing.
    var circleLocationLat = plumeCallout.circleLocation.latitude;
    var circleLocationLng = plumeCallout.circleLocation.longitude;
    //if (typeof circleLocationLat === 'undefined' || typeof circleLocationLng === 'undefined') {
    if (goog.isDefAndNotNull(circleLocationLat) && goog.isDefAndNotNull(circleLocationLng)) {
      circleLocationLat = plumeCallout.lat;
      circleLocationLng = plumeCallout.lon;
    }
    // Because standard GeoJSON (at least with our parser) does not define a Circle geometry, we have to make it a point
    // geometry, with a radius, as a special attribute, and then tell the processor how to process it.
    geoJsonString += '\t\"geometry\": {\n';
    geoJsonString += '\t\t\"type\": \"Point\",\n';  // not really, but what do we put here?
    geoJsonString += '\t\t\"coordinates\": [' + circleLocationLng + ',' + circleLocationLat + ']\n';
    geoJsonString += '\t}\n';
  }
  geoJsonString += '}\n';
  console.log("returning " + geoJsonString);
  return geoJsonString;
};

/**
 * Removes the specified leafletPlume from the group, which deletes it from the map.
 * Also deletes its popup, I hope.
 * @param {L.Plume} plume
 */
leaf.Plumes.prototype.removePlume = function(plume) {
  this.plumesGroup.removeLayer(plume);
};


/**
 * Deletes all plumes from the group, which deletes them from the map.
 */
leaf.Plumes.prototype.removePlumes = function() {
  this.plumesGroup.clearLayers();
};



if (goog.DEBUG) console.log('Plumes.js loaded');

