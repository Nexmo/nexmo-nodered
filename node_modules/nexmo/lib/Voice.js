"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Voice = function () {
  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition  options.
   */
  function Voice(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Voice);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(Voice, [{
    key: "sendTTSMessage",
    value: function sendTTSMessage() {
      this._nexmo.sendTTSMessage.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "sendTTSPromptWithCapture",
    value: function sendTTSPromptWithCapture() {
      this._nexmo.sendTTSPromptWithCapture.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "sendTTSPromptWithConfirm",
    value: function sendTTSPromptWithConfirm() {
      this._nexmo.sendTTSPromptWithConfirm.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "call",
    value: function call() {
      this._nexmo.call.apply(this._nexmo, arguments);
    }
  }]);

  return Voice;
}();

exports.default = Voice;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Wb2ljZS5qcyJdLCJuYW1lcyI6WyJWb2ljZSIsImNyZWRlbnRpYWxzIiwib3B0aW9ucyIsImNyZWRzIiwiX25leG1vIiwibmV4bW9PdmVycmlkZSIsImluaXRpYWxpemUiLCJhcGlLZXkiLCJhcGlTZWNyZXQiLCJzZW5kVFRTTWVzc2FnZSIsImFwcGx5IiwiYXJndW1lbnRzIiwic2VuZFRUU1Byb21wdFdpdGhDYXB0dXJlIiwic2VuZFRUU1Byb21wdFdpdGhDb25maXJtIiwiY2FsbCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0lBRU1BLEs7QUFDSjs7Ozs7O0FBTUEsaUJBQVlDLFdBQVosRUFBdUM7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3JDLFNBQUtDLEtBQUwsR0FBYUYsV0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTtBQUNBLFNBQUtFLE1BQUwsR0FBYyxLQUFLRixPQUFMLENBQWFHLGFBQWIsbUJBQWQ7O0FBRUEsU0FBS0QsTUFBTCxDQUFZRSxVQUFaLENBQ0UsS0FBS0gsS0FBTCxDQUFXSSxNQURiLEVBRUUsS0FBS0osS0FBTCxDQUFXSyxTQUZiLEVBR0UsS0FBS04sT0FIUDtBQUtEOztBQUVEOzs7Ozs7O3FDQUdpQjtBQUNmLFdBQUtFLE1BQUwsQ0FBWUssY0FBWixDQUEyQkMsS0FBM0IsQ0FBaUMsS0FBS04sTUFBdEMsRUFBOENPLFNBQTlDO0FBQ0Q7O0FBRUQ7Ozs7OzsrQ0FHMkI7QUFDekIsV0FBS1AsTUFBTCxDQUFZUSx3QkFBWixDQUFxQ0YsS0FBckMsQ0FBMkMsS0FBS04sTUFBaEQsRUFBd0RPLFNBQXhEO0FBQ0Q7O0FBRUQ7Ozs7OzsrQ0FHMkI7QUFDekIsV0FBS1AsTUFBTCxDQUFZUyx3QkFBWixDQUFxQ0gsS0FBckMsQ0FBMkMsS0FBS04sTUFBaEQsRUFBd0RPLFNBQXhEO0FBQ0Q7O0FBRUQ7Ozs7OzsyQkFHTztBQUNMLFdBQUtQLE1BQUwsQ0FBWVUsSUFBWixDQUFpQkosS0FBakIsQ0FBdUIsS0FBS04sTUFBNUIsRUFBb0NPLFNBQXBDO0FBQ0Q7Ozs7OztrQkFHWVgsSyIsImZpbGUiOiJWb2ljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgbmV4bW8gZnJvbSBcIi4vaW5kZXhcIjtcblxuY2xhc3MgVm9pY2Uge1xuICAvKipcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogICAgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgQWRkaXRpb24gIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAvLyBVc2VkIHRvIGZhY2lsaXRhdGUgdGVzdGluZyBvZiB0aGUgY2FsbCB0byB0aGUgdW5kZXJseWluZyBvYmplY3RcbiAgICB0aGlzLl9uZXhtbyA9IHRoaXMub3B0aW9ucy5uZXhtb092ZXJyaWRlIHx8IG5leG1vO1xuXG4gICAgdGhpcy5fbmV4bW8uaW5pdGlhbGl6ZShcbiAgICAgIHRoaXMuY3JlZHMuYXBpS2V5LFxuICAgICAgdGhpcy5jcmVkcy5hcGlTZWNyZXQsXG4gICAgICB0aGlzLm9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBzZW5kVFRTTWVzc2FnZSgpIHtcbiAgICB0aGlzLl9uZXhtby5zZW5kVFRTTWVzc2FnZS5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgc2VuZFRUU1Byb21wdFdpdGhDYXB0dXJlKCkge1xuICAgIHRoaXMuX25leG1vLnNlbmRUVFNQcm9tcHRXaXRoQ2FwdHVyZS5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgc2VuZFRUU1Byb21wdFdpdGhDb25maXJtKCkge1xuICAgIHRoaXMuX25leG1vLnNlbmRUVFNQcm9tcHRXaXRoQ29uZmlybS5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgY2FsbCgpIHtcbiAgICB0aGlzLl9uZXhtby5jYWxsLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZvaWNlO1xuIl19