"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition App options.
   */
  function App(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, App);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(App, [{
    key: "create",
    value: function create() {
      this._nexmo.createApplication.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "get",
    value: function get(appId) {
      if ((typeof appId === "undefined" ? "undefined" : _typeof(appId)) !== "object") {
        this._nexmo.getApplication.apply(this._nexmo, arguments);
      } else {
        this._nexmo.getApplications.apply(this._nexmo, arguments);
      }
    }

    /**
     * TODO: document
     */

  }, {
    key: "update",
    value: function update() {
      this._nexmo.updateApplication.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "delete",
    value: function _delete() {
      this._nexmo.deleteApplication.apply(this._nexmo, arguments);
    }
  }]);

  return App;
}();

exports.default = App;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHAuanMiXSwibmFtZXMiOlsiQXBwIiwiY3JlZGVudGlhbHMiLCJvcHRpb25zIiwiY3JlZHMiLCJfbmV4bW8iLCJuZXhtb092ZXJyaWRlIiwiaW5pdGlhbGl6ZSIsImFwaUtleSIsImFwaVNlY3JldCIsImNyZWF0ZUFwcGxpY2F0aW9uIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJhcHBJZCIsImdldEFwcGxpY2F0aW9uIiwiZ2V0QXBwbGljYXRpb25zIiwidXBkYXRlQXBwbGljYXRpb24iLCJkZWxldGVBcHBsaWNhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFTUEsRztBQUNKOzs7Ozs7QUFNQSxlQUFZQyxXQUFaLEVBQXVDO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUNyQyxTQUFLQyxLQUFMLEdBQWFGLFdBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7O0FBRUE7QUFDQSxTQUFLRSxNQUFMLEdBQWMsS0FBS0YsT0FBTCxDQUFhRyxhQUFiLG1CQUFkOztBQUVBLFNBQUtELE1BQUwsQ0FBWUUsVUFBWixDQUNFLEtBQUtILEtBQUwsQ0FBV0ksTUFEYixFQUVFLEtBQUtKLEtBQUwsQ0FBV0ssU0FGYixFQUdFLEtBQUtOLE9BSFA7QUFLRDs7QUFFRDs7Ozs7Ozs2QkFHUztBQUNQLFdBQUtFLE1BQUwsQ0FBWUssaUJBQVosQ0FBOEJDLEtBQTlCLENBQW9DLEtBQUtOLE1BQXpDLEVBQWlETyxTQUFqRDtBQUNEOztBQUVEOzs7Ozs7d0JBR0lDLEssRUFBTztBQUNULFVBQUksUUFBT0EsS0FBUCx5Q0FBT0EsS0FBUCxPQUFpQixRQUFyQixFQUErQjtBQUM3QixhQUFLUixNQUFMLENBQVlTLGNBQVosQ0FBMkJILEtBQTNCLENBQWlDLEtBQUtOLE1BQXRDLEVBQThDTyxTQUE5QztBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtQLE1BQUwsQ0FBWVUsZUFBWixDQUE0QkosS0FBNUIsQ0FBa0MsS0FBS04sTUFBdkMsRUFBK0NPLFNBQS9DO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7OzZCQUdTO0FBQ1AsV0FBS1AsTUFBTCxDQUFZVyxpQkFBWixDQUE4QkwsS0FBOUIsQ0FBb0MsS0FBS04sTUFBekMsRUFBaURPLFNBQWpEO0FBQ0Q7O0FBRUQ7Ozs7Ozs4QkFHUztBQUNQLFdBQUtQLE1BQUwsQ0FBWVksaUJBQVosQ0FBOEJOLEtBQTlCLENBQW9DLEtBQUtOLE1BQXpDLEVBQWlETyxTQUFqRDtBQUNEOzs7Ozs7a0JBR1lYLEciLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBuZXhtbyBmcm9tIFwiLi9pbmRleFwiO1xuXG5jbGFzcyBBcHAge1xuICAvKipcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogICAgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgQWRkaXRpb24gQXBwIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAvLyBVc2VkIHRvIGZhY2lsaXRhdGUgdGVzdGluZyBvZiB0aGUgY2FsbCB0byB0aGUgdW5kZXJseWluZyBvYmplY3RcbiAgICB0aGlzLl9uZXhtbyA9IHRoaXMub3B0aW9ucy5uZXhtb092ZXJyaWRlIHx8IG5leG1vO1xuXG4gICAgdGhpcy5fbmV4bW8uaW5pdGlhbGl6ZShcbiAgICAgIHRoaXMuY3JlZHMuYXBpS2V5LFxuICAgICAgdGhpcy5jcmVkcy5hcGlTZWNyZXQsXG4gICAgICB0aGlzLm9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5fbmV4bW8uY3JlYXRlQXBwbGljYXRpb24uYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIGdldChhcHBJZCkge1xuICAgIGlmICh0eXBlb2YgYXBwSWQgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRoaXMuX25leG1vLmdldEFwcGxpY2F0aW9uLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9uZXhtby5nZXRBcHBsaWNhdGlvbnMuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5fbmV4bW8udXBkYXRlQXBwbGljYXRpb24uYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIGRlbGV0ZSgpIHtcbiAgICB0aGlzLl9uZXhtby5kZWxldGVBcHBsaWNhdGlvbi5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXX0=