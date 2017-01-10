if (goog.DEBUG) console.log('Legends.js loading...');
goog.provide('leaf.Legends');
goog.require('leaf.Legend');
goog.require('goog.structs.LinkedMap');
goog.require('goog.dom');

// I really hate to stay it, but the logic of this class needs to be revisited.  High level.  Flow chart.
// Stuff can be streamlined.  Too many checks for things to delete that shouldn't be there to delete anyway, I think.
// Plus, this stuff isn't documented and it needs to be.

/*
So, this is what I think at this time regarding how legends should work.

I don't agree with this, but currently we're deliberately limiting legends to display only one at a time on the map,
and the one that it displays is the one corresponding to the displayed (checked) top weather layer.  Top means most recently added.
If a weather layer is removed from being displayed (unchecked), then if it was the top weather layer, its legend is also removed from displaying.
That's simple, right?

So, we keep track of a stack of displayed weather layers.  It's like a stack, in that new layers are added only to the top, but deletions
can be made from anywhere in the stack.  This stack of displayed weather layers is different from the list of all layers that the map
has reference to.  (This stack doesn't contain copies of weather layers, surely.  It's probably just a list of the layer names, I'm guessing.
Not sure how that works at this time.)

When a weather layer is created at startup (not later when it gets checked), its legend should also be created, and that layer contains
a reference to the legend object, and that legend object never goes away.  That legend object may have an ID or a name, not sure.  It should
probably also have a reference to a DOM image node that can be added and deleted from a parent (document.body?).

As to an ID for that DOM image node, for adding as a child, and
removing from the parent, since there's only one, we don't have to have a special name ID for it.  We can keep the same name for all, and
easily delete the previous one before we add the new one.

When the user checks an overlay layer, the layer's tiles are requested by Leaflet in the background, but also callback "onOverlayAdd", 
in Controls.js is triggered.  
If it's a weather layer, then ...
 */
//
leaf.Legends = function() {
  this.legendsLinkedMap = new goog.structs.LinkedMap();
};

leaf.Legends.prototype.addLegend = function(legend) {
  if (this.legendsLinkedMap.getCount() > 0) {
    var exists = this.legendsLinkedMap.contains(legend);
    if (exists) { console.log("Legends.js.addLegend This legend is already in the list.  Won't add it again.  This should not happen");
      return false; // necessary to return anything?
    }
  }
  var layerName = legend.layerName;
  this.legendsLinkedMap.set(layerName, legend);
  this.addLegendImage(legend.imageUrl); // We could send in the img DOM node here, if we create it when the legend is created.
  return true; // do we really need to return anything?
};

leaf.Legends.prototype.removeLegend = function(legend) {
  // Shouldn't happen
  if (this.legendsLinkedMap.getCount() === 0) {
    console.log("Cannot delete from an empty Legends list");
    return false;
  }
  //
  // Find the matching legend from the list.  If there isn't one, then just return false.
  // This shouldn't normally happen.
  //
  var matchingLegend = this.legendsLinkedMap.get(legend.layerName);
  if (!goog.isDefAndNotNull(matchingLegend)) {
    return false;
  }
  //
  // Delete the matching legend from the list, and remove its image if this was at the 
  // top of the list.  Then pop, and then we reestablish the new image if there was 
  // one underneath.
  var topNode = this.legendsLinkedMap.peekLast();
  if (topNode == matchingLegend) {
    this.legendsLinkedMap.pop();
    this.removeLegendImage(); // Of course assumes there's only one legend allowed to be displayed at a time.
    if (this.legendsLinkedMap.getCount() > 0) {
      topNode = this.legendsLinkedMap.peekLast();
      this.addLegendImage(topNode.imageUrl);
    }
  }
  else {
    this.legendsLinkedMap.remove(matchingLegend.layerName);
  }
  return true;
};
///
/// Remove the legend image from the page, if there is one.  There might not be one yet,
/// if no previous weather layer selection was made, or if the previously selected layer
/// didn't have a legend image.  Currently we're only showing one legend image at a time.
/// If we have more later, then this method will need to change.
///
leaf.Legends.prototype.removeLegendImage = function() {
//  var legendImageTagToRemove = document.getElementById('weather-legend');
  var legendImageTagToRemove = goog.dom.getElement('weather-legend'); // assumes there's only one, and so the generic name
  if (!goog.isNull(legendImageTagToRemove)) {
    //legendImageTagToRemove.remove(); // removes image from page
    goog.dom.removeNode(legendImageTagToRemove); // this should delete the legend image from the map
  }
};

leaf.Legends.prototype.createImageElement = function(src) {
  // try a new way, and if it works, search for all other similars, and change them

  var legendDocElement = goog.dom.createDom('img', {
        'id': 'weather-legend',
        'style': 'position:absolute; bottom:20px; left:20px; z-index:999',
        'src': src
      }
  );

//  goog.dom.setProperties(ebaJ);

  // var legendDocElement = document.createElement("img");
  // legendDocElement.id = "weather-legend"; // maybe not add the name?  eba
  // legendDocElement.style.position="absolute";
  // legendDocElement.style.bottom="20px";
  // legendDocElement.style.left="20px";
  // legendDocElement.style.zIndex="999";
  // legendDocElement.src = src;

  return legendDocElement;
};

leaf.Legends.prototype.addLegendImage = function(imageSrc) {
  this.removeLegendImage(); // This function need not be called when we do onOverlayRemove->removeLegend->addLegendImage.  Also got a problem here.  What if the new layer does not have a legend?  Remove existing top anyway?
  var imageElement = this.createImageElement(imageSrc); // Unnecessary call if the Legend object already had this img DOM node
  //document.body.appendChild(imageElement);
  goog.dom.appendChild(document.body, imageElement); // Doesn't show up immediately.  Why?  Why attach to the document.body?  What is the document.body?
};



// /// Empty the legends list
// void clear() {
//   if (this.legendsList.isNotEmpty) {
//     this.legendsList.clear();
//   }
//   removeLegendImage();
// }
//

if (goog.DEBUG) console.log('Legends.js loaded');