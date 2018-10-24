"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require("fs");

var FilesResource = function () {
  _createClass(FilesResource, null, [{
    key: "PATH",

    /**
     * The path to the `calls` resource.
     */
    get: function get() {
      return "/v1/files";
    }

    /**
     * Creates a new FilesResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function FilesResource(creds, options) {
    _classCallCheck(this, FilesResource);

    this.creds = creds;
    this.options = options;
  }

  /**
   * Get stream for a remote File
   *
   * @param {string} [fileIdOrUrl] - The unique identifier or URL for the file
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(FilesResource, [{
    key: "get",
    value: function get(fileIdOrUrl, callback) {
      if (!fileIdOrUrl) {
        throw new Error('"fileIdOrUrl" is a required parameter');
      }

      fileIdOrUrl = fileIdOrUrl.split("/").pop(-1);

      var config = {
        host: "api.nexmo.com",
        path: FilesResource.PATH + "/" + fileIdOrUrl,
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };

      this.options.httpClient.request(config, callback);
    }

    /**
     * Save remote File locally
     *
     * @param {string} [fileIdOrUrl] - The unique identifier or URL for the file
     * @param {string} [file] - Filename or file descriptor
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "save",
    value: function save(fileIdOrUrl, file, callback) {
      var _this = this;

      this.get(fileIdOrUrl, function (error, data) {
        if (error) {
          callback(error, null);
        } else {
          _this.__storeFile(data, file, callback);
        }
      });
    }
  }, {
    key: "__storeFile",
    value: function __storeFile(data, file, callback) {
      fs.writeFile(file, data, function (error) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, file);
        }
      });
    }
  }]);

  return FilesResource;
}();

exports.default = FilesResource;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9GaWxlc1Jlc291cmNlLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsIkZpbGVzUmVzb3VyY2UiLCJjcmVkcyIsIm9wdGlvbnMiLCJmaWxlSWRPclVybCIsImNhbGxiYWNrIiwiRXJyb3IiLCJzcGxpdCIsInBvcCIsImNvbmZpZyIsImhvc3QiLCJwYXRoIiwiUEFUSCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiZ2VuZXJhdGVKd3QiLCJodHRwQ2xpZW50IiwicmVxdWVzdCIsImZpbGUiLCJnZXQiLCJlcnJvciIsImRhdGEiLCJfX3N0b3JlRmlsZSIsIndyaXRlRmlsZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxLQUFLQyxRQUFRLElBQVIsQ0FBVDs7SUFFTUMsYTs7OztBQUNKOzs7d0JBR2tCO0FBQ2hCLGFBQU8sV0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFNQSx5QkFBWUMsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTs7QUFDMUIsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7d0JBTUlDLFcsRUFBYUMsUSxFQUFVO0FBQ3pCLFVBQUksQ0FBQ0QsV0FBTCxFQUFrQjtBQUNoQixjQUFNLElBQUlFLEtBQUosQ0FBVSx1Q0FBVixDQUFOO0FBQ0Q7O0FBRURGLG9CQUFjQSxZQUFZRyxLQUFaLENBQWtCLEdBQWxCLEVBQXVCQyxHQUF2QixDQUEyQixDQUFDLENBQTVCLENBQWQ7O0FBRUEsVUFBSUMsU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBU1YsY0FBY1csSUFBdkIsU0FBK0JSLFdBRnBCO0FBR1hTLGdCQUFRLEtBSEc7QUFJWEMsaUJBQVM7QUFDUCwwQkFBZ0IsMEJBRFQ7QUFFUEMscUNBQXlCLEtBQUtiLEtBQUwsQ0FBV2MsV0FBWDtBQUZsQjtBQUpFLE9BQWI7O0FBVUEsV0FBS2IsT0FBTCxDQUFhYyxVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1QsTUFBaEMsRUFBd0NKLFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7eUJBT0tELFcsRUFBYWUsSSxFQUFNZCxRLEVBQVU7QUFBQTs7QUFDaEMsV0FBS2UsR0FBTCxDQUFTaEIsV0FBVCxFQUFzQixVQUFDaUIsS0FBRCxFQUFRQyxJQUFSLEVBQWlCO0FBQ3JDLFlBQUlELEtBQUosRUFBVztBQUNUaEIsbUJBQVNnQixLQUFULEVBQWdCLElBQWhCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZ0JBQUtFLFdBQUwsQ0FBaUJELElBQWpCLEVBQXVCSCxJQUF2QixFQUE2QmQsUUFBN0I7QUFDRDtBQUNGLE9BTkQ7QUFPRDs7O2dDQUVXaUIsSSxFQUFNSCxJLEVBQU1kLFEsRUFBVTtBQUNoQ04sU0FBR3lCLFNBQUgsQ0FBYUwsSUFBYixFQUFtQkcsSUFBbkIsRUFBeUIsaUJBQVM7QUFDaEMsWUFBSUQsS0FBSixFQUFXO0FBQ1RoQixtQkFBU2dCLEtBQVQsRUFBZ0IsSUFBaEI7QUFDRCxTQUZELE1BRU87QUFDTGhCLG1CQUFTLElBQVQsRUFBZWMsSUFBZjtBQUNEO0FBQ0YsT0FORDtBQU9EOzs7Ozs7a0JBR1lsQixhIiwiZmlsZSI6IkZpbGVzUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIGZzID0gcmVxdWlyZShcImZzXCIpO1xuXG5jbGFzcyBGaWxlc1Jlc291cmNlIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRvIHRoZSBgY2FsbHNgIHJlc291cmNlLlxuICAgKi9cbiAgc3RhdGljIGdldCBQQVRIKCkge1xuICAgIHJldHVybiBcIi92MS9maWxlc1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgRmlsZXNSZXNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZHMgLSBDcmVkZW50aWFscyB1c2VkIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgTmV4bW8gQVBJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgb3B0aW9ucyBmb3IgdGhlIGNsYXNzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoY3JlZHMsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc3RyZWFtIGZvciBhIHJlbW90ZSBGaWxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZmlsZUlkT3JVcmxdIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9yIFVSTCBmb3IgdGhlIGZpbGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBnZXQoZmlsZUlkT3JVcmwsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFmaWxlSWRPclVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcImZpbGVJZE9yVXJsXCIgaXMgYSByZXF1aXJlZCBwYXJhbWV0ZXInKTtcbiAgICB9XG5cbiAgICBmaWxlSWRPclVybCA9IGZpbGVJZE9yVXJsLnNwbGl0KFwiL1wiKS5wb3AoLTEpO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogYCR7RmlsZXNSZXNvdXJjZS5QQVRIfS8ke2ZpbGVJZE9yVXJsfWAsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgcmVtb3RlIEZpbGUgbG9jYWxseVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2ZpbGVJZE9yVXJsXSAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvciBVUkwgZm9yIHRoZSBmaWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZmlsZV0gLSBGaWxlbmFtZSBvciBmaWxlIGRlc2NyaXB0b3JcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBzYXZlKGZpbGVJZE9yVXJsLCBmaWxlLCBjYWxsYmFjaykge1xuICAgIHRoaXMuZ2V0KGZpbGVJZE9yVXJsLCAoZXJyb3IsIGRhdGEpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9fc3RvcmVGaWxlKGRhdGEsIGZpbGUsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIF9fc3RvcmVGaWxlKGRhdGEsIGZpbGUsIGNhbGxiYWNrKSB7XG4gICAgZnMud3JpdGVGaWxlKGZpbGUsIGRhdGEsIGVycm9yID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhudWxsLCBmaWxlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGaWxlc1Jlc291cmNlO1xuIl19