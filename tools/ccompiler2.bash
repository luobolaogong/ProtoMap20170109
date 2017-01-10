#!/usr/bin/env bash

CLOSURE_COMPILER_HOME=~/Google/closure-compiler
CLOSURE_LIB_HOME=~/Google/closure-library
LEAFLET_PLUGINS_HOME=../libs/LeafletPlugins20160924
LEAFLET_HOME=../libs/LeafletLibs20160924

java -jar ${CLOSURE_COMPILER_HOME}/compiler.jar \
--js ${CLOSURE_LIB_HOME}/closure/goog/base.js \
--js ${CLOSURE_LIB_HOME}/closure/goog/dom/dom.js \
--js ${CLOSURE_LIB_HOME}/closure/goog/structs/linkedmap.js \
--js ${CLOSURE_LIB_HOME}/closure/goog/net/bulkloader.js \
--js ${CLOSURE_LIB_HOME}/closure/goog/net/imageloader.js \
--js ${CLOSURE_LIB_HOME}/closure/goog/json/json.js \
--js ${CLOSURE_LIB_HOME}/closure/goog/string/string.js \
--js ${CLOSURE_LIB_HOME}/closure/goog/html/utils.js \
--js ${LEAFLET_HOME}/Leaflet-0.7.7/leaflet-src.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.draw-0.2.4/dist/leaflet.draw-src.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.markercluster-leaflet-0.7/dist/leaflet.markercluster-src.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet-MiniMap-3.3.1/dist/Control.MiniMap.min.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.loading-0.1.23/src/Control.Loading.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.NavBar-1.0.0/src/Leaflet.NavBar.js \
--js ${LEAFLET_PLUGINS_HOME}/leaflet-measure-2.0.5/dist/leaflet-measure.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.Coordinates-0.1.5/dist/Leaflet.Coordinates-0.1.5.src.js \
--js ${LEAFLET_PLUGINS_HOME}/Leaflet.label-master/dist/leaflet.label-src.js \
--js ../test/data/CalloutsData.js \
--js ../test/data/LayersData.js \
--js ../leaf/Network.js \
--js ../leaf/Legend.js \
--js ../leaf/Legends.js \
--js ../leaf/Controls.js \
--js ../leaf/Plume.js \
--js ../leaf/Plumes.js \
--js ../leaf/Location.js \
--js ../leaf/Locations.js \
--js ../leaf/Marker.js \
--js ../leaf/Markers.js \
--js ../leaf/Callout.js \
--js ../leaf/Features.js \
--js ../leaf/Layer.js \
--js ../leaf/Layers.js \
--js ../leaf/SpatialFilter.js \
--js ../leaf/MeasureTool.js \
--js ../leaf/Map.js \
--js ../leaf/Popup.js \
--js ../LeafletMapImpl.js \
--js_output_file build/Map-compiled.js


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

