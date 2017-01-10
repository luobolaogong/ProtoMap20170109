if (goog.DEBUG) console.log('Legend.js loading...');
goog.provide('leaf.Legend');
//goog.require('leaf.Network');

leaf.Legend = function(layerName) { // so, what should this be, some full url or "lightning"?
  this.layerName = layerName; // tmp
  // Make this just a constant var later, or a define somewhere.  Maybe all we need is the layerName and the
  this.imageUrl = 'https://test.msat.akimeka.com/weather/WMS?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&STYLE=default&FORMAT=image/png;mode=8bit&CRS=CRS:84&LAYER=' + layerName;

  // Is this where we test for the legend image based on the layer url?
  // leaf.Network.imageResourceTest(this.imageUrl); // this is an async, so doesn't block.  So what good is it here?

  // Experimental:  Currently this is not being used.
  // right to put this here?  Seems okay, if can get to this Legend when want to
 this.legendImageDomNode = goog.dom.createDom('img', {
   'id': 'weather-legend-' + layerName,
   'style': 'position:absolute; bottom:20px; left:20px; z-index:999',
   'src': this.imageUrl
 });
};
if (goog.DEBUG) console.log('Legend.js loaded');