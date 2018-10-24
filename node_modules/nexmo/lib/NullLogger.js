"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NullLogger = function () {
  function NullLogger() {
    _classCallCheck(this, NullLogger);
  }

  _createClass(NullLogger, [{
    key: "log",
    value: function log(level) {}
  }, {
    key: "info",
    value: function info() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.log.apply(this, ["info"].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.log.apply(this, ["warn"].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.log.apply(this, ["error"].concat(args));
    }
  }]);

  return NullLogger;
}();

module.exports = NullLogger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9OdWxsTG9nZ2VyLmpzIl0sIm5hbWVzIjpbIk51bGxMb2dnZXIiLCJsZXZlbCIsImFyZ3MiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBTUEsVTs7Ozs7Ozt3QkFDQUMsSyxFQUFnQixDQUFFOzs7MkJBRVI7QUFBQSx3Q0FBTkMsSUFBTTtBQUFOQSxZQUFNO0FBQUE7O0FBQ1osV0FBS0MsR0FBTCxjQUFTLE1BQVQsU0FBb0JELElBQXBCO0FBQ0Q7OzsyQkFFYTtBQUFBLHlDQUFOQSxJQUFNO0FBQU5BLFlBQU07QUFBQTs7QUFDWixXQUFLQyxHQUFMLGNBQVMsTUFBVCxTQUFvQkQsSUFBcEI7QUFDRDs7OzRCQUVjO0FBQUEseUNBQU5BLElBQU07QUFBTkEsWUFBTTtBQUFBOztBQUNiLFdBQUtDLEdBQUwsY0FBUyxPQUFULFNBQXFCRCxJQUFyQjtBQUNEOzs7Ozs7QUFHSEUsT0FBT0MsT0FBUCxHQUFpQkwsVUFBakIiLCJmaWxlIjoiTnVsbExvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE51bGxMb2dnZXIge1xuICBsb2cobGV2ZWwsIC4uLmFyZ3MpIHt9XG5cbiAgaW5mbyguLi5hcmdzKSB7XG4gICAgdGhpcy5sb2coXCJpbmZvXCIsIC4uLmFyZ3MpO1xuICB9XG5cbiAgd2FybiguLi5hcmdzKSB7XG4gICAgdGhpcy5sb2coXCJ3YXJuXCIsIC4uLmFyZ3MpO1xuICB9XG5cbiAgZXJyb3IoLi4uYXJncykge1xuICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgLi4uYXJncyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOdWxsTG9nZ2VyO1xuIl19