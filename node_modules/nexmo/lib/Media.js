"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _querystring = require("querystring");

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Media = function () {
  _createClass(Media, null, [{
    key: "PATH",
    get: function get() {
      return "/v3/media";
    }
  }]);

  function Media(credentials, options) {
    _classCallCheck(this, Media);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  _createClass(Media, [{
    key: "upload",
    value: function upload(opts, callback) {
      opts = opts || {};
      if (!opts.file && !opts.url) {
        throw new Error("You must provide either 'file' or 'url' to upload a file");
      }

      if (opts.file) {
        opts.file = _fs2.default.createReadStream(opts.file);
      }
      return this.options.api.postFile(Media.PATH, opts, function (err, response, body) {
        if (err) {
          return callback(err);
        }

        var location = "";
        if (response && response.headers) {
          location = response.headers.location;
        }

        return callback(null, location);
      }, true);
    }
  }, {
    key: "search",
    value: function search(options, callback) {
      if (typeof options == "function" && !callback) {
        callback = options;
        options = {};
      }

      options = options || {};

      return this._makeRequest("GET", Media.PATH, options, {}, callback);
    }

    // If If-Modified-Since header is provided and the data hasn't changed, the
    // user will receive an empty body in the callback, NOT an error

  }, {
    key: "download",
    value: function download(id, headers, callback) {
      if (!callback && typeof headers == "function") {
        callback = headers;
        headers = {};
      }

      return this._makeRequest("GET", Media.PATH + "/" + id, {}, headers, callback, true);
    }
  }, {
    key: "delete",
    value: function _delete(id, callback) {
      return this._makeRequest("DELETE", Media.PATH + "/" + id, {}, {}, callback);
    }
  }, {
    key: "get",
    value: function get(id, callback) {
      return this._makeRequest("GET", Media.PATH + "/" + id + "/info", {}, {}, callback);
    }
  }, {
    key: "update",
    value: function update(id, opts, callback) {
      return this._makeRequest("PUT", Media.PATH + "/" + id + "/info", opts, {}, callback);
    }
  }, {
    key: "_makeRequest",
    value: function _makeRequest(verb, path, options, headers, callback, skipJsonParsing) {
      headers = Object.assign({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.creds.generateJwt()
      }, headers);

      var req = {};
      if (verb.toUpperCase() === "GET") {
        if (Object.keys(options).length) {
          path = path + "?" + _querystring2.default.stringify(options);
        }
      } else {
        req["body"] = JSON.stringify(options);
      }

      req["path"] = path;
      req["headers"] = headers;

      return this.options.api.request(req, verb, callback, skipJsonParsing);
    }
  }]);

  return Media;
}();

exports.default = Media;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZWRpYS5qcyJdLCJuYW1lcyI6WyJNZWRpYSIsImNyZWRlbnRpYWxzIiwib3B0aW9ucyIsImNyZWRzIiwiX25leG1vIiwibmV4bW9PdmVycmlkZSIsImluaXRpYWxpemUiLCJhcGlLZXkiLCJhcGlTZWNyZXQiLCJvcHRzIiwiY2FsbGJhY2siLCJmaWxlIiwidXJsIiwiRXJyb3IiLCJjcmVhdGVSZWFkU3RyZWFtIiwiYXBpIiwicG9zdEZpbGUiLCJQQVRIIiwiZXJyIiwicmVzcG9uc2UiLCJib2R5IiwibG9jYXRpb24iLCJoZWFkZXJzIiwiX21ha2VSZXF1ZXN0IiwiaWQiLCJ2ZXJiIiwicGF0aCIsInNraXBKc29uUGFyc2luZyIsIk9iamVjdCIsImFzc2lnbiIsIkF1dGhvcml6YXRpb24iLCJnZW5lcmF0ZUp3dCIsInJlcSIsInRvVXBwZXJDYXNlIiwia2V5cyIsImxlbmd0aCIsInN0cmluZ2lmeSIsIkpTT04iLCJyZXF1ZXN0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLEs7Ozt3QkFDYztBQUNoQixhQUFPLFdBQVA7QUFDRDs7O0FBRUQsaUJBQVlDLFdBQVosRUFBeUJDLE9BQXpCLEVBQWtDO0FBQUE7O0FBQ2hDLFNBQUtDLEtBQUwsR0FBYUYsV0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTtBQUNBLFNBQUtFLE1BQUwsR0FBYyxLQUFLRixPQUFMLENBQWFHLGFBQWIsbUJBQWQ7O0FBRUEsU0FBS0QsTUFBTCxDQUFZRSxVQUFaLENBQ0UsS0FBS0gsS0FBTCxDQUFXSSxNQURiLEVBRUUsS0FBS0osS0FBTCxDQUFXSyxTQUZiLEVBR0UsS0FBS04sT0FIUDtBQUtEOzs7OzJCQUVNTyxJLEVBQU1DLFEsRUFBVTtBQUNyQkQsYUFBT0EsUUFBUSxFQUFmO0FBQ0EsVUFBSSxDQUFDQSxLQUFLRSxJQUFOLElBQWMsQ0FBQ0YsS0FBS0csR0FBeEIsRUFBNkI7QUFDM0Is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Q0FBZDtBQUNEOztBQUVEOEIsVUFBSSxNQUFKLElBQWNOLElBQWQ7QUFDQU0sVUFBSSxTQUFKLElBQWlCVixPQUFqQjs7QUFFQSxhQUFPLEtBQUtwQixPQUFMLENBQWFhLEdBQWIsQ0FBaUJ1QixPQUFqQixDQUF5Qk4sR0FBekIsRUFBOEJQLElBQTlCLEVBQW9DZixRQUFwQyxFQUE4Q2lCLGVBQTlDLENBQVA7QUFDRDs7Ozs7O2tCQUdZM0IsSyIsImZpbGUiOiJNZWRpYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgbmV4bW8gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBxdWVyeXN0cmluZyBmcm9tIFwicXVlcnlzdHJpbmdcIjtcblxuY2xhc3MgTWVkaWEge1xuICBzdGF0aWMgZ2V0IFBBVEgoKSB7XG4gICAgcmV0dXJuIFwiL3YzL21lZGlhXCI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucykge1xuICAgIHRoaXMuY3JlZHMgPSBjcmVkZW50aWFscztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgLy8gVXNlZCB0byBmYWNpbGl0YXRlIHRlc3Rpbmcgb2YgdGhlIGNhbGwgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0XG4gICAgdGhpcy5fbmV4bW8gPSB0aGlzLm9wdGlvbnMubmV4bW9PdmVycmlkZSB8fCBuZXhtbztcblxuICAgIHRoaXMuX25leG1vLmluaXRpYWxpemUoXG4gICAgICB0aGlzLmNyZWRzLmFwaUtleSxcbiAgICAgIHRoaXMuY3JlZHMuYXBpU2VjcmV0LFxuICAgICAgdGhpcy5vcHRpb25zXG4gICAgKTtcbiAgfVxuXG4gIHVwbG9hZChvcHRzLCBjYWxsYmFjaykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGlmICghb3B0cy5maWxlICYmICFvcHRzLnVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIllvdSBtdXN0IHByb3ZpZGUgZWl0aGVyICdmaWxlJyBvciAndXJsJyB0byB1cGxvYWQgYSBmaWxlXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZmlsZSkge1xuICAgICAgb3B0cy5maWxlID0gZnMuY3JlYXRlUmVhZFN0cmVhbShvcHRzLmZpbGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFwaS5wb3N0RmlsZShcbiAgICAgIE1lZGlhLlBBVEgsXG4gICAgICBvcHRzLFxuICAgICAgZnVuY3Rpb24oZXJyLCByZXNwb25zZSwgYm9keSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9jYXRpb24gPSBcIlwiO1xuICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuaGVhZGVycykge1xuICAgICAgICAgIGxvY2F0aW9uID0gcmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBsb2NhdGlvbik7XG4gICAgICB9LFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH1cblxuICBzZWFyY2gob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJmdW5jdGlvblwiICYmICFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgcmV0dXJuIHRoaXMuX21ha2VSZXF1ZXN0KFwiR0VUXCIsIE1lZGlhLlBBVEgsIG9wdGlvbnMsIHt9LCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBJZiBJZi1Nb2RpZmllZC1TaW5jZSBoZWFkZXIgaXMgcHJvdmlkZWQgYW5kIHRoZSBkYXRhIGhhc24ndCBjaGFuZ2VkLCB0aGVcbiAgLy8gdXNlciB3aWxsIHJlY2VpdmUgYW4gZW1wdHkgYm9keSBpbiB0aGUgY2FsbGJhY2ssIE5PVCBhbiBlcnJvclxuICBkb3dubG9hZChpZCwgaGVhZGVycywgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxiYWNrICYmIHR5cGVvZiBoZWFkZXJzID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY2FsbGJhY2sgPSBoZWFkZXJzO1xuICAgICAgaGVhZGVycyA9IHt9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9tYWtlUmVxdWVzdChcbiAgICAgIFwiR0VUXCIsXG4gICAgICBgJHtNZWRpYS5QQVRIfS8ke2lkfWAsXG4gICAgICB7fSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICBjYWxsYmFjayxcbiAgICAgIHRydWVcbiAgICApO1xuICB9XG5cbiAgZGVsZXRlKGlkLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9tYWtlUmVxdWVzdChcIkRFTEVURVwiLCBgJHtNZWRpYS5QQVRIfS8ke2lkfWAsIHt9LCB7fSwgY2FsbGJhY2spO1xuICB9XG5cbiAgZ2V0KGlkLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9tYWtlUmVxdWVzdChcbiAgICAgIFwiR0VUXCIsXG4gICAgICBgJHtNZWRpYS5QQVRIfS8ke2lkfS9pbmZvYCxcbiAgICAgIHt9LFxuICAgICAge30sXG4gICAgICBjYWxsYmFja1xuICAgICk7XG4gIH1cblxuICB1cGRhdGUoaWQsIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX21ha2VSZXF1ZXN0KFxuICAgICAgXCJQVVRcIixcbiAgICAgIGAke01lZGlhLlBBVEh9LyR7aWR9L2luZm9gLFxuICAgICAgb3B0cyxcbiAgICAgIHt9LFxuICAgICAgY2FsbGJhY2tcbiAgICApO1xuICB9XG5cbiAgX21ha2VSZXF1ZXN0KHZlcmIsIHBhdGgsIG9wdGlvbnMsIGhlYWRlcnMsIGNhbGxiYWNrLCBza2lwSnNvblBhcnNpbmcpIHtcbiAgICBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfSxcbiAgICAgIGhlYWRlcnNcbiAgICApO1xuXG4gICAgbGV0IHJlcSA9IHt9O1xuICAgIGlmICh2ZXJiLnRvVXBwZXJDYXNlKCkgPT09IFwiR0VUXCIpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhvcHRpb25zKS5sZW5ndGgpIHtcbiAgICAgICAgcGF0aCA9IHBhdGggKyBcIj9cIiArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVxW1wiYm9keVwiXSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJlcVtcInBhdGhcIl0gPSBwYXRoO1xuICAgIHJlcVtcImhlYWRlcnNcIl0gPSBoZWFkZXJzO1xuXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hcGkucmVxdWVzdChyZXEsIHZlcmIsIGNhbGxiYWNrLCBza2lwSnNvblBhcnNpbmcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhO1xuIl19