if (goog.DEBUG) console.log('Network.js loading...');
/// Network resources utilities, just image accessibility and loading for now.
/// This file should not go into the leaf directory.  Move it to some kind of
/// network testing of resources utilty area.  This could be used for startup of
/// the MSAT map to test GVS, and could be used for loading of some initial GVS files
/// such as the first tile, and maybe some weather stuff, and also weather legends.
///
/// The stuff here has to do with images, but probably should expand and use Xhrlo
/// as in goog.require('goog.net.XhrIo'); with "send"
///
/// Here is the HTML file I was using to get the ball rolling for testing this stuff:
/// <!DOCTYPE html>
/// <html lang="en">
///     <head>
///     <script src='closure-library/closure/goog/base.js'></script>
///     <script src='closure-library/closure/goog/structs/queue.js'></script> // nec?
///     <script src='closure-library/closure/goog/structs/circularbuffer.js'></script> // nec?
///     <script src='Main.js'></script>
///     <script src='ImageTest.js'></script>
///     <script src='ImageLoader.js'></script>
///     <meta charset="UTF-8">
///     <title>Title</title>
///     </head>
///     <body onload='main()'>
///     <!--<script src='ImageLoader.js'>-->
///     <!--console.log("In the script tag in ImageLoader.html");-->
/// <!--</script>-->
/// </body>
/// </html>
///
goog.provide('leaf.Network');
goog.require('goog.net.BulkLoader');
goog.require('goog.net.ImageLoader');
goog.require('goog.events.Listener');
goog.require('goog.Uri');
goog.require('goog.net.NetworkTester');

// leaf.Network = function () { // change name to NetworkUtils, or something
//   //console.log("Why isn't this a constructor?");
// };

leaf.Network.main = function () {
  console.log("In ImageLoader.main()");
  //var legends = new leaf.Legends();
  var initialTileUrl = 'https://maps.gvs.nga.mil/arcgis/rest/services/Basemap/NGA_ShadedRelief_2D/MapServer/tile/0/0/0';
  this.imageResourceTest(initialTileUrl); // this does not block, listens for the image to come in
  this.imageLoader(initialTileUrl); // This does not block either.  Listener for a load, or error, and when is done

  var imageUrlBase = 'https://test.msat.akimeka.com/weather/WMS?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&STYLE=default&FORMAT=image/png;mode=8bit&CRS=CRS:84&LAYER=';
  var imageUrls = [
    imageUrlBase + 'lightning',
    imageUrlBase + 'DCF_Cloud_Cover',
    imageUrlBase + 'NEXRAD_Radar_Precip',
    imageUrlBase + 'Surface_Ice_Concentration_Analysis',
    imageUrlBase + 'IWWC',
    imageUrlBase + 'Surface_Temperature_Analysis_in_F',
    imageUrlBase + 'Surface_Visibility_Analysis',
    imageUrlBase + 'Tropical_Storm_Forecast', // no image available
    imageUrlBase + 'Surface_Wind_Analysis'
  ];
  this.imagesLoader(imageUrls); // this does not block, but listens for each load, error, and when all is done

  console.log("Leaving ImageLoader.main()");
};

//
// Closure's ImageLoader, with an event listener is the best way to check for existence of
// images from a service.  It doesn’t require an image tag, and you can check for
// errors easily, and it works on all browsers.  It is an asynchronous thing
// and you should wait until an event is generated indicating success or failure
// and that it's done, before you do something with the results.  But an error
// should come back fairly quickly, I think if there is a problem.
//
// Here we just want to test all, or maybe just one image at a time.
//
// Single image loader
leaf.Network.imageLoader = function (imageUrl) {
  var imageLoader = new goog.net.ImageLoader();

  var imageEventTypes = [
    goog.events.EventType.LOAD,
    goog.net.EventType.ERROR,
    goog.net.EventType.COMPLETE
  ];
  goog.events.listen(imageLoader, imageEventTypes, function (e) {
    if (e.type == goog.events.EventType.LOAD) {
      var image = e.target; // e.target is an Image object, and has naturalHeight, naturalWidth
      console.log("Got a load event from imageLoader, and an image, and will display it.  Image height: " + image.naturalHeight);
      leaf.Network.displayImage(image);
    } else if (e.type == goog.net.EventType.ERROR) {
      console.log("!!!!!!!!!!!!!1Some kinda error with imageLoader for the single image, maybe it's " + e.target.src);
    } else if (e.type == goog.net.EventType.COMPLETE) {
      console.log("Image has finished being processed.  Probably loaded.");
      imageLoader.dispose();
    }
  });
  var imageId = goog.isString(imageUrl) ? imageUrl : imageUrl.src;
  //imageLoader.addImage(imageId, initialTile, goog.net.ImageLoader.CorsRequestType.USE_CREDENTIALS);
  //imageLoader.addImage(imageId, initialTile, goog.net.ImageLoader.CorsRequestType.ANONYMOUS);
  imageLoader.addImage(imageId, imageUrl);
  imageLoader.start();
};

// Here's a way to loaded many images.
leaf.Network.imagesLoader = function (imageUrls) {
  var loadedImages = [];
  var failedImages = [];
  var imageLoader = new goog.net.ImageLoader();

  var imageEventTypes = [
    goog.events.EventType.LOAD,
    goog.net.EventType.ERROR,
    goog.net.EventType.COMPLETE
  ];
  goog.events.listen(imageLoader, imageEventTypes, function (e) {
    var image = e.target;
    if (e.type == goog.events.EventType.LOAD) {
      console.log("Image was loaded, so will add it to the list: " + e.target.src)
      loadedImages.push(image);
    } else if (e.type == goog.net.EventType.ERROR) {
      console.log("....................Some kinda error with imageLoader for image from " + e.target.src);
      failedImages.push(image);
    } else if (e.type == goog.net.EventType.COMPLETE) {
      console.log("All images have finished being processed.");
      this.useLoadedImages(loadedImages);
      this.dealWithFailedImages(failedImages);
      imageLoader.dispose();
    }
  });
  for (var imageUrlsCtr = 0; imageUrlsCtr < imageUrls.length; imageUrlsCtr++) {
    var imageUrl = imageUrls[imageUrlsCtr];

    var imageId = goog.isString(imageUrl) ? imageUrl : imageUrl.src;
    imageLoader.addImage(imageId, imageUrl);
  }
  imageLoader.start();
};

leaf.Network.dealWithFailedImages = function (failedImages) {
  //console.log("In dealWithFailedImages.");
  for (var failedImageCtr = 0; failedImageCtr < failedImages.length; failedImageCtr++) {
    console.log("Failed image: " + failedImages[failedImageCtr].src);
  }
};

// static function, because called from inside a callback?
leaf.Network.displayImage = function (image) {
  var legend = document.createElement("img");
  legend.id = "weather-legend:" + image.id;
  legend.style.position = "absolute";
  legend.style.bottom = "20px";
  legend.style.left = "20px";
  legend.style.zIndex = "999";
  legend.src = image.src;
  document.body.appendChild(legend);
};

leaf.Network.useLoadedImages = function (loadedImages) {
  //console.log("In useLoadedImages");
  for (var loadedImageCtr = 0; loadedImageCtr < loadedImages.length; loadedImageCtr++) {
    var loadedImage = loadedImages[loadedImageCtr];
    console.log("Loaded image id: " + loadedImage.id + " height/width: " + loadedImage.naturalHeight + "/" + loadedImage.naturalWidth);
    //console.log("Loaded image: " + loadedImages[loadedImageCtr].image);
    //console.log("Loaded image: " + loadedImages[loadedImageCtr].src);
    var legend = document.createElement("img");
    legend.id = "weather-legend:" + loadedImage.id;
    legend.style.position = "absolute";
    legend.style.bottom = "20px";
    legend.style.left = "20px";
    legend.style.zIndex = "999";
//    legend.src = 'https://test.msat.akimeka.com/weather/WMS?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&STYLE=default&FORMAT=image/png;mode=8bit&CRS=CRS:84&LAYER=' + layer.name;
    legend.src = loadedImage.src;
    document.body.appendChild(legend);
  }
};

//    legend.src = 'https://test.msat.akimeka.com/weather/WMS?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&STYLE=default&FORMAT=image/png;mode=8bit&CRS=CRS:84&LAYER=' + layer.name;

// This function was mostly created to see if the initial tile we've been hitting in order
// to cause authentication/authorization to be triggered at GVS, so that subsequent tile
// requests would be okay, and not have to be authorized again.
// Make a static?
leaf.Network.imageResourceTest = function (imageUrl) {
  var imageUri = new goog.Uri(imageUrl);
  imageUri.makeUnique(); // to force away from just checking cache
  var imageResourceTester = new goog.net.NetworkTester(function (isResourceAvailable) {
    if (isResourceAvailable) {
      console.log("The image resource is available: " + imageUri.toString());
    }
    else {
      console.log("This image resource is NOT available: " + imageUrl);
    }
  });
  imageResourceTester.setUri(imageUri);
  imageResourceTester.setNumRetries(1); // total of 2 tries
  imageResourceTester.setPauseBetweenRetries(250); // quarter second apart
  imageResourceTester.setTimeout(10000); // total(?) time for all this is 3 sec
  console.log("Starting the test.  There is no blocking waiting for the image.  Just a callback.");
  imageResourceTester.start();
};
if (goog.DEBUG) console.log('Network.js loaded');
