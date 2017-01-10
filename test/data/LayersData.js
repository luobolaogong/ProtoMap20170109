if (goog.DEBUG) console.log('LayersData.js loading...');
goog.provide('testData.LayersData');
/**
 * This is test data and will be removed later.
 * <p>
 * The structure below is a proxy for the contents of the array of layer info that comes from
 * calling window.parent.getMapLayerData(), which is not available outside of an MSAT environment.
 * <p>
 * Don't pay too much attention to this data structure, since it's only test.
 * @type {*}
 * @private
 */
testData.LayersData = [
  //
  // The following are non-GVS layers, to avoid CAC and slowness of GVS.
  // There's something about the order of these layers that effects how overlays
  // work when using test data.  It's not critical at this point, but it does indicate
  // there'a a problem somewhere that will probably pop up.
  //
  {
    'enabled': false, // For now.  The first enabled layer found wins and becomes the initial layer
    'layerType': 'XY',
    'layerName': 'Esri Imagery World',
    'parameters': {
      'overview': false,
      'base': true,
      'params': {
        'layers': '0',
        'useCache': true
      },
//      "url_": "http://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}"
      'url': 'http://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer'
    }
  },
  { // Making another copy of ESRI be the overview map, because Boundless is flakey, I think
    'enabled': false,
    'layerType': 'XY',
    'layerName': 'Esri Imagery World',
    'parameters': {
      'overview': true,
      'base': true,
      'params': {
        'layers': '0',
        'useCache': true
      },
      'url': 'http://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer'
    }
  },
  // {
  //   // This layer seems unreliable
  //   'enabled': false,
  //   'layerType': 'WMSBoundless',
  //   'layerName': 'Boundless',
  //   'parameters': {
  //     'overview': true,
  //     'base': true,
  //     'params': {
  //       'layers': 'ne:NE1_HR_LC_SR_W_DR',
  //       'useCache': true
  //     },
  //     'url': 'http://demo.boundlessgeo.com/geoserver/wms'
  //   }
  // },
  {
    'enabled': false,
    'layerType': 'ArcGISCache',
    'layerName': 'Shaded Relief',
    'parameters': {
      'overview': false, // oh gosh
      'base': true,
      'params': {
        'layers': '0'
      },
      'url': 'https://maps.gvs.nga.mil/arcgis/rest/services/Basemap/NGA_ShadedRelief_2D/MapServer'
    }
  },
  {
    'enabled': false,
    'layerType': 'ArcGISCache',
    'layerName': 'World StreetMap',
    'parameters': {
      'overview': false,
      'base': true,
      'params': {
        'layers': '0'
      },
      'url': 'https://maps.gvs.nga.mil/arcgis/rest/services/Basemap/World_StreetMap_2D/MapServer'
    }
  },
  {
    'enabled': false,
    'layerType': 'ArcGISCache',
    'layerName': 'World Imagery',
    'parameters': {
      'overview': false, // oh gosh
      'base': true, // what's with "base", and "isBaseLayer"?
      'params': {
        //"isBaseLayer": true, // did I put this here????  I don't think so
        'layers': '0'
      },
      'url': 'https://maps.gvs.nga.mil/arcgis/rest/services/Basemap/NGA_World_Imagery_2D/MapServer'
    }
  },
  {
    'enabled': false,
    'layerType': 'WMS',
    'layerName': 'Hillshade',
    'parameters': {
      'overview': false, // oh gosh
      'hidden': true, // huh? Ignored?
      'base': true,
      'params': {'layers': '0'},
      'url': 'https://maps.gvs.nga.mil/arcgis/services/Basemap/NGA_Hillshade_2D/MapServer/WMSServer'
    }
  },
  {
    'enabled': false,
    'layerType': 'ArcGISCache',
    'layerName': 'World CADRG',
    'parameters': {
      'base': true,
      'params': {'layers': '0'},
      'url': 'https://maps.gvs.nga.mil/arcgis/rest/services/Basemap/ScannedMaps/MapServer'
    }
  },
  {
    'enabled': false,
    'layerType': 'ArcGISCache',
    'layerName': 'Boundary',
    'parameters': {
      'params': {
        'layers': '0',
        'transparent': true
      },
      'url': 'https://maps.gvs.nga.mil/arcgis/rest/services/Basemap/World_Boundaries_Places_2D/MapServer'
    }
  },
  {
    'enabled': false,
    'layerType': 'ArcGISCache',
    'layerName': 'Transportation',
    'parameters': {
      'params': {
        'layers': '0',
        'transparent': true},
      'url': 'https://maps.gvs.nga.mil/arcgis/rest/services/Basemap/World_Transportation_2D/MapServer'
    }
  },
// The following two layers should be grouped into one, using a layerGroup
  {
    'enabled': false,
    'layerType': 'ArcGIS93Rest',
    'layerName': 'MGRS',
    'parameters': {
      'hidden': true,
      'params': {
        'isBaseLayer': false,
        'layers': 'show:0,1',
        'format': 'PNG', // oh really?
        'transparent': true},
      'url': 'https://services.gvs.nga.mil/arcgis/rest/services/Specialty/MGRS_Grids/MapServer/export'
    }
  },
  {
    'enabled': false,
    'layerType': 'ArcGIS93Rest',
    'layerName': 'MGRS Labels',
    'parameters': {
      'hidden': true,
      'params': {
        'isBaseLayer': false,
        'layers': 'show:0,1',
        'format': 'PNG', // note
        'transparent': true},
      'url': 'https://services.gvs.nga.mil/arcgis/rest/services/Specialty/MGRS_Grids_Labels/MapServer/export'
    }
  },
  {
    'enabled': false,
    'layerType': 'WMS', // unnec because in url?
    'layerName': 'DCF_Cloud_Cover',
    'parameters': {
      'overview': true,
      'hidden': false,
      'base': false,
      'params': {
        'isBaseLayer': false,
        'layers': 'DCF_Cloud_Cover', // unnec because in url?
        'format': 'PNG', // unnec because in url?
        'transparent': true // unnec because in url?
      },
      'url': '/weather/WMS?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&CRS=CRS:84&STYLES=default&Transparent=TRUE&SRS=EPSG%3A4326&WIDTH=256&HEIGHT=256&LAYERS=DCF_Cloud_Cover'
    }
  },
  {
    'enabled': false,
    'layerType': 'WMS', // unnec because in url?
    'layerName': 'lightning',
    'parameters': {
      'overview': true,
      'hidden': false,
      'base': false,
      'params': {
        'isBaseLayer': false,
        'layers': 'lightning', // unnec because in url?
        'format': 'PNG', // unnec because in url?
        'transparent': true // unnec because in url?
      },
      'url': '/weather/WMS?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&CRS=CRS:84&STYLES=default&Transparent=TRUE&SRS=EPSG%3A4326&WIDTH=256&HEIGHT=256&LAYERS=lightning'
    }
  },
  {
    'enabled': false,
    'layerType': 'WMS', // unnec because in url?
    'layerName': 'NEXRAD_Radar_Precip',
    'parameters': {
      'overview': true,
      'hidden': false,
      'base': false,
      'params': {
        'isBaseLayer': false,
        'layers': 'NEXRAD_Radar_Precip', // unnec because in url?
        'format': 'PNG', // unnec because in url?
        'transparent': true // unnec because in url?
      },
      'url': '/weather/WMS?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&CRS=CRS:84&STYLES=default&Transparent=TRUE&SRS=EPSG%3A4326&WIDTH=256&HEIGHT=256&LAYERS=NEXRAD_Radar_Precip'
    }
  },
  {
    'enabled': false,
    'layerType': 'WMS', // unnec because in url?
    'layerName': 'Surface_Temperature_Analysis_in_F',
    'parameters': {
      'overview': true,
      'hidden': false,
      'base': false,
      'params': {
        'isBaseLayer': false,
        'layers': 'Surface_Temperature_Analysis_in_F', // unnec because in url?
        'format': 'PNG', // unnec because in url?
        'transparent': true // unnec because in url?
      },
      'url': '/weather/WMS?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&CRS=CRS:84&STYLES=default&Transparent=TRUE&SRS=EPSG%3A4326&WIDTH=256&HEIGHT=256&LAYERS=Surface_Temperature_Analysis_in_F'
    }
  },
  {
    'enabled': false,
    'layerType': 'WMS', // unnec because in url?
    'layerName': 'Tropical_Storm_Forecast',
    'parameters': {
      'overview': true,
      'hidden': false,
      'base': false,
      'params': {
        'isBaseLayer': false,
        'layers': 'Tropical_Storm_Forecast', // unnec because in url?
        'format': 'PNG', // unnec because in url?
        'transparent': true // unnec because in url?
      },
      'url': '/weather/WMS?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&CRS=CRS:84&STYLES=default&Transparent=TRUE&SRS=EPSG%3A4326&WIDTH=256&HEIGHT=256&LAYERS=Tropical_Storm_Forecast'
    }
  }
];
if (goog.DEBUG) console.log("LayersData.js loaded");