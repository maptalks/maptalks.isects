/*!
 * maptalks.isects v0.2.0
 * LICENSE : MIT
 * (c) 2016-2017 maptalks.org
 */
/*!
 * requires maptalks@^0.16.0 
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('maptalks')) :
	typeof define === 'function' && define.amd ? define(['maptalks'], factory) :
	(factory(global.maptalks));
}(this, (function (maptalks) { 'use strict';

var twoProduct_1 = twoProduct$1;

var SPLITTER = +(Math.pow(2, 27) + 1.0);

function twoProduct$1(a, b, result) {
  var x = a * b;

  var c = SPLITTER * a;
  var abig = c - a;
  var ahi = c - abig;
  var alo = a - ahi;

  var d = SPLITTER * b;
  var bbig = d - b;
  var bhi = d - bbig;
  var blo = b - bhi;

  var err1 = x - ahi * bhi;
  var err2 = err1 - alo * bhi;
  var err3 = err2 - ahi * blo;

  var y = alo * blo - err3;

  if (result) {
    result[0] = y;
    result[1] = x;
    return result;
  }

  return [y, x];
}

var robustSum$1 = linearExpansionSum;

//Easy case: Add two scalars
function scalarScalar(a, b) {
  var x = a + b;
  var bv = x - a;
  var av = x - bv;
  var br = b - bv;
  var ar = a - av;
  var y = ar + br;
  if (y) {
    return [y, x];
  }
  return [x];
}

function linearExpansionSum(e, f) {
  var ne = e.length | 0;
  var nf = f.length | 0;
  if (ne === 1 && nf === 1) {
    return scalarScalar(e[0], f[0]);
  }
  var n = ne + nf;
  var g = new Array(n);
  var count = 0;
  var eptr = 0;
  var fptr = 0;
  var abs = Math.abs;
  var ei = e[eptr];
  var ea = abs(ei);
  var fi = f[fptr];
  var fa = abs(fi);
  var a, b;
  if (ea < fa) {
    b = ei;
    eptr += 1;
    if (eptr < ne) {
      ei = e[eptr];
      ea = abs(ei);
    }
  } else {
    b = fi;
    fptr += 1;
    if (fptr < nf) {
      fi = f[fptr];
      fa = abs(fi);
    }
  }
  if (eptr < ne && ea < fa || fptr >= nf) {
    a = ei;
    eptr += 1;
    if (eptr < ne) {
      ei = e[eptr];
      ea = abs(ei);
    }
  } else {
    a = fi;
    fptr += 1;
    if (fptr < nf) {
      fi = f[fptr];
      fa = abs(fi);
    }
  }
  var x = a + b;
  var bv = x - a;
  var y = b - bv;
  var q0 = y;
  var q1 = x;
  var _x, _bv, _av, _br, _ar;
  while (eptr < ne && fptr < nf) {
    if (ea < fa) {
      a = ei;
      eptr += 1;
      if (eptr < ne) {
        ei = e[eptr];
        ea = abs(ei);
      }
    } else {
      a = fi;
      fptr += 1;
      if (fptr < nf) {
        fi = f[fptr];
        fa = abs(fi);
      }
    }
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if (y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
  }
  while (eptr < ne) {
    a = ei;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if (y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
    eptr += 1;
    if (eptr < ne) {
      ei = e[eptr];
    }
  }
  while (fptr < nf) {
    a = fi;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if (y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
    fptr += 1;
    if (fptr < nf) {
      fi = f[fptr];
    }
  }
  if (q0) {
    g[count++] = q0;
  }
  if (q1) {
    g[count++] = q1;
  }
  if (!count) {
    g[count++] = 0.0;
  }
  g.length = count;
  return g;
}

var twoSum$1 = fastTwoSum;

function fastTwoSum(a, b, result) {
	var x = a + b;
	var bv = x - a;
	var av = x - bv;
	var br = b - bv;
	var ar = a - av;
	if (result) {
		result[0] = ar + br;
		result[1] = x;
		return result;
	}
	return [ar + br, x];
}

var twoProduct$2 = twoProduct_1;
var twoSum = twoSum$1;

var robustScale$1 = scaleLinearExpansion;

function scaleLinearExpansion(e, scale) {
  var n = e.length;
  if (n === 1) {
    var ts = twoProduct$2(e[0], scale);
    if (ts[0]) {
      return ts;
    }
    return [ts[1]];
  }
  var g = new Array(2 * n);
  var q = [0.1, 0.1];
  var t = [0.1, 0.1];
  var count = 0;
  twoProduct$2(e[0], scale, q);
  if (q[0]) {
    g[count++] = q[0];
  }
  for (var i = 1; i < n; ++i) {
    twoProduct$2(e[i], scale, t);
    var pq = q[1];
    twoSum(pq, t[0], q);
    if (q[0]) {
      g[count++] = q[0];
    }
    var a = t[1];
    var b = q[1];
    var x = a + b;
    var bv = x - a;
    var y = b - bv;
    q[1] = x;
    if (y) {
      g[count++] = y;
    }
  }
  if (q[1]) {
    g[count++] = q[1];
  }
  if (count === 0) {
    g[count++] = 0.0;
  }
  g.length = count;
  return g;
}

var compress$1 = compressExpansion;

function compressExpansion(e) {
  var m = e.length;
  var Q = e[e.length - 1];
  var bottom = m;
  for (var i = m - 2; i >= 0; --i) {
    var a = Q;
    var b = e[i];
    Q = a + b;
    var bv = Q - a;
    var q = b - bv;
    if (q) {
      e[--bottom] = Q;
      Q = q;
    }
  }
  var top = 0;
  for (var i = bottom; i < m; ++i) {
    var a = e[i];
    var b = Q;
    Q = a + b;
    var bv = Q - a;
    var q = b - bv;
    if (q) {
      e[top++] = q;
    }
  }
  e[top++] = Q;
  e.length = top;
  return e;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var robustDiff = robustSubtract;

//Easy case: Add two scalars
function scalarScalar$1(a, b) {
  var x = a + b;
  var bv = x - a;
  var av = x - bv;
  var br = b - bv;
  var ar = a - av;
  var y = ar + br;
  if (y) {
    return [y, x];
  }
  return [x];
}

function robustSubtract(e, f) {
  var ne = e.length | 0;
  var nf = f.length | 0;
  if (ne === 1 && nf === 1) {
    return scalarScalar$1(e[0], -f[0]);
  }
  var n = ne + nf;
  var g = new Array(n);
  var count = 0;
  var eptr = 0;
  var fptr = 0;
  var abs = Math.abs;
  var ei = e[eptr];
  var ea = abs(ei);
  var fi = -f[fptr];
  var fa = abs(fi);
  var a, b;
  if (ea < fa) {
    b = ei;
    eptr += 1;
    if (eptr < ne) {
      ei = e[eptr];
      ea = abs(ei);
    }
  } else {
    b = fi;
    fptr += 1;
    if (fptr < nf) {
      fi = -f[fptr];
      fa = abs(fi);
    }
  }
  if (eptr < ne && ea < fa || fptr >= nf) {
    a = ei;
    eptr += 1;
    if (eptr < ne) {
      ei = e[eptr];
      ea = abs(ei);
    }
  } else {
    a = fi;
    fptr += 1;
    if (fptr < nf) {
      fi = -f[fptr];
      fa = abs(fi);
    }
  }
  var x = a + b;
  var bv = x - a;
  var y = b - bv;
  var q0 = y;
  var q1 = x;
  var _x, _bv, _av, _br, _ar;
  while (eptr < ne && fptr < nf) {
    if (ea < fa) {
      a = ei;
      eptr += 1;
      if (eptr < ne) {
        ei = e[eptr];
        ea = abs(ei);
      }
    } else {
      a = fi;
      fptr += 1;
      if (fptr < nf) {
        fi = -f[fptr];
        fa = abs(fi);
      }
    }
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if (y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
  }
  while (eptr < ne) {
    a = ei;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if (y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
    eptr += 1;
    if (eptr < ne) {
      ei = e[eptr];
    }
  }
  while (fptr < nf) {
    a = fi;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if (y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
    fptr += 1;
    if (fptr < nf) {
      fi = -f[fptr];
    }
  }
  if (q0) {
    g[count++] = q0;
  }
  if (q1) {
    g[count++] = q1;
  }
  if (!count) {
    g[count++] = 0.0;
  }
  g.length = count;
  return g;
}

var orientation_1 = createCommonjsModule(function (module) {
  "use strict";

  var twoProduct = twoProduct_1;
  var robustSum = robustSum$1;
  var robustScale = robustScale$1;
  var robustSubtract = robustDiff;

  var NUM_EXPAND = 5;

  var EPSILON = 1.1102230246251565e-16;
  var ERRBOUND3 = (3.0 + 16.0 * EPSILON) * EPSILON;
  var ERRBOUND4 = (7.0 + 56.0 * EPSILON) * EPSILON;

  function cofactor(m, c) {
    var result = new Array(m.length - 1);
    for (var i = 1; i < m.length; ++i) {
      var r = result[i - 1] = new Array(m.length - 1);
      for (var j = 0, k = 0; j < m.length; ++j) {
        if (j === c) {
          continue;
        }
        r[k++] = m[i][j];
      }
    }
    return result;
  }

  function matrix(n) {
    var result = new Array(n);
    for (var i = 0; i < n; ++i) {
      result[i] = new Array(n);
      for (var j = 0; j < n; ++j) {
        result[i][j] = ["m", j, "[", n - i - 1, "]"].join("");
      }
    }
    return result;
  }

  function sign(n) {
    if (n & 1) {
      return "-";
    }
    return "";
  }

  function generateSum(expr) {
    if (expr.length === 1) {
      return expr[0];
    } else if (expr.length === 2) {
      return ["sum(", expr[0], ",", expr[1], ")"].join("");
    } else {
      var m = expr.length >> 1;
      return ["sum(", generateSum(expr.slice(0, m)), ",", generateSum(expr.slice(m)), ")"].join("");
    }
  }

  function determinant(m) {
    if (m.length === 2) {
      return [["sum(prod(", m[0][0], ",", m[1][1], "),prod(-", m[0][1], ",", m[1][0], "))"].join("")];
    } else {
      var expr = [];
      for (var i = 0; i < m.length; ++i) {
        expr.push(["scale(", generateSum(determinant(cofactor(m, i))), ",", sign(i), m[0][i], ")"].join(""));
      }
      return expr;
    }
  }

  function orientation(n) {
    var pos = [];
    var neg = [];
    var m = matrix(n);
    var args = [];
    for (var i = 0; i < n; ++i) {
      if ((i & 1) === 0) {
        pos.push.apply(pos, determinant(cofactor(m, i)));
      } else {
        neg.push.apply(neg, determinant(cofactor(m, i)));
      }
      args.push("m" + i);
    }
    var posExpr = generateSum(pos);
    var negExpr = generateSum(neg);
    var funcName = "orientation" + n + "Exact";
    var code = ["function ", funcName, "(", args.join(), "){var p=", posExpr, ",n=", negExpr, ",d=sub(p,n);\
return d[d.length-1];};return ", funcName].join("");
    var proc = new Function("sum", "prod", "scale", "sub", code);
    return proc(robustSum, twoProduct, robustScale, robustSubtract);
  }

  var orientation3Exact = orientation(3);
  var orientation4Exact = orientation(4);

  var CACHED = [function orientation0() {
    return 0;
  }, function orientation1() {
    return 0;
  }, function orientation2(a, b) {
    return b[0] - a[0];
  }, function orientation3(a, b, c) {
    var l = (a[1] - c[1]) * (b[0] - c[0]);
    var r = (a[0] - c[0]) * (b[1] - c[1]);
    var det = l - r;
    var s;
    if (l > 0) {
      if (r <= 0) {
        return det;
      } else {
        s = l + r;
      }
    } else if (l < 0) {
      if (r >= 0) {
        return det;
      } else {
        s = -(l + r);
      }
    } else {
      return det;
    }
    var tol = ERRBOUND3 * s;
    if (det >= tol || det <= -tol) {
      return det;
    }
    return orientation3Exact(a, b, c);
  }, function orientation4(a, b, c, d) {
    var adx = a[0] - d[0];
    var bdx = b[0] - d[0];
    var cdx = c[0] - d[0];
    var ady = a[1] - d[1];
    var bdy = b[1] - d[1];
    var cdy = c[1] - d[1];
    var adz = a[2] - d[2];
    var bdz = b[2] - d[2];
    var cdz = c[2] - d[2];
    var bdxcdy = bdx * cdy;
    var cdxbdy = cdx * bdy;
    var cdxady = cdx * ady;
    var adxcdy = adx * cdy;
    var adxbdy = adx * bdy;
    var bdxady = bdx * ady;
    var det = adz * (bdxcdy - cdxbdy) + bdz * (cdxady - adxcdy) + cdz * (adxbdy - bdxady);
    var permanent = (Math.abs(bdxcdy) + Math.abs(cdxbdy)) * Math.abs(adz) + (Math.abs(cdxady) + Math.abs(adxcdy)) * Math.abs(bdz) + (Math.abs(adxbdy) + Math.abs(bdxady)) * Math.abs(cdz);
    var tol = ERRBOUND4 * permanent;
    if (det > tol || -det > tol) {
      return det;
    }
    return orientation4Exact(a, b, c, d);
  }];

  function slowOrient(args) {
    var proc = CACHED[args.length];
    if (!proc) {
      proc = CACHED[args.length] = orientation(args.length);
    }
    return proc.apply(undefined, args);
  }

  function generateOrientationProc() {
    while (CACHED.length <= NUM_EXPAND) {
      CACHED.push(orientation(CACHED.length));
    }
    var args = [];
    var procArgs = ["slow"];
    for (var i = 0; i <= NUM_EXPAND; ++i) {
      args.push("a" + i);
      procArgs.push("o" + i);
    }
    var code = ["function getOrientation(", args.join(), "){switch(arguments.length){case 0:case 1:return 0;"];
    for (var i = 2; i <= NUM_EXPAND; ++i) {
      code.push("case ", i, ":return o", i, "(", args.slice(0, i).join(), ");");
    }
    code.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return getOrientation");
    procArgs.push(code.join(""));

    var proc = Function.apply(undefined, procArgs);
    module.exports = proc.apply(undefined, [slowOrient].concat(CACHED));
    for (var i = 0; i <= NUM_EXPAND; ++i) {
      module.exports[i] = CACHED[i];
    }
  }

  generateOrientationProc();
});

var segseg = segmentsIntersect;

var orient = orientation_1[3];

function checkCollinear(a0, a1, b0, b1) {

  for (var d = 0; d < 2; ++d) {
    var x0 = a0[d];
    var y0 = a1[d];
    var l0 = Math.min(x0, y0);
    var h0 = Math.max(x0, y0);

    var x1 = b0[d];
    var y1 = b1[d];
    var l1 = Math.min(x1, y1);
    var h1 = Math.max(x1, y1);

    if (h1 < l0 || h0 < l1) {
      return false;
    }
  }

  return true;
}

function segmentsIntersect(a0, a1, b0, b1) {
  var x0 = orient(a0, b0, b1);
  var y0 = orient(a1, b0, b1);
  if (x0 > 0 && y0 > 0 || x0 < 0 && y0 < 0) {
    return false;
  }

  var x1 = orient(b0, a0, a1);
  var y1 = orient(b1, a0, a1);
  if (x1 > 0 && y1 > 0 || x1 < 0 && y1 < 0) {
    return false;
  }

  //Check for degenerate collinear case
  if (x0 === 0 && y0 === 0 && x1 === 0 && y1 === 0) {
    return checkCollinear(a0, a1, b0, b1);
  }

  return true;
}

var intersect = exactIntersect;

var twoProduct = twoProduct_1;
var robustSum = robustSum$1;
var robustScale = robustScale$1;
var compress = compress$1;
var robustIntersect = segseg;

// Find solution to system of two linear equations
//
//  | a[0]  a[1]   1 |
//  | b[0]  b[1]   1 |  =  0
//  |  x      y    1 |
//
//  | c[0]  c[1]   1 |
//  | d[0]  d[1]   1 |  =  0
//  |  x      y    1 |
//
function exactIntersect(a, b, c, d) {

  if (!robustIntersect(a, b, c, d)) {
    return [[0], [0], [0]];
  }

  var x1 = robustSum([c[1]], [-d[1]]);
  var y1 = robustSum([-c[0]], [d[0]]);
  var denom = robustSum(robustSum(robustScale(y1, a[1]), robustScale(y1, -b[1])), robustSum(robustScale(x1, a[0]), robustScale(x1, -b[0])));

  var w0 = robustSum(twoProduct(-a[0], b[1]), twoProduct(a[1], b[0]));
  var w1 = robustSum(twoProduct(-c[0], d[1]), twoProduct(c[1], d[0]));

  //Calculate nX, nY
  var nX = robustSum(robustSum(robustScale(w1, a[0]), robustScale(w1, -b[0])), robustSum(robustScale(w0, -c[0]), robustScale(w0, d[0])));

  var nY = robustSum(robustSum(robustScale(w1, a[1]), robustScale(w1, -b[1])), robustSum(robustScale(w0, -c[1]), robustScale(w0, d[1])));

  return [compress(nX), compress(nY), compress(denom)];
}

var robustEstimateFloat = estimateFloat;

function estimateFloat(predicate) {
  var r = 0,
      l = predicate.length;

  switch (l) {
    case 1:
      r = predicate[0];
      break;

    case 2:
      r = predicate[0] + predicate[1];
      break;

    case 3:
      r = predicate[0] + predicate[1] + predicate[2];
      break;

    case 4:
      r = predicate[0] + predicate[1] + predicate[2] + predicate[3];
      break;

    default:
      for (var i = 0; i < l; i++) {
        r += predicate[i];
      }
  }

  return r;
}

var isect = intersect;
var float = robustEstimateFloat;

var intersections = selfIntersections;

function cmp(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

var pc = [0, 0];
var pn = [0, 0];
var oc = [0, 0];
var on = [0, 0];

function arrayOrObject(v, ret) {
  if (Array.isArray(v)) {
    ret[0] = v[0];
    ret[1] = v[1];
  } else {
    ret[0] = v.x;
    ret[1] = v.y;
  }
}

function selfIntersections(poly, filterFn) {
  var seen = {};
  var l = poly.length;
  var isects = [];
  for (var o = 0; o < l; o++) {
    var s0 = poly[o];
    var e0 = poly[(o + 1) % l];
    arrayOrObject(s0, oc);
    arrayOrObject(e0, on);
    for (var p = 0; p < l; p++) {
      if (o === p) {
        continue;
      }

      var s1 = poly[p];
      var e1 = poly[(p + 1) % l];
      arrayOrObject(s1, pc);
      arrayOrObject(e1, pn);

      if (cmp(pc, oc) || cmp(pc, on) || cmp(pn, oc) || cmp(pn, on)) {
        continue;
      }

      var r = isect(oc, on, pc, pn);
      // since these are homogeneous vectors, if the last component `w` is 0
      // then we've done something wrong
      var wraw = r[2];
      if (wraw.length === 1 && !wraw[0]) {
        continue;
      }

      var w = float(r[2]);
      r[0] = float(r[0]) / w;
      r[1] = float(r[1]) / w;
      r.pop();

      if (cmp(r, oc) || cmp(r, on) || cmp(r, pc) || cmp(r, pn)) {
        continue;
      }

      var key = r + '';
      var unique = !seen[key];
      if (unique) {
        seen[key] = true;
      }

      var collect = unique;
      if (filterFn) {
        collect = filterFn(r, o, s0, e0, p, s1, e1, unique);
      }

      if (collect) {
        isects.push(r);
      }
    }
  }

  return isects;
}

maptalks.Polygon.include({
    isects: function isects() {
        var coordinates = maptalks.Coordinate.toNumberArrays(this.getCoordinates());
        var sects = [];
        var r = void 0,
            ring = void 0;
        for (var i = 0, l = coordinates.length; i < l; i++) {
            ring = coordinates[i];
            if (ring.length > 0) {
                ring = ring.slice(0, ring.length - 1);
            }
            r = intersections(ring);
            if (r.length > 0) {
                sects.push([i, r]);
            }
        }
        return sects;
    }
});

maptalks.MultiPolygon.include({
    isects: function isects() {
        var geometries = this.getGeometries();
        var r = void 0;
        var sects = [];
        for (var i = 0, l = geometries.length; i < l; i++) {
            r = geometries[i].isects();
            if (r.length > 0) {
                sects.push([i, r]);
            }
        }
        return sects;
    }
});

typeof console !== 'undefined' && console.log('maptalks.isects v0.2.0, requires maptalks@^0.16.0.');

})));
