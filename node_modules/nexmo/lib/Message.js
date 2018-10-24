"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition SMS options.
   */
  function Message(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Message);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(Message, [{
    key: "sendSms",
    value: function sendSms() {
      this._nexmo.sendTextMessage.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "sendBinaryMessage",
    value: function sendBinaryMessage() {
      this._nexmo.sendBinaryMessage.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "sendWapPushMessage",
    value: function sendWapPushMessage() {
      this._nexmo.sendWapPushMessage.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "shortcodeAlert",
    value: function shortcodeAlert() {
      this._nexmo.shortcodeAlert.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "shortcode2FA",
    value: function shortcode2FA() {
      this._nexmo.shortcode2FA.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "shortcodeMarketing",
    value: function shortcodeMarketing() {
      this._nexmo.shortcodeMarketing.apply(this._nexmo, arguments);
    }
  }, {
    key: "search",
    value: function search(id, callback) {
      if (typeof id == "string") {
        return this.options.rest.get("/search/message", { id: id }, callback);
      }

      // Otherwise we expect an array
      return this.options.rest.get("/search/messages", { ids: id }, callback);
    }
  }, {
    key: "searchRejections",
    value: function searchRejections(to, date, callback) {
      return this.options.rest.get("/search/rejections", { to: to, date: date }, callback);
    }
  }]);

  return Message;
}();

exports.default = Message;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzYWdlLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2UiLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJjcmVkcyIsIl9uZXhtbyIsIm5leG1vT3ZlcnJpZGUiLCJpbml0aWFsaXplIiwiYXBpS2V5IiwiYXBpU2VjcmV0Iiwic2VuZFRleHRNZXNzYWdlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJzZW5kQmluYXJ5TWVzc2FnZSIsInNlbmRXYXBQdXNoTWVzc2FnZSIsInNob3J0Y29kZUFsZXJ0Iiwic2hvcnRjb2RlMkZBIiwic2hvcnRjb2RlTWFya2V0aW5nIiwiaWQiLCJjYWxsYmFjayIsInJlc3QiLCJnZXQiLCJpZHMiLCJ0byIsImRhdGUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBOzs7Ozs7OztJQUVNQSxPO0FBQ0o7Ozs7OztBQU1BLG1CQUFZQyxXQUFaLEVBQXVDO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUNyQyxTQUFLQyxLQUFMLEdBQWFGLFdBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7O0FBRUE7QUFDQSxTQUFLRSxNQUFMLEdBQWMsS0FBS0YsT0FBTCxDQUFhRyxhQUFiLG1CQUFkOztBQUVBLFNBQUtELE1BQUwsQ0FBWUUsVUFBWixDQUNFLEtBQUtILEtBQUwsQ0FBV0ksTUFEYixFQUVFLEtBQUtKLEtBQUwsQ0FBV0ssU0FGYixFQUdFLEtBQUtOLE9BSFA7QUFLRDs7QUFFRDs7Ozs7Ozs4QkFHVTtBQUNSLFdBQUtFLE1BQUwsQ0FBWUssZUFBWixDQUE0QkMsS0FBNUIsQ0FBa0MsS0FBS04sTUFBdkMsRUFBK0NPLFNBQS9DO0FBQ0Q7O0FBRUQ7Ozs7Ozt3Q0FHb0I7QUFDbEIsV0FBS1AsTUFBTCxDQUFZUSxpQkFBWixDQUE4QkYsS0FBOUIsQ0FBb0MsS0FBS04sTUFBekMsRUFBaURPLFNBQWpEO0FBQ0Q7O0FBRUQ7Ozs7Ozt5Q0FHcUI7QUFDbkIsV0FBS1AsTUFBTCxDQUFZUyxrQkFBWixDQUErQkgsS0FBL0IsQ0FBcUMsS0FBS04sTUFBMUMsRUFBa0RPLFNBQWxEO0FBQ0Q7O0FBRUQ7Ozs7OztxQ0FHaUI7QUFDZixXQUFLUCxNQUFMLENBQVlVLGNBQVosQ0FBMkJKLEtBQTNCLENBQWlDLEtBQUtOLE1BQXRDLEVBQThDTyxTQUE5QztBQUNEOztBQUVEOzs7Ozs7bUNBR2U7QUFDYixXQUFLUCxNQUFMLENBQVlXLFlBQVosQ0FBeUJMLEtBQXpCLENBQStCLEtBQUtOLE1BQXBDLEVBQTRDTyxTQUE1QztBQUNEOztBQUVEOzs7Ozs7eUNBR3FCO0FBQ25CLFdBQUtQLE1BQUwsQ0FBWVksa0JBQVosQ0FBK0JOLEtBQS9CLENBQXFDLEtBQUtOLE1BQTFDLEVBQWtETyxTQUFsRDtBQUNEOzs7MkJBRU1NLEUsRUFBSUMsUSxFQUFVO0FBQ25CLFVBQUksT0FBT0QsRUFBUCxJQUFhLFFBQWpCLEVBQTJCO0FBQ3pCLGVBQU8sS0FBS2YsT0FBTCxDQUFhaUIsSUFBYixDQUFrQkMsR0FBbEIsQ0FBc0IsaUJBQXRCLEVBQXlDLEVBQUVILElBQUlBLEVBQU4sRUFBekMsRUFBcURDLFFBQXJELENBQVA7QUFDRDs7QUFFRDtBQUNBLGFBQU8sS0FBS2hCLE9BQUwsQ0FBYWlCLElBQWIsQ0FBa0JDLEdBQWxCLENBQXNCLGtCQUF0QixFQUEwQyxFQUFFQyxLQUFLSixFQUFQLEVBQTFDLEVBQXVEQyxRQUF2RCxDQUFQO0FBQ0Q7OztxQ0FFZ0JJLEUsRUFBSUMsSSxFQUFNTCxRLEVBQVU7QUFDbkMsYUFBTyxLQUFLaEIsT0FBTCxDQUFhaUIsSUFBYixDQUFrQkMsR0FBbEIsQ0FBc0Isb0JBQXRCLEVBQTRDLEVBQUVFLE1BQUYsRUFBTUMsVUFBTixFQUE1QyxFQUEwREwsUUFBMUQsQ0FBUDtBQUNEOzs7Ozs7a0JBR1lsQixPIiwiZmlsZSI6Ik1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG5leG1vIGZyb20gXCIuL2luZGV4XCI7XG5cbmNsYXNzIE1lc3NhZ2Uge1xuICAvKipcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogICAgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgQWRkaXRpb24gU01TIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAvLyBVc2VkIHRvIGZhY2lsaXRhdGUgdGVzdGluZyBvZiB0aGUgY2FsbCB0byB0aGUgdW5kZXJseWluZyBvYmplY3RcbiAgICB0aGlzLl9uZXhtbyA9IHRoaXMub3B0aW9ucy5uZXhtb092ZXJyaWRlIHx8IG5leG1vO1xuXG4gICAgdGhpcy5fbmV4bW8uaW5pdGlhbGl6ZShcbiAgICAgIHRoaXMuY3JlZHMuYXBpS2V5LFxuICAgICAgdGhpcy5jcmVkcy5hcGlTZWNyZXQsXG4gICAgICB0aGlzLm9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBzZW5kU21zKCkge1xuICAgIHRoaXMuX25leG1vLnNlbmRUZXh0TWVzc2FnZS5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgc2VuZEJpbmFyeU1lc3NhZ2UoKSB7XG4gICAgdGhpcy5fbmV4bW8uc2VuZEJpbmFyeU1lc3NhZ2UuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIHNlbmRXYXBQdXNoTWVzc2FnZSgpIHtcbiAgICB0aGlzLl9uZXhtby5zZW5kV2FwUHVzaE1lc3NhZ2UuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIHNob3J0Y29kZUFsZXJ0KCkge1xuICAgIHRoaXMuX25leG1vLnNob3J0Y29kZUFsZXJ0LmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBzaG9ydGNvZGUyRkEoKSB7XG4gICAgdGhpcy5fbmV4bW8uc2hvcnRjb2RlMkZBLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBzaG9ydGNvZGVNYXJrZXRpbmcoKSB7XG4gICAgdGhpcy5fbmV4bW8uc2hvcnRjb2RlTWFya2V0aW5nLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgc2VhcmNoKGlkLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgaWQgPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZXN0LmdldChcIi9zZWFyY2gvbWVzc2FnZVwiLCB7IGlkOiBpZCB9LCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlIHdlIGV4cGVjdCBhbiBhcnJheVxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVzdC5nZXQoXCIvc2VhcmNoL21lc3NhZ2VzXCIsIHsgaWRzOiBpZCB9LCBjYWxsYmFjayk7XG4gIH1cblxuICBzZWFyY2hSZWplY3Rpb25zKHRvLCBkYXRlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVzdC5nZXQoXCIvc2VhcmNoL3JlamVjdGlvbnNcIiwgeyB0bywgZGF0ZSB9LCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTtcbiJdfQ==