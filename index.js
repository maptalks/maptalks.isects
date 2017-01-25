import isect from '2d-polygon-self-intersections';
import * as maptalks from 'maptalks';

maptalks.Polygon.prototype.isects = function () {
    const coordinates = maptalks.Coordinate.toNumberArrays(this.getCoordinates());
    const sects = [];
    var r, ring;
    for (let i = 0, l = coordinates.length; i < l; i++) {
        ring = coordinates[i];
        if (ring.length > 0) {
            ring = ring.slice(0, ring.length - 1);
        }
        r = isect(ring);
        if (r.length > 0) {
            sects.push([i, r]);
        }
    }
    return sects;
};

maptalks.MultiPolygon.prototype.isects = function () {
    const geometries = this.getGeometries();
    var r;
    const sects = [];
    for (let i = 0, l = geometries.length; i < l; i++) {
        r = geometries[i].isects();
        if (r.length > 0) {
            sects.push([i, r]);
        }
    }
    return sects;
};
