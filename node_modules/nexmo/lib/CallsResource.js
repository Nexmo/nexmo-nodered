"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _querystring = require("querystring");

var _querystring2 = _interopRequireDefault(_querystring);

var _StreamResource = require("./StreamResource");

var _StreamResource2 = _interopRequireDefault(_StreamResource);

var _TalkResource = require("./TalkResource");

var _TalkResource2 = _interopRequireDefault(_TalkResource);

var _DtmfResource = require("./DtmfResource");

var _DtmfResource2 = _interopRequireDefault(_DtmfResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides access to the `calls` resource.
 */
var CallsResource = function () {
  _createClass(CallsResource, null, [{
    key: "PATH",

    /**
     * The path to the `calls` resource.
     */
    get: function get() {
      return "/v1/calls";
    }

    /**
     * Creates a new CallsResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function CallsResource(creds, options) {
    _classCallCheck(this, CallsResource);

    this.creds = creds;
    this.options = options;

    /**
     * @type StreamController
     */
    this.stream = new _StreamResource2.default(this.creds, this.options);

    /**
     * @type TalkResource
     */
    this.talk = new _TalkResource2.default(this.creds, this.options);

    /**
     * @type DtmfResource
     */
    this.dtmf = new _DtmfResource2.default(this.creds, this.options);
  }

  /**
   * Create a new call.
   *
   * @param {Object} params - Parameters used when creating the call. See https://developer.nexmo.com/api/voice#create-an-outbound-call for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(CallsResource, [{
    key: "create",
    value: function create(params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: CallsResource.PATH,
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": params.length,
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }

    /**
     * Get an existing call.
     *
     * @param {string|object} query - The unique identifier for the call to retrieve
     *               or a set of filter parameters for the query. For more information
     *               see https://docs.nexmo.com/voice/voice-api/api-reference#call_retrieve
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "get",
    value: function get(query, callback) {
      if (!query) {
        throw new Error('"query" is a required parameter');
      }

      var pathExt = "";
      if (typeof query === "string") {
        // single call Id
        pathExt = "/" + query;
      } else if ((typeof query === "undefined" ? "undefined" : _typeof(query)) === "object" && Object.keys(query).length > 0) {
        // filter
        pathExt = "?" + _querystring2.default.stringify(query);
      }

      var config = {
        host: "api.nexmo.com",
        path: "" + CallsResource.PATH + pathExt,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }

    /**
     * Update an existing call.
     *
     * @param {string} [callId] - The unique identifier for the call to update.
     * @param {Object} params - Parameters used when updating the call. See https://developer.nexmo.com/api/voice#modify-an-existing-call for more information.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "update",
    value: function update(callId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: CallsResource.PATH + "/" + callId,
        method: "PUT",
        body: params,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": params.length,
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }
  }]);

  return CallsResource;
}();

exports.default = CallsResource;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxsc1Jlc291cmNlLmpzIl0sIm5hbWVzIjpbIkNhbGxzUmVzb3VyY2UiLCJjcmVkcyIsIm9wdGlvbnMiLCJzdHJlYW0iLCJ0YWxrIiwiZHRtZiIsInBhcmFtcyIsImNhbGxiYWNrIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbmZpZyIsImhvc3QiLCJwYXRoIiwiUEFUSCIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwibGVuZ3RoIiwiQXV0aG9yaXphdGlvbiIsImdlbmVyYXRlSnd0IiwiaHR0cENsaWVudCIsInJlcXVlc3QiLCJxdWVyeSIsIkVycm9yIiwicGF0aEV4dCIsIk9iamVjdCIsImtleXMiLCJjYWxsSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLGE7Ozs7QUFDSjs7O3dCQUdrQjtBQUNoQixhQUFPLFdBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBTUEseUJBQVlDLEtBQVosRUFBbUJDLE9BQW5CLEVBQTRCO0FBQUE7O0FBQzFCLFNBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTs7O0FBR0EsU0FBS0MsTUFBTCxHQUFjLDZCQUFtQixLQUFLRixLQUF4QixFQUErQixLQUFLQyxPQUFwQyxDQUFkOztBQUVBOzs7QUFHQSxTQUFLRSxJQUFMLEdBQVksMkJBQWlCLEtBQUtILEtBQXRCLEVBQTZCLEtBQUtDLE9BQWxDLENBQVo7O0FBRUE7OztBQUdBLFNBQUtHLElBQUwsR0FBWSwyQkFBaUIsS0FBS0osS0FBdEIsRUFBNkIsS0FBS0MsT0FBbEMsQ0FBWjtBQUNEOztBQUVEOzs7Ozs7Ozs7OzJCQU1PSSxNLEVBQVFDLFEsRUFBVTtBQUN2QkQsZUFBU0UsS0FBS0MsU0FBTCxDQUFlSCxNQUFmLENBQVQ7O0FBRUEsVUFBSUksU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBTVosY0FBY2EsSUFGVDtBQUdYQyxnQkFBUSxNQUhHO0FBSVhDLGNBQU1ULE1BSks7QUFLWFUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUCw0QkFBa0JWLE9BQU9XLE1BRmxCO0FBR1BDLHFDQUF5QixLQUFLakIsS0FBTCxDQUFXa0IsV0FBWDtBQUhsQjtBQUxFLE9BQWI7QUFXQSxXQUFLakIsT0FBTCxDQUFha0IsVUFBYixDQUF3QkMsT0FBeEIsQ0FBZ0NYLE1BQWhDLEVBQXdDSCxRQUF4QztBQUNEOztBQUVEOzs7Ozs7Ozs7Ozt3QkFRSWUsSyxFQUFPZixRLEVBQVU7QUFDbkIsVUFBSSxDQUFDZSxLQUFMLEVBQVk7QUFDVixjQUFNLElBQUlDLEtBQUosQ0FBVSxpQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsVUFBSUMsVUFBVSxFQUFkO0FBQ0EsVUFBSSxPQUFPRixLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCO0FBQ0FFLHdCQUFjRixLQUFkO0FBQ0QsT0FIRCxNQUdPLElBQUksUUFBT0EsS0FBUCx5Q0FBT0EsS0FBUCxPQUFpQixRQUFqQixJQUE2QkcsT0FBT0MsSUFBUCxDQUFZSixLQUFaLEVBQW1CTCxNQUFuQixHQUE0QixDQUE3RCxFQUFnRTtBQUNyRTtBQUNBTyx3QkFBYyxzQkFBWWYsU0FBWixDQUFzQmEsS0FBdEIsQ0FBZDtBQUNEOztBQUVELFVBQUlaLFNBQVM7QUFDWEMsY0FBTSxlQURLO0FBRVhDLG1CQUFTWixjQUFjYSxJQUF2QixHQUE4QlcsT0FGbkI7QUFHWFYsZ0JBQVEsS0FIRztBQUlYRSxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQRSxxQ0FBeUIsS0FBS2pCLEtBQUwsQ0FBV2tCLFdBQVg7QUFGbEI7QUFKRSxPQUFiO0FBU0EsV0FBS2pCLE9BQUwsQ0FBYWtCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDWCxNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7QUFFRDs7Ozs7Ozs7OzsyQkFPT29CLE0sRUFBUXJCLE0sRUFBUUMsUSxFQUFVO0FBQy9CRCxlQUFTRSxLQUFLQyxTQUFMLENBQWVILE1BQWYsQ0FBVDs7QUFFQSxVQUFJSSxTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxjQUFTWixjQUFjYSxJQUF2QixTQUErQmMsTUFGcEI7QUFHWGIsZ0JBQVEsS0FIRztBQUlYQyxjQUFNVCxNQUpLO0FBS1hVLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVAsNEJBQWtCVixPQUFPVyxNQUZsQjtBQUdQQyxxQ0FBeUIsS0FBS2pCLEtBQUwsQ0FBV2tCLFdBQVg7QUFIbEI7QUFMRSxPQUFiO0FBV0EsV0FBS2pCLE9BQUwsQ0FBYWtCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDWCxNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7Ozs7O2tCQUdZUCxhIiwiZmlsZSI6IkNhbGxzUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XG5cbmltcG9ydCBTdHJlYW1SZXNvdXJjZSBmcm9tIFwiLi9TdHJlYW1SZXNvdXJjZVwiO1xuaW1wb3J0IFRhbGtSZXNvdXJjZSBmcm9tIFwiLi9UYWxrUmVzb3VyY2VcIjtcbmltcG9ydCBEdG1mUmVzb3VyY2UgZnJvbSBcIi4vRHRtZlJlc291cmNlXCI7XG5cbi8qKlxuICogUHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBgY2FsbHNgIHJlc291cmNlLlxuICovXG5jbGFzcyBDYWxsc1Jlc291cmNlIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRvIHRoZSBgY2FsbHNgIHJlc291cmNlLlxuICAgKi9cbiAgc3RhdGljIGdldCBQQVRIKCkge1xuICAgIHJldHVybiBcIi92MS9jYWxsc1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQ2FsbHNSZXNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZHMgLSBDcmVkZW50aWFscyB1c2VkIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgTmV4bW8gQVBJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgb3B0aW9ucyBmb3IgdGhlIGNsYXNzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoY3JlZHMsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIFN0cmVhbUNvbnRyb2xsZXJcbiAgICAgKi9cbiAgICB0aGlzLnN0cmVhbSA9IG5ldyBTdHJlYW1SZXNvdXJjZSh0aGlzLmNyZWRzLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgVGFsa1Jlc291cmNlXG4gICAgICovXG4gICAgdGhpcy50YWxrID0gbmV3IFRhbGtSZXNvdXJjZSh0aGlzLmNyZWRzLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgRHRtZlJlc291cmNlXG4gICAgICovXG4gICAgdGhpcy5kdG1mID0gbmV3IER0bWZSZXNvdXJjZSh0aGlzLmNyZWRzLCB0aGlzLm9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBjYWxsLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gUGFyYW1ldGVycyB1c2VkIHdoZW4gY3JlYXRpbmcgdGhlIGNhbGwuIFNlZSBodHRwczovL2RldmVsb3Blci5uZXhtby5jb20vYXBpL3ZvaWNlI2NyZWF0ZS1hbi1vdXRib3VuZC1jYWxsIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGNvbXBsZXRlcy5cbiAgICovXG4gIGNyZWF0ZShwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKTtcblxuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgICAgIHBhdGg6IENhbGxzUmVzb3VyY2UuUEFUSCxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBcIkNvbnRlbnQtTGVuZ3RoXCI6IHBhcmFtcy5sZW5ndGgsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gZXhpc3RpbmcgY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBxdWVyeSAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGNhbGwgdG8gcmV0cmlldmVcbiAgICogICAgICAgICAgICAgICBvciBhIHNldCBvZiBmaWx0ZXIgcGFyYW1ldGVycyBmb3IgdGhlIHF1ZXJ5LiBGb3IgbW9yZSBpbmZvcm1hdGlvblxuICAgKiAgICAgICAgICAgICAgIHNlZSBodHRwczovL2RvY3MubmV4bW8uY29tL3ZvaWNlL3ZvaWNlLWFwaS9hcGktcmVmZXJlbmNlI2NhbGxfcmV0cmlldmVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBnZXQocXVlcnksIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFxdWVyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcInF1ZXJ5XCIgaXMgYSByZXF1aXJlZCBwYXJhbWV0ZXInKTtcbiAgICB9XG5cbiAgICB2YXIgcGF0aEV4dCA9IFwiXCI7XG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gc2luZ2xlIGNhbGwgSWRcbiAgICAgIHBhdGhFeHQgPSBgLyR7cXVlcnl9YDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWVyeSA9PT0gXCJvYmplY3RcIiAmJiBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgLy8gZmlsdGVyXG4gICAgICBwYXRoRXh0ID0gYD8ke3F1ZXJ5c3RyaW5nLnN0cmluZ2lmeShxdWVyeSl9YDtcbiAgICB9XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsXG4gICAgICBwYXRoOiBgJHtDYWxsc1Jlc291cmNlLlBBVEh9JHtwYXRoRXh0fWAsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGV4aXN0aW5nIGNhbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY2FsbElkXSAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGNhbGwgdG8gdXBkYXRlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gUGFyYW1ldGVycyB1c2VkIHdoZW4gdXBkYXRpbmcgdGhlIGNhbGwuIFNlZSBodHRwczovL2RldmVsb3Blci5uZXhtby5jb20vYXBpL3ZvaWNlI21vZGlmeS1hbi1leGlzdGluZy1jYWxsIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGNvbXBsZXRlcy5cbiAgICovXG4gIHVwZGF0ZShjYWxsSWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogYCR7Q2FsbHNSZXNvdXJjZS5QQVRIfS8ke2NhbGxJZH1gLFxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJDb250ZW50LUxlbmd0aFwiOiBwYXJhbXMubGVuZ3RoLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FsbHNSZXNvdXJjZTtcbiJdfQ==