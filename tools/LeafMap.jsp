<%-- This JSP file LeafMap.jsp is accessed through the LeafletMapServlet.java class. It is
accessible to the client at the URI "/LeafMap", as defiend in the META-INF/web.xml. It functions to
load the JS leaflet library and plugins, along with our custom Leaflet integration JS. The JS
references are provided to the JSP from the servlet class.

WARNING: DO NOT ADD ANY JS REFERENCES TO THIS FILE, INSTEAD USE THE SERVLET INTERFACE

NOTE: Consider renaming this file to LeafletMapImplLoader.jsp

The LeafletMapServlet (and thefore this JSP) is loaded inside the GWT application frame. The GWT
application is created from within the MSATApplication.html page.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Collection"%>
<%@ page import="com.akimeka.web.server.HashedResource"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>MSAT Map</title>
    <script>
      if (!window.console) {
	window.console = {};
      }
      if (!window.console.log) {
	window.console.log = function() {};
      }
      if (!window.console.error) {
	window.console.error = function() {};
      }
    </script>

    <!-- Add Leaflet core and plugin CSS  -->
    <link rel='stylesheet' href='css/leaflet.css' />
    <link rel="stylesheet" href="css/leaflet.draw.css" />
    <link rel="stylesheet" href="css/Control.Loading.css" />
    <link rel="stylesheet" href="css/Control.MiniMap.min.css" />
    <link rel="stylesheet" href="css/Leaflet.NavBar.css" />
    <link rel="stylesheet" href="css/MarkerCluster.Default.css" />
    <link rel="stylesheet" href="css/MarkerCluster.css" />
    <link rel="stylesheet" href="css/leaflet.label.css" />
    <link rel="stylesheet" href="css/Leaflet.Coordinates-0.1.5.css" />
    <!-- <link rel="stylesheet" href="css/leaflet-measure.css" /> -->

    <!-- Custom leaflet styles -->
    <link rel="stylesheet" href="css/LeafMap.css" />

    <!-- Load the MSAT map resources. Leaflet javascript files are defined in the JS object
	 "jsResources", provided from LeafMapServlet.java, created through the HashedResource.java
	 class. The HashedResource class ensures the JS URI will change if the file is modified,
	 breaking the users local cache. -->

    <c:forEach var="jsResource" items="${jsResources}">
      <script type="text/javascript" src="${jsResource}"></script>
    </c:forEach>

  </head>

  <body>
    <div id="map" style="width: 100%; height: 100%;"></div>
  </body>
</html>
