"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactD3MapCore = require('react-d3-map-core');

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapBubble = function (_Component) {
  _inherits(MapBubble, _Component);

  function MapBubble(props) {
    _classCallCheck(this, MapBubble);

    var _this = _possibleConstructorReturn(this, (MapBubble.__proto__ || Object.getPrototypeOf(MapBubble)).call(this, props));

    _this.state = {
      xTooltip: null,
      yTooltip: null,
      contentTooltip: null
    };
    return _this;
  }

  _createClass(MapBubble, [{
    key: '_onMouseOver',
    value: function _onMouseOver(dom, d, i) {
      var tooltipContent = this.props.tooltipContent;


      this.setState({
        xTooltip: d3.event.clientX,
        yTooltip: d3.event.clientY,
        contentTooltip: tooltipContent(d)
      });
    }
  }, {
    key: '_onMouseOut',
    value: function _onMouseOut(dom, d, i) {
      this.setState({
        xTooltip: null,
        yTooltip: null,
        contentTooltip: null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          showTooltip = _props.showTooltip,
          tooltipContent = _props.tooltipContent;


      var tooltip;

      var onMouseOut = this._onMouseOut.bind(this);
      var onMouseOver = this._onMouseOver.bind(this);

      if (showTooltip) {
        var tooltip = _react2.default.createElement(_reactD3MapCore.Tooltip, _extends({}, this.state, {
          content: tooltipContent
        }));
      }

      return _react2.default.createElement(
        'div',
        null,
        tooltip,
        _react2.default.createElement(
          _reactD3MapCore.Svg,
          {
            width: width,
            height: height
          },
          _react2.default.createElement(_map2.default, _extends({}, this.props, this.state, {
            onMouseOver: onMouseOver,
            onMouseOut: onMouseOut
          }))
        )
      );
    }
  }]);

  return MapBubble;
}(_react.Component);

exports.default = MapBubble;
module.exports = exports['default'];