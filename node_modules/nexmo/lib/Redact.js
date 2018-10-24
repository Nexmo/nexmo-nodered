"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _querystring = require("querystring");

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Redact = function () {
  _createClass(Redact, null, [{
    key: "PATH",
    get: function get() {
      return "/v1/redact";
    }
  }]);

  function Redact(credentials, options) {
    _classCallCheck(this, Redact);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  _createClass(Redact, [{
    key: "transaction",
    value: function transaction(id, product, opts, callback) {
      if (typeof callback === "undefined" && typeof opts === "function") {
        callback = opts;
        opts = {};
      }

      opts = opts || {};

      return this.options.api.postJson(Redact.PATH + "/transaction", _extends({ id: id, product: product }, opts), function (err, response, body) {
        if (err) {
          return callback(err);
        }

        return callback(null, body);
      });
    }
  }]);

  return Redact;
}();

exports.default = Redact;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWRhY3QuanMiXSwibmFtZXMiOlsiUmVkYWN0IiwiY3JlZGVudGlhbHMiLCJvcHRpb25zIiwiY3JlZHMiLCJfbmV4bW8iLCJuZXhtb092ZXJyaWRlIiwiaW5pdGlhbGl6ZSIsImFwaUtleSIsImFwaVNlY3JldCIsImlkIiwicHJvZHVjdCIsIm9wdHMiLCJjYWxsYmFjayIsImFwaSIsInBvc3RKc29uIiwiUEFUSCIsImVyciIsInJlc3BvbnNlIiwiYm9keSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLE07Ozt3QkFDYztBQUNoQixhQUFPLFlBQVA7QUFDRDs7O0FBRUQsa0JBQVlDLFdBQVosRUFBeUJDLE9BQXpCLEVBQWtDO0FBQUE7O0FBQ2hDLFNBQUtDLEtBQUwsR0FBYUYsV0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTtBQUNBLFNBQUtFLE1BQUwsR0FBYyxLQUFLRixPQUFMLENBQWFHLGFBQWIsbUJBQWQ7O0FBRUEsU0FBS0QsTUFBTCxDQUFZRSxVQUFaLENBQ0UsS0FBS0gsS0FBTCxDQUFXSSxNQURiLEVBRUUsS0FBS0osS0FBTCxDQUFXSyxTQUZiLEVBR0UsS0FBS04sT0FIUDtBQUtEOzs7O2dDQUVXTyxFLEVBQUlDLE8sRUFBU0MsSSxFQUFNQyxRLEVBQVU7QUFDdkMsVUFBSSxPQUFPQSxRQUFQLEtBQW9CLFdBQXBCLElBQW1DLE9BQU9ELElBQVAsS0FBZ0IsVUFBdkQsRUFBbUU7QUFDakVDLG1CQUFXRCxJQUFYO0FBQ0FBLGVBQU8sRUFBUDtBQUNEOztBQUVEQSxhQUFPQSxRQUFRLEVBQWY7O0FBRUEsYUFBTyxLQUFLVCxPQUFMLENBQWFXLEdBQWIsQ0FBaUJDLFFBQWpCLENBQ0ZkLE9BQU9lLElBREwsOEJBRUhOLE1BRkcsRUFFQ0MsZ0JBRkQsSUFFYUMsSUFGYixHQUdMLFVBQVNLLEdBQVQsRUFBY0MsUUFBZCxFQUF3QkMsSUFBeEIsRUFBOEI7QUFDNUIsWUFBSUYsR0FBSixFQUFTO0FBQ1AsaUJBQU9KLFNBQVNJLEdBQVQsQ0FBUDtBQUNEOztBQUVELGVBQU9KLFNBQVMsSUFBVCxFQUFlTSxJQUFmLENBQVA7QUFDRCxPQVRJLENBQVA7QUFXRDs7Ozs7O2tCQUdZbEIsTSIsImZpbGUiOiJSZWRhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG5leG1vIGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XG5cbmNsYXNzIFJlZGFjdCB7XG4gIHN0YXRpYyBnZXQgUEFUSCgpIHtcbiAgICByZXR1cm4gXCIvdjEvcmVkYWN0XCI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucykge1xuICAgIHRoaXMuY3JlZHMgPSBjcmVkZW50aWFscztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgLy8gVXNlZCB0byBmYWNpbGl0YXRlIHRlc3Rpbmcgb2YgdGhlIGNhbGwgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0XG4gICAgdGhpcy5fbmV4bW8gPSB0aGlzLm9wdGlvbnMubmV4bW9PdmVycmlkZSB8fCBuZXhtbztcblxuICAgIHRoaXMuX25leG1vLmluaXRpYWxpemUoXG4gICAgICB0aGlzLmNyZWRzLmFwaUtleSxcbiAgICAgIHRoaXMuY3JlZHMuYXBpU2VjcmV0LFxuICAgICAgdGhpcy5vcHRpb25zXG4gICAgKTtcbiAgfVxuXG4gIHRyYW5zYWN0aW9uKGlkLCBwcm9kdWN0LCBvcHRzLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIG9wdHMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY2FsbGJhY2sgPSBvcHRzO1xuICAgICAgb3B0cyA9IHt9O1xuICAgIH1cblxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hcGkucG9zdEpzb24oXG4gICAgICBgJHtSZWRhY3QuUEFUSH0vdHJhbnNhY3Rpb25gLFxuICAgICAgeyBpZCwgcHJvZHVjdCwgLi4ub3B0cyB9LFxuICAgICAgZnVuY3Rpb24oZXJyLCByZXNwb25zZSwgYm9keSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgYm9keSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWRhY3Q7XG4iXX0=