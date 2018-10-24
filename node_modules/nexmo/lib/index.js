"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var querystring = require("querystring");

var msgpath = { host: "rest.nexmo.com", path: "/sms/json" };
var shortcodePath = { host: "rest.nexmo.com", path: "/sc/us/${type}/json" };
var ttsEndpoint = { host: "api.nexmo.com", path: "/tts/json" };
var ttsPromptEndpoint = { host: "api.nexmo.com", path: "/tts-prompt/json" };
var callEndpoint = { host: "rest.nexmo.com", path: "/call/json" };
var verifyEndpoint = { host: "api.nexmo.com", path: "/verify/json" };
var checkVerifyEndpoint = { host: "api.nexmo.com", path: "/verify/check/json" };
var controlVerifyEndpoint = {
  host: "api.nexmo.com",
  path: "/verify/control/json"
};
var searchVerifyEndpoint = {
  host: "api.nexmo.com",
  path: "/verify/search/json"
};
var niEndpoint = { host: "api.nexmo.com", path: "/ni/advanced/async/json" };
var niBasicEndpoint = { host: "api.nexmo.com", path: "/ni/basic/json" };
var niStandardEndpoint = { host: "api.nexmo.com", path: "/ni/standard/json" };
var niAdvancedEndpoint = { host: "api.nexmo.com", path: "/ni/advanced/json" };
var applicationsEndpoint = { host: "api.nexmo.com", path: "/v1/applications" };
var up = {};
var numberPattern = new RegExp("^[0-9 +()-]*$");

var _options = null;

// Error message resources are maintained globally in one place for easy management
var ERROR_MESSAGES = {
  sender: "Invalid from address",
  to: "Invalid to address",
  msg: "Invalid Text Message",
  msgParams: "Invalid shortcode message parameters",
  countrycode: "Invalid Country Code",
  msisdn: "Invalid MSISDN passed",
  body: "Invalid Body value in Binary Message",
  udh: "Invalid udh value in Binary Message",
  title: "Invalid title in WAP Push message",
  url: "Invalid url in WAP Push message",
  maxDigits: "Invalid max digits for TTS prompt",
  byeText: "Invalid bye text for TTS prompt",
  pinCode: "Invalid pin code for TTS confirm",
  failedText: "Invalid failed text for TTS confirm",
  answerUrl: "Invalid answer URL for call",
  verifyValidation: "Missing Mandatory fields (number and/or brand)",
  checkVerifyValidation: "Missing Mandatory fields (request_id and/or code)",
  controlVerifyValidation: "Missing Mandatory fields (request_id and/or cmd-command)",
  searchVerifyValidation: "Missing Mandatory fields (request_id or request_ids)",
  numberInsightAdvancedValidation: "Missing Mandatory fields (number and/or callback url)",
  numberInsightValidation: "Missing Mandatory field - number",
  numberInsightPatternFailure: "Number can contain digits and may include any or all of the following: white space, -,+, (, ).",
  optionsNotAnObject: "Options parameter should be a dictionary. Check the docs for valid properties for options",
  applicationName: "Invalid argument: name",
  applicationType: "Invalid argument: type",
  applicationAnswerUrl: "Invalid argument: answerUrl",
  applicationEventUrl: "Invalid argument: eventUrl",
  applicationId: "Invalid argument: appId",
  product: "Invalid product. Should be one of [voice, sms]"
};

exports.initialize = function (pkey, psecret, options) {
  if (!pkey || !psecret) {
    throw "key and secret cannot be empty, set valid values";
  }
  up = {
    api_key: pkey,
    api_secret: psecret
  };
  _options = options;
};

exports.sendBinaryMessage = function (sender, recipient, body, udh, callback) {
  if (!body) {
    sendError(callback, new Error(ERROR_MESSAGES.body));
  } else if (!udh) {
    sendError(callback, new Error(ERROR_MESSAGES.udh));
  } else {
    sendMessage({
      from: sender,
      to: recipient,
      type: "binary",
      body: body,
      udh: udh
    }, callback);
  }
};

exports.sendWapPushMessage = function (sender, recipient, title, url, validity, callback) {
  if (!title) {
    sendError(callback, new Error(ERROR_MESSAGES.title));
  } else if (!url) {
    sendError(callback, new Error(ERROR_MESSAGES.url));
  } else {
    if (typeof validity === "function") {
      callback = validity;
      validity = 86400000;
    }
    sendMessage({
      from: sender,
      to: recipient,
      type: "wappush",
      title: title,
      validity: validity,
      url: url
    }, callback);
  }
};

exports.sendTextMessage = function (sender, recipient, message, opts, callback) {
  if (!message) {
    sendError(callback, new Error(ERROR_MESSAGES.msg));
  } else {
    if (!callback) {
      callback = opts;
      opts = {};
    }
    opts["from"] = sender;
    opts["to"] = recipient;
    opts["text"] = message;
    sendMessage(opts, callback);
  }
};

exports.sendMessage = function (opts, callback) {
  sendMessage(opts, callback);
};
function sendMessage(data, callback) {
  if (!data.from) {
    sendError(callback, new Error(ERROR_MESSAGES.sender));
  } else if (!data.to) {
    sendError(callback, new Error(ERROR_MESSAGES.to));
  } else {
    var path = clone(msgpath);
    path.path += "?" + querystring.stringify(data);
    _options.logger.info("sending message from " + data.from + " to " + data.to + " with message " + data.text);
    sendRequest(path, "POST", function (err, apiResponse) {
      if (!err && apiResponse.status && apiResponse.messages[0].status > 0) {
        sendError(callback, new Error(apiResponse.messages[0]["error-text"]), apiResponse);
      } else {
        if (callback) callback(err, apiResponse);
      }
    });
  }
}

function sendViaShortcode(type, recipient, messageParams, opts, callback) {
  if (!recipient) {
    sendError(callback, new Error(ERROR_MESSAGES.to));
  }
  if (!messageParams || !Object.keys(messageParams)) {
    sendError(callback, new Error(ERROR_MESSAGES.msgParams));
  }
  opts = opts || {};
  var path = clone(shortcodePath);
  path.path = path.path.replace("${type}", type);
  Object.keys(messageParams).forEach(function (key) {
    opts[key] = messageParams[key];
  });
  opts.to = recipient;
  path.path += "?" + querystring.stringify(opts);
  _options.logger.info("sending message from shortcode " + type + " to " + recipient + " with parameters " + JSON.stringify(messageParams));
  sendRequest(path, "POST", function (err, apiResponse) {
    if (!err && apiResponse.status && apiResponse.messages[0].status > 0) {
      sendError(callback, new Error(apiResponse.messages[0]["error-text"]), apiResponse);
    } else {
      if (callback) callback(err, apiResponse);
    }
  });
}
exports.shortcodeAlert = function (recipient, messageParams, opts, callback) {
  sendViaShortcode("alert", recipient, messageParams, opts, callback);
};
exports.shortcode2FA = function (recipient, messageParams, opts, callback) {
  sendViaShortcode("2fa", recipient, messageParams, opts, callback);
};
exports.shortcodeMarketing = function (recipient, messageParams, opts, callback) {
  sendViaShortcode("marketing", recipient, messageParams, opts, callback);
};

function clone(a) {
  return JSON.parse(JSON.stringify(a));
}

function getEndpoint(action) {
  return { path: action };
}

function sendRequest(endpoint, method, callback) {
  endpoint.path = endpoint.path + (endpoint.path.indexOf("?") > 0 ? "&" : "?") + querystring.stringify(up);
  _options.httpClient.request(endpoint, method, callback);
}

exports.checkBalance = function (callback) {
  var balanceEndpoint = getEndpoint("/account/get-balance");
  sendRequest(balanceEndpoint, callback);
};

exports.getPricing = function (countryCode, callback) {
  if (!countryCode || countryCode.length !== 2) {
    sendError(callback, new Error(ERROR_MESSAGES.countrycode));
  } else {
    var pricingEndpoint = getEndpoint("/account/get-pricing/outbound");
    pricingEndpoint.path += "?country=" + countryCode;
    sendRequest(pricingEndpoint, callback);
  }
};

exports.getPhonePricing = function (product, msisdn, callback) {
  if (!product || product !== "sms" && product !== "voice") {
    sendError(callback, new Error(ERROR_MESSAGES.product));
  } else if (!msisdn) {
    sendError(callback, new Error(ERROR_MESSAGES.msisdn));
  } else {
    var pricingEndpoint = getEndpoint("/account/get-phone-pricing/outbound");
    pricingEndpoint.path += "/" + product + "/" + up.api_key + "/" + up.api_secret + "/" + msisdn;
    sendRequest(pricingEndpoint, callback);
  }
};

exports.getNumbers = function (options, callback) {
  var numbersEndpoint = getEndpoint("/account/numbers");
  if (typeof options === "function") {
    callback = options;
  } else if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
    numbersEndpoint.path = numbersEndpoint.path + "?";
    for (var key in options) {
      numbersEndpoint.path = numbersEndpoint.path + key + "=" + options[key] + "&";
    }
  } else {
    sendError(callback, new Error(ERROR_MESSAGES.optionsNotAnObject));
    return;
  }
  sendRequest(numbersEndpoint, callback);
};

exports.searchNumbers = function (countryCode, pattern, callback) {
  if (!countryCode || countryCode.length !== 2) {
    sendError(callback, new Error(ERROR_MESSAGES.countrycode));
  } else {
    var searchEndpoint = getEndpoint("/number/search");
    searchEndpoint.path += "?country=" + countryCode;
    if (typeof pattern === "function") {
      callback = pattern;
    } else if ((typeof pattern === "undefined" ? "undefined" : _typeof(pattern)) === "object") {
      searchEndpoint.path = searchEndpoint.path + "&";
      for (var arg in pattern) {
        searchEndpoint.path = searchEndpoint.path + arg + "=" + pattern[arg] + "&";
      }
    } else {
      searchEndpoint.path = searchEndpoint.path + "&pattern=" + pattern;
    }
    sendRequest(searchEndpoint, callback);
  }
};

exports.buyNumber = function (countryCode, msisdn, callback) {
  if (!countryCode || countryCode.length !== 2) {
    sendError(callback, new Error(ERROR_MESSAGES.countrycode));
  } else if (!msisdn) {
    sendError(callback, new Error(ERROR_MESSAGES.msisdn));
  } else {
    var buyEndpoint = getEndpoint("/number/buy");
    buyEndpoint.path += "?country=" + countryCode + "&msisdn=" + msisdn;
    sendRequest(buyEndpoint, "POST", callback);
  }
};

exports.cancelNumber = function (countryCode, msisdn, callback) {
  if (!countryCode || countryCode.length !== 2) {
    sendError(callback, new Error(ERROR_MESSAGES.countrycode));
  } else if (!msisdn) {
    sendError(callback, new Error(ERROR_MESSAGES.msisdn));
  } else {
    var cancelEndpoint = getEndpoint("/number/cancel");
    cancelEndpoint.path += "?country=" + countryCode + "&msisdn=" + msisdn;
    sendRequest(cancelEndpoint, "POST", callback);
  }
};

exports.cancelNumber = function (countryCode, msisdn, callback) {
  if (!countryCode || countryCode.length !== 2) {
    sendError(callback, new Error(ERROR_MESSAGES.countrycode));
  } else if (!msisdn) {
    sendError(callback, new Error(ERROR_MESSAGES.msisdn));
  } else {
    var cancelEndpoint = getEndpoint("/number/cancel");
    cancelEndpoint.path += "?country=" + countryCode + "&msisdn=" + msisdn;
    sendRequest(cancelEndpoint, "POST", callback);
  }
};

exports.updateNumber = function (countryCode, msisdn, params, callback) {
  if (!countryCode || countryCode.length !== 2) {
    sendError(callback, new Error(ERROR_MESSAGES.countrycode));
  } else if (!msisdn) {
    sendError(callback, new Error(ERROR_MESSAGES.msisdn));
  } else {
    var updateEndpoint = getEndpoint("/number/update");
    updateEndpoint.path += "?country=" + countryCode + "&msisdn=" + msisdn;
    updateEndpoint.path = updateEndpoint.path + "&";
    for (var arg in params) {
      updateEndpoint.path = updateEndpoint.path + arg + "=" + encodeURIComponent(params[arg]) + "&";
    }
    sendRequest(updateEndpoint, "POST", callback);
  }
};

exports.getApplications = function (options, callback) {
  var endpoint = getEndpoint(applicationsEndpoint.path);
  endpoint.host = applicationsEndpoint.host;
  if (typeof options === "function") {
    callback = options;
  } else if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
    endpoint.path += "?";
    for (var key in options) {
      endpoint.path += key + "=" + options[key] + "&";
    }
  } else {
    sendError(callback, new Error(ERROR_MESSAGES.optionsNotAnObject));
    return;
  }
  sendRequest(endpoint, callback);
};

exports.createApplication = function (name, type, answerUrl, eventUrl, options, callback) {
  if (!name || name.length < 1) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationName));
  } else if (!type) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationType));
  } else if (!answerUrl) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationAnswerUrl));
  } else if (!eventUrl) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationEventUrl));
  } else {
    var createEndpoint = getEndpoint(applicationsEndpoint.path);
    createEndpoint.host = applicationsEndpoint.host;
    createEndpoint.path += "?name=" + encodeURIComponent(name) + "&type=" + type + "&answer_url=" + answerUrl + "&event_url=" + eventUrl;
    for (var key in options) {
      createEndpoint.path += "&" + key + "=" + options[key];
    }
    sendRequest(createEndpoint, "POST", callback);
  }
};

exports.getApplication = function (appId, callback) {
  if (!appId || appId.length < 36) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationId));
  } else {
    var showEndpoint = getEndpoint(applicationsEndpoint.path + "/" + appId);
    showEndpoint.host = applicationsEndpoint.host;
    sendRequest(showEndpoint, callback);
  }
};

exports.updateApplication = function (appId, name, type, answerUrl, eventUrl, options, callback) {
  if (!appId || appId.length < 36) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationId));
  } else if (!name || name.length < 1) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationName));
  } else if (!type) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationType));
  } else if (!answerUrl) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationAnswerUrl));
  } else if (!eventUrl) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationEventUrl));
  } else {
    var updateEndpoint = getEndpoint(applicationsEndpoint.path + "/" + appId);
    updateEndpoint.path += "?name=" + encodeURIComponent(name) + "&type=" + type + "&answer_url=" + answerUrl + "&event_url=" + eventUrl;
    updateEndpoint.host = applicationsEndpoint.host;
    for (var key in options) {
      updateEndpoint.path = updateEndpoint.path + "&" + key + "=" + options[key];
    }
    sendRequest(updateEndpoint, "PUT", callback);
  }
};

exports.deleteApplication = function (appId, callback) {
  if (!appId || appId.length < 36) {
    sendError(callback, new Error(ERROR_MESSAGES.applicationId));
  } else {
    var deleteEndpoint = getEndpoint(applicationsEndpoint.path + "/" + appId);
    deleteEndpoint.host = applicationsEndpoint.host;
    sendRequest(deleteEndpoint, "DELETE", callback);
  }
};

exports.changePassword = function (newSecret, callback) {
  var settingsEndpoint = getEndpoint("/account/settings");
  settingsEndpoint.path += "?newSecret=" + encodeURIComponent(newSecret);
  sendRequest(settingsEndpoint, "POST", callback);
};

exports.changeMoCallbackUrl = function (newUrl, callback) {
  var settingsEndpoint = getEndpoint("/account/settings");
  settingsEndpoint.path += "?moCallBackUrl=" + encodeURIComponent(newUrl);
  sendRequest(settingsEndpoint, "POST", callback);
};

exports.changeDrCallbackUrl = function (newUrl, callback) {
  var settingsEndpoint = getEndpoint("/account/settings");
  settingsEndpoint.path += "?drCallBackUrl=" + encodeURIComponent(newUrl);
  sendRequest(settingsEndpoint, "POST", callback);
};

exports.verifyNumber = function (inputParams, callback) {
  if (!inputParams.number || !inputParams.brand) {
    sendError(callback, new Error(ERROR_MESSAGES.verifyValidation));
  } else {
    var vEndpoint = clone(verifyEndpoint);
    vEndpoint.path += "?" + querystring.stringify(inputParams);
    sendRequest(vEndpoint, callback);
  }
};

exports.checkVerifyRequest = function (inputParams, callback) {
  if (!inputParams.request_id || !inputParams.code) {
    sendError(callback, new Error(ERROR_MESSAGES.checkVerifyValidation));
  } else {
    var vEndpoint = clone(checkVerifyEndpoint);
    vEndpoint.path += "?" + querystring.stringify(inputParams);
    sendRequest(vEndpoint, callback);
  }
};

exports.controlVerifyRequest = function (inputParams, callback) {
  if (!inputParams.request_id || !inputParams.cmd) {
    sendError(callback, new Error(ERROR_MESSAGES.controlVerifyValidation));
  } else {
    var vEndpoint = clone(controlVerifyEndpoint);
    vEndpoint.path += "?" + querystring.stringify(inputParams);
    sendRequest(vEndpoint, callback);
  }
};

exports.searchVerifyRequest = function (requestIds, callback) {
  var requestIdParam = {};
  if (!requestIds) {
    sendError(callback, new Error(ERROR_MESSAGES.searchVerifyValidation));
  } else {
    if (Array.isArray(requestIds)) {
      if (requestIds.length === 1) {
        requestIdParam.request_id = requestIds;
      } else {
        requestIdParam.request_ids = requestIds;
      }
    } else {
      requestIdParam.request_id = requestIds;
    }
    var vEndpoint = clone(searchVerifyEndpoint);
    vEndpoint.path += "?" + querystring.stringify(requestIdParam);
    sendRequest(vEndpoint, callback);
  }
};

exports.numberInsight = function (inputParams, callback) {
  numberInsightAsync(inputParams, callback);
};

exports.numberInsightBasic = function (inputParams, callback) {
  numberInsightCommon(niBasicEndpoint, inputParams, callback);
};

exports.numberInsightStandard = function (inputParams, callback) {
  numberInsightCommon(niStandardEndpoint, inputParams, callback);
};

exports.numberInsightAdvanced = function (inputParams, callback) {
  numberInsightCommon(niAdvancedEndpoint, inputParams, callback);
};

exports.numberInsightAdvancedAsync = function (inputParams, callback) {
  numberInsightAsync(inputParams, callback);
};

function numberInsightAsync(inputParams, callback) {
  if (!inputParams.number || !inputParams.callback) {
    sendError(callback, new Error(ERROR_MESSAGES.numberInsightAdvancedValidation));
  } else {
    var nEndpoint = clone(niEndpoint);
    nEndpoint.path += "?" + querystring.stringify(inputParams);
    sendRequest(nEndpoint, callback);
  }
}

function numberInsightCommon(endpoint, inputParams, callback) {
  if (validateNumber(inputParams, callback)) {
    var inputObj;
    if ((typeof inputParams === "undefined" ? "undefined" : _typeof(inputParams)) !== "object") {
      inputObj = { number: inputParams };
    } else {
      inputObj = inputParams;
    }
    var nEndpoint = clone(endpoint);
    nEndpoint.path += "?" + querystring.stringify(inputObj);
    sendRequest(nEndpoint, callback);
  }
}
function validateNumber(inputParams, callback) {
  if ((typeof inputParams === "undefined" ? "undefined" : _typeof(inputParams)) === "object" && !inputParams.number) {
    sendError(callback, new Error(ERROR_MESSAGES.numberInsightValidation));
    return false;
  } else if ((typeof inputParams === "undefined" ? "undefined" : _typeof(inputParams)) === "object" && !numberPattern.test(inputParams.number)) {
    sendError(callback, new Error(ERROR_MESSAGES.numberInsightPatternFailure));
    return false;
  } else if ((typeof inputParams === "undefined" ? "undefined" : _typeof(inputParams)) !== "object" && (!inputParams || !numberPattern.test(inputParams))) {
    sendError(callback, new Error(ERROR_MESSAGES.numberInsightPatternFailure));
    return false;
  }
  return true;
}

function sendVoiceMessage(voiceEndpoint, data, callback) {
  if (!data.to) {
    sendError(callback, new Error(ERROR_MESSAGES.to));
  } else {
    var endpoint = clone(voiceEndpoint);
    endpoint.path += "?" + querystring.stringify(data);
    _options.logger.info("sending TTS message to " + data.to + " with message " + data.text);
    sendRequest(endpoint, "POST", function (err, apiResponse) {
      if (!err && apiResponse.status && apiResponse.status > 0) {
        sendError(callback, new Error(apiResponse["error-text"]), apiResponse);
      } else {
        if (callback) callback(err, apiResponse);
      }
    });
  }
}

exports.sendTTSMessage = function (recipient, message, opts, callback) {
  if (!message) {
    sendError(callback, new Error(ERROR_MESSAGES.msg));
  } else {
    if (!opts) {
      opts = {};
    }
    opts["to"] = recipient;
    opts["text"] = message;
    sendVoiceMessage(ttsEndpoint, opts, callback);
  }
};

exports.sendTTSPromptWithCapture = function (recipient, message, maxDigits, byeText, opts, callback) {
  if (!message) {
    sendError(callback, new Error(ERROR_MESSAGES.msg));
  } else if (!maxDigits || isNaN(maxDigits) || maxDigits.length > 16) {
    sendError(callback, new Error(ERROR_MESSAGES.maxDigits));
  } else if (!byeText) {
    sendError(callback, new Error(ERROR_MESSAGES.byeText));
  } else {
    if (!opts) {
      opts = {};
    }
    opts["to"] = recipient;
    opts["text"] = message;
    opts["max_digits"] = maxDigits;
    opts["bye_text"] = byeText;
    sendVoiceMessage(ttsPromptEndpoint, opts, callback);
  }
};

exports.sendTTSPromptWithConfirm = function (recipient, message, maxDigits, pinCode, byeText, failedText, opts, callback) {
  if (!message) {
    sendError(callback, new Error(ERROR_MESSAGES.msg));
  } else if (!maxDigits || isNaN(maxDigits) || maxDigits.length > 16) {
    sendError(callback, new Error(ERROR_MESSAGES.maxDigits));
  } else if (!pinCode || pinCode.length !== maxDigits) {
    sendError(callback, new Error(ERROR_MESSAGES.pinCode));
  } else if (!byeText) {
    sendError(callback, new Error(ERROR_MESSAGES.byeText));
  } else if (!failedText) {
    sendError(callback, new Error(ERROR_MESSAGES.failedText));
  } else {
    if (!opts) {
      opts = {};
    }
    opts["to"] = recipient;
    opts["text"] = message;
    opts["max_digits"] = maxDigits;
    opts["pin_code"] = pinCode;
    opts["bye_text"] = byeText;
    opts["failed_text"] = failedText;
    sendVoiceMessage(ttsPromptEndpoint, opts, callback);
  }
};

exports.call = function (recipient, answerUrl, opts, callback) {
  if (!answerUrl) {
    sendError(callback, new Error(ERROR_MESSAGES.answerUrl));
  } else {
    if (!opts) {
      opts = {};
    }
    opts["to"] = recipient;
    opts["answer_url"] = answerUrl;
    sendVoiceMessage(callEndpoint, opts, callback);
  }
};

function sendError(callback, err, returnData) {
  // Throw the error in case if there is no callback passed
  if (callback) {
    callback(err, returnData);
  } else {
    throw err;
  }
}

exports.setHost = function (aHost) {
  msgpath.host = aHost;
  shortcodePath.host = aHost;
  ttsEndpoint.host = aHost;
  ttsPromptEndpoint.host = aHost;
  callEndpoint.host = aHost;
  verifyEndpoint.host = aHost;
  checkVerifyEndpoint.host = aHost;
  controlVerifyEndpoint.host = aHost;
  searchVerifyEndpoint.host = aHost;
  niEndpoint.host = aHost;
  niBasicEndpoint.host = aHost;
  niStandardEndpoint.host = aHost;
  applicationsEndpoint.host = aHost;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJxdWVyeXN0cmluZyIsInJlcXVpcmUiLCJtc2dwYXRoIiwiaG9zdCIsInBhdGgiLCJzaG9ydGNvZGVQYXRoIiwidHRzRW5kcG9pbnQiLCJ0dHNQcm9tcHRFbmRwb2ludCIsImNhbGxFbmRwb2ludCIsInZlcmlmeUVuZHBvaW50IiwiY2hlY2tWZXJpZnlFbmRwb2ludCIsImNvbnRyb2xWZXJpZnlFbmRwb2ludCIsInNlYXJjaFZlcmlmeUVuZHBvaW50IiwibmlFbmRwb2ludCIsIm5pQmFzaWNFbmRwb2ludCIsIm5pU3RhbmRhcmRFbmRwb2ludCIsIm5pQWR2YW5jZWRFbmRwb2ludCIsImFwcGxpY2F0aW9uc0VuZHBvaW50IiwidXAiLCJudW1iZXJQYXR0ZXJuIiwiUmVnRXhwIiwiX29wdGlvbnMiLCJFUlJPUl9NRVNTQUdFUyIsInNlbmRlciIsInRvIiwibXNnIiwibXNnUGFyYW1zIiwiY291bnRyeWNvZGUiLCJtc2lzZG4iLCJib2R5IiwidWRoIiwidGl0bGUiLCJ1cmwiLCJtYXhEaWdpdHMiLCJieWVUZXh0IiwicGluQ29kZSIsImZhaWxlZFRleHQiLCJhbnN3ZXJVcmwiLCJ2ZXJpZnlWYWxpZGF0aW9uIiwiY2hlY2tWZXJpZnlWYWxpZGF0aW9uIiwiY29udHJvbFZlcmlmeVZhbGlkYXRpb24iLCJzZWFyY2hWZXJpZnlWYWxpZGF0aW9uIiwibnVtYmVySW5zaWdodEFkdmFuY2VkVmFsaWRhdGlvbiIsIm51bWJlckluc2lnaHRWYWxpZGF0aW9uIiwibnVtYmVySW5zaWdodFBhdHRlcm5GYWlsdXJlIiwib3B0aW9uc05vdEFuT2JqZWN0IiwiYXBwbGljYXRpb25OYW1lIiwiYXBwbGljYXRpb25UeXBlIiwiYXBwbGljYXRpb25BbnN3ZXJVcmwiLCJhcHBsaWNhdGlvbkV2ZW50VXJsIiwiYXBwbGljYXRpb25JZCIsInByb2R1Y3QiLCJleHBvcnRzIiwiaW5pdGlhbGl6ZSIsInBrZXkiLCJwc2VjcmV0Iiwib3B0aW9ucyIsImFwaV9rZXkiLCJhcGlfc2VjcmV0Iiwic2VuZEJpbmFyeU1lc3NhZ2UiLCJyZWNpcGllbnQiLCJjYWxsYmFjayIsInNlbmRFcnJvciIsIkVycm9yIiwic2VuZE1lc3NhZ2UiLCJmcm9tIiwidHlwZSIsInNlbmRXYXBQdXNoTWVzc2FnZSIsInZhbGlkaXR5Iiwic2VuZFRleHRNZXNzYWdlIiwibWVzc2FnZSIsIm9wdHMiLCJkYXRhIiwiY2xvbmUiLCJzdHJpbmdpZnkiLCJsb2dnZXIiLCJpbmZvIiwidGV4dCIsInNlbmRSZXF1ZXN0IiwiZXJyIiwiYXBpUmVzcG9uc2UiLCJzdGF0dXMiLCJtZXNzYWdlcyIsInNlbmRWaWFTaG9ydGNvZGUiLCJtZXNzYWdlUGFyYW1zIiwiT2JqZWN0Iiwia2V5cyIsInJlcGxhY2UiLCJmb3JFYWNoIiwia2V5IiwiSlNPTiIsInNob3J0Y29kZUFsZXJ0Iiwic2hvcnRjb2RlMkZBIiwic2hvcnRjb2RlTWFya2V0aW5nIiwiYSIsInBhcnNlIiwiZ2V0RW5kcG9pbnQiLCJhY3Rpb24iLCJlbmRwb2ludCIsIm1ldGhvZCIsImluZGV4T2YiLCJodHRwQ2xpZW50IiwicmVxdWVzdCIsImNoZWNrQmFsYW5jZSIsImJhbGFuY2VFbmRwb2ludCIsImdldFByaWNpbmciLCJjb3VudHJ5Q29kZSIsImxlbmd0aCIsInByaWNpbmdFbmRwb2ludCIsImdldFBob25lUHJpY2luZyIsImdldE51bWJlcnMiLCJudW1iZXJzRW5kcG9pbnQiLCJzZWFyY2hOdW1iZXJzIiwicGF0dGVybiIsInNlYXJjaEVuZHBvaW50IiwiYXJnIiwiYnV5TnVtYmVyIiwiYnV5RW5kcG9pbnQiLCJjYW5jZWxOdW1iZXIiLCJjYW5jZWxFbmRwb2ludCIsInVwZGF0ZU51bWJlciIsInBhcmFtcyIsInVwZGF0ZUVuZHBvaW50IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZ2V0QXBwbGljYXRpb25zIiwiY3JlYXRlQXBwbGljYXRpb24iLCJuYW1lIiwiZXZlbnRVcmwiLCJjcmVhdGVFbmRwb2ludCIsImdldEFwcGxpY2F0aW9uIiwiYXBwSWQiLCJzaG93RW5kcG9pbnQiLCJ1cGRhdGVBcHBsaWNhdGlvbiIsImRlbGV0ZUFwcGxpY2F0aW9uIiwiZGVsZXRlRW5kcG9pbnQiLCJjaGFuZ2VQYXNzd29yZCIsIm5ld1NlY3JldCIsInNldHRpbmdzRW5kcG9pbnQiLCJjaGFuZ2VNb0NhbGxiYWNrVXJsIiwibmV3VXJsIiwiY2hhbmdlRHJDYWxsYmFja1VybCIsInZlcmlmeU51bWJlciIsImlucHV0UGFyYW1zIiwibnVtYmVyIiwiYnJhbmQiLCJ2RW5kcG9pbnQiLCJjaGVja1ZlcmlmeVJlcXVlc3QiLCJyZXF1ZXN0X2lkIiwiY29kZSIsImNvbnRyb2xWZXJpZnlSZXF1ZXN0IiwiY21kIiwic2VhcmNoVmVyaWZ5UmVxdWVzdCIsInJlcXVlc3RJZHMiLCJyZXF1ZXN0SWRQYXJhbSIsIkFycmF5IiwiaXNBcnJheSIsInJlcXVlc3RfaWRzIiwibnVtYmVySW5zaWdodCIsIm51bWJlckluc2lnaHRBc3luYyIsIm51bWJlckluc2lnaHRCYXNpYyIsIm51bWJlckluc2lnaHRDb21tb24iLCJudW1iZXJJbnNpZ2h0U3RhbmRhcmQiLCJudW1iZXJJbnNpZ2h0QWR2YW5jZWQiLCJudW1iZXJJbnNpZ2h0QWR2YW5jZWRBc3luYyIsIm5FbmRwb2ludCIsInZhbGlkYXRlTnVtYmVyIiwiaW5wdXRPYmoiLCJ0ZXN0Iiwic2VuZFZvaWNlTWVzc2FnZSIsInZvaWNlRW5kcG9pbnQiLCJzZW5kVFRTTWVzc2FnZSIsInNlbmRUVFNQcm9tcHRXaXRoQ2FwdHVyZSIsImlzTmFOIiwic2VuZFRUU1Byb21wdFdpdGhDb25maXJtIiwiY2FsbCIsInJldHVybkRhdGEiLCJzZXRIb3N0IiwiYUhvc3QiXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUEsSUFBSUEsY0FBY0MsUUFBUSxhQUFSLENBQWxCOztBQUVBLElBQUlDLFVBQVUsRUFBRUMsTUFBTSxnQkFBUixFQUEwQkMsTUFBTSxXQUFoQyxFQUFkO0FBQ0EsSUFBSUMsZ0JBQWdCLEVBQUVGLE1BQU0s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ZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgcXVlcnlzdHJpbmcgPSByZXF1aXJlKFwicXVlcnlzdHJpbmdcIik7XG5cbnZhciBtc2dwYXRoID0geyBob3N0OiBcInJlc3QubmV4bW8uY29tXCIsIHBhdGg6IFwiL3Ntcy9qc29uXCIgfTtcbnZhciBzaG9ydGNvZGVQYXRoID0geyBob3N0OiBcInJlc3QubmV4bW8uY29tXCIsIHBhdGg6IFwiL3NjL3VzLyR7dHlwZX0vanNvblwiIH07XG52YXIgdHRzRW5kcG9pbnQgPSB7IGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLCBwYXRoOiBcIi90dHMvanNvblwiIH07XG52YXIgdHRzUHJvbXB0RW5kcG9pbnQgPSB7IGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLCBwYXRoOiBcIi90dHMtcHJvbXB0L2pzb25cIiB9O1xudmFyIGNhbGxFbmRwb2ludCA9IHsgaG9zdDogXCJyZXN0Lm5leG1vLmNvbVwiLCBwYXRoOiBcIi9jYWxsL2pzb25cIiB9O1xudmFyIHZlcmlmeUVuZHBvaW50ID0geyBob3N0OiBcImFwaS5uZXhtby5jb21cIiwgcGF0aDogXCIvdmVyaWZ5L2pzb25cIiB9O1xudmFyIGNoZWNrVmVyaWZ5RW5kcG9pbnQgPSB7IGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLCBwYXRoOiBcIi92ZXJpZnkvY2hlY2svanNvblwiIH07XG52YXIgY29udHJvbFZlcmlmeUVuZHBvaW50ID0ge1xuICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgcGF0aDogXCIvdmVyaWZ5L2NvbnRyb2wvanNvblwiXG59O1xudmFyIHNlYXJjaFZlcmlmeUVuZHBvaW50ID0ge1xuICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgcGF0aDogXCIvdmVyaWZ5L3NlYXJjaC9qc29uXCJcbn07XG52YXIgbmlFbmRwb2ludCA9IHsgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsIHBhdGg6IFwiL25pL2FkdmFuY2VkL2FzeW5jL2pzb25cIiB9O1xudmFyIG5pQmFzaWNFbmRwb2ludCA9IHsgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsIHBhdGg6IFwiL25pL2Jhc2ljL2pzb25cIiB9O1xudmFyIG5pU3RhbmRhcmRFbmRwb2ludCA9IHsgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsIHBhdGg6IFwiL25pL3N0YW5kYXJkL2pzb25cIiB9O1xudmFyIG5pQWR2YW5jZWRFbmRwb2ludCA9IHsgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsIHBhdGg6IFwiL25pL2FkdmFuY2VkL2pzb25cIiB9O1xudmFyIGFwcGxpY2F0aW9uc0VuZHBvaW50ID0geyBob3N0OiBcImFwaS5uZXhtby5jb21cIiwgcGF0aDogXCIvdjEvYXBwbGljYXRpb25zXCIgfTtcbnZhciB1cCA9IHt9O1xudmFyIG51bWJlclBhdHRlcm4gPSBuZXcgUmVnRXhwKFwiXlswLTkgKygpLV0qJFwiKTtcblxudmFyIF9vcHRpb25zID0gbnVsbDtcblxuLy8gRXJyb3IgbWVzc2FnZSByZXNvdXJjZXMgYXJlIG1haW50YWluZWQgZ2xvYmFsbHkgaW4gb25lIHBsYWNlIGZvciBlYXN5IG1hbmFnZW1lbnRcbnZhciBFUlJPUl9NRVNTQUdFUyA9IHtcbiAgc2VuZGVyOiBcIkludmFsaWQgZnJvbSBhZGRyZXNzXCIsXG4gIHRvOiBcIkludmFsaWQgdG8gYWRkcmVzc1wiLFxuICBtc2c6IFwiSW52YWxpZCBUZXh0IE1lc3NhZ2VcIixcbiAgbXNnUGFyYW1zOiBcIkludmFsaWQgc2hvcnRjb2RlIG1lc3NhZ2UgcGFyYW1ldGVyc1wiLFxuICBjb3VudHJ5Y29kZTogXCJJbnZhbGlkIENvdW50cnkgQ29kZVwiLFxuICBtc2lzZG46IFwiSW52YWxpZCBNU0lTRE4gcGFzc2VkXCIsXG4gIGJvZHk6IFwiSW52YWxpZCBCb2R5IHZhbHVlIGluIEJpbmFyeSBNZXNzYWdlXCIsXG4gIHVkaDogXCJJbnZhbGlkIHVkaCB2YWx1ZSBpbiBCaW5hcnkgTWVzc2FnZVwiLFxuICB0aXRsZTogXCJJbnZhbGlkIHRpdGxlIGluIFdBUCBQdXNoIG1lc3NhZ2VcIixcbiAgdXJsOiBcIkludmFsaWQgdXJsIGluIFdBUCBQdXNoIG1lc3NhZ2VcIixcbiAgbWF4RGlnaXRzOiBcIkludmFsaWQgbWF4IGRpZ2l0cyBmb3IgVFRTIHByb21wdFwiLFxuICBieWVUZXh0OiBcIkludmFsaWQgYnllIHRleHQgZm9yIFRUUyBwcm9tcHRcIixcbiAgcGluQ29kZTogXCJJbnZhbGlkIHBpbiBjb2RlIGZvciBUVFMgY29uZmlybVwiLFxuICBmYWlsZWRUZXh0OiBcIkludmFsaWQgZmFpbGVkIHRleHQgZm9yIFRUUyBjb25maXJtXCIsXG4gIGFuc3dlclVybDogXCJJbnZhbGlkIGFuc3dlciBVUkwgZm9yIGNhbGxcIixcbiAgdmVyaWZ5VmFsaWRhdGlvbjogXCJNaXNzaW5nIE1hbmRhdG9yeSBmaWVsZHMgKG51bWJlciBhbmQvb3IgYnJhbmQpXCIsXG4gIGNoZWNrVmVyaWZ5VmFsaWRhdGlvbjogXCJNaXNzaW5nIE1hbmRhdG9yeSBmaWVsZHMgKHJlcXVlc3RfaWQgYW5kL29yIGNvZGUpXCIsXG4gIGNvbnRyb2xWZXJpZnlWYWxpZGF0aW9uOlxuICAgIFwiTWlzc2luZyBNYW5kYXRvcnkgZmllbGRzIChyZXF1ZXN0X2lkIGFuZC9vciBjbWQtY29tbWFuZClcIixcbiAgc2VhcmNoVmVyaWZ5VmFsaWRhdGlvbjpcbiAgICBcIk1pc3NpbmcgTWFuZGF0b3J5IGZpZWxkcyAocmVxdWVzdF9pZCBvciByZXF1ZXN0X2lkcylcIixcbiAgbnVtYmVySW5zaWdodEFkdmFuY2VkVmFsaWRhdGlvbjpcbiAgICBcIk1pc3NpbmcgTWFuZGF0b3J5IGZpZWxkcyAobnVtYmVyIGFuZC9vciBjYWxsYmFjayB1cmwpXCIsXG4gIG51bWJlckluc2lnaHRWYWxpZGF0aW9uOiBcIk1pc3NpbmcgTWFuZGF0b3J5IGZpZWxkIC0gbnVtYmVyXCIsXG4gIG51bWJlckluc2lnaHRQYXR0ZXJuRmFpbHVyZTpcbiAgICBcIk51bWJlciBjYW4gY29udGFpbiBkaWdpdHMgYW5kIG1heSBpbmNsdWRlIGFueSBvciBhbGwgb2YgdGhlIGZvbGxvd2luZzogd2hpdGUgc3BhY2UsIC0sKywgKCwgKS5cIixcbiAgb3B0aW9uc05vdEFuT2JqZWN0OlxuICAgIFwiT3B0aW9ucyBwYXJhbWV0ZXIgc2hvdWxkIGJlIGEgZGljdGlvbmFyeS4gQ2hlY2sgdGhlIGRvY3MgZm9yIHZhbGlkIHByb3BlcnRpZXMgZm9yIG9wdGlvbnNcIixcbiAgYXBwbGljYXRpb25OYW1lOiBcIkludmFsaWQgYXJndW1lbnQ6IG5hbWVcIixcbiAgYXBwbGljYXRpb25UeXBlOiBcIkludmFsaWQgYXJndW1lbnQ6IHR5cGVcIixcbiAgYXBwbGljYXRpb25BbnN3ZXJVcmw6IFwiSW52YWxpZCBhcmd1bWVudDogYW5zd2VyVXJsXCIsXG4gIGFwcGxpY2F0aW9uRXZlbnRVcmw6IFwiSW52YWxpZCBhcmd1bWVudDogZXZlbnRVcmxcIixcbiAgYXBwbGljYXRpb25JZDogXCJJbnZhbGlkIGFyZ3VtZW50OiBhcHBJZFwiLFxuICBwcm9kdWN0OiBcIkludmFsaWQgcHJvZHVjdC4gU2hvdWxkIGJlIG9uZSBvZiBbdm9pY2UsIHNtc11cIlxufTtcblxuZXhwb3J0cy5pbml0aWFsaXplID0gZnVuY3Rpb24ocGtleSwgcHNlY3JldCwgb3B0aW9ucykge1xuICBpZiAoIXBrZXkgfHwgIXBzZWNyZXQpIHtcbiAgICB0aHJvdyBcImtleSBhbmQgc2VjcmV0IGNhbm5vdCBiZSBlbXB0eSwgc2V0IHZhbGlkIHZhbHVlc1wiO1xuICB9XG4gIHVwID0ge1xuICAgIGFwaV9rZXk6IHBrZXksXG4gICAgYXBpX3NlY3JldDogcHNlY3JldFxuICB9O1xuICBfb3B0aW9ucyA9IG9wdGlvbnM7XG59O1xuXG5leHBvcnRzLnNlbmRCaW5hcnlNZXNzYWdlID0gZnVuY3Rpb24oc2VuZGVyLCByZWNpcGllbnQsIGJvZHksIHVkaCwgY2FsbGJhY2spIHtcbiAgaWYgKCFib2R5KSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuYm9keSkpO1xuICB9IGVsc2UgaWYgKCF1ZGgpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy51ZGgpKTtcbiAgfSBlbHNlIHtcbiAgICBzZW5kTWVzc2FnZShcbiAgICAgIHtcbiAgICAgICAgZnJvbTogc2VuZGVyLFxuICAgICAgICB0bzogcmVjaXBpZW50LFxuICAgICAgICB0eXBlOiBcImJpbmFyeVwiLFxuICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICB1ZGg6IHVkaFxuICAgICAgfSxcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0cy5zZW5kV2FwUHVzaE1lc3NhZ2UgPSBmdW5jdGlvbihcbiAgc2VuZGVyLFxuICByZWNpcGllbnQsXG4gIHRpdGxlLFxuICB1cmwsXG4gIHZhbGlkaXR5LFxuICBjYWxsYmFja1xuKSB7XG4gIGlmICghdGl0bGUpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy50aXRsZSkpO1xuICB9IGVsc2UgaWYgKCF1cmwpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy51cmwpKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHZhbGlkaXR5ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNhbGxiYWNrID0gdmFsaWRpdHk7XG4gICAgICB2YWxpZGl0eSA9IDg2NDAwMDAwO1xuICAgIH1cbiAgICBzZW5kTWVzc2FnZShcbiAgICAgIHtcbiAgICAgICAgZnJvbTogc2VuZGVyLFxuICAgICAgICB0bzogcmVjaXBpZW50LFxuICAgICAgICB0eXBlOiBcIndhcHB1c2hcIixcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICB2YWxpZGl0eTogdmFsaWRpdHksXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9LFxuICAgICAgY2FsbGJhY2tcbiAgICApO1xuICB9XG59O1xuXG5leHBvcnRzLnNlbmRUZXh0TWVzc2FnZSA9IGZ1bmN0aW9uKHNlbmRlciwgcmVjaXBpZW50LCBtZXNzYWdlLCBvcHRzLCBjYWxsYmFjaykge1xuICBpZiAoIW1lc3NhZ2UpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5tc2cpKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgICBvcHRzID0ge307XG4gICAgfVxuICAgIG9wdHNbXCJmcm9tXCJdID0gc2VuZGVyO1xuICAgIG9wdHNbXCJ0b1wiXSA9IHJlY2lwaWVudDtcbiAgICBvcHRzW1widGV4dFwiXSA9IG1lc3NhZ2U7XG4gICAgc2VuZE1lc3NhZ2Uob3B0cywgY2FsbGJhY2spO1xuICB9XG59O1xuXG5leHBvcnRzLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24ob3B0cywgY2FsbGJhY2spIHtcbiAgc2VuZE1lc3NhZ2Uob3B0cywgY2FsbGJhY2spO1xufTtcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGlmICghZGF0YS5mcm9tKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuc2VuZGVyKSk7XG4gIH0gZWxzZSBpZiAoIWRhdGEudG8pIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy50bykpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXRoID0gY2xvbmUobXNncGF0aCk7XG4gICAgcGF0aC5wYXRoICs9IFwiP1wiICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KGRhdGEpO1xuICAgIF9vcHRpb25zLmxvZ2dlci5pbmZvKFxuICAgICAgXCJzZW5kaW5nIG1lc3NhZ2UgZnJvbSBcIiArXG4gICAgICAgIGRhdGEuZnJvbSArXG4gICAgICAgIFwiIHRvIFwiICtcbiAgICAgICAgZGF0YS50byArXG4gICAgICAgIFwiIHdpdGggbWVzc2FnZSBcIiArXG4gICAgICAgIGRhdGEudGV4dFxuICAgICk7XG4gICAgc2VuZFJlcXVlc3QocGF0aCwgXCJQT1NUXCIsIGZ1bmN0aW9uKGVyciwgYXBpUmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyICYmIGFwaVJlc3BvbnNlLnN0YXR1cyAmJiBhcGlSZXNwb25zZS5tZXNzYWdlc1swXS5zdGF0dXMgPiAwKSB7XG4gICAgICAgIHNlbmRFcnJvcihcbiAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICBuZXcgRXJyb3IoYXBpUmVzcG9uc2UubWVzc2FnZXNbMF1bXCJlcnJvci10ZXh0XCJdKSxcbiAgICAgICAgICBhcGlSZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhlcnIsIGFwaVJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZW5kVmlhU2hvcnRjb2RlKHR5cGUsIHJlY2lwaWVudCwgbWVzc2FnZVBhcmFtcywgb3B0cywgY2FsbGJhY2spIHtcbiAgaWYgKCFyZWNpcGllbnQpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy50bykpO1xuICB9XG4gIGlmICghbWVzc2FnZVBhcmFtcyB8fCAhT2JqZWN0LmtleXMobWVzc2FnZVBhcmFtcykpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5tc2dQYXJhbXMpKTtcbiAgfVxuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgdmFyIHBhdGggPSBjbG9uZShzaG9ydGNvZGVQYXRoKTtcbiAgcGF0aC5wYXRoID0gcGF0aC5wYXRoLnJlcGxhY2UoXCIke3R5cGV9XCIsIHR5cGUpO1xuICBPYmplY3Qua2V5cyhtZXNzYWdlUGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIG9wdHNba2V5XSA9IG1lc3NhZ2VQYXJhbXNba2V5XTtcbiAgfSk7XG4gIG9wdHMudG8gPSByZWNpcGllbnQ7XG4gIHBhdGgucGF0aCArPSBcIj9cIiArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShvcHRzKTtcbiAgX29wdGlvbnMubG9nZ2VyLmluZm8oXG4gICAgXCJzZW5kaW5nIG1lc3NhZ2UgZnJvbSBzaG9ydGNvZGUgXCIgK1xuICAgICAgdHlwZSArXG4gICAgICBcIiB0byBcIiArXG4gICAgICByZWNpcGllbnQgK1xuICAgICAgXCIgd2l0aCBwYXJhbWV0ZXJzIFwiICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VQYXJhbXMpXG4gICk7XG4gIHNlbmRSZXF1ZXN0KHBhdGgsIFwiUE9TVFwiLCBmdW5jdGlvbihlcnIsIGFwaVJlc3BvbnNlKSB7XG4gICAgaWYgKCFlcnIgJiYgYXBpUmVzcG9uc2Uuc3RhdHVzICYmIGFwaVJlc3BvbnNlLm1lc3NhZ2VzWzBdLnN0YXR1cyA+IDApIHtcbiAgICAgIHNlbmRFcnJvcihcbiAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgIG5ldyBFcnJvcihhcGlSZXNwb25zZS5tZXNzYWdlc1swXVtcImVycm9yLXRleHRcIl0pLFxuICAgICAgICBhcGlSZXNwb25zZVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhlcnIsIGFwaVJlc3BvbnNlKTtcbiAgICB9XG4gIH0pO1xufVxuZXhwb3J0cy5zaG9ydGNvZGVBbGVydCA9IGZ1bmN0aW9uKHJlY2lwaWVudCwgbWVzc2FnZVBhcmFtcywgb3B0cywgY2FsbGJhY2spIHtcbiAgc2VuZFZpYVNob3J0Y29kZShcImFsZXJ0XCIsIHJlY2lwaWVudCwgbWVzc2FnZVBhcmFtcywgb3B0cywgY2FsbGJhY2spO1xufTtcbmV4cG9ydHMuc2hvcnRjb2RlMkZBID0gZnVuY3Rpb24ocmVjaXBpZW50LCBtZXNzYWdlUGFyYW1zLCBvcHRzLCBjYWxsYmFjaykge1xuICBzZW5kVmlhU2hvcnRjb2RlKFwiMmZhXCIsIHJlY2lwaWVudCwgbWVzc2FnZVBhcmFtcywgb3B0cywgY2FsbGJhY2spO1xufTtcbmV4cG9ydHMuc2hvcnRjb2RlTWFya2V0aW5nID0gZnVuY3Rpb24oXG4gIHJlY2lwaWVudCxcbiAgbWVzc2FnZVBhcmFtcyxcbiAgb3B0cyxcbiAgY2FsbGJhY2tcbikge1xuICBzZW5kVmlhU2hvcnRjb2RlKFwibWFya2V0aW5nXCIsIHJlY2lwaWVudCwgbWVzc2FnZVBhcmFtcywgb3B0cywgY2FsbGJhY2spO1xufTtcblxuZnVuY3Rpb24gY2xvbmUoYSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhKSk7XG59XG5cbmZ1bmN0aW9uIGdldEVuZHBvaW50KGFjdGlvbikge1xuICByZXR1cm4geyBwYXRoOiBhY3Rpb24gfTtcbn1cblxuZnVuY3Rpb24gc2VuZFJlcXVlc3QoZW5kcG9pbnQsIG1ldGhvZCwgY2FsbGJhY2spIHtcbiAgZW5kcG9pbnQucGF0aCA9XG4gICAgZW5kcG9pbnQucGF0aCArXG4gICAgKGVuZHBvaW50LnBhdGguaW5kZXhPZihcIj9cIikgPiAwID8gXCImXCIgOiBcIj9cIikgK1xuICAgIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh1cCk7XG4gIF9vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChlbmRwb2ludCwgbWV0aG9kLCBjYWxsYmFjayk7XG59XG5cbmV4cG9ydHMuY2hlY2tCYWxhbmNlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIGJhbGFuY2VFbmRwb2ludCA9IGdldEVuZHBvaW50KFwiL2FjY291bnQvZ2V0LWJhbGFuY2VcIik7XG4gIHNlbmRSZXF1ZXN0KGJhbGFuY2VFbmRwb2ludCwgY2FsbGJhY2spO1xufTtcblxuZXhwb3J0cy5nZXRQcmljaW5nID0gZnVuY3Rpb24oY291bnRyeUNvZGUsIGNhbGxiYWNrKSB7XG4gIGlmICghY291bnRyeUNvZGUgfHwgY291bnRyeUNvZGUubGVuZ3RoICE9PSAyKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuY291bnRyeWNvZGUpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcHJpY2luZ0VuZHBvaW50ID0gZ2V0RW5kcG9pbnQoXCIvYWNjb3VudC9nZXQtcHJpY2luZy9vdXRib3VuZFwiKTtcbiAgICBwcmljaW5nRW5kcG9pbnQucGF0aCArPSBcIj9jb3VudHJ5PVwiICsgY291bnRyeUNvZGU7XG4gICAgc2VuZFJlcXVlc3QocHJpY2luZ0VuZHBvaW50LCBjYWxsYmFjayk7XG4gIH1cbn07XG5cbmV4cG9ydHMuZ2V0UGhvbmVQcmljaW5nID0gZnVuY3Rpb24ocHJvZHVjdCwgbXNpc2RuLCBjYWxsYmFjaykge1xuICBpZiAoIXByb2R1Y3QgfHwgKHByb2R1Y3QgIT09IFwic21zXCIgJiYgcHJvZHVjdCAhPT0gXCJ2b2ljZVwiKSkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLnByb2R1Y3QpKTtcbiAgfSBlbHNlIGlmICghbXNpc2RuKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubXNpc2RuKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHByaWNpbmdFbmRwb2ludCA9IGdldEVuZHBvaW50KFwiL2FjY291bnQvZ2V0LXBob25lLXByaWNpbmcvb3V0Ym91bmRcIik7XG4gICAgcHJpY2luZ0VuZHBvaW50LnBhdGggKz1cbiAgICAgIFwiL1wiICsgcHJvZHVjdCArIFwiL1wiICsgdXAuYXBpX2tleSArIFwiL1wiICsgdXAuYXBpX3NlY3JldCArIFwiL1wiICsgbXNpc2RuO1xuICAgIHNlbmRSZXF1ZXN0KHByaWNpbmdFbmRwb2ludCwgY2FsbGJhY2spO1xuICB9XG59O1xuXG5leHBvcnRzLmdldE51bWJlcnMgPSBmdW5jdGlvbihvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIgbnVtYmVyc0VuZHBvaW50ID0gZ2V0RW5kcG9pbnQoXCIvYWNjb3VudC9udW1iZXJzXCIpO1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xuICAgIG51bWJlcnNFbmRwb2ludC5wYXRoID0gbnVtYmVyc0VuZHBvaW50LnBhdGggKyBcIj9cIjtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgbnVtYmVyc0VuZHBvaW50LnBhdGggPVxuICAgICAgICBudW1iZXJzRW5kcG9pbnQucGF0aCArIGtleSArIFwiPVwiICsgb3B0aW9uc1trZXldICsgXCImXCI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm9wdGlvbnNOb3RBbk9iamVjdCkpO1xuICAgIHJldHVybjtcbiAgfVxuICBzZW5kUmVxdWVzdChudW1iZXJzRW5kcG9pbnQsIGNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydHMuc2VhcmNoTnVtYmVycyA9IGZ1bmN0aW9uKGNvdW50cnlDb2RlLCBwYXR0ZXJuLCBjYWxsYmFjaykge1xuICBpZiAoIWNvdW50cnlDb2RlIHx8IGNvdW50cnlDb2RlLmxlbmd0aCAhPT0gMikge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmNvdW50cnljb2RlKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNlYXJjaEVuZHBvaW50ID0gZ2V0RW5kcG9pbnQoXCIvbnVtYmVyL3NlYXJjaFwiKTtcbiAgICBzZWFyY2hFbmRwb2ludC5wYXRoICs9IFwiP2NvdW50cnk9XCIgKyBjb3VudHJ5Q29kZTtcbiAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY2FsbGJhY2sgPSBwYXR0ZXJuO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhdHRlcm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHNlYXJjaEVuZHBvaW50LnBhdGggPSBzZWFyY2hFbmRwb2ludC5wYXRoICsgXCImXCI7XG4gICAgICBmb3IgKHZhciBhcmcgaW4gcGF0dGVybikge1xuICAgICAgICBzZWFyY2hFbmRwb2ludC5wYXRoID1cbiAgICAgICAgICBzZWFyY2hFbmRwb2ludC5wYXRoICsgYXJnICsgXCI9XCIgKyBwYXR0ZXJuW2FyZ10gKyBcIiZcIjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2VhcmNoRW5kcG9pbnQucGF0aCA9IHNlYXJjaEVuZHBvaW50LnBhdGggKyBcIiZwYXR0ZXJuPVwiICsgcGF0dGVybjtcbiAgICB9XG4gICAgc2VuZFJlcXVlc3Qoc2VhcmNoRW5kcG9pbnQsIGNhbGxiYWNrKTtcbiAgfVxufTtcblxuZXhwb3J0cy5idXlOdW1iZXIgPSBmdW5jdGlvbihjb3VudHJ5Q29kZSwgbXNpc2RuLCBjYWxsYmFjaykge1xuICBpZiAoIWNvdW50cnlDb2RlIHx8IGNvdW50cnlDb2RlLmxlbmd0aCAhPT0gMikge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmNvdW50cnljb2RlKSk7XG4gIH0gZWxzZSBpZiAoIW1zaXNkbikge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm1zaXNkbikpO1xuICB9IGVsc2Uge1xuICAgIHZhciBidXlFbmRwb2ludCA9IGdldEVuZHBvaW50KFwiL251bWJlci9idXlcIik7XG4gICAgYnV5RW5kcG9pbnQucGF0aCArPSBcIj9jb3VudHJ5PVwiICsgY291bnRyeUNvZGUgKyBcIiZtc2lzZG49XCIgKyBtc2lzZG47XG4gICAgc2VuZFJlcXVlc3QoYnV5RW5kcG9pbnQsIFwiUE9TVFwiLCBjYWxsYmFjayk7XG4gIH1cbn07XG5cbmV4cG9ydHMuY2FuY2VsTnVtYmVyID0gZnVuY3Rpb24oY291bnRyeUNvZGUsIG1zaXNkbiwgY2FsbGJhY2spIHtcbiAgaWYgKCFjb3VudHJ5Q29kZSB8fCBjb3VudHJ5Q29kZS5sZW5ndGggIT09IDIpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5jb3VudHJ5Y29kZSkpO1xuICB9IGVsc2UgaWYgKCFtc2lzZG4pIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5tc2lzZG4pKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY2FuY2VsRW5kcG9pbnQgPSBnZXRFbmRwb2ludChcIi9udW1iZXIvY2FuY2VsXCIpO1xuICAgIGNhbmNlbEVuZHBvaW50LnBhdGggKz0gXCI/Y291bnRyeT1cIiArIGNvdW50cnlDb2RlICsgXCImbXNpc2RuPVwiICsgbXNpc2RuO1xuICAgIHNlbmRSZXF1ZXN0KGNhbmNlbEVuZHBvaW50LCBcIlBPU1RcIiwgY2FsbGJhY2spO1xuICB9XG59O1xuXG5leHBvcnRzLmNhbmNlbE51bWJlciA9IGZ1bmN0aW9uKGNvdW50cnlDb2RlLCBtc2lzZG4sIGNhbGxiYWNrKSB7XG4gIGlmICghY291bnRyeUNvZGUgfHwgY291bnRyeUNvZGUubGVuZ3RoICE9PSAyKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuY291bnRyeWNvZGUpKTtcbiAgfSBlbHNlIGlmICghbXNpc2RuKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubXNpc2RuKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNhbmNlbEVuZHBvaW50ID0gZ2V0RW5kcG9pbnQoXCIvbnVtYmVyL2NhbmNlbFwiKTtcbiAgICBjYW5jZWxFbmRwb2ludC5wYXRoICs9IFwiP2NvdW50cnk9XCIgKyBjb3VudHJ5Q29kZSArIFwiJm1zaXNkbj1cIiArIG1zaXNkbjtcbiAgICBzZW5kUmVxdWVzdChjYW5jZWxFbmRwb2ludCwgXCJQT1NUXCIsIGNhbGxiYWNrKTtcbiAgfVxufTtcblxuZXhwb3J0cy51cGRhdGVOdW1iZXIgPSBmdW5jdGlvbihjb3VudHJ5Q29kZSwgbXNpc2RuLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGlmICghY291bnRyeUNvZGUgfHwgY291bnRyeUNvZGUubGVuZ3RoICE9PSAyKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuY291bnRyeWNvZGUpKTtcbiAgfSBlbHNlIGlmICghbXNpc2RuKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubXNpc2RuKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHVwZGF0ZUVuZHBvaW50ID0gZ2V0RW5kcG9pbnQoXCIvbnVtYmVyL3VwZGF0ZVwiKTtcbiAgICB1cGRhdGVFbmRwb2ludC5wYXRoICs9IFwiP2NvdW50cnk9XCIgKyBjb3VudHJ5Q29kZSArIFwiJm1zaXNkbj1cIiArIG1zaXNkbjtcbiAgICB1cGRhdGVFbmRwb2ludC5wYXRoID0gdXBkYXRlRW5kcG9pbnQucGF0aCArIFwiJlwiO1xuICAgIGZvciAodmFyIGFyZyBpbiBwYXJhbXMpIHtcbiAgICAgIHVwZGF0ZUVuZHBvaW50LnBhdGggPVxuICAgICAgICB1cGRhdGVFbmRwb2ludC5wYXRoICsgYXJnICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2FyZ10pICsgXCImXCI7XG4gICAgfVxuICAgIHNlbmRSZXF1ZXN0KHVwZGF0ZUVuZHBvaW50LCBcIlBPU1RcIiwgY2FsbGJhY2spO1xuICB9XG59O1xuXG5leHBvcnRzLmdldEFwcGxpY2F0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHZhciBlbmRwb2ludCA9IGdldEVuZHBvaW50KGFwcGxpY2F0aW9uc0VuZHBvaW50LnBhdGgpO1xuICBlbmRwb2ludC5ob3N0ID0gYXBwbGljYXRpb25zRW5kcG9pbnQuaG9zdDtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBlbmRwb2ludC5wYXRoICs9IFwiP1wiO1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKSB7XG4gICAgICBlbmRwb2ludC5wYXRoICs9IGtleSArIFwiPVwiICsgb3B0aW9uc1trZXldICsgXCImXCI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm9wdGlvbnNOb3RBbk9iamVjdCkpO1xuICAgIHJldHVybjtcbiAgfVxuICBzZW5kUmVxdWVzdChlbmRwb2ludCwgY2FsbGJhY2spO1xufTtcblxuZXhwb3J0cy5jcmVhdGVBcHBsaWNhdGlvbiA9IGZ1bmN0aW9uKFxuICBuYW1lLFxuICB0eXBlLFxuICBhbnN3ZXJVcmwsXG4gIGV2ZW50VXJsLFxuICBvcHRpb25zLFxuICBjYWxsYmFja1xuKSB7XG4gIGlmICghbmFtZSB8fCBuYW1lLmxlbmd0aCA8IDEpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5hcHBsaWNhdGlvbk5hbWUpKTtcbiAgfSBlbHNlIGlmICghdHlwZSkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFwcGxpY2F0aW9uVHlwZSkpO1xuICB9IGVsc2UgaWYgKCFhbnN3ZXJVcmwpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5hcHBsaWNhdGlvbkFuc3dlclVybCkpO1xuICB9IGVsc2UgaWYgKCFldmVudFVybCkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFwcGxpY2F0aW9uRXZlbnRVcmwpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3JlYXRlRW5kcG9pbnQgPSBnZXRFbmRwb2ludChhcHBsaWNhdGlvbnNFbmRwb2ludC5wYXRoKTtcbiAgICBjcmVhdGVFbmRwb2ludC5ob3N0ID0gYXBwbGljYXRpb25zRW5kcG9pbnQuaG9zdDtcbiAgICBjcmVhdGVFbmRwb2ludC5wYXRoICs9XG4gICAgICBcIj9uYW1lPVwiICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArXG4gICAgICBcIiZ0eXBlPVwiICtcbiAgICAgIHR5cGUgK1xuICAgICAgXCImYW5zd2VyX3VybD1cIiArXG4gICAgICBhbnN3ZXJVcmwgK1xuICAgICAgXCImZXZlbnRfdXJsPVwiICtcbiAgICAgIGV2ZW50VXJsO1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKSB7XG4gICAgICBjcmVhdGVFbmRwb2ludC5wYXRoICs9IFwiJlwiICsga2V5ICsgXCI9XCIgKyBvcHRpb25zW2tleV07XG4gICAgfVxuICAgIHNlbmRSZXF1ZXN0KGNyZWF0ZUVuZHBvaW50LCBcIlBPU1RcIiwgY2FsbGJhY2spO1xuICB9XG59O1xuXG5leHBvcnRzLmdldEFwcGxpY2F0aW9uID0gZnVuY3Rpb24oYXBwSWQsIGNhbGxiYWNrKSB7XG4gIGlmICghYXBwSWQgfHwgYXBwSWQubGVuZ3RoIDwgMzYpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5hcHBsaWNhdGlvbklkKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNob3dFbmRwb2ludCA9IGdldEVuZHBvaW50KGFwcGxpY2F0aW9uc0VuZHBvaW50LnBhdGggKyBcIi9cIiArIGFwcElkKTtcbiAgICBzaG93RW5kcG9pbnQuaG9zdCA9IGFwcGxpY2F0aW9uc0VuZHBvaW50Lmhvc3Q7XG4gICAgc2VuZFJlcXVlc3Qoc2hvd0VuZHBvaW50LCBjYWxsYmFjayk7XG4gIH1cbn07XG5cbmV4cG9ydHMudXBkYXRlQXBwbGljYXRpb24gPSBmdW5jdGlvbihcbiAgYXBwSWQsXG4gIG5hbWUsXG4gIHR5cGUsXG4gIGFuc3dlclVybCxcbiAgZXZlbnRVcmwsXG4gIG9wdGlvbnMsXG4gIGNhbGxiYWNrXG4pIHtcbiAgaWYgKCFhcHBJZCB8fCBhcHBJZC5sZW5ndGggPCAzNikge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFwcGxpY2F0aW9uSWQpKTtcbiAgfSBlbHNlIGlmICghbmFtZSB8fCBuYW1lLmxlbmd0aCA8IDEpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5hcHBsaWNhdGlvbk5hbWUpKTtcbiAgfSBlbHNlIGlmICghdHlwZSkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFwcGxpY2F0aW9uVHlwZSkpO1xuICB9IGVsc2UgaWYgKCFhbnN3ZXJVcmwpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5hcHBsaWNhdGlvbkFuc3dlclVybCkpO1xuICB9IGVsc2UgaWYgKCFldmVudFVybCkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFwcGxpY2F0aW9uRXZlbnRVcmwpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdXBkYXRlRW5kcG9pbnQgPSBnZXRFbmRwb2ludChhcHBsaWNhdGlvbnNFbmRwb2ludC5wYXRoICsgXCIvXCIgKyBhcHBJZCk7XG4gICAgdXBkYXRlRW5kcG9pbnQucGF0aCArPVxuICAgICAgXCI/bmFtZT1cIiArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgK1xuICAgICAgXCImdHlwZT1cIiArXG4gICAgICB0eXBlICtcbiAgICAgIFwiJmFuc3dlcl91cmw9XCIgK1xuICAgICAgYW5zd2VyVXJsICtcbiAgICAgIFwiJmV2ZW50X3VybD1cIiArXG4gICAgICBldmVudFVybDtcbiAgICB1cGRhdGVFbmRwb2ludC5ob3N0ID0gYXBwbGljYXRpb25zRW5kcG9pbnQuaG9zdDtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgdXBkYXRlRW5kcG9pbnQucGF0aCA9XG4gICAgICAgIHVwZGF0ZUVuZHBvaW50LnBhdGggKyBcIiZcIiArIGtleSArIFwiPVwiICsgb3B0aW9uc1trZXldO1xuICAgIH1cbiAgICBzZW5kUmVxdWVzdCh1cGRhdGVFbmRwb2ludCwgXCJQVVRcIiwgY2FsbGJhY2spO1xuICB9XG59O1xuXG5leHBvcnRzLmRlbGV0ZUFwcGxpY2F0aW9uID0gZnVuY3Rpb24oYXBwSWQsIGNhbGxiYWNrKSB7XG4gIGlmICghYXBwSWQgfHwgYXBwSWQubGVuZ3RoIDwgMzYpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5hcHBsaWNhdGlvbklkKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRlbGV0ZUVuZHBvaW50ID0gZ2V0RW5kcG9pbnQoYXBwbGljYXRpb25zRW5kcG9pbnQucGF0aCArIFwiL1wiICsgYXBwSWQpO1xuICAgIGRlbGV0ZUVuZHBvaW50Lmhvc3QgPSBhcHBsaWNhdGlvbnNFbmRwb2ludC5ob3N0O1xuICAgIHNlbmRSZXF1ZXN0KGRlbGV0ZUVuZHBvaW50LCBcIkRFTEVURVwiLCBjYWxsYmFjayk7XG4gIH1cbn07XG5cbmV4cG9ydHMuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbihuZXdTZWNyZXQsIGNhbGxiYWNrKSB7XG4gIHZhciBzZXR0aW5nc0VuZHBvaW50ID0gZ2V0RW5kcG9pbnQoXCIvYWNjb3VudC9zZXR0aW5nc1wiKTtcbiAgc2V0dGluZ3NFbmRwb2ludC5wYXRoICs9IFwiP25ld1NlY3JldD1cIiArIGVuY29kZVVSSUNvbXBvbmVudChuZXdTZWNyZXQpO1xuICBzZW5kUmVxdWVzdChzZXR0aW5nc0VuZHBvaW50LCBcIlBPU1RcIiwgY2FsbGJhY2spO1xufTtcblxuZXhwb3J0cy5jaGFuZ2VNb0NhbGxiYWNrVXJsID0gZnVuY3Rpb24obmV3VXJsLCBjYWxsYmFjaykge1xuICB2YXIgc2V0dGluZ3NFbmRwb2ludCA9IGdldEVuZHBvaW50KFwiL2FjY291bnQvc2V0dGluZ3NcIik7XG4gIHNldHRpbmdzRW5kcG9pbnQucGF0aCArPSBcIj9tb0NhbGxCYWNrVXJsPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG5ld1VybCk7XG4gIHNlbmRSZXF1ZXN0KHNldHRpbmdzRW5kcG9pbnQsIFwiUE9TVFwiLCBjYWxsYmFjayk7XG59O1xuXG5leHBvcnRzLmNoYW5nZURyQ2FsbGJhY2tVcmwgPSBmdW5jdGlvbihuZXdVcmwsIGNhbGxiYWNrKSB7XG4gIHZhciBzZXR0aW5nc0VuZHBvaW50ID0gZ2V0RW5kcG9pbnQoXCIvYWNjb3VudC9zZXR0aW5nc1wiKTtcbiAgc2V0dGluZ3NFbmRwb2ludC5wYXRoICs9IFwiP2RyQ2FsbEJhY2tVcmw9XCIgKyBlbmNvZGVVUklDb21wb25lbnQobmV3VXJsKTtcbiAgc2VuZFJlcXVlc3Qoc2V0dGluZ3NFbmRwb2ludCwgXCJQT1NUXCIsIGNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydHMudmVyaWZ5TnVtYmVyID0gZnVuY3Rpb24oaW5wdXRQYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGlmICghaW5wdXRQYXJhbXMubnVtYmVyIHx8ICFpbnB1dFBhcmFtcy5icmFuZCkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLnZlcmlmeVZhbGlkYXRpb24pKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdkVuZHBvaW50ID0gY2xvbmUodmVyaWZ5RW5kcG9pbnQpO1xuICAgIHZFbmRwb2ludC5wYXRoICs9IFwiP1wiICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KGlucHV0UGFyYW1zKTtcbiAgICBzZW5kUmVxdWVzdCh2RW5kcG9pbnQsIGNhbGxiYWNrKTtcbiAgfVxufTtcblxuZXhwb3J0cy5jaGVja1ZlcmlmeVJlcXVlc3QgPSBmdW5jdGlvbihpbnB1dFBhcmFtcywgY2FsbGJhY2spIHtcbiAgaWYgKCFpbnB1dFBhcmFtcy5yZXF1ZXN0X2lkIHx8ICFpbnB1dFBhcmFtcy5jb2RlKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuY2hlY2tWZXJpZnlWYWxpZGF0aW9uKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHZFbmRwb2ludCA9IGNsb25lKGNoZWNrVmVyaWZ5RW5kcG9pbnQpO1xuICAgIHZFbmRwb2ludC5wYXRoICs9IFwiP1wiICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KGlucHV0UGFyYW1zKTtcbiAgICBzZW5kUmVxdWVzdCh2RW5kcG9pbnQsIGNhbGxiYWNrKTtcbiAgfVxufTtcblxuZXhwb3J0cy5jb250cm9sVmVyaWZ5UmVxdWVzdCA9IGZ1bmN0aW9uKGlucHV0UGFyYW1zLCBjYWxsYmFjaykge1xuICBpZiAoIWlucHV0UGFyYW1zLnJlcXVlc3RfaWQgfHwgIWlucHV0UGFyYW1zLmNtZCkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmNvbnRyb2xWZXJpZnlWYWxpZGF0aW9uKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHZFbmRwb2ludCA9IGNsb25lKGNvbnRyb2xWZXJpZnlFbmRwb2ludCk7XG4gICAgdkVuZHBvaW50LnBhdGggKz0gXCI/XCIgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkoaW5wdXRQYXJhbXMpO1xuICAgIHNlbmRSZXF1ZXN0KHZFbmRwb2ludCwgY2FsbGJhY2spO1xuICB9XG59O1xuXG5leHBvcnRzLnNlYXJjaFZlcmlmeVJlcXVlc3QgPSBmdW5jdGlvbihyZXF1ZXN0SWRzLCBjYWxsYmFjaykge1xuICB2YXIgcmVxdWVzdElkUGFyYW0gPSB7fTtcbiAgaWYgKCFyZXF1ZXN0SWRzKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuc2VhcmNoVmVyaWZ5VmFsaWRhdGlvbikpO1xuICB9IGVsc2Uge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlcXVlc3RJZHMpKSB7XG4gICAgICBpZiAocmVxdWVzdElkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmVxdWVzdElkUGFyYW0ucmVxdWVzdF9pZCA9IHJlcXVlc3RJZHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0SWRQYXJhbS5yZXF1ZXN0X2lkcyA9IHJlcXVlc3RJZHM7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3RJZFBhcmFtLnJlcXVlc3RfaWQgPSByZXF1ZXN0SWRzO1xuICAgIH1cbiAgICB2YXIgdkVuZHBvaW50ID0gY2xvbmUoc2VhcmNoVmVyaWZ5RW5kcG9pbnQpO1xuICAgIHZFbmRwb2ludC5wYXRoICs9IFwiP1wiICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHJlcXVlc3RJZFBhcmFtKTtcbiAgICBzZW5kUmVxdWVzdCh2RW5kcG9pbnQsIGNhbGxiYWNrKTtcbiAgfVxufTtcblxuZXhwb3J0cy5udW1iZXJJbnNpZ2h0ID0gZnVuY3Rpb24oaW5wdXRQYXJhbXMsIGNhbGxiYWNrKSB7XG4gIG51bWJlckluc2lnaHRBc3luYyhpbnB1dFBhcmFtcywgY2FsbGJhY2spO1xufTtcblxuZXhwb3J0cy5udW1iZXJJbnNpZ2h0QmFzaWMgPSBmdW5jdGlvbihpbnB1dFBhcmFtcywgY2FsbGJhY2spIHtcbiAgbnVtYmVySW5zaWdodENvbW1vbihuaUJhc2ljRW5kcG9pbnQsIGlucHV0UGFyYW1zLCBjYWxsYmFjayk7XG59O1xuXG5leHBvcnRzLm51bWJlckluc2lnaHRTdGFuZGFyZCA9IGZ1bmN0aW9uKGlucHV0UGFyYW1zLCBjYWxsYmFjaykge1xuICBudW1iZXJJbnNpZ2h0Q29tbW9uKG5pU3RhbmRhcmRFbmRwb2ludCwgaW5wdXRQYXJhbXMsIGNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydHMubnVtYmVySW5zaWdodEFkdmFuY2VkID0gZnVuY3Rpb24oaW5wdXRQYXJhbXMsIGNhbGxiYWNrKSB7XG4gIG51bWJlckluc2lnaHRDb21tb24obmlBZHZhbmNlZEVuZHBvaW50LCBpbnB1dFBhcmFtcywgY2FsbGJhY2spO1xufTtcblxuZXhwb3J0cy5udW1iZXJJbnNpZ2h0QWR2YW5jZWRBc3luYyA9IGZ1bmN0aW9uKGlucHV0UGFyYW1zLCBjYWxsYmFjaykge1xuICBudW1iZXJJbnNpZ2h0QXN5bmMoaW5wdXRQYXJhbXMsIGNhbGxiYWNrKTtcbn07XG5cbmZ1bmN0aW9uIG51bWJlckluc2lnaHRBc3luYyhpbnB1dFBhcmFtcywgY2FsbGJhY2spIHtcbiAgaWYgKCFpbnB1dFBhcmFtcy5udW1iZXIgfHwgIWlucHV0UGFyYW1zLmNhbGxiYWNrKSB7XG4gICAgc2VuZEVycm9yKFxuICAgICAgY2FsbGJhY2ssXG4gICAgICBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubnVtYmVySW5zaWdodEFkdmFuY2VkVmFsaWRhdGlvbilcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHZhciBuRW5kcG9pbnQgPSBjbG9uZShuaUVuZHBvaW50KTtcbiAgICBuRW5kcG9pbnQucGF0aCArPSBcIj9cIiArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShpbnB1dFBhcmFtcyk7XG4gICAgc2VuZFJlcXVlc3QobkVuZHBvaW50LCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbnVtYmVySW5zaWdodENvbW1vbihlbmRwb2ludCwgaW5wdXRQYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGlmICh2YWxpZGF0ZU51bWJlcihpbnB1dFBhcmFtcywgY2FsbGJhY2spKSB7XG4gICAgdmFyIGlucHV0T2JqO1xuICAgIGlmICh0eXBlb2YgaW5wdXRQYXJhbXMgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGlucHV0T2JqID0geyBudW1iZXI6IGlucHV0UGFyYW1zIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0T2JqID0gaW5wdXRQYXJhbXM7XG4gICAgfVxuICAgIHZhciBuRW5kcG9pbnQgPSBjbG9uZShlbmRwb2ludCk7XG4gICAgbkVuZHBvaW50LnBhdGggKz0gXCI/XCIgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkoaW5wdXRPYmopO1xuICAgIHNlbmRSZXF1ZXN0KG5FbmRwb2ludCwgY2FsbGJhY2spO1xuICB9XG59XG5mdW5jdGlvbiB2YWxpZGF0ZU51bWJlcihpbnB1dFBhcmFtcywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBpbnB1dFBhcmFtcyA9PT0gXCJvYmplY3RcIiAmJiAhaW5wdXRQYXJhbXMubnVtYmVyKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubnVtYmVySW5zaWdodFZhbGlkYXRpb24pKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSBpZiAoXG4gICAgdHlwZW9mIGlucHV0UGFyYW1zID09PSBcIm9iamVjdFwiICYmXG4gICAgIW51bWJlclBhdHRlcm4udGVzdChpbnB1dFBhcmFtcy5udW1iZXIpXG4gICkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm51bWJlckluc2lnaHRQYXR0ZXJuRmFpbHVyZSkpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIGlmIChcbiAgICB0eXBlb2YgaW5wdXRQYXJhbXMgIT09IFwib2JqZWN0XCIgJiZcbiAgICAoIWlucHV0UGFyYW1zIHx8ICFudW1iZXJQYXR0ZXJuLnRlc3QoaW5wdXRQYXJhbXMpKVxuICApIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5udW1iZXJJbnNpZ2h0UGF0dGVybkZhaWx1cmUpKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNlbmRWb2ljZU1lc3NhZ2Uodm9pY2VFbmRwb2ludCwgZGF0YSwgY2FsbGJhY2spIHtcbiAgaWYgKCFkYXRhLnRvKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMudG8pKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZW5kcG9pbnQgPSBjbG9uZSh2b2ljZUVuZHBvaW50KTtcbiAgICBlbmRwb2ludC5wYXRoICs9IFwiP1wiICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KGRhdGEpO1xuICAgIF9vcHRpb25zLmxvZ2dlci5pbmZvKFxuICAgICAgXCJzZW5kaW5nIFRUUyBtZXNzYWdlIHRvIFwiICsgZGF0YS50byArIFwiIHdpdGggbWVzc2FnZSBcIiArIGRhdGEudGV4dFxuICAgICk7XG4gICAgc2VuZFJlcXVlc3QoZW5kcG9pbnQsIFwiUE9TVFwiLCBmdW5jdGlvbihlcnIsIGFwaVJlc3BvbnNlKSB7XG4gICAgICBpZiAoIWVyciAmJiBhcGlSZXNwb25zZS5zdGF0dXMgJiYgYXBpUmVzcG9uc2Uuc3RhdHVzID4gMCkge1xuICAgICAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihhcGlSZXNwb25zZVtcImVycm9yLXRleHRcIl0pLCBhcGlSZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVyciwgYXBpUmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydHMuc2VuZFRUU01lc3NhZ2UgPSBmdW5jdGlvbihyZWNpcGllbnQsIG1lc3NhZ2UsIG9wdHMsIGNhbGxiYWNrKSB7XG4gIGlmICghbWVzc2FnZSkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm1zZykpO1xuICB9IGVsc2Uge1xuICAgIGlmICghb3B0cykge1xuICAgICAgb3B0cyA9IHt9O1xuICAgIH1cbiAgICBvcHRzW1widG9cIl0gPSByZWNpcGllbnQ7XG4gICAgb3B0c1tcInRleHRcIl0gPSBtZXNzYWdlO1xuICAgIHNlbmRWb2ljZU1lc3NhZ2UodHRzRW5kcG9pbnQsIG9wdHMsIGNhbGxiYWNrKTtcbiAgfVxufTtcblxuZXhwb3J0cy5zZW5kVFRTUHJvbXB0V2l0aENhcHR1cmUgPSBmdW5jdGlvbihcbiAgcmVjaXBpZW50LFxuICBtZXNzYWdlLFxuICBtYXhEaWdpdHMsXG4gIGJ5ZVRleHQsXG4gIG9wdHMsXG4gIGNhbGxiYWNrXG4pIHtcbiAgaWYgKCFtZXNzYWdlKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubXNnKSk7XG4gIH0gZWxzZSBpZiAoIW1heERpZ2l0cyB8fCBpc05hTihtYXhEaWdpdHMpIHx8IG1heERpZ2l0cy5sZW5ndGggPiAxNikge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm1heERpZ2l0cykpO1xuICB9IGVsc2UgaWYgKCFieWVUZXh0KSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuYnllVGV4dCkpO1xuICB9IGVsc2Uge1xuICAgIGlmICghb3B0cykge1xuICAgICAgb3B0cyA9IHt9O1xuICAgIH1cbiAgICBvcHRzW1widG9cIl0gPSByZWNpcGllbnQ7XG4gICAgb3B0c1tcInRleHRcIl0gPSBtZXNzYWdlO1xuICAgIG9wdHNbXCJtYXhfZGlnaXRzXCJdID0gbWF4RGlnaXRzO1xuICAgIG9wdHNbXCJieWVfdGV4dFwiXSA9IGJ5ZVRleHQ7XG4gICAgc2VuZFZvaWNlTWVzc2FnZSh0dHNQcm9tcHRFbmRwb2ludCwgb3B0cywgY2FsbGJhY2spO1xuICB9XG59O1xuXG5leHBvcnRzLnNlbmRUVFNQcm9tcHRXaXRoQ29uZmlybSA9IGZ1bmN0aW9uKFxuICByZWNpcGllbnQsXG4gIG1lc3NhZ2UsXG4gIG1heERpZ2l0cyxcbiAgcGluQ29kZSxcbiAgYnllVGV4dCxcbiAgZmFpbGVkVGV4dCxcbiAgb3B0cyxcbiAgY2FsbGJhY2tcbikge1xuICBpZiAoIW1lc3NhZ2UpIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5tc2cpKTtcbiAgfSBlbHNlIGlmICghbWF4RGlnaXRzIHx8IGlzTmFOKG1heERpZ2l0cykgfHwgbWF4RGlnaXRzLmxlbmd0aCA+IDE2KSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubWF4RGlnaXRzKSk7XG4gIH0gZWxzZSBpZiAoIXBpbkNvZGUgfHwgcGluQ29kZS5sZW5ndGggIT09IG1heERpZ2l0cykge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLnBpbkNvZGUpKTtcbiAgfSBlbHNlIGlmICghYnllVGV4dCkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmJ5ZVRleHQpKTtcbiAgfSBlbHNlIGlmICghZmFpbGVkVGV4dCkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmZhaWxlZFRleHQpKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgIG9wdHMgPSB7fTtcbiAgICB9XG4gICAgb3B0c1tcInRvXCJdID0gcmVjaXBpZW50O1xuICAgIG9wdHNbXCJ0ZXh0XCJdID0gbWVzc2FnZTtcbiAgICBvcHRzW1wibWF4X2RpZ2l0c1wiXSA9IG1heERpZ2l0cztcbiAgICBvcHRzW1wicGluX2NvZGVcIl0gPSBwaW5Db2RlO1xuICAgIG9wdHNbXCJieWVfdGV4dFwiXSA9IGJ5ZVRleHQ7XG4gICAgb3B0c1tcImZhaWxlZF90ZXh0XCJdID0gZmFpbGVkVGV4dDtcbiAgICBzZW5kVm9pY2VNZXNzYWdlKHR0c1Byb21wdEVuZHBvaW50LCBvcHRzLCBjYWxsYmFjayk7XG4gIH1cbn07XG5cbmV4cG9ydHMuY2FsbCA9IGZ1bmN0aW9uKHJlY2lwaWVudCwgYW5zd2VyVXJsLCBvcHRzLCBjYWxsYmFjaykge1xuICBpZiAoIWFuc3dlclVybCkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFuc3dlclVybCkpO1xuICB9IGVsc2Uge1xuICAgIGlmICghb3B0cykge1xuICAgICAgb3B0cyA9IHt9O1xuICAgIH1cbiAgICBvcHRzW1widG9cIl0gPSByZWNpcGllbnQ7XG4gICAgb3B0c1tcImFuc3dlcl91cmxcIl0gPSBhbnN3ZXJVcmw7XG4gICAgc2VuZFZvaWNlTWVzc2FnZShjYWxsRW5kcG9pbnQsIG9wdHMsIGNhbGxiYWNrKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gc2VuZEVycm9yKGNhbGxiYWNrLCBlcnIsIHJldHVybkRhdGEpIHtcbiAgLy8gVGhyb3cgdGhlIGVycm9yIGluIGNhc2UgaWYgdGhlcmUgaXMgbm8gY2FsbGJhY2sgcGFzc2VkXG4gIGlmIChjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKGVyciwgcmV0dXJuRGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59XG5cbmV4cG9ydHMuc2V0SG9zdCA9IGZ1bmN0aW9uKGFIb3N0KSB7XG4gIG1zZ3BhdGguaG9zdCA9IGFIb3N0O1xuICBzaG9ydGNvZGVQYXRoLmhvc3QgPSBhSG9zdDtcbiAgdHRzRW5kcG9pbnQuaG9zdCA9IGFIb3N0O1xuICB0dHNQcm9tcHRFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gIGNhbGxFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gIHZlcmlmeUVuZHBvaW50Lmhvc3QgPSBhSG9zdDtcbiAgY2hlY2tWZXJpZnlFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gIGNvbnRyb2xWZXJpZnlFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gIHNlYXJjaFZlcmlmeUVuZHBvaW50Lmhvc3QgPSBhSG9zdDtcbiAgbmlFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gIG5pQmFzaWNFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gIG5pU3RhbmRhcmRFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gIGFwcGxpY2F0aW9uc0VuZHBvaW50Lmhvc3QgPSBhSG9zdDtcbn07XG4iXX0=