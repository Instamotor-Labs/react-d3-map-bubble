"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var _reactD3MapCore = require('react-d3-map-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BubbleLegend = function (_Component) {
  _inherits(BubbleLegend, _Component);

  function BubbleLegend(props) {
    _classCallCheck(this, BubbleLegend);

    return _possibleConstructorReturn(this, (BubbleLegend.__proto__ || Object.getPrototypeOf(BubbleLegend)).call(this, props));
  }

  _createClass(BubbleLegend, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _reactD3MapCore.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: '_mkLegend',
    value: function _mkLegend(dom) {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          domain = _props.domain,
          domainScale = _props.domainScale,
          circleValue = _props.circleValue;


      var g = d3.select(dom);

      var legend = g.attr('class', 'legend').attr("transform", "translate(" + (width - (domain.range[1] * 2 + 20)) + "," + (height - 20) + ")").selectAll('g').data([domain.domain[1] * 2 / 3, domain.domain[1] * 2 / 3, domain.domain[1] * 2]).enter().append('g');

      legend.append('circle').attr('cy', function (d) {
        return -domainScale(d);
      }).attr('r', domainScale);

      return g;
    }
  }, {
    key: 'render',
    value: function render() {
      var legendGroup = _reactFauxDom2.default.createElement('g');
      var leg = this._mkLegend(legendGroup);

      return leg.node().toReact();
    }
  }]);

  return BubbleLegend;
}(_react.Component);

BubbleLegend.defaultProps = {};
exports.default = BubbleLegend;