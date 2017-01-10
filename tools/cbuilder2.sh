#!/usr/bin/env bash
echo "Here comes closurebuilder.py for just listing files.  results in dependencies.txt"
CLOSURE_COMPILER_HOME=~/Google/closure-compiler
CLOSURE_LIB_HOME=~/Google/closure-library
LEAFLET_PLUGINS_HOME=../libs/LeafletPlugins20160924
LEAFLET_HOME=../libs/LeafletLibs20160924

closurebuilder.py \
    --root=$CLOSURE_LIB_HOME \
    --namespace="leaf.Map" \
    --output_mode=list \
    ${LEAFLET_HOME}/Leaflet-0.7.7/leaflet-src.js \
    ${LEAFLET_PLUGINS_HOME}/Leaflet.draw-0.2.4/dist/leaflet.draw-src.js \
    ${LEAFLET_PLUGINS_HOME}/Leaflet.markercluster-leaflet-0.7/dist/leaflet.markercluster-src.js \
    ${LEAFLET_PLUGINS_HOME}/Leaflet-MiniMap-3.3.1/dist/Control.MiniMap.min.js \
    ${LEAFLET_PLUGINS_HOME}/Leaflet.loading-0.1.23/src/Control.Loading.js \
    ${LEAFLET_PLUGINS_HOME}/Leaflet.NavBar-1.0.0/src/Leaflet.NavBar.js \
    ${LEAFLET_PLUGINS_HOME}/leaflet-measure-2.0.5/dist/leaflet-measure.js \
    ${LEAFLET_PLUGINS_HOME}/Leaflet.Coordinates-0.1.5/dist/Leaflet.Coordinates-0.1.5.src.js \
    ${LEAFLET_PLUGINS_HOME}/Leaflet.label-master/dist/leaflet.label-src.js \
    --root=../leaf \
    ../LeafletMapImpl.js

# Here is the dependency order based only on goog.require and good.provide:
# base.js Controls.js, Plumes.js, Marker.js, Callouts.js, Markers.js, Features.js, Layer.js, Layers.js, Map.js

#echo "Here comes closurebuilder.py where we will compile, namespace leaf.Map.  Output to Map-compiled.js"
#closurebuilder.py \
#    --root=$CLOSURE_LIB_HOME \
#    --namespace="leaf.Map" \
#    --output_mode=compiled \
#    --compiler_jar=${CLOSURE_COMPILER_HOME}/compiler.jar \
#    --output_file Map-compiled.js \
#    ./usng.js \
#    ./plugins/Markers/MarkerCluster/leaflet.markercluster-src.js \
#    ./plugins/Controls/Loading/Control.Loading.js \
#    ./plugins/Controls/MiniMap/Control.MiniMap.js \
#    ./plugins/Markers/Label/leaflet.label-src.js \
#    --root=./leaf \
#    ./LeafletMapImpl.js


#echo "Here comes calcdeps.py, not useful for much."
#calcdeps.py -i leaf/**.js LeafletMapImpl.js -p ${CLOSURE_LIB_HOME} -o deps
