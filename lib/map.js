"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactD3MapCore = require('react-d3-map-core');

var _bubbleLegend = require('./bubbleLegend');

var _bubbleLegend2 = _interopRequireDefault(_bubbleLegend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_Component) {
  _inherits(Map, _Component);

  function Map(props) {
    _classCallCheck(this, Map);

    return _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props));
  }

  _createClass(Map, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _reactD3MapCore.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: '_dataPosition',
    value: function _dataPosition(d, geoPath, proj) {
      var _props = this.props,
          circleX = _props.circleX,
          circleY = _props.circleY;


      var type = d.geometry ? d.geometry.type : 'other';

      if (type === 'Polygon' || type === 'MultiPolygon') {
        var x = geoPath.centroid(d)[0];
        var y = geoPath.centroid(d)[1];
      } else if (type === 'Point') {
        var x = proj ? +proj(d.geometry.coordinates)[0] : d.geometry.coordinates[0];
        var y = proj ? +proj(d.geometry.coordinates)[1] : d.geometry.coordinates[1];
      } else if (type === 'other') {
        var x = proj ? +proj([circleX(d), circleY(d)])[0] : circleX(d);
        var y = proj ? +proj([circleX(d), circleY(d)])[1] : circleY(d);
      }

      return [x, y];
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          showGraticule = _props2.showGraticule,
          dataPolygon = _props2.dataPolygon,
          polygonClass = _props2.polygonClass,
          meshClass = _props2.meshClass,
          dataMesh = _props2.dataMesh,
          scale = _props2.scale,
          translate = _props2.translate,
          precision = _props2.precision,
          rotate = _props2.rotate,
          center = _props2.center,
          clipAngle = _props2.clipAngle,
          parallels = _props2.parallels,
          projection = _props2.projection,
          domain = _props2.domain,
          dataCircle = _props2.dataCircle,
          circleValue = _props2.circleValue,
          circleClass = _props2.circleClass,
          showTooltip = _props2.showTooltip,
          tooltipContent = _props2.tooltipContent,
          circleX = _props2.circleX,
          circleY = _props2.circleY,
          onMouseOut = _props2.onMouseOut,
          onMouseOver = _props2.onMouseOver,
          showTile = _props2.showTile;


      var graticule, mesh, polygon, circle, voronoi, tile;

      var proj = (0, _reactD3MapCore.projection)({
        projection: projection,
        scale: scale,
        translate: translate,
        precision: precision,
        rotate: rotate,
        center: center,
        clipAngle: clipAngle,
        parallels: parallels
      });

      if (showTile) {
        var tiles = (0, _reactD3MapCore.tileFunc)({
          scale: proj.scale() * 2 * Math.PI,
          translate: proj([0, 0]),
          size: [width, height]
        });

        tile = _react2.default.createElement(_reactD3MapCore.Tile, {
          tiles: tiles,
          scale: tiles.scale,
          translate: tiles.translate
        });
      }

      var geoPath = (0, _reactD3MapCore.geoPath)(proj);

      var domainScale = (0, _reactD3MapCore.scale)(domain);

      if (showGraticule) {
        graticule = _react2.default.createElement(_reactD3MapCore.Graticule, _extends({
          geoPath: geoPath
        }, this.state));
      }

      if (dataPolygon) {
        if (!Array.isArray(dataPolygon)) {
          polygon = _react2.default.createElement(_reactD3MapCore.Polygon, _extends({
            data: dataPolygon,
            geoPath: geoPath,
            polygonClass: polygonClass
          }, this.state));
        } else {
          polygon = dataPolygon.map(function (d, i) {
            return _react2.default.createElement(_reactD3MapCore.Polygon, _extends({
              key: i,
              data: d,
              geoPath: geoPath,
              polygonClass: polygonClass
            }, _this2.state));
          });
        }
      }

      if (dataMesh) {
        if (!Array.isArray(dataMesh)) {
          mesh = _react2.default.createElement(_reactD3MapCore.Mesh, _extends({
            data: dataMesh,
            geoPath: geoPath,
            meshClass: meshClass
          }, this.state));
        } else {
          mesh = dataMesh.map(function (d, i) {
            return _react2.default.createElement(_reactD3MapCore.Mesh, _extends({
              key: i,
              data: d,
              geoPath: geoPath,
              meshClass: meshClass
            }, _this2.state));
          });
        }
      }

      if (dataCircle) {
        if (!Array.isArray(dataCircle)) {
          var r = domainScale(circleValue(dataCircle));
          var position = this._dataPosition(dataCircle, geoPath, proj);

          circle = _react2.default.createElement(_reactD3MapCore.Circle, _extends({
            data: dataCircle,
            geoPath: geoPath,
            circleClass: circleClass,
            r: r,
            x: position[0],
            y: position[1],
            onMouseOut: onMouseOut,
            onMouseOver: onMouseOver
          }, this.state));
        } else {
          circle = dataCircle.map(function (d, i) {
            var r = domainScale(circleValue(d));
            var position = _this2._dataPosition(d, geoPath, proj);

            return _react2.default.createElement(_reactD3MapCore.Circle, _extends({
              key: i,
              data: d,
              geoPath: geoPath,
              circleClass: circleClass,
              r: r,
              x: position[0],
              y: position[1],
              onMouseOut: onMouseOut,
              onMouseOver: onMouseOver
            }, _this2.state));
          });
        }
      }

      if (showTooltip) {

        var voronoiX = function voronoiX(d) {
          var type = d.geometry ? d.geometry.type : 'other';
          if (type === 'Polygon' || type === 'MultiPolygon') {
            return geoPath.centroid(d)[0];
          } else if (type === 'Point') {
            return proj ? +proj(d.geometry.coordinates)[0] : d.geometry.coordinates[0];
          } else if (type === 'other') {
            return proj ? +proj([circleX(d), circleY(d)])[0] : circleX(d);
          }
        };

        var voronoiY = function voronoiY(d) {
          var type = d.geometry ? d.geometry.type : 'other';
          if (type === 'Polygon' || type === 'MultiPolygon') {
            return geoPath.centroid(d)[1];
          } else if (type === 'Point') {
            return proj ? +proj(d.geometry.coordinates)[1] : d.geometry.coordinates[1];
          } else if (type === 'other') {
            return proj ? +proj([circleX(d), circleY(d)])[1] : circleY(d);
          }
        };

        var voronoi = _react2.default.createElement(_reactD3MapCore.Voronoi, _extends({
          data: dataCircle,
          geoPath: geoPath,
          x: voronoiX,
          y: voronoiY,
          width: width,
          height: height,
          onMouseOut: onMouseOut,
          onMouseOver: onMouseOver
        }, this.state));
      }

      return _react2.default.createElement(
        'g',
        null,
        tile,
        graticule,
        polygon,
        mesh,
        voronoi,
        circle
      );
    }
  }]);

  return Map;
}(_react.Component);

exports.default = Map;