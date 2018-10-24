"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberInsight = function () {
  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition NumberInsight options.
   */
  function NumberInsight(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, NumberInsight);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * Get insight on the provided number.
   *
   * @param {Object} options - The options for Number Insight
   * @param {string} options.level - the level of insight: 'basic', 'standard'
   *                 or 'advanced'.
   *                 If no `level` value is provided, or an unrecognised value
   *                 is used, 'basic' level insight will be used.
   * @param {string} options.number - the phone number to retrieve insight on
   * @param {string} options.country - 'basic' and 'standard' only.
   *                 An ISO 3166 Alpha 2 country code
   *                 https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   * @param {string} options. ip - 'advanced' only.
   *                 The IP address in IPv4 notation of the endpoint the
   *                 user connected from.
   * @param {Array}  options.features - 'advanced' only.
   *                 An Array detailing the information you want for this phone
   *                 number. Possible Array elements are:
   *                 - type: number is one of the following: mobile, landline,
   *                          landline_premium or unknown phone number.
   *                 - valid: number exists.
   *                 - reachable: is number available now.
   *                 - carrier: the MCCMNC for the carrier number is registered
   *                             with. This is either: <ISO country code>-FIXED
   *                             or <ISO country code>-PREMIUM.
   *                 - ported: if the user has changed carrier for number.
   *                 - roaming: the subscriber is outside their home network
   *
   * @param {string} options.callback - 'advanced' only.
   *                 The callback to be called when the API call completes.
   * @param {Number} options.callback_timeout - 'advanced' only.
   *                 The maximum wait until the Number Insight Return Parameters
   *                 are sent to callback. This is a value between 1000 - 30000ms
   *                 inclusive. The default is 30000 ms.
   * @param {string} options.callback_method - 'advanced' only.
   *                 The HTTP method used to send the Number Insight Return
   *                 Parameters to callback. Must be GET or POST. The default
   *                 value is GET.
   * @param {string} options.client_ref - 'advanced' only.
   *                 A 40 character reference string returned in the Number
   *                 Insight Return Parameters. This may be useful for your
   *                 internal reports.
   * @param {string} options['include-intermediate-callbacks'] - 'advanced' only.
   *                 Tells the Nexmo platform to make callbacks as soon as an
   *                 individual piece of information is retrieved.
   */


  _createClass(NumberInsight, [{
    key: "get",
    value: function get(options, callback) {
      var level = options.level;
      // remove 'level' as it's a library-only parameter
      delete options.level;

      if (level === "advanced" || level === "advancedAsync") {
        if (level === "advanced") {
          console.warn('DEPRECATION WARNING: Number Insight Advanced with a level of "advanced" will be synchronous in v2.0+. Consider using the level "advancedAsync" to keep using the async option.');
        }
        this._nexmo.numberInsightAdvancedAsync.apply(this._nexmo, arguments);
      } else if (level === "advancedSync") {
        this._nexmo.numberInsightAdvanced.apply(this._nexmo, arguments);
      } else if (level === "standard") {
        this._nexmo.numberInsightStandard.apply(this._nexmo, arguments);
      } else {
        this._nexmo.numberInsightBasic.apply(this._nexmo, arguments);
      }
    }
  }]);

  return NumberInsight;
}();

exports.default = NumberInsight;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9OdW1iZXJJbnNpZ2h0LmpzIl0sIm5hbWVzIjpbIk51bWJlckluc2lnaHQiLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJjcmVkcyIsIl9uZXhtbyIsIm5leG1vT3ZlcnJpZGUiLCJpbml0aWFsaXplIiwiYXBpS2V5IiwiYXBpU2VjcmV0IiwiY2FsbGJhY2siLCJsZXZlbCIsImNvbnNvbGUiLCJ3YXJuIiwibnVtYmVySW5zaWdodEFkdmFuY2VkQXN5bmMiLCJhcHBseSIsImFyZ3VtZW50cyIsIm51bWJlckluc2lnaHRBZHZhbmNlZCIsIm51bWJlckluc2lnaHRTdGFuZGFyZCIsIm51bWJlckluc2lnaHRCYXNpYyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0lBRU1BLGE7QUFDSjs7Ozs7O0FBTUEseUJBQVlDLFdBQVosRUFBdUM7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3JDLFNBQUtDLEtBQUwsR0FBYUYsV0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTtBQUNBLFNBQUtFLE1BQUwsR0FBYyxLQUFLRixPQUFMLENBQWFHLGFBQWIsbUJBQWQ7O0FBRUEsU0FBS0QsTUFBTCxDQUFZRSxVQUFaLENBQ0UsS0FBS0gsS0FBTCxDQUFXSSxNQURiLEVBRUUsS0FBS0osS0FBTCxDQUFXSyxTQUZiLEVBR0UsS0FBS04sT0FIUDtBQUtEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkE4Q0lBLE8sRUFBU08sUSxFQUFVO0FBQ3JCLFVBQUlDLFFBQVFSLFFBQVFRLEtBQXBCO0FBQ0E7QUFDQSxhQUFPUixRQUFRUSxLQUFmOztBQUVBLFVBQUlBLFVBQVUsVUFBVixJQUF3QkEsVUFBVSxlQUF0QyxFQUF1RDtBQUNyRCxZQUFJQSxVQUFVLFVBQWQsRUFBMEI7QUFDeEJDLGtCQUFRQyxJQUFSLENBQ0UsZ0xBREY7QUFHRDtBQUNELGFBQUtSLE1BQUwsQ0FBWVMsMEJBQVosQ0FBdUNDLEtBQXZDLENBQTZDLEtBQUtWLE1BQWxELEVBQTBEVyxTQUExRDtBQUNELE9BUEQsTUFPTyxJQUFJTCxVQUFVLGNBQWQsRUFBOEI7QUFDbkMsYUFBS04sTUFBTCxDQUFZWSxxQkFBWixDQUFrQ0YsS0FBbEMsQ0FBd0MsS0FBS1YsTUFBN0MsRUFBcURXLFNBQXJEO0FBQ0QsT0FGTSxNQUVBLElBQUlMLFVBQVUsVUFBZCxFQUEwQjtBQUMvQixhQUFLTixNQUFMLENBQVlhLHFCQUFaLENBQWtDSCxLQUFsQyxDQUF3QyxLQUFLVixNQUE3QyxFQUFxRFcsU0FBckQ7QUFDRCxPQUZNLE1BRUE7QUFDTCxhQUFLWCxNQUFMLENBQVljLGtCQUFaLENBQStCSixLQUEvQixDQUFxQyxLQUFLVixNQUExQyxFQUFrRFcsU0FBbEQ7QUFDRDtBQUNGOzs7Ozs7a0JBR1lmLGEiLCJmaWxlIjoiTnVtYmVySW5zaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgbmV4bW8gZnJvbSBcIi4vaW5kZXhcIjtcblxuY2xhc3MgTnVtYmVySW5zaWdodCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICAgKiAgICBjcmVkZW50aWFscyB0byBiZSB1c2VkIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgQVBJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiAgICBBZGRpdGlvbiBOdW1iZXJJbnNpZ2h0IG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAvLyBVc2VkIHRvIGZhY2lsaXRhdGUgdGVzdGluZyBvZiB0aGUgY2FsbCB0byB0aGUgdW5kZXJseWluZyBvYmplY3RcbiAgICB0aGlzLl9uZXhtbyA9IHRoaXMub3B0aW9ucy5uZXhtb092ZXJyaWRlIHx8IG5leG1vO1xuXG4gICAgdGhpcy5fbmV4bW8uaW5pdGlhbGl6ZShcbiAgICAgIHRoaXMuY3JlZHMuYXBpS2V5LFxuICAgICAgdGhpcy5jcmVkcy5hcGlTZWNyZXQsXG4gICAgICB0aGlzLm9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpbnNpZ2h0IG9uIHRoZSBwcm92aWRlZCBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIE51bWJlciBJbnNpZ2h0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmxldmVsIC0gdGhlIGxldmVsIG9mIGluc2lnaHQ6ICdiYXNpYycsICdzdGFuZGFyZCdcbiAgICogICAgICAgICAgICAgICAgIG9yICdhZHZhbmNlZCcuXG4gICAqICAgICAgICAgICAgICAgICBJZiBubyBgbGV2ZWxgIHZhbHVlIGlzIHByb3ZpZGVkLCBvciBhbiB1bnJlY29nbmlzZWQgdmFsdWVcbiAgICogICAgICAgICAgICAgICAgIGlzIHVzZWQsICdiYXNpYycgbGV2ZWwgaW5zaWdodCB3aWxsIGJlIHVzZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm51bWJlciAtIHRoZSBwaG9uZSBudW1iZXIgdG8gcmV0cmlldmUgaW5zaWdodCBvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb3VudHJ5IC0gJ2Jhc2ljJyBhbmQgJ3N0YW5kYXJkJyBvbmx5LlxuICAgKiAgICAgICAgICAgICAgICAgQW4gSVNPIDMxNjYgQWxwaGEgMiBjb3VudHJ5IGNvZGVcbiAgICogICAgICAgICAgICAgICAgIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT18zMTY2LTFfYWxwaGEtMlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy4gaXAgLSAnYWR2YW5jZWQnIG9ubHkuXG4gICAqICAgICAgICAgICAgICAgICBUaGUgSVAgYWRkcmVzcyBpbiBJUHY0IG5vdGF0aW9uIG9mIHRoZSBlbmRwb2ludCB0aGVcbiAgICogICAgICAgICAgICAgICAgIHVzZXIgY29ubmVjdGVkIGZyb20uXG4gICAqIEBwYXJhbSB7QXJyYXl9ICBvcHRpb25zLmZlYXR1cmVzIC0gJ2FkdmFuY2VkJyBvbmx5LlxuICAgKiAgICAgICAgICAgICAgICAgQW4gQXJyYXkgZGV0YWlsaW5nIHRoZSBpbmZvcm1hdGlvbiB5b3Ugd2FudCBmb3IgdGhpcyBwaG9uZVxuICAgKiAgICAgICAgICAgICAgICAgbnVtYmVyLiBQb3NzaWJsZSBBcnJheSBlbGVtZW50cyBhcmU6XG4gICAqICAgICAgICAgICAgICAgICAtIHR5cGU6IG51bWJlciBpcyBvbmUgb2YgdGhlIGZvbGxvd2luZzogbW9iaWxlLCBsYW5kbGluZSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmRsaW5lX3ByZW1pdW0gb3IgdW5rbm93biBwaG9uZSBudW1iZXIuXG4gICAqICAgICAgICAgICAgICAgICAtIHZhbGlkOiBudW1iZXIgZXhpc3RzLlxuICAgKiAgICAgICAgICAgICAgICAgLSByZWFjaGFibGU6IGlzIG51bWJlciBhdmFpbGFibGUgbm93LlxuICAgKiAgICAgICAgICAgICAgICAgLSBjYXJyaWVyOiB0aGUgTUNDTU5DIGZvciB0aGUgY2FycmllciBudW1iZXIgaXMgcmVnaXN0ZXJlZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aC4gVGhpcyBpcyBlaXRoZXI6IDxJU08gY291bnRyeSBjb2RlPi1GSVhFRFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgPElTTyBjb3VudHJ5IGNvZGU+LVBSRU1JVU0uXG4gICAqICAgICAgICAgICAgICAgICAtIHBvcnRlZDogaWYgdGhlIHVzZXIgaGFzIGNoYW5nZWQgY2FycmllciBmb3IgbnVtYmVyLlxuICAgKiAgICAgICAgICAgICAgICAgLSByb2FtaW5nOiB0aGUgc3Vic2NyaWJlciBpcyBvdXRzaWRlIHRoZWlyIGhvbWUgbmV0d29ya1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jYWxsYmFjayAtICdhZHZhbmNlZCcgb25seS5cbiAgICogICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgd2hlbiB0aGUgQVBJIGNhbGwgY29tcGxldGVzLlxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5jYWxsYmFja190aW1lb3V0IC0gJ2FkdmFuY2VkJyBvbmx5LlxuICAgKiAgICAgICAgICAgICAgICAgVGhlIG1heGltdW0gd2FpdCB1bnRpbCB0aGUgTnVtYmVyIEluc2lnaHQgUmV0dXJuIFBhcmFtZXRlcnNcbiAgICogICAgICAgICAgICAgICAgIGFyZSBzZW50IHRvIGNhbGxiYWNrLiBUaGlzIGlzIGEgdmFsdWUgYmV0d2VlbiAxMDAwIC0gMzAwMDBtc1xuICAgKiAgICAgICAgICAgICAgICAgaW5jbHVzaXZlLiBUaGUgZGVmYXVsdCBpcyAzMDAwMCBtcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY2FsbGJhY2tfbWV0aG9kIC0gJ2FkdmFuY2VkJyBvbmx5LlxuICAgKiAgICAgICAgICAgICAgICAgVGhlIEhUVFAgbWV0aG9kIHVzZWQgdG8gc2VuZCB0aGUgTnVtYmVyIEluc2lnaHQgUmV0dXJuXG4gICAqICAgICAgICAgICAgICAgICBQYXJhbWV0ZXJzIHRvIGNhbGxiYWNrLiBNdXN0IGJlIEdFVCBvciBQT1NULiBUaGUgZGVmYXVsdFxuICAgKiAgICAgICAgICAgICAgICAgdmFsdWUgaXMgR0VULlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jbGllbnRfcmVmIC0gJ2FkdmFuY2VkJyBvbmx5LlxuICAgKiAgICAgICAgICAgICAgICAgQSA0MCBjaGFyYWN0ZXIgcmVmZXJlbmNlIHN0cmluZyByZXR1cm5lZCBpbiB0aGUgTnVtYmVyXG4gICAqICAgICAgICAgICAgICAgICBJbnNpZ2h0IFJldHVybiBQYXJhbWV0ZXJzLiBUaGlzIG1heSBiZSB1c2VmdWwgZm9yIHlvdXJcbiAgICogICAgICAgICAgICAgICAgIGludGVybmFsIHJlcG9ydHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zWydpbmNsdWRlLWludGVybWVkaWF0ZS1jYWxsYmFja3MnXSAtICdhZHZhbmNlZCcgb25seS5cbiAgICogICAgICAgICAgICAgICAgIFRlbGxzIHRoZSBOZXhtbyBwbGF0Zm9ybSB0byBtYWtlIGNhbGxiYWNrcyBhcyBzb29uIGFzIGFuXG4gICAqICAgICAgICAgICAgICAgICBpbmRpdmlkdWFsIHBpZWNlIG9mIGluZm9ybWF0aW9uIGlzIHJldHJpZXZlZC5cbiAgICovXG4gIGdldChvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBsZXZlbCA9IG9wdGlvbnMubGV2ZWw7XG4gICAgLy8gcmVtb3ZlICdsZXZlbCcgYXMgaXQncyBhIGxpYnJhcnktb25seSBwYXJhbWV0ZXJcbiAgICBkZWxldGUgb3B0aW9ucy5sZXZlbDtcblxuICAgIGlmIChsZXZlbCA9PT0gXCJhZHZhbmNlZFwiIHx8IGxldmVsID09PSBcImFkdmFuY2VkQXN5bmNcIikge1xuICAgICAgaWYgKGxldmVsID09PSBcImFkdmFuY2VkXCIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdERVBSRUNBVElPTiBXQVJOSU5HOiBOdW1iZXIgSW5zaWdodCBBZHZhbmNlZCB3aXRoIGEgbGV2ZWwgb2YgXCJhZHZhbmNlZFwiIHdpbGwgYmUgc3luY2hyb25vdXMgaW4gdjIuMCsuIENvbnNpZGVyIHVzaW5nIHRoZSBsZXZlbCBcImFkdmFuY2VkQXN5bmNcIiB0byBrZWVwIHVzaW5nIHRoZSBhc3luYyBvcHRpb24uJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5fbmV4bW8ubnVtYmVySW5zaWdodEFkdmFuY2VkQXN5bmMuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gXCJhZHZhbmNlZFN5bmNcIikge1xuICAgICAgdGhpcy5fbmV4bW8ubnVtYmVySW5zaWdodEFkdmFuY2VkLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IFwic3RhbmRhcmRcIikge1xuICAgICAgdGhpcy5fbmV4bW8ubnVtYmVySW5zaWdodFN0YW5kYXJkLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9uZXhtby5udW1iZXJJbnNpZ2h0QmFzaWMuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE51bWJlckluc2lnaHQ7XG4iXX0=