if (goog.DEBUG) console.log('Callout.js loading...');
/**
 * @fileoverview This file defines the leaf.Callout class.  It contains a lot of old string parsing and
 * reconstruction of HTML for display in popups.  This file needs to be severely reworked when have time.
 */
goog.provide('leaf.Callout');
goog.require('goog.json');
goog.require('goog.string');
goog.require('goog.html.utils');

/**
 * @classdesc The Callout class holds information that may be displayed in a marker's popup, label, and hover.
 * @summary
 * Constructor for a leaf.Callout object.
 * @description
 * This constructor creates a leaf.Callout object from one Callout element in a Results object array.
 * A Callout is not an object that gets displayed.  That is, it is not a Popup.
 * @example var callout = new leaf.Callout(queryResultsMarkerCallout);
 * @param {Object} queryResultsMarkerCallout Information for display
 * @protected
 * @constructor
 */
leaf.Callout = function(queryResultsCallout) {
  this.markerIconUrl = queryResultsCallout.icon; // used anywhere?
  this.labelContent = this.createLabelContent(queryResultsCallout.label);
  if (queryResultsCallout.hasLevelTwo) { // new, new, new, new, new, and prob unnecessary
    this.levelTwoBody = queryResultsCallout.levelTwoBody;
  }
  this.hoverContent = this.createHoverContent(queryResultsCallout); // queryResultsCallout.detailLabel
  this.popupContent = this.createPopupContent(queryResultsCallout);
  this.isPlume = goog.isDefAndNotNull(queryResultsCallout.GeometryTag);
  if (goog.isDefAndNotNull(queryResultsCallout.lat) && goog.isDefAndNotNull(queryResultsCallout.lon)) {
    this.location = L.latLng(queryResultsCallout.lat, queryResultsCallout.lon);
  }
  else {
    if (goog.DEBUG) console.log('Missing location for callout ' + this.labelContent);
  }
};


/**
 * This method attempts to put together popup content in such a way that it changes
 * it's content according to icons or links that are clicked in that content.
 * <p/>
 * This method should be reconsidered, as there must be a better way to
 * show content in a popup without playing CSS or HTML games.
 * <p/>
 * The following information is taken from the previous OpenLayers version which
 * partially came from the WorldWind version, as does the code.
 * <p/>
 * There are two text contents: "level1", and "level2".
 * The initial popup state contains level1. Clicking on the "More..." link
 * causes level1 content to be replaced by level2 content. Level2 content
 * includes the link "Less...". Clicking on "Less..." returns the Level1 content
 * to the popup. Both contain a link "Show Details".
 * <p/>
 * Callouts have more fields than we use in the popups. Some ignored fields include
 * transparencyLevel, graduatedSize, graduatedColor, hasGraph, and graphParameters.
 * <p/>
 * The current way to replace popup contents is by swapping <div> contents, both of
 * which exist in the popup, but only one is displayed at a time. You have both level1 and
 * level2 content in the popup at the same time, but both are surrounded by
 * <div> elements that you can turn on or off using CSS and a swap of the
 * "class".
 * <p/>
 * Another way would be to just change the contents and then force a
 * redisplay of the popup. No CSS magic required.  Would be cleaner.
 * <p/>
 * Callout.id needs to be unique for all markersGroup
 * placed on the map. If they aren't, then the swapping of popupContent might
 * not work right. When you click on "More..." or "Less..." it may be
 * manipulating a different popup's contents!
 * <p/>
 * It looks like in the old WorldWind
 * version the text size is set to 10, and font type to Verdana. Also, WorldWind
 * annotations ignore many HTML tags. One example is the size attribute of the
 * font tag, which was deprecated in HTML 4.0.1 and eliminated by HTML 5, and
 * yet some of the data that gets sent in has an HTML font tag with size
 * attribute in it.
 * <p/>
 * Take a look at how Google does their popups. Looks nice, informative, but also lots of div's.
 * <p/>
 * This method should be private.
 *
 * @protected
 * @param {Object} callout A query results callout Object
 * @return {string|*}
 */
leaf.Callout.prototype.createPopupContent = function(callout) {
  var popupContentHeader = undefined;
  var popupContentLevelOne = undefined;
  var popupContentLevelTwo = undefined;
  var popupContent = undefined;

  var minimizeDivId = 'popupInfo' + callout.id; // is this for CSS?
  //
  // Labels should probably be used for hovering or when we've zoomed
  // in close enough that we want to see what we've got without having
  // to click on a marker. But we don't do that. Instead, most of the
  // time the label is used as the LevelOneBody. If there is no label
  // we use the detailLabel, which supposedly always exists.
  //
  var calloutLabel = callout.label;
  if (!callout.label) {
    calloutLabel = callout.detailLabel; // strange, but seems like a fallback
  }

  // if no LevelOneBody, use the label info.
  var calloutLevelOneBody = callout.levelOneBody;
  if (!callout.levelOneBody) {
    calloutLevelOneBody = calloutLabel;
  }

  // LevelTwoBody is optional, and is indicated by hasLevelTwo.
  //
  // Do some html tag cleaning.  Perhaps could be done server side.
  // This is dangerous stuff.  The database data should be cleaned/fixed.
  // But if we do have to parse through this stuff, we should do it using
  // goog.string.html.HtmlParser or goog.html.utils.stripHtmlTags() or others
  //
  var calloutLevelTwoBody = undefined;
  if (callout.hasLevelTwo) {
    var fontRegExpPattern = /<font[\s]*(.*?)size([=]?|[\s]*)(["'])([^"']*)\3(.*?)>/ig;
    var fontReplacementPattern = '<font $1 $5>'; // just drop the size
    // attribute(s) and value
    var fontRegExp = new RegExp(fontRegExpPattern);
    var fontPatternExists = fontRegExp.test(callout.levelTwoBody);
    if (fontPatternExists) {
      var levelTwoBodyWithoutBadFontSizes = callout.levelTwoBody.replace(
          fontRegExp, fontReplacementPattern);
      callout.levelTwoBody = levelTwoBodyWithoutBadFontSizes;
    }

    // We can also drop <big> and </big> tags. For now, just assume they look
    // exactly like that
    var bigTagRegExpPattern = /(<big>|<\/big>)/ig;
    var bigTagReplacementPattern = '';
    var bigTagRegExp = new RegExp(bigTagRegExpPattern);
    var bigTagPatternExists = bigTagRegExp.test(callout.levelTwoBody);
    if (bigTagPatternExists) {
      var levelTwoBodyWithoutBadbigTagSizes = callout.levelTwoBody.replace(
          bigTagRegExp, bigTagReplacementPattern);
      callout.levelTwoBody = levelTwoBodyWithoutBadbigTagSizes;
    }

    var regExpPattern = /(.*?)<a[\s]*href\=(["'])([^"']*)\2[\s]*>(.*?)<\/a>(.*?)/ig;
    var replacement = '$1' +
        '<a href=\"$3\"' +
        " onclick=\"window.open(\'$3\', 'CalloutLinksWindow', 'height=600,width=800');return false;\">" +
        '$4</a>$5';
    var regExp = new RegExp(regExpPattern);
    var patternExists = regExp.test(callout.levelTwoBody);
    if (patternExists) {
      var newLevelTwoBody = callout.levelTwoBody.replace(regExp, replacement);
      callout.levelTwoBody = newLevelTwoBody;
    }
    calloutLevelTwoBody = callout.levelTwoBody;
  }// end regex cleansing

  // This stuff is directly from OLResultsDataLayer.js, except the js call to showDetails
  // this is the div that will hold icons over the main content div
  popupContentHeader = "<div>";
  if (callout.hasLevelTwo && goog.string.trim(calloutLevelTwoBody).length > 0) {
    popupContentHeader = popupContentHeader + "<img id='" + minimizeDivId +
        "' " + "class='" + minimizeDivId + "' " +
        "style='padding-right: 4px;padding-bottom:4px;' " +
        "src='akimeka/icon_bubble_chevron_cnt_10x12.png'>";
  }
  if (callout.hasDetails) {
    popupContentHeader = popupContentHeader +
        '<a href="javascript:leaf.map.showDetails(' +
        "'" +
        callout.alternateId +
        "'" +
        ');\">' +
        "<img style='padding-right:4px;padding-bottom:4px;border:none;' src='akimeka/icon_bubble_info_12x12.png'>" +
        "</a>";
  }
  popupContentHeader = popupContentHeader + "</div>";

  // // Logic here is definitely wrong.  showDetailsArgument has vastly different values for one thing.
  // var showDetailsArgument = undefined;
  // if (callout.hasLevelTwo && goog.string.trim(calloutLevelTwoBody).length > 0) {
  //   showDetailsArgument = goog.string.htmlEscape(calloutLevelTwoBody);
  // }
  // if (callout.hasDetails) {
  //   showDetailsArgument = goog.string.htmlEscape(callout.alternateId, false);
  // }
  // var safeHtmlDivTag = goog.html.SafeHtml.create('div',
  //     null,
  //     goog.html.SafeHtml.create('a', {
  //       'href': 'leaf.map.showDetails(' + showDetailsArgument + ')'
  //     }, safeHtmlImgTag)
  // );
  // popupContentHeader = safeHtmlDivTag;

  console.log("popupContentHeader: " + popupContentHeader);
  //
  // Put together the parts for the level one popup content. Each id should be
  // unique, based on the popup, or marker, or feature it's in.
  //
  var level1UniqueId = 'level1popup' + callout.id;
  var level2UniqueId = 'level2popup' + callout.id;
  popupContentLevelOne = "<div id=\'" +
      level1UniqueId +
      "\' class='unhidden'>" +
      calloutLevelOneBody +
      '</div>';
  //
  // Create the level two portion for the popup. We'll assume there's a levelOne
  // body.
  //
  popupContent = popupContentHeader;

  if (calloutLevelTwoBody && leaf.Callout.stringTrimHelper(calloutLevelTwoBody) !== '') {
    popupContentLevelTwo = "<div id='" + level2UniqueId + "' class='hidden'>" +
        calloutLevelTwoBody + '</div>';
    popupContent = popupContent + popupContentLevelOne + '<div>' +
        popupContentLevelTwo + '</div>';
  } else {
    popupContent = popupContent + popupContentLevelOne;
  }
  console.log("Leaving Callout.js.createPopupContent,returning " + popupContent);
  return popupContent;
};

/*
 <div>
  <img
    id='popupInfo0'
    class='popupInfo0'
    style='padding-right: 4px;padding-bottom:4px;'
    src='akimeka/icon_bubble_chevron_cnt_10x12.png'>
  <a href="javascript:leaf.map.showDetails('alternateId*JPTA_KYR1!-1!1000208!1377820800000!1464134399000!true|SYND_SURV|MTF');">
    <img
      style='padding-right:4px;padding-bottom:4px;border:none;'
      src='akimeka/icon_bubble_info_12x12.png'>
  </a>
 </div>
 <div id='level1popup0' class='unhidden'>
  <div style='color: BLACK; background-color: WHITE'>
    label* JPTA_KYR1: 376 EMDG Manas, Kyrgyzstan
    <br/>
    Z-Score: -0.13 Source: JMEWS
  </div>
 </div>
 <div>
  <div id='level2popup0' class='hidden'>
    <div style='color: BLACK; background-color: WHITE'>
      Level2Body* JPTA_KYR1: 376 EMDG Manas, Kyrgyzstan
      <br/>
      Z-Score: -0.13 Source: JMEWS
    </div>
    <br>
    <hr>
    Count for 05/24/2016: 0
    <br>
    Total Count: 4
    <br>
    Z-Score:
    <font color="green">
      GREEN
    </font>
    <br>
    ESSENCE:
    <font
      color="green">
      GREEN
    </font>
  </div>
 </div>




 */



/**
 * Create content for the marker hover, to display when hovering over the feature.
 * Could contain more information than the label, and less than the popup.
 * @param {leaf.Callout} callout Actually, not sure of the type.
 * @return {string}
 */
leaf.Callout.prototype.createHoverContent = function(callout) {
  return callout.detailLabel;
};


/**
 * Make this non-global later.  In fact, get rid of this and replace it with
 * goog.string.collapseWhitespace()
 *
 * @param {string} str The string to trim
 * @return {string} The trimmed string
 */
leaf.Callout.stringTrimHelper = function(str) {
  return goog.string.collapseWhitespace(str);
};


/**
 * Another hack from the past.  The data coming in is not defined well and has to be parsed by some rules,
 * like the HTML break delimiter is used as a separator.
 * @protected
 * @param {string} calloutLabel Can have some variation.
 * @return {string}
 */
leaf.Callout.prototype.createLabelContent = function(calloutLabel) {
  return goog.html.utils.stripHtmlTags(calloutLabel);
  // What we get in calloutLabel seems to vary too much to know how best to parse it.
  //  var array1 = calloutLabel.split('<br/>'); 
  // Previous line gives us either "<div ...>JPTA...Kirkuk" as first elem, or "JPTA...Kirkuk"
  //  if (array1[0].search('>') != -1) {
  //    var array2 = array1[0].split('>');
  //    return array2[1];
  //  }
  //  return array1[0];
};


// /**
//  * Static method to convert plume callout structure (either a parent,
//  * or the child -- see LeafPlumes) into a GeoJSON object.
//  * We ignore any children this plume may have.
//  * <p/>
//  * The result of calling this function is a GeoJSON string representing one GeoJSON
//  * "Feature".  It can be combined with others to make a GeoJSON FeatureCollection, which
//  * is perhaps how we should do it, because our plume data seems to mostly be a "parent"
//  * plume followed by a lot of child plumes.  Each of the child plumes should have a
//  * popup and label, I think.  Each Leaflet L.geoJSON objects can have a popup bound to it.
//  * 
//  * Why is this function here rather than in Plumes.js?  This is only for plumes.
//  * 
//  * <p/>
//  * The iconPath parameter is optional, and is only used for the parent.
//  *
//  * This function should be renamed?  What's with "Component"?
//  * And how are the "attributes children" handled?  This isn't recursive.
//  *
//  * @param {Object} plumeCallout Raw callout data, not a leaf.Callout, I don't think.
//  * @param {string} iconPath The URI for the icon
//  * @return {string} Not sure how this string will be used yet.
//  */
// leaf.Callout.getGeoJsonForPlumeCalloutComponent = function(plumeCallout, iconPath) {
//   if (!plumeCallout) { // Should not be necessary
//     return '';
//   }
//   //if (typeof plumeCallout.GeometryTag === 'undefined') {
//   if (!goog.isDefAndNotNull(plumeCallout.GeometryTag)) {
//     alert('Missing GeometryTag property for PlumeCallout:\n' + goog.json.serialize(plumeCallout));
//     return '';
//   }
//   //if (!(plumeCallout.polygonPoints instanceof Array)) {
//   if (!goog.isArray(plumeCallout.polygonPoints)) {
//     alert('Missing polygonPoints array property:\n' + goog.json.serialize(plumeCallout));
//     return '';
//   }
//   //if (typeof plumeCallout.circleLocation === 'undefined') {
//   if (!goog.isDefAndNotNull(plumeCallout.circleLocation)) {
//     alert('Missing circleLocation property:\n' + goog.json.serialize(plumeCallout));
//     return '';
//   }
//   if (!goog.isDefAndNotNull(plumeCallout.circleRadius)) {
//     alert('Missing circleRadius property in plumeCallout:\n' + goog.json.serialize(plumeCallout));
//     return '';
//   }
//   plumeCallout.icon = iconPath; // but what if iconPath is null or undefined?  And where is this used?
//   //
//   // Get the type of geometry for this plume.
//   // We assume plumeCallout contains a polygon, or a circle, or a point,
//   // and NOT a combination of these.  Most of the time a plume is going to
//   // have a regular polygon representation.
//   // If there is an array of 1 or more polygon points, we assume it's a "polygon".
//   // If there is a circleRadius > 0, then we have a circle.  Otherwise, we
//   // assume it's a point, defined by the lat/lon coordinates
//   //
//   var geometryType = 'Point';
//   var nCoordsForPlume = plumeCallout.polygonPoints.length;
//   if (nCoordsForPlume > 0) {
//     geometryType = 'Polygon';
//   }
//   var circleRadius = plumeCallout.circleRadius;
//   if (circleRadius > 0.0) {
//     geometryType = 'Circle';
//   }
//   //
//   // Get color and fill for the geometry.  This section is for CHILD plumes,
//   // and not for the HEAD/parent stuff.
//   //
//   var attributes = plumeCallout.attributes;
//   var fill = false;
//   var color = 'yellow';
//   //if (typeof attributes !== 'undefined') {
//   if (goog.isDefAndNotNull(attributes)) {
//     for (var attrCtr = 0; attrCtr < attributes.length; attrCtr++) {
//       var attribute = attributes[attrCtr];
//       if (attribute[0] == 'FILL') { // HEADER, PLUME, these are not for polygons
//         fill = attribute[1];
//       }
//       else if (attribute[0] == 'COLOR') {
//         // We assume the color value string could be a hex value or a color name.
//         // If the string can be parsed as a hex number, then we prefix it with "#"
//         // otherwise we assume it's a name.
//         if (isNaN(parseInt(attribute[1], 16))) { // "008000" base 16.  where is isNaN?  Native code
//           color = attribute[1];
//         }
//         else {
//           color = '#' + attribute[1]; // have to add "#" for geoJSON colors if hex?
//         }
//       }
//     } // why aren't we recursive, to take care of the attributes children?
//   }
//   // Clean this up.  Not all properties here work with geoJson!!!!!!!  Different names: color/fillColor, stroke/etc.  See geojson.org/geojson-spec.html
//   var geoJsonString = '{\n';
//   geoJsonString += '\t\"type\":\"Feature\",\n'; // "type" is required.  So, why aren't we using a FeatureCollection?
//   //geoJsonString += '\t\"id\": \"' + plumeCallout.id + '\",\n'; // might wanna do something like this
//   geoJsonString += '\t\"properties\": {\n';
//   geoJsonString += '\t\t\"style\": {\n';
//   geoJsonString += '\t\t\t\"fill\": ' + fill + ',\n';
//   geoJsonString += '\t\t\t\"fillColor\": \"' + color + '\",\n';
//   geoJsonString += '\t\t\t\"strokeColor\": \"' + color + '\",\n'; // seems to be ignored
//   geoJsonString += '\t\t\t\"fillOpacity\": 0.5,\n'; // was 0.8
//   geoJsonString += '\t\t\t\"strokeWidth\": 2\n';
//   geoJsonString += '\t\t},\n';
//   geoJsonString += '\t\t\"alternateId\": \"' + plumeCallout.alternateId + '\",\n';
//   geoJsonString += '\t\t\"detailLabel\": \"' + plumeCallout.detailLabel + '\",\n';
//   geoJsonString += '\t\t\"hasDetails\": \"' + plumeCallout.hasDetails + '\",\n';
//   geoJsonString += '\t\t\"id\": \"' + plumeCallout.id + '\",\n';
//   geoJsonString += '\t\t\"label\": \"' + plumeCallout.label + '\",\n';
//   if (iconPath) {
//     geoJsonString += '\t\t\"icon\": \"' + iconPath + '\",\n';
//   }
//   if (plumeCallout.hasLevelTwo) {
//     geoJsonString += '\t\t\"hasLevelTwo\": \"' + plumeCallout.hasLevelTwo + '\",' +
//         '\"levelTwoBody\": \"' + plumeCallout.levelTwoBody + '\",\n';
//   }
//   if (geometryType == 'Circle') {
//     geoJsonString += '\t\t\"radius\": ' + circleRadius + ',\n';
//   }
//   geoJsonString += '\t\t\"lat\": ' + plumeCallout.lat + ',\n\t\t\"lon\": ' + plumeCallout.lon + '\n\t},\n';
//   if (geometryType == 'Point') {
//     //var plumeLocation = new OpenLayers.LonLat(plumeCallout.lon, plumeCallout.lat);
//     var plumeLocation = L.latLng(plumeCallout.lat, plumeCallout.lon); // why is this done?  Used later?
//     geoJsonString += '\t\"geometry\": {\n';
//     geoJsonString += '\t\t\"type\": \"Point\",\n';
//     geoJsonString += '\t\t\"coordinates\": [' + plumeLocation.lng + ', ' + plumeLocation.lat + ']\n';
//     geoJsonString += '\t}\n';
//   }
//   else if (geometryType == 'Polygon') {
//     geoJsonString += '\t\"geometry\": {\n';
//     geoJsonString += '\t\t\"type\": \"Polygon\",\n'; // could be "MultiPolygon" maybe, but we want marker/label/popup for each
//     geoJsonString += '\t\t\"coordinates\": [\n';
//     geoJsonString += '\t\t[\n';
//     for (var coordCtr = 0; coordCtr < plumeCallout.polygonPoints.length - 1; coordCtr++) {
//       geoJsonString += '\t\t\t[' + plumeCallout.polygonPoints[coordCtr].longitude + ',' +
//           plumeCallout.polygonPoints[coordCtr].latitude + '],\n';
//     }
//     geoJsonString += '\t\t[' + plumeCallout.polygonPoints[coordCtr].longitude +
//         ',' + plumeCallout.polygonPoints[coordCtr].latitude + ']\n';
//     geoJsonString += '\t]\n';
//     geoJsonString += '\t]\n';
//     geoJsonString += '\t}\n';
//   }
//   else if (geometryType == 'Circle') {
//     // There's a bug somewhere that creates incomplete circle location info (and also reverses lat/lng),
//     // so we at least check that they're both there, and use the callout's lat/lng if either are missing.
//     var circleLocationLat = plumeCallout.circleLocation.latitude;
//     var circleLocationLng = plumeCallout.circleLocation.longitude;
//     //if (typeof circleLocationLat === 'undefined' || typeof circleLocationLng === 'undefined') {
//     if (goog.isDefAndNotNull(circleLocationLat) && goog.isDefAndNotNull(circleLocationLng)) {
//       circleLocationLat = plumeCallout.lat;
//       circleLocationLng = plumeCallout.lon;
//     }
//     // Because standard GeoJSON (at least with our parser) does not define a Circle geometry, we have to make it a point
//     // geometry, with a radius, as a special attribute, and then tell the processor how to process it.
//     geoJsonString += '\t\"geometry\": {\n';
//     geoJsonString += '\t\t\"type\": \"Point\",\n';  // not really, but what do we put here?
//     geoJsonString += '\t\t\"coordinates\": [' + circleLocationLng + ',' + circleLocationLat + ']\n';
//     geoJsonString += '\t}\n';
//   }
//   geoJsonString += '}\n';
//   return geoJsonString;
// };
if (goog.DEBUG) console.log('Callout.js loaded');

// Notes:
 // // No, we don't create a DOM element here.  We create a string.
 //
 // if (callout.hasDetails) {
 //   var href = "javascript:leaf.map.showDetails(' + callout.alternateId + ');"
 //   popupDivContentHeader = goog.dom.createDom('div',
 //       null,
 //       goog.dom.createDom('a', {
 //             'href': href
 //           },
 //           goog.dom.createDom('img', {
 //             'style': 'padding-right:4px;padding-bottom:4px;border:none;',
 //             'src': 'resources/akimeka/icon_bubble_info_12x12.png'
 //           })));
 // }

