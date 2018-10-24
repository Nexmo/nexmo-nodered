"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conversion = function () {
  function Conversion(credentials, options) {
    _classCallCheck(this, Conversion);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  _createClass(Conversion, [{
    key: "voice",
    value: function voice(message_id, delivered, timestamp, callback) {
      return this.submit("voice", message_id, delivered, timestamp, callback);
    }
  }, {
    key: "sms",
    value: function sms(message_id, delivered, timestamp, callback) {
      return this.submit("sms", message_id, delivered, timestamp, callback);
    }
  }, {
    key: "submit",
    value: function submit(type, message_id, delivered, timestamp, callback) {
      return this.options.api.postUseQueryString("/conversions/" + type, { "message-id": message_id, delivered: delivered, timestamp: timestamp }, this.options.api._addLimitedAccessMessageToErrors(callback, 402));
    }
  }]);

  return Conversion;
}();

exports.default = Conversion;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db252ZXJzaW9uLmpzIl0sIm5hbWVzIjpbIkNvbnZlcnNpb24iLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJjcmVkcyIsIl9uZXhtbyIsIm5leG1vT3ZlcnJpZGUiLCJpbml0aWFsaXplIiwiYXBpS2V5IiwiYXBpU2VjcmV0IiwibWVzc2FnZV9pZCIsImRlbGl2ZXJlZCIsInRpbWVzdGFtcCIsImNhbGxiYWNrIiwic3VibWl0IiwidHlwZSIsImFwaSIsInBvc3RVc2VRdWVyeVN0cmluZyIsIl9hZGRMaW1pdGVkQWNjZXNzTWVzc2FnZVRvRXJyb3JzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFTUEsVTtBQUNKLHNCQUFZQyxXQUFaLEVBQXlCQyxPQUF6QixFQUFrQztBQUFBOztBQUNoQyxTQUFLQyxLQUFMLEdBQWFGLFdBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7O0FBRUE7QUFDQSxTQUFLRSxNQUFMLEdBQWMsS0FBS0YsT0FBTCxDQUFhRyxhQUFiLG1CQUFkOztBQUVBLFNBQUtELE1BQUwsQ0FBWUUsVUFBWixDQUNFLEtBQUtILEtBQUwsQ0FBV0ksTUFEYixFQUVFLEtBQUtKLEtBQUwsQ0FBV0ssU0FGYixFQUdFLEtBQUtOLE9BSFA7QUFLRDs7OzswQkFFS08sVSxFQUFZQyxTLEVBQVdDLFMsRUFBV0MsUSxFQUFVO0FBQ2hELGFBQU8sS0FBS0MsTUFBTCxDQUFZLE9BQVosRUFBcUJKLFVBQXJCLEVBQWlDQyxTQUFqQyxFQUE0Q0MsU0FBNUMsRUFBdURDLFFBQXZELENBQVA7QUFDRDs7O3dCQUVHSCxVLEVBQVlDLFMsRUFBV0MsUyxFQUFXQyxRLEVBQVU7QUFDOUMsYUFBTyxLQUFLQyxNQUFMLENBQVksS0FBWixFQUFtQkosVUFBbkIsRUFBK0JDLFNBQS9CLEVBQTBDQyxTQUExQyxFQUFxREMsUUFBckQsQ0FBUDtBQUNEOzs7MkJBRU1FLEksRUFBTUwsVSxFQUFZQyxTLEVBQVdDLFMsRUFBV0MsUSxFQUFVO0FBQ3ZELGFBQU8sS0FBS1YsT0FBTCxDQUFhYSxHQUFiLENBQWlCQyxrQkFBakIsQ0FDTCxrQkFBa0JGLElBRGIsRUFFTCxFQUFFLGNBQWNMLFVBQWhCLEVBQTRCQyxvQkFBNUIsRUFBdUNDLG9CQUF2QyxFQUZLLEVBR0wsS0FBS1QsT0FBTCxDQUFhYSxHQUFiLENBQWlCRSxnQ0FBakIsQ0FBa0RMLFFBQWxELEVBQTRELEdBQTVELENBSEssQ0FBUDtBQUtEOzs7Ozs7a0JBR1laLFUiLCJmaWxlIjoiQ29udmVyc2lvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgbmV4bW8gZnJvbSBcIi4vaW5kZXhcIjtcblxuY2xhc3MgQ29udmVyc2lvbiB7XG4gIGNvbnN0cnVjdG9yKGNyZWRlbnRpYWxzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAvLyBVc2VkIHRvIGZhY2lsaXRhdGUgdGVzdGluZyBvZiB0aGUgY2FsbCB0byB0aGUgdW5kZXJseWluZyBvYmplY3RcbiAgICB0aGlzLl9uZXhtbyA9IHRoaXMub3B0aW9ucy5uZXhtb092ZXJyaWRlIHx8IG5leG1vO1xuXG4gICAgdGhpcy5fbmV4bW8uaW5pdGlhbGl6ZShcbiAgICAgIHRoaXMuY3JlZHMuYXBpS2V5LFxuICAgICAgdGhpcy5jcmVkcy5hcGlTZWNyZXQsXG4gICAgICB0aGlzLm9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgdm9pY2UobWVzc2FnZV9pZCwgZGVsaXZlcmVkLCB0aW1lc3RhbXAsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VibWl0KFwidm9pY2VcIiwgbWVzc2FnZV9pZCwgZGVsaXZlcmVkLCB0aW1lc3RhbXAsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNtcyhtZXNzYWdlX2lkLCBkZWxpdmVyZWQsIHRpbWVzdGFtcCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5zdWJtaXQoXCJzbXNcIiwgbWVzc2FnZV9pZCwgZGVsaXZlcmVkLCB0aW1lc3RhbXAsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHN1Ym1pdCh0eXBlLCBtZXNzYWdlX2lkLCBkZWxpdmVyZWQsIHRpbWVzdGFtcCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFwaS5wb3N0VXNlUXVlcnlTdHJpbmcoXG4gICAgICBcIi9jb252ZXJzaW9ucy9cIiArIHR5cGUsXG4gICAgICB7IFwibWVzc2FnZS1pZFwiOiBtZXNzYWdlX2lkLCBkZWxpdmVyZWQsIHRpbWVzdGFtcCB9LFxuICAgICAgdGhpcy5vcHRpb25zLmFwaS5fYWRkTGltaXRlZEFjY2Vzc01lc3NhZ2VUb0Vycm9ycyhjYWxsYmFjaywgNDAyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udmVyc2lvbjtcbiJdfQ==