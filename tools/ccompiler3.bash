#!/usr/bin/env bash

CLOSURE_COMPILER_HOME=~/Google/closure-compiler
#CLOSURE_LIB_HOME=~/Google/closure-library
CLOSURE_LIB_HOME=../libs/ClosureLibs20160924/closure-library-20160822
LEAFLET_PLUGINS_HOME=../libs/LeafletPlugins20160924
LEAFLET_HOME=../libs/LeafletLibs20160924

java -jar ${CLOSURE_COMPILER_HOME}/compiler.jar \
--js ${LEAFLET_HOME}/Leaflet-0.7.7/leaflet-src.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.draw-0.2.4/dist/leaflet.draw-src.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.markercluster-leaflet-0.7/dist/leaflet.markercluster-src.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet-MiniMap-3.3.1/dist/Control.MiniMap.min.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.loading-0.1.23/src/Control.Loading.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.NavBar-1.0.0/src/Leaflet.NavBar.js \
--js ${LEAFLET_PLUGINS_HOME}/leaflet-measure-2.0.5/dist/leaflet-measure.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.Coordinates-0.1.5/dist/Leaflet.Coordinates-0.1.5.src.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.label-master/dist/leaflet.label-src.js \
--js ../test/**.js \
--js ../leaf/*.js \
--js ../LeafletMapImpl.js \
--compilation_level WHITESPACE_ONLY \
--dependency_mode=LOOSE \
--entry_point leaf.Map \
--entry_point LeafletMapImpl \
--formatting PRETTY_PRINT \
--output_manifest ../build/Manifest.MF \
--output_module_dependencies ../build/ModuleDependencies.json \
--js_output_file ../build/Map-compiled-pretty-with-libs-plugs.js





#java -jar ${CLOSURE_COMPILER_HOME}/compiler.jar \
#--js ${LEAFLET_HOME}/Leaflet-0.7.7/leaflet-src.js \
#--js ${LEAFLET_PLUGINS_HOME}/Leaflet.draw-0.2.4/dist/leaflet.draw-src.js \
#--js ${LEAFLET_PLUGINS_HOME}/Leaflet.markercluster-leaflet-0.7/dist/leaflet.markercluster-src.js \
#--js ${LEAFLET_PLUGINS_HOME}/Leaflet-MiniMap-3.3.1/dist/Control.MiniMap.min.js \
#--js ${LEAFLET_PLUGINS_HOME}/Leaflet.loading-0.1.23/src/Control.Loading.js \
#--js ${LEAFLET_PLUGINS_HOME}/Leaflet.NavBar-1.0.0/src/Leaflet.NavBar.js \
#--js ${LEAFLET_PLUGINS_HOME}/leaflet-measure-2.0.5/dist/leaflet-measure.js \
#--js ${LEAFLET_PLUGINS_HOME}/Leaflet.Coordinates-0.1.5/dist/Leaflet.Coordinates-0.1.5.src.js \
#--js ${LEAFLET_PLUGINS_HOME}/Leaflet.label-master/dist/leaflet.label-src.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/json/json.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/dom/dom.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/structs/linkedmap.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/html/utils.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/string/string.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/array/array.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/asserts/asserts.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/dom/browserfeature.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/dom/nodetype.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/dom/tagname.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/dom/safe.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/html/safehtml.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/html/uncheckedconversions.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/math/coordinate.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/math/size.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/structs/map.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/debug/error.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/useragent/useragent.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/html/safestyle.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/html/safeurl.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/html/trustedresourceurl.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/string/const.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/dom/tags.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/html/safestylesheet.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/object/object.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/labs/useragent/browser.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/string/typedstring.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/fs/url.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/math/math.js \
#--js ../test/**.js \
#--js ../leaf/*.js \
#--js ../LeafletMapImpl.js \
#--dependency_mode=LOOSE \
#--entry_point leaf.Map \
#--entry_point LeafletMapImpl \
#--output_manifest ../build/fruitManifest.MF \
#--js_output_file ../build/Map-compiled.js
#

# This is for pretty print.  No real compression
# Also does STRICT, which means will only use files that have goog.provide
#CLOSURE_COMPILER_HOME=~/Google/closure-compiler
#CLOSURE_LIB_HOME=~/Google/closure-library
#java -jar ${CLOSURE_COMPILER_HOME}/compiler.jar \
#--js ${CLOSURE_LIB_HOME}/closure/goog/base.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/string/string.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/html/utils.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/json/json.js \
#--js ../libs/Leaflet_1.0-dev/leaflet-src.js \
#--js ../libs/plugins/Markers/MarkerCluster/leaflet.markercluster-src.js \
#--js ../libs/plugins/Controls/Loading/Control.Loading.js \
#--js ../libs/plugins/Controls/MiniMap/Control.MiniMap.js \
#--js ../libs/plugins/Markers/Label/leaflet.label-src.js \
#--js ../test/data/CalloutsData.js \
#--js ../test/data/LayersData.js \
#--js ../leaf/Controls.js \
#--js ../leaf/Popup.js \
#--js ../leaf/Toolbar.js \
#--js ../leaf/Plume.js \
#--js ../leaf/Plumes.js \
#--js ../leaf/Marker.js \
#--js ../leaf/Markers.js \
#--js ../leaf/Callout.js \
#--js ../leaf/Location.js \
#--js ../leaf/Locations.js \
#--js ../leaf/Features.js \
#--js ../leaf/Layer.js \
#--js ../leaf/Layers.js \
#--js ../leaf/Map.js \
#--js ../LeafletMapImpl.js \
#--js_output_file ../build/Map-compiled.js

## This is for pretty print.  No real compression
## Also does STRICT, which means will only use files that have goog.provide
#CLOSURE_COMPILER_HOME=~/Google/closure-compiler
#CLOSURE_LIB_HOME=~/Google/closure-library
#java -jar ${CLOSURE_COMPILER_HOME}/compiler.jar \
#--js ${CLOSURE_LIB_HOME}/closure/goog/base.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/string/string.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/html/utils.js \
#--js ${CLOSURE_LIB_HOME}/closure/goog/json/json.js \
#--js ../libs/Leaflet_1.0-dev/leaflet-src.js \
#--js ../libs/plugins/Markers/MarkerCluster/leaflet.markercluster-src.js \
#--js ../libs/plugins/Controls/Loading/Control.Loading.js \
#--js ../libs/plugins/Controls/MiniMap/Control.MiniMap.js \
#--js ../libs/plugins/Markers/Label/leaflet.label-src.js \
#--js ../test/data/CalloutsData.js \
#--js ../test/data/LayersData.js \
#--js ../leaf/Controls.js \
#--js ../leaf/Popup.js \
#--js ../leaf/Toolbar.js \
#--js ../leaf/Plume.js \
#--js ../leaf/Plumes.js \
#--js ../leaf/Marker.js \
#--js ../leaf/Markers.js \
#--js ../leaf/Callout.js \
#--js ../leaf/Location.js \
#--js ../leaf/Locations.js \
#--js ../leaf/Features.js \
#--js ../leaf/Layer.js \
#--js ../leaf/Layers.js \
#--js ../leaf/Map.js \
#--js ../LeafletMapImpl.js \
#--formatting PRETTY_PRINT \
#--dependency_mode STRICT \
#--entry_point leaf.Map \
#--entry_point LeafletMapImpl \
#--js_output_file ../build/Map-compiled.js

