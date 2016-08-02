'use strict';

var isect = require('2d-polygon-self-intersections');

var maptalks = (typeof(window) !== 'undefined') ? window.maptalks : require('maptalks');

maptalks.GeoUtil.isects = function (coordinates) {
    if (!maptalks.Util.isArray(coordinates[0])) {
        coordinates = maptalks.GeoJSON.toNumberArrays(coordinates);
    }
    return isect(coordinates);
}

maptalks.Polygon.prototype.isects = function () {
    var coordinates = this.getCoordinates();
    coordinates = maptalks.GeoJSON.toNumberArrays(coordinates);
    var r, ring;
    for (var i = 0, l = coordinates.length; i < l; i++) {
        ring = coordinates[i];
        if (ring.length > 0) {
            ring = ring.slice(0, ring.length - 1)
        }
        r = isect(ring);
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
        r = geometries[i].isects();
        if (r.length > 0) {
            return [i].concat(r);
        }
    }
    return [];
}
