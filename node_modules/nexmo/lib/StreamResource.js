"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides access to the `stream` resource.
 */
var StreamResource = function () {
  _createClass(StreamResource, null, [{
    key: "PATH",

    /**
     * The path to the `stream` resource.
     */
    get: function get() {
      return "/v1/calls/{call_uuid}/stream";
    }

    /**
     * Creates a new StreamResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function StreamResource(creds, options) {
    _classCallCheck(this, StreamResource);

    this.creds = creds;
    this.options = options;
  }

  /**
   * Starts a stream in a call.
   *
   * @param {Object} params - Parameters used when starting the stream. See https://developer.nexmo.com/api/voice#stream for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(StreamResource, [{
    key: "start",
    value: function start(callId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: StreamResource.PATH.replace("{call_uuid}", callId),
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
     * Stop a stream in a call.
     *
     * @param {string} callId - The unique identifier for the call for the stream to be stopped in.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "stop",
    value: function stop(callId, callback) {
      var config = {
        host: "api.nexmo.com",
        path: StreamResource.PATH.replace("{call_uuid}", callId),
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }
  }]);

  return StreamResource;
}();

exports.default = StreamResource;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TdHJlYW1SZXNvdXJjZS5qcyJdLCJuYW1lcyI6WyJTdHJlYW1SZXNvdXJjZSIsImNyZWRzIiwib3B0aW9ucyIsImNhbGxJZCIsInBhcmFtcyIsImNhbGxiYWNrIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbmZpZyIsImhvc3QiLCJwYXRoIiwiUEFUSCIsInJlcGxhY2UiLCJtZXRob2QiLCJib2R5IiwiaGVhZGVycyIsImxlbmd0aCIsIkF1dGhvcml6YXRpb24iLCJnZW5lcmF0ZUp3dCIsImh0dHBDbGllbnQiLCJyZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7OztJQUdNQSxjOzs7O0FBQ0o7Ozt3QkFHa0I7QUFDaEIsYUFBTyw4QkFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFNQSwwQkFBWUMsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTs7QUFDMUIsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7MEJBTU1DLE0sRUFBUUMsTSxFQUFRQyxRLEVBQVU7QUFDOUJELGVBQVNFLEtBQUtDLFNBQUwsQ0FBZUgsTUFBZixDQUFUOztBQUVBLFVBQUlJLFNBQVM7QUFDWEMsY0FBTSxlQURLO0FBRVhDLGNBQU1WLGVBQWVXLElBQWYsQ0FBb0JDLE9BQXBCLENBQTRCLGFBQTVCLEVBQTJDVCxNQUEzQyxDQUZLO0FBR1hVLGdCQUFRLEtBSEc7QUFJWEMsY0FBTVYsTUFKSztBQUtYVyxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQLDRCQUFrQlgsT0FBT1ksTUFGbEI7QUFHUEMscUNBQXlCLEtBQUtoQixLQUFMLENBQVdpQixXQUFYO0FBSGxCO0FBTEUsT0FBYjtBQVdBLFdBQUtoQixPQUFMLENBQWFpQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1osTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozt5QkFNS0YsTSxFQUFRRSxRLEVBQVU7QUFDckIsVUFBSUcsU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBTVYsZUFBZVcsSUFBZixDQUFvQkMsT0FBcEIsQ0FBNEIsYUFBNUIsRUFBMkNULE1BQTNDLENBRks7QUFHWFUsZ0JBQVEsUUFIRztBQUlYRSxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQRSxxQ0FBeUIsS0FBS2hCLEtBQUwsQ0FBV2lCLFdBQVg7QUFGbEI7QUFKRSxPQUFiO0FBU0EsV0FBS2hCLE9BQUwsQ0FBYWlCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDWixNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7Ozs7O2tCQUdZTCxjIiwiZmlsZSI6IlN0cmVhbVJlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQcm92aWRlcyBhY2Nlc3MgdG8gdGhlIGBzdHJlYW1gIHJlc291cmNlLlxuICovXG5jbGFzcyBTdHJlYW1SZXNvdXJjZSB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byB0aGUgYHN0cmVhbWAgcmVzb3VyY2UuXG4gICAqL1xuICBzdGF0aWMgZ2V0IFBBVEgoKSB7XG4gICAgcmV0dXJuIFwiL3YxL2NhbGxzL3tjYWxsX3V1aWR9L3N0cmVhbVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgU3RyZWFtUmVzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRzIC0gQ3JlZGVudGlhbHMgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIE5leG1vIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIG9wdGlvbnMgZm9yIHRoZSBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGEgc3RyZWFtIGluIGEgY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFBhcmFtZXRlcnMgdXNlZCB3aGVuIHN0YXJ0aW5nIHRoZSBzdHJlYW0uIFNlZSBodHRwczovL2RldmVsb3Blci5uZXhtby5jb20vYXBpL3ZvaWNlI3N0cmVhbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBzdGFydChjYWxsSWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogU3RyZWFtUmVzb3VyY2UuUEFUSC5yZXBsYWNlKFwie2NhbGxfdXVpZH1cIiwgY2FsbElkKSxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiQ29udGVudC1MZW5ndGhcIjogcGFyYW1zLmxlbmd0aCxcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYSBzdHJlYW0gaW4gYSBjYWxsLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2FsbElkIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgY2FsbCBmb3IgdGhlIHN0cmVhbSB0byBiZSBzdG9wcGVkIGluLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGNvbXBsZXRlcy5cbiAgICovXG4gIHN0b3AoY2FsbElkLCBjYWxsYmFjaykge1xuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgICAgIHBhdGg6IFN0cmVhbVJlc291cmNlLlBBVEgucmVwbGFjZShcIntjYWxsX3V1aWR9XCIsIGNhbGxJZCksXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RyZWFtUmVzb3VyY2U7XG4iXX0=