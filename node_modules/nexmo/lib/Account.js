"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = function () {
  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition Account options.
   */
  function Account(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Account);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(Account, [{
    key: "checkBalance",
    value: function checkBalance(callback) {
      return this.options.rest.get("/account/get-balance", callback);
    }
  }, {
    key: "updatePassword",
    value: function updatePassword(newSecret, callback) {
      return this.options.rest.postUseQueryString("/account/settings", { newSecret: newSecret }, callback);
    }
  }, {
    key: "updateSMSCallback",
    value: function updateSMSCallback(moCallBackUrl, callback) {
      return this.options.rest.postUseQueryString("/account/settings", { moCallBackUrl: moCallBackUrl }, callback);
    }
  }, {
    key: "updateDeliveryReceiptCallback",
    value: function updateDeliveryReceiptCallback(drCallBackUrl, callback) {
      return this.options.rest.postUseQueryString("/account/settings", { drCallBackUrl: drCallBackUrl }, callback);
    }
  }, {
    key: "topUp",
    value: function topUp(trx, callback) {
      return this.options.rest.postUseQueryString("/account/top-up", { trx: trx }, callback);
    }
  }, {
    key: "listSecrets",
    value: function listSecrets(apiKey, callback) {
      return this.options.api.get("/accounts/" + apiKey + "/secrets", {}, callback, false, true);
    }
  }, {
    key: "getSecret",
    value: function getSecret(apiKey, id, callback) {
      return this.options.api.get("/accounts/" + apiKey + "/secrets/" + id, {}, callback, false, true);
    }
  }, {
    key: "createSecret",
    value: function createSecret(apiKey, secret, callback) {
      return this.options.api.postJson("/accounts/" + apiKey + "/secrets/", { secret: secret }, callback, false, true);
    }
  }, {
    key: "deleteSecret",
    value: function deleteSecret(apiKey, id, callback) {
      return this.options.api.delete("/accounts/" + apiKey + "/secrets/" + id, callback, false, true);
    }
  }]);

  return Account;
}();

exports.default = Account;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BY2NvdW50LmpzIl0sIm5hbWVzIjpbIkFjY291bnQiLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJjcmVkcyIsIl9uZXhtbyIsIm5leG1vT3ZlcnJpZGUiLCJpbml0aWFsaXplIiwiYXBpS2V5IiwiYXBpU2VjcmV0IiwiY2FsbGJhY2siLCJyZXN0IiwiZ2V0IiwibmV3U2VjcmV0IiwicG9zdFVzZVF1ZXJ5U3RyaW5nIiwibW9DYWxsQmFja1VybCIsImRyQ2FsbEJhY2tVcmwiLCJ0cngiLCJhcGkiLCJpZCIsInNlY3JldCIsInBvc3RKc29uIiwiZGVsZXRlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFTUEsTztBQUNKOzs7Ozs7QUFNQSxtQkFBWUMsV0FBWixFQUF1QztBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFDckMsU0FBS0MsS0FBTCxHQUFhRixXQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmOztBQUVBO0FBQ0EsU0FBS0UsTUFBTCxHQUFjLEtBQUtGLE9BQUwsQ0FBYUcsYUFBYixtQkFBZDs7QUFFQSxTQUFLRCxNQUFMLENBQVlFLFVBQVosQ0FDRSxLQUFLSCxLQUFMLENBQVdJLE1BRGIsRUFFRSxLQUFLSixLQUFMLENBQVdLLFNBRmIsRUFHRSxLQUFLTixPQUhQO0FBS0Q7O0FBRUQ7Ozs7Ozs7aUNBR2FPLFEsRUFBVTtBQUNyQixhQUFPLEtBQUtQLE9BQUwsQ0FBYVEsSUFBYixDQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCLEVBQThDRixRQUE5QyxDQUFQO0FBQ0Q7OzttQ0FFY0csUyxFQUFXSCxRLEVBQVU7QUFDbEMsYUFBTyxLQUFLUCxPQUFMLENBQWFRLElBQWIsQ0FBa0JHLGtCQUFsQixDQUNMLG1CQURLLEVBRUwsRUFBRUQsb0JBQUYsRUFGSyxFQUdMSCxRQUhLLENBQVA7QUFLRDs7O3NDQUVpQkssYSxFQUFlTCxRLEVBQVU7QUFDekMsYUFBTyxLQUFLUCxPQUFMLENBQWFRLElBQWIsQ0FBa0JHLGtCQUFsQixDQUNMLG1CQURLLEVBRUwsRUFBRUMsNEJBQUYsRUFGSyxFQUdMTCxRQUhLLENBQVA7QUFLRDs7O2tEQUU2Qk0sYSxFQUFlTixRLEVBQVU7QUFDckQsYUFBTyxLQUFLUCxPQUFMLENBQWFRLElBQWIsQ0FBa0JHLGtCQUFsQixDQUNMLG1CQURLLEVBRUwsRUFBRUUsNEJBQUYsRUFGSyxFQUdMTixRQUhLLENBQVA7QUFLRDs7OzBCQUVLTyxHLEVBQUtQLFEsRUFBVTtBQUNuQixhQUFPLEtBQUtQLE9BQUwsQ0FBYVEsSUFBYixDQUFrQkcsa0JBQWxCLENBQ0wsaUJBREssRUFFTCxFQUFFRyxRQUFGLEVBRkssRUFHTFAsUUFISyxDQUFQO0FBS0Q7OztnQ0FFV0YsTSxFQUFRRSxRLEVBQVU7QUFDNUIsYUFBTyxLQUFLUCxPQUFMLENBQWFlLEdBQWIsQ0FBaUJOLEdBQWpCLENBQ0wsZUFBZUosTUFBZixHQUF3QixVQURuQixFQUVMLEVBRkssRUFHTEUsUUFISyxFQUlMLEtBSkssRUFLTCxJQUxLLENBQVA7QUFPRDs7OzhCQUVTRixNLEVBQVFXLEUsRUFBSVQsUSxFQUFVO0FBQzlCLGFBQU8sS0FBS1AsT0FBTCxDQUFhZSxHQUFiLENBQWlCTixHQUFqQixDQUNMLGVBQWVKLE1BQWYsR0FBd0IsV0FBeEIsR0FBc0NXLEVBRGpDLEVBRUwsRUFGSyxFQUdMVCxRQUhLLEVBSUwsS0FKSyxFQUtMLElBTEssQ0FBUDtBQU9EOzs7aUNBRVlGLE0sRUFBUVksTSxFQUFRVixRLEVBQVU7QUFDckMsYUFBTyxLQUFLUCxPQUFMLENBQWFlLEdBQWIsQ0FBaUJHLFFBQWpCLENBQ0wsZUFBZWIsTUFBZixHQUF3QixXQURuQixFQUVMLEVBQUVZLFFBQVFBLE1BQVYsRUFGSyxFQUdMVixRQUhLLEVBSUwsS0FKSyxFQUtMLElBTEssQ0FBUDtBQU9EOzs7aUNBRVlGLE0sRUFBUVcsRSxFQUFJVCxRLEVBQVU7QUFDakMsYUFBTyxLQUFLUCxPQUFMLENBQWFlLEdBQWIsQ0FBaUJJLE1BQWpCLENBQ0wsZUFBZWQsTUFBZixHQUF3QixXQUF4QixHQUFzQ1csRUFEakMsRUFFTFQsUUFGSyxFQUdMLEtBSEssRUFJTCxJQUpLLENBQVA7QUFNRDs7Ozs7O2tCQUdZVCxPIiwiZmlsZSI6IkFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG5leG1vIGZyb20gXCIuL2luZGV4XCI7XG5cbmNsYXNzIEFjY291bnQge1xuICAvKipcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogICAgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgQWRkaXRpb24gQWNjb3VudCBvcHRpb25zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoY3JlZGVudGlhbHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuY3JlZHMgPSBjcmVkZW50aWFscztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgLy8gVXNlZCB0byBmYWNpbGl0YXRlIHRlc3Rpbmcgb2YgdGhlIGNhbGwgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0XG4gICAgdGhpcy5fbmV4bW8gPSB0aGlzLm9wdGlvbnMubmV4bW9PdmVycmlkZSB8fCBuZXhtbztcblxuICAgIHRoaXMuX25leG1vLmluaXRpYWxpemUoXG4gICAgICB0aGlzLmNyZWRzLmFwaUtleSxcbiAgICAgIHRoaXMuY3JlZHMuYXBpU2VjcmV0LFxuICAgICAgdGhpcy5vcHRpb25zXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgY2hlY2tCYWxhbmNlKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZXN0LmdldChcIi9hY2NvdW50L2dldC1iYWxhbmNlXCIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHVwZGF0ZVBhc3N3b3JkKG5ld1NlY3JldCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlc3QucG9zdFVzZVF1ZXJ5U3RyaW5nKFxuICAgICAgXCIvYWNjb3VudC9zZXR0aW5nc1wiLFxuICAgICAgeyBuZXdTZWNyZXQgfSxcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIHVwZGF0ZVNNU0NhbGxiYWNrKG1vQ2FsbEJhY2tVcmwsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZXN0LnBvc3RVc2VRdWVyeVN0cmluZyhcbiAgICAgIFwiL2FjY291bnQvc2V0dGluZ3NcIixcbiAgICAgIHsgbW9DYWxsQmFja1VybCB9LFxuICAgICAgY2FsbGJhY2tcbiAgICApO1xuICB9XG5cbiAgdXBkYXRlRGVsaXZlcnlSZWNlaXB0Q2FsbGJhY2soZHJDYWxsQmFja1VybCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlc3QucG9zdFVzZVF1ZXJ5U3RyaW5nKFxuICAgICAgXCIvYWNjb3VudC9zZXR0aW5nc1wiLFxuICAgICAgeyBkckNhbGxCYWNrVXJsIH0sXG4gICAgICBjYWxsYmFja1xuICAgICk7XG4gIH1cblxuICB0b3BVcCh0cngsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZXN0LnBvc3RVc2VRdWVyeVN0cmluZyhcbiAgICAgIFwiL2FjY291bnQvdG9wLXVwXCIsXG4gICAgICB7IHRyeCB9LFxuICAgICAgY2FsbGJhY2tcbiAgICApO1xuICB9XG5cbiAgbGlzdFNlY3JldHMoYXBpS2V5LCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYXBpLmdldChcbiAgICAgIFwiL2FjY291bnRzL1wiICsgYXBpS2V5ICsgXCIvc2VjcmV0c1wiLFxuICAgICAge30sXG4gICAgICBjYWxsYmFjayxcbiAgICAgIGZhbHNlLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH1cblxuICBnZXRTZWNyZXQoYXBpS2V5LCBpZCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFwaS5nZXQoXG4gICAgICBcIi9hY2NvdW50cy9cIiArIGFwaUtleSArIFwiL3NlY3JldHMvXCIgKyBpZCxcbiAgICAgIHt9LFxuICAgICAgY2FsbGJhY2ssXG4gICAgICBmYWxzZSxcbiAgICAgIHRydWVcbiAgICApO1xuICB9XG5cbiAgY3JlYXRlU2VjcmV0KGFwaUtleSwgc2VjcmV0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYXBpLnBvc3RKc29uKFxuICAgICAgXCIvYWNjb3VudHMvXCIgKyBhcGlLZXkgKyBcIi9zZWNyZXRzL1wiLFxuICAgICAgeyBzZWNyZXQ6IHNlY3JldCB9LFxuICAgICAgY2FsbGJhY2ssXG4gICAgICBmYWxzZSxcbiAgICAgIHRydWVcbiAgICApO1xuICB9XG5cbiAgZGVsZXRlU2VjcmV0KGFwaUtleSwgaWQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hcGkuZGVsZXRlKFxuICAgICAgXCIvYWNjb3VudHMvXCIgKyBhcGlLZXkgKyBcIi9zZWNyZXRzL1wiICsgaWQsXG4gICAgICBjYWxsYmFjayxcbiAgICAgIGZhbHNlLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudDtcbiJdfQ==