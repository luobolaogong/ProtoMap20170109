if (goog.DEBUG) console.log('Settings.js loading...');
//
// Maybe won't want this file, or won't want to call it Settings in the future.
//
// There are 4 environments:
// 1. MSAT Gold Build
// 2a, 2b. MSAT development build on my own machine (both Debug and non debug modes)
// 3. Prototype build, with access to MSAT resources via Akimeka network (NGA/GVS layers, maybe database later, etc.)
// 4. Prototype build outside of Akimeka network resources
//
// This file should be loaded before any leaflet or leaf/*.js files, as Leaflet
// files may look to these settings as they're starting up.  Probably not, but
// this file should be executed before any other Leaflet files are.
//
// Prior to this file being executed, perhaps we could see if LeafletMapImpl.js has
// been executed, which will tell us whether we're in an MSAT environment or not.
// That might give us a clue as to what resources are available, and where.
//
// For example we have a different relative directory location (relative to the "leaf JS code")
// for default images used for icons for markers depending on how the app is built.
//
// There are icon resources from Leaflet, from Akimeka.
// There are layer resources from NGA/GVS, from Esri.
// There are weather resources through proxy server.
// There are DB resources via an Oracle connection.
// There are Leaflet library/plugin resources in different places.  In the build
// There are "compiled" resources
//
// In Prototype, the images are in
// ../resources/img/
// and there are three of them for the default marker icon (big, small, shadow).
//
// But in my MSAT development environment we have these icons in
// ../images/
//
// And in the official build they are in
// images/
//
// So, in the code, how do you set L.Icon.Default.imagePath ?  The path value depends on the
// build environment, and the build environment can be detected how?  
// 
//
/**
 * @fileoverview This file defines different settings that may be useful prior to loading any
 * Leaflet files.
 */
//goog.provide('leaf.Settings');
if (goog.isFunction(window.parent.getMapLayerData)) {
  L.Icon.Default.imagePath = 'images';
}
else {
  L.Icon.Default.imagePath = 'resources/img';
}
if (goog.DEBUG) console.log('Settings.js loaded.');
