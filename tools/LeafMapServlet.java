package com.akimeka.web.server.map;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.akimeka.web.server.HashedResource;

/**
 * Leaflet Map Application Servlet Container
 *
 * URI entry point for this servlet is defined in META-INF/web.xml (e.g. /LeafMap).
 *
 * This servlet initializes a collection of JS resources required by the LeafMap.jsp (ultimately
 * used to generate the HTTP response). The JS files are a collection of {@code HashResource} URI
 * that provides cache control around the JS URI's (by changing the URI when the JS files contents
 * change). Additionally the {@code HashResource} provides a "fallback" that may be used to select a
 * "debug" set of JS files. The expected use case is to define the "fallback" set of JS files that
 * are non-minified and therefore can be used by a developer to debug the application.
 *
 * More details can be found at: {@link https://wiki.akimeka.com/Map_/_GIS_Information}
 */

public class LeafMapServlet extends HttpServlet {

  private static final String ATTR_JAVASCRIPT = "jsResources";
  private static final String JAVASCRIPT_LEAF_MIN = "js/Map-min.js";
  private static final String JAVASCRIPT_LEAF_DEV = "js/Map-dev.js";
  private static final String JSP_PAGE = "WEB-INF/jsp/LeafMap.jsp";
  private static final Log log = LogFactory.getLog(LeafMapServlet.class);

  /**
   * other javascript files
   */
  private static final Collection<String> RESOURCES_JAVASCRIPT_COMMON = new ArrayList<String>();

  /**
   * developer mode javascript files
   */
  private static final Collection<String> RESOURCES_JAVASCRIPT_DEVMODE = new ArrayList<String>();

  private static final long serialVersionUID = 1L;

  static {
    RESOURCES_JAVASCRIPT_COMMON.add("js/jquery-1.10.2.min.js");

    // local JS source files !! FOR DEVELOPMENT ONLY !!
    // NOTE: files must be sorted in correct loading order
    RESOURCES_JAVASCRIPT_DEVMODE.add(JAVASCRIPT_LEAF_DEV);
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Legend.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Legends.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Controls.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Callout.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Marker.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Markers.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Locations.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Plume.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Plumes.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Features.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Layer.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/SpatialFilter.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/MeasureTool.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/test/data/LayersData.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/test/data/CalloutsData.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Layers.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/usng.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Location.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/leaf/Map.js");
    RESOURCES_JAVASCRIPT_DEVMODE.add("js/LeafletMapImpl.js");
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    loadJsResources(request);
    request.getRequestDispatcher(JSP_PAGE).forward(request, response);
  }

  /**
   * Loads a "default" and "fallback" {@link Collection} of javascript file URL's into the
   * 'jsResources' request parameter.
   *
   * @param request
   */
  private void loadJsResources(HttpServletRequest request) {

    Collection<String> javascriptResources = new ArrayList<String>();
    {
      javascriptResources.addAll(RESOURCES_JAVASCRIPT_COMMON);
      javascriptResources.add(JAVASCRIPT_LEAF_MIN);
    }

    Collection<String> javascriptResourcesFallback = new ArrayList<String>();
    {
      javascriptResourcesFallback.addAll(RESOURCES_JAVASCRIPT_COMMON);
      javascriptResourcesFallback.addAll(RESOURCES_JAVASCRIPT_DEVMODE);
    }

    Collection<String> resourcesUrls =
        HashedResource.hashResources(getServletContext(), request, javascriptResources,
            javascriptResourcesFallback);
    request.setAttribute(ATTR_JAVASCRIPT, resourcesUrls);
  }
}
