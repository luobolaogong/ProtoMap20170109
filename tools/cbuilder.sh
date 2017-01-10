#!/usr/bin/env bash
echo "Here comes closurebuilder.py for just listing files.  results in dependencies.txt"
closurebuilder.py \
    --root=$CLOSURE_LIB_HOME \
    --namespace="leaf.Map" \
    --output_mode=list \
    ../libs/usng.js \
    ../libs/plugins/Markers/MarkerCluster/leaflet.markercluster-src.js \
    ../libs/plugins/Controls/Loading/Control.Loading.js \
    ../libs/plugins/Controls/MiniMap/Control.MiniMap.js \
    ../libs/plugins/Markers/Label/leaflet.label-src.js \
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
