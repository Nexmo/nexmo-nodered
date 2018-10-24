"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Number = function () {
  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition Number options.
   */
  function Number(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Number);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(Number, [{
    key: "getPricing",
    value: function getPricing() {
      this._nexmo.getPricing.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "getPhonePricing",
    value: function getPhonePricing() {
      this._nexmo.getPhonePricing.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "get",
    value: function get() {
      this._nexmo.getNumbers.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "search",
    value: function search() {
      this._nexmo.searchNumbers.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "buy",
    value: function buy() {
      this._nexmo.buyNumber.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "cancel",
    value: function cancel() {
      this._nexmo.cancelNumber.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "update",
    value: function update() {
      this._nexmo.updateNumber.apply(this._nexmo, arguments);
    }
  }]);

  return Number;
}();

exports.default = Number;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9OdW1iZXIuanMiXSwibmFtZXMiOlsiTnVtYmVyIiwiY3JlZGVudGlhbHMiLCJvcHRpb25zIiwiY3JlZHMiLCJfbmV4bW8iLCJuZXhtb092ZXJyaWRlIiwiaW5pdGlhbGl6ZSIsImFwaUtleSIsImFwaVNlY3JldCIsImdldFByaWNpbmciLCJhcHBseSIsImFyZ3VtZW50cyIsImdldFBob25lUHJpY2luZyIsImdldE51bWJlcnMiLCJzZWFyY2hOdW1iZXJzIiwiYnV5TnVtYmVyIiwiY2FuY2VsTnVtYmVyIiwidXBkYXRlTnVtYmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFTUEsTTtBQUNKOzs7Ozs7QUFNQSxrQkFBWUMsV0FBWixFQUF1QztBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFDckMsU0FBS0MsS0FBTCxHQUFhRixXQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmOztBQUVBO0FBQ0EsU0FBS0UsTUFBTCxHQUFjLEtBQUtGLE9BQUwsQ0FBYUcsYUFBYixtQkFBZDs7QUFFQSxTQUFLRCxNQUFMLENBQVlFLFVBQVosQ0FDRSxLQUFLSCxLQUFMLENBQVdJLE1BRGIsRUFFRSxLQUFLSixLQUFMLENBQVdLLFNBRmIsRUFHRSxLQUFLTixPQUhQO0FBS0Q7O0FBRUQ7Ozs7Ozs7aUNBR2E7QUFDWCxXQUFLRSxNQUFMLENBQVlLLFVBQVosQ0FBdUJDLEtBQXZCLENBQTZCLEtBQUtOLE1BQWxDLEVBQTBDTyxTQUExQztBQUNEOztBQUVEOzs7Ozs7c0NBR2tCO0FBQ2hCLFdBQUtQLE1BQUwsQ0FBWVEsZUFBWixDQUE0QkYsS0FBNUIsQ0FBa0MsS0FBS04sTUFBdkMsRUFBK0NPLFNBQS9DO0FBQ0Q7O0FBRUQ7Ozs7OzswQkFHTTtBQUNKLFdBQUtQLE1BQUwsQ0FBWVMsVUFBWixDQUF1QkgsS0FBdkIsQ0FBNkIsS0FBS04sTUFBbEMsRUFBMENPLFNBQTFDO0FBQ0Q7O0FBRUQ7Ozs7Ozs2QkFHUztBQUNQLFdBQUtQLE1BQUwsQ0FBWVUsYUFBWixDQUEwQkosS0FBMUIsQ0FBZ0MsS0FBS04sTUFBckMsRUFBNkNPLFNBQTdDO0FBQ0Q7O0FBRUQ7Ozs7OzswQkFHTTtBQUNKLFdBQUtQLE1BQUwsQ0FBWVcsU0FBWixDQUFzQkwsS0FBdEIsQ0FBNEIsS0FBS04sTUFBakMsRUFBeUNPLFNBQXpDO0FBQ0Q7O0FBRUQ7Ozs7Ozs2QkFHUztBQUNQLFdBQUtQLE1BQUwsQ0FBWVksWUFBWixDQUF5Qk4sS0FBekIsQ0FBK0IsS0FBS04sTUFBcEMsRUFBNENPLFNBQTVDO0FBQ0Q7O0FBRUQ7Ozs7Ozs2QkFHUztBQUNQLFdBQUtQLE1BQUwsQ0FBWWEsWUFBWixDQUF5QlAsS0FBekIsQ0FBK0IsS0FBS04sTUFBcEMsRUFBNENPLFNBQTVDO0FBQ0Q7Ozs7OztrQkFHWVgsTSIsImZpbGUiOiJOdW1iZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG5leG1vIGZyb20gXCIuL2luZGV4XCI7XG5cbmNsYXNzIE51bWJlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICAgKiAgICBjcmVkZW50aWFscyB0byBiZSB1c2VkIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgQVBJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiAgICBBZGRpdGlvbiBOdW1iZXIgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRlbnRpYWxzLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZGVudGlhbHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIC8vIFVzZWQgdG8gZmFjaWxpdGF0ZSB0ZXN0aW5nIG9mIHRoZSBjYWxsIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdFxuICAgIHRoaXMuX25leG1vID0gdGhpcy5vcHRpb25zLm5leG1vT3ZlcnJpZGUgfHwgbmV4bW87XG5cbiAgICB0aGlzLl9uZXhtby5pbml0aWFsaXplKFxuICAgICAgdGhpcy5jcmVkcy5hcGlLZXksXG4gICAgICB0aGlzLmNyZWRzLmFwaVNlY3JldCxcbiAgICAgIHRoaXMub3B0aW9uc1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIGdldFByaWNpbmcoKSB7XG4gICAgdGhpcy5fbmV4bW8uZ2V0UHJpY2luZy5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgZ2V0UGhvbmVQcmljaW5nKCkge1xuICAgIHRoaXMuX25leG1vLmdldFBob25lUHJpY2luZy5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgZ2V0KCkge1xuICAgIHRoaXMuX25leG1vLmdldE51bWJlcnMuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLl9uZXhtby5zZWFyY2hOdW1iZXJzLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBidXkoKSB7XG4gICAgdGhpcy5fbmV4bW8uYnV5TnVtYmVyLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBjYW5jZWwoKSB7XG4gICAgdGhpcy5fbmV4bW8uY2FuY2VsTnVtYmVyLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5fbmV4bW8udXBkYXRlTnVtYmVyLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE51bWJlcjtcbiJdfQ==