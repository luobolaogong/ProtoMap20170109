#!/usr/bin/env bash

CLOSURE_COMPILER_HOME=~/Google/closure-compiler
CLOSURE_LIB_HOME=~/Google/closure-library
java -jar ${CLOSURE_COMPILER_HOME}/compiler.jar \
--js ${CLOSURE_LIB_HOME}/closure/goog/base.js \
--js ${CLOSURE_LIB_HOME}/closure/goog/string/string.js \
--js ${CLOSURE_LIB_HOME}/closure/goog/html/utils.js \
--js ${CLOSURE_LIB_HOME}/closure/goog/json/json.js \
--js ../libs/Leaflet_1.0-dev/leaflet-src.js \
--js ../libs/plugins/Markers/MarkerCluster/leaflet.markercluster-src.js \
--js ../libs/plugins/Controls/Loading/Control.Loading.js \
--js ../libs/plugins/Controls/MiniMap/Control.MiniMap.js \
--js ../libs/plugins/Markers/Label/leaflet.label-src.js \
--js ../test/data/CalloutsData.js \
--js ../test/data/LayersData.js \
--js ../leaf/Controls.js \
--js ../leaf/Popup.js \
--js ../leaf/Toolbar.js \
--js ../leaf/Plume.js \
--js ../leaf/Plumes.js \
--js ../leaf/Marker.js \
--js ../leaf/Markers.js \
--js ../leaf/Callout.js \
--js ../leaf/Location.js \
--js ../leaf/Locations.js \
--js ../leaf/Features.js \
--js ../leaf/Layer.js \
--js ../leaf/Layers.js \
--js ../leaf/Map.js \
--js ../LeafletMapImpl.js \
--js_output_file ../build/Map-compiled.js


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

