# maptalks.isects

[![CircleCI](https://circleci.com/gh/maptalks/maptalks.isects.svg?style=shield)](https://circleci.com/gh/maptalks/maptalks.isects)
[![NPM Version](https://img.shields.io/npm/v/maptalks.isects.svg)](https://github.com/maptalks/maptalks.isects)

A plugin to find self-intersections in a Polygon or MultiPolygon, based on [2d-polygon-self-intersections](https://github.com/tmpvar/2d-polygon-self-intersections).

![screenshot](https://cloud.githubusercontent.com/assets/13678919/25571325/335fdede-2e61-11e7-88c6-d3e0bac23e23.jpg)

## Install
  
* Install with npm: ```npm install maptalks.isects```. 
* Download from [dist directory](https://github.com/maptalks/maptalks.isects/tree/gh-pages/dist).
* Use unpkg CDN: ```https://unpkg.com/maptalks.isects/dist/maptalks.isects.min.js```

## Usage

As a plugin, ```maptalks.isects``` must be loaded after ```maptalks.js``` in browsers.
```html
<script type="text/javascript" src="https://unpkg.com/maptalks/dist/maptalks.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/maptalks.isects/dist/maptalks.isects.min.js"></script>
<script>
//find intersections of polygon
var polygon = new maptalks.Polygon([
    [-10, 0],
    [10, 0],
    [10, 10],
    [1, 10],
    [1, -1],
    [-1, -1],
    [-1, 10],
    [-10, 1]
])
.addTo(layer);

var sects = polygon.isects();

//find intersections of MultiPolygon
var multiPolygon = new maptalks.MultiPolygon([
      [
          [0, 20],
          [20, 20],
          [20, 30],
          [11, 30],
          [11, 11],
          [9, 11],
          [9, 30],
          [0, 21]
      ],
      [
          [-20, 20],
          [0, 20],
          [0, 30],
          [-9, 30],
          [-9, 11],
          [-11, 11],
          [-11, 30],
          [-20, 21]
      ]
  ], {
    symbol : {
      'polygonFill' : '#00f'
    }
  }).addTo(layer);

var mSects = multiPolygon.isects();
</script>
```
## Supported Browsers

IE 9-11, Chrome, Firefox, other modern and mobile browsers.

## Examples

* [Self-intersections of polygons](https://maptalks.github.io/maptalks.isects/demo/).

## API Reference

`isects` extends [Polygon](http://docs.maptalks.org/api/maptalks.Polygon.html) class and [MultiPolygon](http://docs.maptalks.org/api/maptalks.MultiPolygon.html) class by adding a new method `isects` to find self-intersections.

### `isects()`

Find self-intersections

```javascript
var isects = polygon.isects();
var isects2 = multiPolygon.isects();
```

**Returns** `Array[]` an array containing ring indexes with self-intersections and intersections' coordinates, e.g.

```javascript
var polygon = new maptalks.Polygon([
    [-10, 0],
    [10, 0],
    [10, 10],
    [1, 10],
    [1, -1],
    [-1, -1],
    [-1, 10],
    [-10, 1]
]);
var sects = polygon.isects();
```
```javascript
[
  //[{ring index}, [{coordinates of intersections}]]
  [0, [[1,0], [-1,0]]]
]
```

```javascript
//find intersections of MultiPolygon
var multiPolygon = new maptalks.MultiPolygon([
      [
          [0, 20],
          [20, 20],
          [20, 30],
          [11, 30],
          [11, 11],
          [9, 11],
          [9, 30],
          [0, 21]
      ],
      [
          [-20, 20],
          [0, 20],
          [0, 30],
          [-9, 30],
          [-9, 11],
          [-11, 11],
          [-11, 30],
          [-20, 21]
      ]
  ])
var mSects = multiPolygon.isects();
```
```javascript
[
  //[{polygon index}, [[{ring index}, [{coordinates of intersections}]]]]
  [0,[[0,[[11,20],[9,20]]]]],
  [1,[[0,[[-9,20],[-11,20]]]]]
]
```

## Contributing

We welcome any kind of contributions including issue reportings, pull requests, documentation corrections, feature requests and any other helps.

## Develop

The only source file is ```index.js```.

It is written in ES6, transpiled by [babel](https://babeljs.io/) and tested with [mocha](https://mochajs.org) and [expect.js](https://github.com/Automattic/expect.js).

### Scripts

* Install dependencies
```shell
$ npm install
```

* Watch source changes and generate runnable bundle repeatedly
```shell
$ gulp watch
```

* Tests
```shell
$ npm test
```

* Watch source changes and run tests repeatedly
```shell
$ gulp tdd
```

* Package and generate minified bundles to dist directory
```shell
$ gulp minify
```

* Lint
```shell
$ npm run lint
```
