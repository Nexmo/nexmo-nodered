"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _JwtGenerator = require("./JwtGenerator");

var _JwtGenerator2 = _interopRequireDefault(_JwtGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Right now only key/secret credentials are supported.
 * However, in time JWT will also be supported.
 * The `Credentials` object provides an abstraction to this.
 *
 * @param {string} apiKey - A Nexmo API Key
 * @param {string} apiSecret - A Nexmo API Secret
 * @param {string|Buffer} [privateKey] -  When a string value is passed it should
 *                        either represent the path to the private key, or the actual
 *                        private key in string format. If a Buffer is passed then
 *                        it should be the key read from the file system.
 */
var Credentials = function () {
  function Credentials(apiKey, apiSecret, privateKey, applicationId) {
    _classCallCheck(this, Credentials);

    this.apiKey = apiKey;
    this.apiSecret = apiSecret;

    this.privateKey = null;
    this.applicationId = applicationId;

    if (privateKey instanceof Buffer) {
      this.privateKey = privateKey;
    } else if (typeof privateKey === "string" && privateKey.startsWith("-----BEGIN PRIVATE KEY-----")) {
      this.privateKey = new Buffer(privateKey);
    } else if (privateKey !== undefined) {
      if (!_fs2.default.existsSync(privateKey)) {
        throw new Error("File \"" + privateKey + "\" not found.");
      }
      this.privateKey = _fs2.default.readFileSync(privateKey);
    }

    /** @private */
    this._jwtGenerator = new _JwtGenerator2.default();
  }

  /**
   * Generate a Jwt using the Private Key in the Credentials.
   * By default the credentials.applicationId will be used when creating the token.
   * However, this can be overwritten.
   *
   * @param {string} [applicationId] an application ID to be used instead of the
   *                default Credentials.applicationId value.
   *
   * @returns {string} The generated JWT
   */


  _createClass(Credentials, [{
    key: "generateJwt",
    value: function generateJwt() {
      var applicationId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.applicationId;
      var privateKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.privateKey;

      var claims = { application_id: applicationId };
      var token = this._jwtGenerator.generate(privateKey, claims);
      return token;
    }

    /**
     * @private
     * Used for testing purposes only.
     */

  }, {
    key: "_setJwtGenerator",
    value: function _setJwtGenerator(generator) {
      this._jwtGenerator = generator;
    }

    /**
     * Ensures a credentials instance is used.
     *
     * Key/Secret credentials are only supported at present.
     */

  }], [{
    key: "parse",
    value: function parse(obj) {
      if (obj instanceof Credentials) {
        return obj;
      } else {
        return new Credentials(obj.apiKey, obj.apiSecret, obj.privateKey, obj.applicationId);
      }
    }
  }]);

  return Credentials;
}();

exports.default = Credentials;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DcmVkZW50aWFscy5qcyJdLCJuYW1lcyI6WyJDcmVkZW50aWFscyIsImFwaUtleSIsImFwaVNlY3JldCIsInByaXZhdGVLZXkiLCJhcHBsaWNhdGlvbklkIiwiQnVmZmVyIiwic3RhcnRzV2l0aCIsInVuZGVmaW5lZCIsImV4aXN0c1N5bmMiLCJFcnJvciIsInJlYWRGaWxlU3luYyIsIl9qd3RHZW5lcmF0b3IiLCJjbGFpbXMiLCJhcHBsaWNhdGlvbl9pZCIsInRva2VuIiwiZ2VuZXJhdGUiLCJnZW5lcmF0b3IiLCJvYmoiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztJQVlNQSxXO0FBQ0osdUJBQVlDLE1BQVosRUFBb0JDLFNBQXBCLEVBQStCQyxVQUEvQixFQUEyQ0MsYUFBM0MsRUFBMEQ7QUFBQTs7QUFDeEQsU0FBS0gsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7O0FBRUEsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFFBQUlELHNCQUFzQkUsTUFBMUIsRUFBa0M7QUFDaEMsV0FBS0YsVUFBTCxHQUFrQkEsVUFBbEI7QUFDRCxLQUZELE1BRU8sSUFDTCxPQUFPQSxVQUFQLEtBQXNCLFFBQXRCLElBQ0FBLFdBQVdHLFVBQVgsQ0FBc0IsNkJBQXRCLENBRkssRUFHTDtBQUNBLFdBQUtILFVBQUwsR0FBa0IsSUFBSUUsTUFBSixDQUFXRixVQUFYLENBQWxCO0FBQ0QsS0FMTSxNQUtBLElBQUlBLGVBQWVJLFNBQW5CLEVBQThCO0FBQ25DLFVBQUksQ0FBQyxhQUFHQyxVQUFILENBQWNMLFVBQWQsQ0FBTCxFQUFnQztBQUM5QixjQUFNLElBQUlNLEtBQUosYUFBbUJOLFVBQW5CLG1CQUFOO0FBQ0Q7QUFDRCxXQUFLQSxVQUFMLEdBQWtCLGFBQUdPLFlBQUgsQ0FBZ0JQLFVBQWhCLENBQWxCO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFLUSxhQUFMLEdBQXFCLDRCQUFyQjtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7OztrQ0FhRTtBQUFBLFVBRkFQLGFBRUEsdUVBRmdCLEtBQUtBLGFBRXJCO0FBQUEsVUFEQUQsVUFDQSx1RUFEYSxLQUFLQSxVQUNsQjs7QUFDQSxVQUFJUyxTQUFTLEVBQUVDLGdCQUFnQlQsYUFBbEIsRUFBYjtBQUNBLFVBQUlVLFFBQVEsS0FBS0gsYUFBTCxDQUFtQkksUUFBbkIsQ0FBNEJaLFVBQTVCLEVBQXdDUyxNQUF4QyxDQUFaO0FBQ0EsYUFBT0UsS0FBUDtBQUNEOztBQUVEOzs7Ozs7O3FDQUlpQkUsUyxFQUFXO0FBQzFCLFdBQUtMLGFBQUwsR0FBcUJLLFNBQXJCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OzBCQUthQyxHLEVBQUs7QUFDaEIsVUFBSUEsZUFBZWpCLFdBQW5CLEVBQWdDO0FBQzlCLGVBQU9pQixHQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxJQUFJakIsV0FBSixDQUNMaUIsSUFBSWhCLE1BREMsRUFFTGdCLElBQUlmLFNBRkMsRUFHTGUsSUFBSWQsVUFIQyxFQUlMYyxJQUFJYixhQUpDLENBQVA7QUFNRDtBQUNGOzs7Ozs7a0JBR1lKLFciLCJmaWxlIjoiQ3JlZGVudGlhbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IEp3dEdlbmVyYXRvciBmcm9tIFwiLi9Kd3RHZW5lcmF0b3JcIjtcblxuLyoqXG4gKiBSaWdodCBub3cgb25seSBrZXkvc2VjcmV0IGNyZWRlbnRpYWxzIGFyZSBzdXBwb3J0ZWQuXG4gKiBIb3dldmVyLCBpbiB0aW1lIEpXVCB3aWxsIGFsc28gYmUgc3VwcG9ydGVkLlxuICogVGhlIGBDcmVkZW50aWFsc2Agb2JqZWN0IHByb3ZpZGVzIGFuIGFic3RyYWN0aW9uIHRvIHRoaXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFwaUtleSAtIEEgTmV4bW8gQVBJIEtleVxuICogQHBhcmFtIHtzdHJpbmd9IGFwaVNlY3JldCAtIEEgTmV4bW8gQVBJIFNlY3JldFxuICogQHBhcmFtIHtzdHJpbmd8QnVmZmVyfSBbcHJpdmF0ZUtleV0gLSAgV2hlbiBhIHN0cmluZyB2YWx1ZSBpcyBwYXNzZWQgaXQgc2hvdWxkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGVpdGhlciByZXByZXNlbnQgdGhlIHBhdGggdG8gdGhlIHByaXZhdGUga2V5LCBvciB0aGUgYWN0dWFsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUga2V5IGluIHN0cmluZyBmb3JtYXQuIElmIGEgQnVmZmVyIGlzIHBhc3NlZCB0aGVuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGl0IHNob3VsZCBiZSB0aGUga2V5IHJlYWQgZnJvbSB0aGUgZmlsZSBzeXN0ZW0uXG4gKi9cbmNsYXNzIENyZWRlbnRpYWxzIHtcbiAgY29uc3RydWN0b3IoYXBpS2V5LCBhcGlTZWNyZXQsIHByaXZhdGVLZXksIGFwcGxpY2F0aW9uSWQpIHtcbiAgICB0aGlzLmFwaUtleSA9IGFwaUtleTtcbiAgICB0aGlzLmFwaVNlY3JldCA9IGFwaVNlY3JldDtcblxuICAgIHRoaXMucHJpdmF0ZUtleSA9IG51bGw7XG4gICAgdGhpcy5hcHBsaWNhdGlvbklkID0gYXBwbGljYXRpb25JZDtcblxuICAgIGlmIChwcml2YXRlS2V5IGluc3RhbmNlb2YgQnVmZmVyKSB7XG4gICAgICB0aGlzLnByaXZhdGVLZXkgPSBwcml2YXRlS2V5O1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0eXBlb2YgcHJpdmF0ZUtleSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgcHJpdmF0ZUtleS5zdGFydHNXaXRoKFwiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXCIpXG4gICAgKSB7XG4gICAgICB0aGlzLnByaXZhdGVLZXkgPSBuZXcgQnVmZmVyKHByaXZhdGVLZXkpO1xuICAgIH0gZWxzZSBpZiAocHJpdmF0ZUtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMocHJpdmF0ZUtleSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIFwiJHtwcml2YXRlS2V5fVwiIG5vdCBmb3VuZC5gKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJpdmF0ZUtleSA9IGZzLnJlYWRGaWxlU3luYyhwcml2YXRlS2V5KTtcbiAgICB9XG5cbiAgICAvKiogQHByaXZhdGUgKi9cbiAgICB0aGlzLl9qd3RHZW5lcmF0b3IgPSBuZXcgSnd0R2VuZXJhdG9yKCk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBKd3QgdXNpbmcgdGhlIFByaXZhdGUgS2V5IGluIHRoZSBDcmVkZW50aWFscy5cbiAgICogQnkgZGVmYXVsdCB0aGUgY3JlZGVudGlhbHMuYXBwbGljYXRpb25JZCB3aWxsIGJlIHVzZWQgd2hlbiBjcmVhdGluZyB0aGUgdG9rZW4uXG4gICAqIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIG92ZXJ3cml0dGVuLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwcGxpY2F0aW9uSWRdIGFuIGFwcGxpY2F0aW9uIElEIHRvIGJlIHVzZWQgaW5zdGVhZCBvZiB0aGVcbiAgICogICAgICAgICAgICAgICAgZGVmYXVsdCBDcmVkZW50aWFscy5hcHBsaWNhdGlvbklkIHZhbHVlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZ2VuZXJhdGVkIEpXVFxuICAgKi9cbiAgZ2VuZXJhdGVKd3QoXG4gICAgYXBwbGljYXRpb25JZCA9IHRoaXMuYXBwbGljYXRpb25JZCxcbiAgICBwcml2YXRlS2V5ID0gdGhpcy5wcml2YXRlS2V5XG4gICkge1xuICAgIHZhciBjbGFpbXMgPSB7IGFwcGxpY2F0aW9uX2lkOiBhcHBsaWNhdGlvbklkIH07XG4gICAgdmFyIHRva2VuID0gdGhpcy5fand0R2VuZXJhdG9yLmdlbmVyYXRlKHByaXZhdGVLZXksIGNsYWltcyk7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIFVzZWQgZm9yIHRlc3RpbmcgcHVycG9zZXMgb25seS5cbiAgICovXG4gIF9zZXRKd3RHZW5lcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgdGhpcy5fand0R2VuZXJhdG9yID0gZ2VuZXJhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgYSBjcmVkZW50aWFscyBpbnN0YW5jZSBpcyB1c2VkLlxuICAgKlxuICAgKiBLZXkvU2VjcmV0IGNyZWRlbnRpYWxzIGFyZSBvbmx5IHN1cHBvcnRlZCBhdCBwcmVzZW50LlxuICAgKi9cbiAgc3RhdGljIHBhcnNlKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBDcmVkZW50aWFscykge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBDcmVkZW50aWFscyhcbiAgICAgICAgb2JqLmFwaUtleSxcbiAgICAgICAgb2JqLmFwaVNlY3JldCxcbiAgICAgICAgb2JqLnByaXZhdGVLZXksXG4gICAgICAgIG9iai5hcHBsaWNhdGlvbklkXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDcmVkZW50aWFscztcbiJdfQ==