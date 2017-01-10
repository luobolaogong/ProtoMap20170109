if (goog.DEBUG) console.log('Popup.js loading...');
/**
 * @fileoverview This file defines the leaf.Popup class. This is old code that deals with
 * popup content.  Not sure how to use it yet, but probably with Marker.js
 */
goog.provide('leaf.Popup');



/**
 * @classdesc The Popup class ("leaf.Popup") is managed by leaf.Marker, and represents the content
 * displayed in the L.Popup.
 * @summary
 * Creates a leaf.Popup object.
 * @description
 * This is the constructor for creating a leaf.Popup object.
 * <p/>
 * A Popup should have access to its Callout information so that content can be swapped
 * if necessary, "less/more", level1/level2, whatever.
 * <p/>
 * Popup content is complicated text, probably with HTML
 * stuff for hiding the secondary parts of the popup.  The text comes from the callout info.
 *
 * @example var Popup = new leaf.Popup(callout);
 * @param {leaf.Callout} callout
 * @protected
 * @constructor
 */
leaf.Popup = function(callout) {
};


/**
 * Swap the different div contents of a Popup. This is done by toggling the
 * class of the div between hidden and unhidden. This assumes there are two,
 * mutually exclusive div contents. Unfortunately, this is not causing the Popup
 * itself to resize. Instead, it can cause scrollbars to show up. In some cases
 * that would be fine, but most of the time we just want the Popup itself to
 * resize. We don't have access to the Popup at this point. If we did, perhaps
 * we could call Popup.updateSize()
 *
 * @param {string} divId1 Some HTML thing
 * @param {string} divId2 Some HTML thing
 * @param {string} calloutId Some unique identifier
 * @param {leaf.Feature} feature Actually, not sure of type
 */
leaf.Popup.swapPopupContent = function(divId1, divId2, calloutId, feature) {
  var minimizeIconDivId = 'popupInfo' + calloutId;
  var levelOneDivId = '';
  var levelTwoDivId = '';
  var imageTag = '';

  var divTemp = document.createElement('div'); // consider using goog.dom.createDom(...)
  // example:
  // var divTemp = goog.dom.createDom('div', {
  //       'id': 'weather-legend',
  //       'style': 'position:absolute; bottom:20px; left:20px; z-index:999',
  //       'src': src
  //     }
  // );



  divTemp.innerHTML = feature.popup.contentHTML;

  var elms = divTemp.getElementsByTagName('*');
  for (var i = 0, maxI = elms.length; i < maxI; ++i) {
    var elm = elms[i];
    if (elm.id == divId1)
      levelOneDivId = elm;
    else if (elm.id == divId2)
      levelTwoDivId = elm;
    else if (elm.id == minimizeIconDivId)
      imageTag = elm;
  }
// Hey this crap can perhaps be improved with goog.dom.classes.add and remove and swap and enable
  if (levelOneDivId) {
    // may as well do the popup icon logic here as well
    if (levelOneDivId.className == 'hidden')
      imageTag.src = 'resources/akimeka/icon_bubble_chevron_cnt_10x12.png';
    else
      imageTag.src = 'resources/akimeka/icon_bubble_chevron_exp_10x12.png';
    levelOneDivId.className = (levelOneDivId.className == 'hidden') ?
        'unhidden' : 'hidden';
  }
  if (levelTwoDivId) {
    levelTwoDivId.className = (levelTwoDivId.className == 'hidden') ?
        'unhidden' : 'hidden';
  }
  feature.popup.setContentHTML(divTemp.innerHTML);
};

if (goog.DEBUG) console.log('Popup.js loaded');
