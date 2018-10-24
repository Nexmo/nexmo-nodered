"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Verify = function () {
  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition Verify options.
   */
  function Verify(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Verify);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(Verify, [{
    key: "request",
    value: function request() {
      this._nexmo.verifyNumber.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "check",
    value: function check() {
      this._nexmo.checkVerifyRequest.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "control",
    value: function control() {
      this._nexmo.controlVerifyRequest.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "search",
    value: function search() {
      this._nexmo.searchVerifyRequest.apply(this._nexmo, arguments);
    }
  }]);

  return Verify;
}();

exports.default = Verify;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WZXJpZnkuanMiXSwibmFtZXMiOlsiVmVyaWZ5IiwiY3JlZGVudGlhbHMiLCJvcHRpb25zIiwiY3JlZHMiLCJfbmV4bW8iLCJuZXhtb092ZXJyaWRlIiwiaW5pdGlhbGl6ZSIsImFwaUtleSIsImFwaVNlY3JldCIsInZlcmlmeU51bWJlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiY2hlY2tWZXJpZnlSZXF1ZXN0IiwiY29udHJvbFZlcmlmeVJlcXVlc3QiLCJzZWFyY2hWZXJpZnlSZXF1ZXN0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFTUEsTTtBQUNKOzs7Ozs7QUFNQSxrQkFBWUMsV0FBWixFQUF1QztBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFDckMsU0FBS0MsS0FBTCxHQUFhRixXQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmOztBQUVBO0FBQ0EsU0FBS0UsTUFBTCxHQUFjLEtBQUtGLE9BQUwsQ0FBYUcsYUFBYixtQkFBZDs7QUFFQSxTQUFLRCxNQUFMLENBQVlFLFVBQVosQ0FDRSxLQUFLSCxLQUFMLENBQVdJLE1BRGIsRUFFRSxLQUFLSixLQUFMLENBQVdLLFNBRmIsRUFHRSxLQUFLTixPQUhQO0FBS0Q7O0FBRUQ7Ozs7Ozs7OEJBR1U7QUFDUixXQUFLRSxNQUFMLENBQVlLLFlBQVosQ0FBeUJDLEtBQXpCLENBQStCLEtBQUtOLE1BQXBDLEVBQTRDTyxTQUE1QztBQUNEOztBQUVEOzs7Ozs7NEJBR1E7QUFDTixXQUFLUCxNQUFMLENBQVlRLGtCQUFaLENBQStCRixLQUEvQixDQUFxQyxLQUFLTixNQUExQyxFQUFrRE8sU0FBbEQ7QUFDRDs7QUFFRDs7Ozs7OzhCQUdVO0FBQ1IsV0FBS1AsTUFBTCxDQUFZUyxvQkFBWixDQUFpQ0gsS0FBakMsQ0FBdUMsS0FBS04sTUFBNUMsRUFBb0RPLFNBQXBEO0FBQ0Q7O0FBRUQ7Ozs7Ozs2QkFHUztBQUNQLFdBQUtQLE1BQUwsQ0FBWVUsbUJBQVosQ0FBZ0NKLEtBQWhDLENBQXNDLEtBQUtOLE1BQTNDLEVBQW1ETyxTQUFuRDtBQUNEOzs7Ozs7a0JBR1lYLE0iLCJmaWxlIjoiVmVyaWZ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBuZXhtbyBmcm9tIFwiLi9pbmRleFwiO1xuXG5jbGFzcyBWZXJpZnkge1xuICAvKipcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogICAgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgQWRkaXRpb24gVmVyaWZ5IG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAvLyBVc2VkIHRvIGZhY2lsaXRhdGUgdGVzdGluZyBvZiB0aGUgY2FsbCB0byB0aGUgdW5kZXJseWluZyBvYmplY3RcbiAgICB0aGlzLl9uZXhtbyA9IHRoaXMub3B0aW9ucy5uZXhtb092ZXJyaWRlIHx8IG5leG1vO1xuXG4gICAgdGhpcy5fbmV4bW8uaW5pdGlhbGl6ZShcbiAgICAgIHRoaXMuY3JlZHMuYXBpS2V5LFxuICAgICAgdGhpcy5jcmVkcy5hcGlTZWNyZXQsXG4gICAgICB0aGlzLm9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICByZXF1ZXN0KCkge1xuICAgIHRoaXMuX25leG1vLnZlcmlmeU51bWJlci5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgY2hlY2soKSB7XG4gICAgdGhpcy5fbmV4bW8uY2hlY2tWZXJpZnlSZXF1ZXN0LmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBjb250cm9sKCkge1xuICAgIHRoaXMuX25leG1vLmNvbnRyb2xWZXJpZnlSZXF1ZXN0LmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBzZWFyY2goKSB7XG4gICAgdGhpcy5fbmV4bW8uc2VhcmNoVmVyaWZ5UmVxdWVzdC5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWZXJpZnk7XG4iXX0=