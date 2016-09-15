#!/bin/bash

# Copy build configuration to openlayers build folder
cp openlayers-build.cfg bower_components/openlayers/build/openlayers-build.cfg

# go to openlayers build folder
cd bower_components/openlayers/build

# run the build script
./build.py openlayers-build OpenLayers-app.js

# move the lib
mv OpenLayers-app.js ../../../js/OpenLayers-app.js

# go back
cd ../../../
