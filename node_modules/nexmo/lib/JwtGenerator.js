"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require("uuid");

var _uuid2 = _interopRequireDefault(_uuid);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JwtGenerator = function () {
  function JwtGenerator() {
    _classCallCheck(this, JwtGenerator);
  }

  _createClass(JwtGenerator, [{
    key: "generate",

    /**
     * Generate a JSON Web Token (JWT).
     *
     * @param {Buffer} cert - the private key certificate to be used when signing
     * the claims.
     * @param {Object} claims - additional claims to include within the generated
     * JWT.
     *
     * @returns {String} the generated token
     */
    value: function generate(cert) {
      var claims = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!(cert instanceof Buffer)) {
        throw new Error("cert must be of type Buffer");
      }
      if ((typeof claims === "undefined" ? "undefined" : _typeof(claims)) !== "object") {
        throw new Error("claims must be of type object");
      }

      var toSign = {
        iat: claims.issuedAt || parseInt(Date.now() / 1000, 10),
        jti: claims.jti || _uuid2.default.v1()
      };
      Object.keys(claims).forEach(function (key) {
        toSign[key] = claims[key];
      });

      var token = _jsonwebtoken2.default.sign(toSign, cert, { algorithm: "RS256" });
      return token;
    }
  }]);

  return JwtGenerator;
}();

module.exports = JwtGenerator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Kd3RHZW5lcmF0b3IuanMiXSwibmFtZXMiOlsiSnd0R2VuZXJhdG9yIiwiY2VydCIsImNsYWltcyIsIkJ1ZmZlciIsIkVycm9yIiwidG9TaWduIiwiaWF0IiwiaXNzdWVkQXQiLCJwYXJzZUludCIsIkRhdGUiLCJub3ciLCJqdGkiLCJ2MSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwidG9rZW4iLCJzaWduIiwiYWxnb3JpdGhtIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFTUEsWTs7Ozs7Ozs7QUFDSjs7Ozs7Ozs7Ozs2QkFVU0MsSSxFQUFtQjtBQUFBLFVBQWJDLE1BQWEsdUVBQUosRUFBSTs7QUFDMUIsVUFBSSxFQUFFRCxnQkFBZ0JFLE1BQWxCLENBQUosRUFBK0I7QUFDN0IsY0FBTSxJQUFJQyxLQUFKLENBQVUsNkJBQVYsQ0FBTjtBQUNEO0FBQ0QsVUFBSSxRQUFPRixNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQXRCLEVBQWdDO0FBQzlCLGNBQU0sSUFBSUUsS0FBSixDQUFVLCtCQUFWLENBQU47QUFDRDs7QUFFRCxVQUFJQyxTQUFTO0FBQ1hDLGFBQUtKLE9BQU9LLFFBQVAsSUFBbUJDLFNBQVNDLEtBQUtDLEdBQUwsS0FBYSxJQUF0QixFQUE0QixFQUE1QixDQURiO0FBRVhDLGFBQUtULE9BQU9TLEdBQVAsSUFBYyxlQUFLQyxFQUFMO0FBRlIsT0FBYjtBQUlBQyxhQUFPQyxJQUFQLENBQVlaLE1BQVosRUFBb0JhLE9BQXBCLENBQTRCLGVBQU87QUFDakNWLGVBQU9XLEdBQVAsSUFBY2QsT0FBT2MsR0FBUCxDQUFkO0FBQ0QsT0FGRDs7QUFJQSxVQUFJQyxRQUFRLHVCQUFJQyxJQUFKLENBQVNiLE1BQVQsRUFBaUJKLElBQWpCLEVBQXVCLEVBQUVrQixXQUFXLE9BQWIsRUFBdkIsQ0FBWjtBQUNBLGFBQU9GLEtBQVA7QUFDRDs7Ozs7O0FBR0hHLE9BQU9DLE9BQVAsR0FBaUJyQixZQUFqQiIsImZpbGUiOiJKd3RHZW5lcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZCBmcm9tIFwidXVpZFwiO1xuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XG5cbmNsYXNzIEp3dEdlbmVyYXRvciB7XG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIEpTT04gV2ViIFRva2VuIChKV1QpLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gY2VydCAtIHRoZSBwcml2YXRlIGtleSBjZXJ0aWZpY2F0ZSB0byBiZSB1c2VkIHdoZW4gc2lnbmluZ1xuICAgKiB0aGUgY2xhaW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gY2xhaW1zIC0gYWRkaXRpb25hbCBjbGFpbXMgdG8gaW5jbHVkZSB3aXRoaW4gdGhlIGdlbmVyYXRlZFxuICAgKiBKV1QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBnZW5lcmF0ZWQgdG9rZW5cbiAgICovXG4gIGdlbmVyYXRlKGNlcnQsIGNsYWltcyA9IHt9KSB7XG4gICAgaWYgKCEoY2VydCBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNlcnQgbXVzdCBiZSBvZiB0eXBlIEJ1ZmZlclwiKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjbGFpbXMgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNsYWltcyBtdXN0IGJlIG9mIHR5cGUgb2JqZWN0XCIpO1xuICAgIH1cblxuICAgIHZhciB0b1NpZ24gPSB7XG4gICAgICBpYXQ6IGNsYWltcy5pc3N1ZWRBdCB8fCBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCwgMTApLFxuICAgICAganRpOiBjbGFpbXMuanRpIHx8IHV1aWQudjEoKVxuICAgIH07XG4gICAgT2JqZWN0LmtleXMoY2xhaW1zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0b1NpZ25ba2V5XSA9IGNsYWltc1trZXldO1xuICAgIH0pO1xuXG4gICAgdmFyIHRva2VuID0gand0LnNpZ24odG9TaWduLCBjZXJ0LCB7IGFsZ29yaXRobTogXCJSUzI1NlwiIH0pO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEp3dEdlbmVyYXRvcjtcbiJdfQ==