"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides access to the `talk` resource.
 */
var TalkResource = function () {
  _createClass(TalkResource, null, [{
    key: "PATH",

    /**
     * The path to the `talk` resource.
     */
    get: function get() {
      return "/v1/calls/{call_uuid}/talk";
    }

    /**
     * Creates a new TalkResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function TalkResource(creds, options) {
    _classCallCheck(this, TalkResource);

    this.creds = creds;
    this.options = options;
  }

  /**
   * Starts a talk in a call.
   *
   * @param {Object} params - Parameters used when starting the talk. See https://developer.nexmo.com/api/voice#talk for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(TalkResource, [{
    key: "start",
    value: function start(callId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: TalkResource.PATH.replace("{call_uuid}", callId),
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

    /**
     * Stop a talk in a call.
     *
     * @param {string} callId - The unique identifier for the call for the talk to be stopped in.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "stop",
    value: function stop(callId, callback) {
      var config = {
        host: "api.nexmo.com",
        path: TalkResource.PATH.replace("{call_uuid}", callId),
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }
  }]);

  return TalkResource;
}();

exports.default = TalkResource;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UYWxrUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiVGFsa1Jlc291cmNlIiwiY3JlZHMiLCJvcHRpb25zIiwiY2FsbElkIiwicGFyYW1zIiwiY2FsbGJhY2siLCJKU09OIiwic3RyaW5naWZ5IiwiY29uZmlnIiwiaG9zdCIsInBhdGgiLCJQQVRIIiwicmVwbGFjZSIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwibGVuZ3RoIiwiQXV0aG9yaXphdGlvbiIsImdlbmVyYXRlSnd0IiwiaHR0cENsaWVudCIsInJlcXVlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7O0lBR01BLFk7Ozs7QUFDSjs7O3dCQUdrQjtBQUNoQixhQUFPLDRCQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztBQU1BLHdCQUFZQyxLQUFaLEVBQW1CQyxPQUFuQixFQUE0QjtBQUFBOztBQUMxQixTQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDRDs7QUFFRDs7Ozs7Ozs7OzswQkFNTUMsTSxFQUFRQyxNLEVBQVFDLFEsRUFBVTtBQUM5QkQsZUFBU0UsS0FBS0MsU0FBTCxDQUFlSCxNQUFmLENBQVQ7O0FBRUEsVUFBSUksU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBTVYsYUFBYVcsSUFBYixDQUFrQkMsT0FBbEIsQ0FBMEIsYUFBMUIsRUFBeUNULE1BQXpDLENBRks7QUFHWFUsZ0JBQVEsS0FIRztBQUlYQyxjQUFNVixNQUpLO0FBS1hXLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVAsNEJBQWtCWCxPQUFPWSxNQUZsQjtBQUdQQyxxQ0FBeUIsS0FBS2hCLEtBQUwsQ0FBV2lCLFdBQVg7QUFIbEI7QUFMRSxPQUFiO0FBV0EsV0FBS2hCLE9BQUwsQ0FBYWlCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDWixNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7QUFFRDs7Ozs7Ozs7O3lCQU1LRixNLEVBQVFFLFEsRUFBVTtBQUNyQixVQUFJRyxTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxjQUFNVixhQUFhVyxJQUFiLENBQWtCQyxPQUFsQixDQUEwQixhQUExQixFQUF5Q1QsTUFBekMsQ0FGSztBQUdYVSxnQkFBUSxRQUhHO0FBSVhFLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVBFLHFDQUF5QixLQUFLaEIsS0FBTCxDQUFXaUIsV0FBWDtBQUZsQjtBQUpFLE9BQWI7QUFTQSxXQUFLaEIsT0FBTCxDQUFhaUIsVUFBYixDQUF3QkMsT0FBeEIsQ0FBZ0NaLE1BQWhDLEVBQXdDSCxRQUF4QztBQUNEOzs7Ozs7a0JBR1lMLFkiLCJmaWxlIjoiVGFsa1Jlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQcm92aWRlcyBhY2Nlc3MgdG8gdGhlIGB0YWxrYCByZXNvdXJjZS5cbiAqL1xuY2xhc3MgVGFsa1Jlc291cmNlIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRvIHRoZSBgdGFsa2AgcmVzb3VyY2UuXG4gICAqL1xuICBzdGF0aWMgZ2V0IFBBVEgoKSB7XG4gICAgcmV0dXJuIFwiL3YxL2NhbGxzL3tjYWxsX3V1aWR9L3RhbGtcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFRhbGtSZXNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZHMgLSBDcmVkZW50aWFscyB1c2VkIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgTmV4bW8gQVBJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgb3B0aW9ucyBmb3IgdGhlIGNsYXNzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoY3JlZHMsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYSB0YWxrIGluIGEgY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFBhcmFtZXRlcnMgdXNlZCB3aGVuIHN0YXJ0aW5nIHRoZSB0YWxrLiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubmV4bW8uY29tL2FwaS92b2ljZSN0YWxrIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGNvbXBsZXRlcy5cbiAgICovXG4gIHN0YXJ0KGNhbGxJZCwgcGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtcyk7XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsXG4gICAgICBwYXRoOiBUYWxrUmVzb3VyY2UuUEFUSC5yZXBsYWNlKFwie2NhbGxfdXVpZH1cIiwgY2FsbElkKSxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiQ29udGVudC1MZW5ndGhcIjogcGFyYW1zLmxlbmd0aCxcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYSB0YWxrIGluIGEgY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhbGxJZCAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGNhbGwgZm9yIHRoZSB0YWxrIHRvIGJlIHN0b3BwZWQgaW4uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgc3RvcChjYWxsSWQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogVGFsa1Jlc291cmNlLlBBVEgucmVwbGFjZShcIntjYWxsX3V1aWR9XCIsIGNhbGxJZCksXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFsa1Jlc291cmNlO1xuIl19