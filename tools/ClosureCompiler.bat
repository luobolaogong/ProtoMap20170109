@echo off
REM This file uses the Closure Compiler to create a single JS output file,
REM which not only contains the "leaf" code, but also libraries and plugins.
REM This is to be run from a "tools" directory at same level as "leaf".
REM But for development, testing/debugging, you don't have to compile,
REM You can just execute the right HTML file, which will bring in the
REM source files and library files one at a time.  If you compile the
REM code, then it's harder to debug.  The non-debug version is executed
REM with UseCompiled.html, and the debug version is MsatLeaflet.html
REM
set CLOSURE_COMPILER_HOME=D:/Google/closure-compiler
set CLOSURE_LIB_HOME=libs/ClosureLibs20160924/closure-library-20160822
REM set LEAFLET_HOME=D:/Leaflet/Leaflet_1.0-dev
set LEAFLET_HOME=libs/LeafletLibs20160924/Leaflet-0.7.7
REM set LEAFLET_PLUGINS_HOME=D:/Leaflet/plugins
set LEAFLET_PLUGINS_HOME=libs/LeafletPlugins20160924

java -jar %CLOSURE_COMPILER_HOME%/compiler.jar ^
--js %CLOSURE_LIB_HOME%/closure/goog/base.js ^
--js %CLOSURE_LIB_HOME%/closure/goog/json/json.js ^
--js %CLOSURE_LIB_HOME%/closure/goog/string/string.js ^
--js %CLOSURE_LIB_HOME%/closure/goog/html/utils.js ^
--js %LEAFLET_HOME%/leaflet-src.js ^
--js %LEAFLET_PLUGINS_HOME%/Leaflet.draw-0.2.4/dist/leaflet.draw-src.js ^
--js %LEAFLET_PLUGINS_HOME%/Leaflet.markercluster-leaflet-0.7/dist/leaflet.markercluster-src.js ^
--js %LEAFLET_PLUGINS_HOME%/Leaflet-MiniMap-3.3.1/dist/Control.MiniMap.min.js ^
--js %LEAFLET_PLUGINS_HOME%/Leaflet.loading-0.1.23/src/Control.Loading.js ^
--js %LEAFLET_PLUGINS_HOME%/Leaflet.NavBar-1.0.0/src/Leaflet.NavBar.js ^
--js %LEAFLET_PLUGINS_HOME%/leaflet-measure-2.0.5/dist/leaflet-measure.js ^
--js %LEAFLET_PLUGINS_HOME%/Leaflet.Coordinates-0.1.5/dist/Leaflet.Coordinates-0.1.5.src.js ^
--js %LEAFLET_PLUGINS_HOME%/Leaflet.label-master/dist/leaflet.label-src.js ^
--js leaf/*.js ^
--js test/data/*.js ^
--js test/GwtSim/*.js ^
--js LeafletMapImpl.js ^
--formatting PRETTY_PRINT ^
--js_output_file ../build/Map-compiled-pretty-with-libs-plugs.js

rem --dependency_mode=LOOSE ^
rem --output_manifest manifest.MF ^

rem --compilation_level ADVANCED_OPTIMIZATIONS