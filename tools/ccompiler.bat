@echo off
rem
rem Will compile all files, because not STRICT
set CLOSURE_COMPILER_HOME=D:/Google/closure-compiler
set CLOSURE_LIB_HOME=D:/Google/closure-library
java -jar %CLOSURE_COMPILER_HOME%/compiler.jar ^
--js %CLOSURE_LIB_HOME%/closure/goog/base.js ^
--js %CLOSURE_LIB_HOME%/closure/goog/string/string.js ^
--js %CLOSURE_LIB_HOME%/closure/goog/html/utils.js ^
--js %CLOSURE_LIB_HOME%/closure/goog/json/json.js ^
--js ../libs/Leaflet_1.0-dev/leaflet-src.js ^
--js ../libs/plugins/Markers/MarkerCluster/leaflet.markercluster-src.js ^
--js ../libs/plugins/Controls/Loading/Control.Loading.js ^
--js ../libs/plugins/Controls/MiniMap/Control.MiniMap.js ^
--js ../libs/plugins/Markers/Label/leaflet.label-src.js ^
--js ../test/data/CalloutsData.js ^
--js ../test/data/LayersData.js ^
--js ../leaf/Controls.js ^
--js ../leaf/Popup.js ^
--js ../leaf/Toolbar.js ^
--js ../leaf/Plume.js ^
--js ../leaf/Plumes.js ^
--js ../leaf/Marker.js ^
--js ../leaf/Markers.js ^
--js ../leaf/Callout.js ^
--js ../leaf/Location.js ^
--js ../leaf/Locations.js ^
--js ../leaf/Features.js ^
--js ../leaf/Layer.js ^
--js ../leaf/Layers.js ^
--js ../leaf/Map.js ^
--js ../LeafletMapImpl.js ^
--js_output_file ../build/Map-compiled.js

@echo off
rem This is for pretty print.  No real compression
rem Also does STRICT, which means will only use files that have goog.provide
rem CLOSURE_COMPILER_HOME=~/Google/closure-compiler
rem CLOSURE_LIB_HOME=~/Google/closure-library
rem java -jar %CLOSURE_COMPILER_HOME}/compiler.jar ^
rem --js %CLOSURE_LIB_HOME}/closure/goog/base.js ^
rem --js %CLOSURE_LIB_HOME}/closure/goog/string/string.js ^
rem --js %CLOSURE_LIB_HOME}/closure/goog/html/utils.js ^
rem --js %CLOSURE_LIB_HOME}/closure/goog/json/json.js ^
rem --js ../libs/Leaflet_1.0-dev/leaflet-src.js ^
rem --js ../libs/plugins/Markers/MarkerCluster/leaflet.markercluster-src.js ^
rem --js ../libs/plugins/Controls/Loading/Control.Loading.js ^
rem --js ../libs/plugins/Controls/MiniMap/Control.MiniMap.js ^
rem --js ../libs/plugins/Markers/Label/leaflet.label-src.js ^
rem --js ../test/data/CalloutsData.js ^
rem --js ../test/data/LayersData.js ^
rem --js ../leaf/Controls.js ^
rem --js ../leaf/Popup.js ^
rem --js ../leaf/Toolbar.js ^
rem --js ../leaf/Plume.js ^
rem --js ../leaf/Plumes.js ^
rem --js ../leaf/Marker.js ^
rem --js ../leaf/Markers.js ^
rem --js ../leaf/Callout.js ^
rem --js ../leaf/Location.js ^
rem --js ../leaf/Locations.js ^
rem --js ../leaf/Features.js ^
rem --js ../leaf/Layer.js ^
rem --js ../leaf/Layers.js ^
rem --js ../leaf/Map.js ^
rem --js ../LeafletMapImpl.js ^
rem --formatting PRETTY_PRINT ^
rem --dependency_mode STRICT ^
rem --entry_point leaf.Map ^
rem --entry_point LeafletMapImpl ^
rem --js_output_file ../build/Map-compiled.js

