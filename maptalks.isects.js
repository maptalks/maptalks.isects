'use strict';

var isect = require('2d-polygon-self-intersections');

var maptalks = (typeof(window) !== 'undefined') ? window.maptalks : require('maptalks');

maptalks.Polygon.prototype.isects = function () {
    var coordinates = maptalks.GeoJSON.toNumberArrays(this.getCoordinates());
    var r;
    for (var i = 0, l = coordinates.length; i < l; i++) {
        r = isect(coordinates[i]);
        if (r.length > 0) {
            return [i, r];
        }
    }
    return [];
}

maptalks.MultiPolygon.prototype.isects = function () {
    var geometries = this.getGeometries();
    var r;
    for (var i = 0, l = geometries.length; i < l; i++) {
        r = geometries.isects();
        if (r.length > 0) {
            return [i].concat(r);
        }
    }
    return [];
}

maptalks.LineString.prototype.isects = function () {
    var coordinates = maptalks.GeoJSON.toNumberArrays(this.getCoordinates());
    return isect(coordinates[i]);
}

maptalks.MultiLineString.prototype.isects = function () {
    var geometries = this.getGeometries();
    var r;
    for (var i = 0, l = geometries.length; i < l; i++) {
        r = geometries.isects();
        if (r.length > 0) {
            return [i].concat(r);
        }
    }
    return [];
}
